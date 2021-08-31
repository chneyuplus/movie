//封装token
let jwt=require("jsonwebtoken");
//定义签名
let secret='bdjksandkls';
//定义方法  token生成
let createToken=(data)=>{
    let obj={};
    obj.data=data||{};//接收数据
    obj.ctime=new Date().getTime();//token创建时间
    obj.expiresIn=1000*60*60*2;//设置过期时间
    let token=jwt.sign(obj,secret);
    return token;
}
//token验证
let varity=(token)=>{
    let result=null;
    try{
        let {data,ctime,expiresIn}=jwt.verify(token,secret);
        let nowTime=new Date().getTime();
        if(nowTime-ctime<expiresIn)//token未失效
        {
            result=data;
        }
    }catch(e)
    { throw e}
    return result;
}
module.exports={createToken,varity}