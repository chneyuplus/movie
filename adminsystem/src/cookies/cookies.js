//写cookies缓存
//引入路径解析模块
const url = require("url");
export default {
    time: null,
    setTime(time) {
        let alltime = new Date().getTime() + time;
        this.time = new Date(alltime).toUTCString();
    },
    setCookies(value, time, path) {
        this.setTime(time);
        //写入cookies缓存
        document.cookie = `${value};expires=${this.time};path=${path}`;
    },
    getCookies() {
        let cookie = "?";
        cookie += document.cookie.replace(/\s/g, '').replace(/\;/g, '&');
        const path=url.parse(cookie,true).query;
        return path;
    }
}
