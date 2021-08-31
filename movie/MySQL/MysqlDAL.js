//引入Connect文件里面是封装的方法
const mysqlClient=require("./Connect");
let mysqlDAL=new mysqlClient();

class DAL{
    constructor(){}
    //热映几条
    HotMovieNum(){
        let sql='select count(*) as count from list where isup=1';
        //调用方法
        return mysqlDAL.queryMysql(sql); 
    }
    //热映取前8
    findHotMovieSort(){
        let sql='select * from List where id in (select listid from (select listid from hotList where isup=1 ORDER BY totlemoney DESC LIMIT 8) as b)';
        return mysqlDAL.queryMysql(sql);
    }
     //即将上映几条
    willMovieNum(){
        let sql='select count(*) as count from list where isup=2';
        return mysqlDAL.queryMysql(sql);   
    }
     //即将上映取前8
    findwillMovie(){
        let sql='select * from list right join (select listid,totleclick from hotList where isup=2 ORDER BY totlemoney ASC LIMIT 8) as b on list.id=b.listid order by uptimes';
        return mysqlDAL.queryMysql(sql);
    }
     //热播电影取前7
    findClickMovie(){
        let sql='select * from list RIGHT JOIN (select listid,totleclick from hotList where isup=1 ORDER BY totleclick DESC LIMIT 7) as b on b.listid=list.id order by totleclick desc';
        return mysqlDAL.queryMysql(sql);
    }
    //今日票房
    todayMovieMoney(){
        let sql='select * from list right JOIN (select listid,totlemoney from hotlist where isup=1 order by totlemoney desc limit 5) as b on b.listid=list.id';
        return mysqlDAL.queryMysql(sql);
    }
    //获取实时总票房
    totleMoney(){
        let sql='select sum(totlemoney) as money from hotlist where listid in (select id from list where isup=1)';
        return mysqlDAL.queryMysql(sql);
    }
    //最受期待排行榜
    waitMovie(){
        let sql='select * from list right JOIN (select listid,totleclick from hotlist where isup=0 order by totleclick desc limit 10) as b on b.listid=list.id';
        return mysqlDAL.queryMysql(sql);
    }
    //电影评分排行榜
    scoreSort(){
        let sql='select name,image,score from list RIGHT JOIN (select movieid,score from score) as b on b.movieid=list.id order by score desc limit 10';
        return mysqlDAL.queryMysql(sql);
    }
    //电影类型
    movieType(){
        let sql='select * from type';
        return mysqlDAL.queryMysql(sql);
    }
    //所谓的区域
    movieCity(){
        let sql='select * from country';
        return mysqlDAL.queryMysql(sql);
    }
    //年代
    movieEra(){
        let sql='select * from era order by id desc';
        return mysqlDAL.queryMysql(sql);
    }
    //电影的详细信息
    movieDetail(sort,nowPage,pageNum,catId,sourceId,yearId,showtype)
    {   
        let sql=`select k.id,k.name,k.image,uptimes,score,totleclick from (select * from list ${catId||sourceId||yearId?'where':''} ${catId?`list.id in (select listid from listtype where typeid=${catId})`:''}${catId&&sourceId?'and':''}${sourceId?` list.country=${sourceId}`:''} ${(catId||sourceId)&&yearId?'and':''} ${yearId?` eraid=${yearId}`:''}) as k RIGHT JOIN score on score.movieid=k.id INNER JOIN (select listid,totleclick from hotlist where isup=${showtype} ) as c on c.listid=k.id order by ${sort} desc limit ?,?`;
        let arr=[(nowPage-1)*pageNum,pageNum];
        //获取上线电影的电影类型
        let sqlType='select listid,type from listtype,type,list where typeid=type.id and list.isup=1 and list.id=listtype.listid  order by listid';
        let zuData=async function (){
            let movieData=await mysqlDAL.queryMysql(sql,arr);
            let movieType=await mysqlDAL.queryMysql(sqlType);
            movieData.map((item)=>{
                item.typeList=[];
                movieType.map((typeinfo)=>{
                    if(item.id==typeinfo.listid)
                    {
                        item.typeList.push(typeinfo.type);
                    }
                });
            });
            return movieData;
        }
        return zuData();
    }
    //上线电影的总条数
    movieAll(){
        let sql='select count(*) as count from list where isup=1';
        return mysqlDAL.queryMysql(sql);
    }
    selectMovieid(id)
    {
        //获取当前电影的详细信息
        let sql=`select list.id,name,enName,detail,image,times,upaddress,uptimes,mType,list.isup,year,cname,score,totleclick,totlemoney from list,era,country,score,hotlist where list.id=${id} and era.id=list.eraid and list.country=country.id and list.id=score.movieid and list.id=hotlist.listid`;
        let movieType=`select * from type where id in (select typeid from listtype where listtype.listid=${id})`;
        async function asyncMovie(){
            let detail=await mysqlDAL.queryMysql(sql);
            let typeList=await mysqlDAL.queryMysql(movieType);
            detail[0].typelist=[];
            typeList.map((item)=>{
               detail[0].typelist.push(item);
            });
            return detail[0];
        }
        return asyncMovie();
    }
    //检测用户登录
    userLogin(id,pwd){
        let sql=`select count(*) as count from user where userid='${id}' and pwd='${pwd}'`

        return mysqlDAL.queryMysql(sql);
    }
    //根据账号查找这个人的信息
    userInfo(id)
    {
        let sql=`select *  from user where userid='${id}'`
        return mysqlDAL.queryMysql(sql);
    }
    //电影评论
    movieCommon(movieid,userid,content,time){
        let sql=`insert into common values(null,${movieid},${userid},'${content}','${time}')`;
        return mysqlDAL.queryMysql(sql);
    }
    //根据电影id获取相关评论
    moviecommonlist(id)
    {
        let sql=`select common.id,content,instime,nickname,face from common,user where user.id=common.userid and movieid=${id} order by instime desc`;
        return mysqlDAL.queryMysql(sql);
    }
    //根据电影id获取电影相关场次
    moviechang(id){
        let sql=`select look.id,chang.id as cid,name,price,langulage,start,end,date,movieid from chang,look where movieid=${id} and chang.lookid=look.id`;
        async function checkData(){

            let data=await mysqlDAL.queryMysql(sql);
            //获取今天的日期
            let nowtime=new Date();
            let day=nowtime.getDate();
            let arr=[];
            let wday=day+5;
            while(day<wday){
                arr.push([]);
                data.map((item)=>{
                    if(new Date(item.date).getDate()==day)
                    {
                        arr[arr.length-1].push(item);
                    }
                })
                day++;
            }
            return arr;
        }
        return checkData();
    }
    //根据影厅id查影厅的座位
    findxseat(id)
    {
        let sql=`select secat from kookseat where lookid=${id}`;
        return mysqlDAL.queryMysql(sql);
    }
    //根据当前的用户id  电影id  场次id  获取当前用户买的座位号
    findmovieseat(cid,movieid,userid){
        let sql=`select * from seatlist where byid in (select id from bymovie where changid=${cid} and movieid=${movieid})`;
        return mysqlDAL.queryMysql(sql);
    }
    //获取当前电影  那个厅的相关信息
    findLook(movieid,cnaid,cid){
        let sql=`select look.id,chang.id as cid,name,price,langulage,start,end,date,movieid from chang,look where movieid=${movieid} and chang.lookid=look.id=${cnaid} and chang.id=${cid}`;
        return mysqlDAL.queryMysql(sql);
    }
}
module.exports=DAL;