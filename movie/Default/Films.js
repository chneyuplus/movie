//数据分页的相关参数
//一页显示多少条
let pageNum =30;
//当前页参数
let nowPage = 1;
//总条数
let totleNum=0;
//固定几个元素
let pageEles=10;
//当前页面根据某个属性排序
let sort=0;
//配置排序方式
let sortContent=[
    {name:'按热门排序',resway:'totleclick'},
    {name:'按时间排序',resway:'uptimes'},
    {name:'按评价排序',resway:'score'}
]
//电影类型
let catId=null;
//电影区域
let sourceId=null;
//电影年代
let yearId=null;
//电影默认正在热映
let showType=[
    {name:'正在热映',type:1},
    {name:'即将上映',type:2},
    {name:'经典影片',type:3}
];
let showTypeid=1;
module.exports={
    pageNum,
    nowPage,
    totleNum,
    pageEles,
    sort,
    sortContent,
    catId,
    sourceId,
    yearId,
    showType,
    showTypeid
}