const express = require("express");
const router = express.Router();
let { createToken } = require('../token/token');
//调数据库
let mysqlDAL = require("../MySQL/MysqlDAL");
let mysql = new mysqlDAL();
router.get("/", (req, res, next) => {
    res.render("Login.html");
});
router.post('/userlogin', (req, res, next) => {
    let id = req.body.id;
    let pwd = req.body.pwd;
    mysql.userLogin(id, pwd).then((result) => {
        if (result[0].count == 1) {
            //账号密码正确
            let token = createToken(id);
            res.cookie('token', token, {
                maxAge: 1000 * 60 * 60 * 24
            });
            res.redirect("/");
        }
        else {
            //账号或者密码错误
            res.redirect("/login");
        }
    });
});
module.exports = router;

// cnpm install --save-dev jsonwebtoken
