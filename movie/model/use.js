//应用中间件
//调数据库
let { varity } = require('../token/token');
module.exports = (app) => {
    let mysqlDAL = require("../MySQL/MysqlDAL");
    let mysql = new mysqlDAL();
    app.use((req, res, next) => {
        if (!res.locals['user']) {
            //不存用户信息获取
            let token = req.cookies['token'];
            if (token) {
                let userid = varity(token);
                if (userid) {
                    mysql.userInfo(userid).then((result) => {
                        res.locals['user'] = result[0];
                        next();
                    });
                }
                else {
                    next();
                }
            }
            else { next(); }
        } else {
            next();
        }
    });
}