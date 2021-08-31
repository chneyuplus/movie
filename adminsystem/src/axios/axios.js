//封装ajax请求
import Axios from 'axios'
export default{
    getUrl(src){
        return Axios.get(src);
    },
    postUrl(src){
        return Axios.post(src);
    },
    sendGet(src,params){
        return Axios.get(src,{
            params:params
        });
    },
    sendPost(src,params){
        return Axios.post(src,params);
    }
}