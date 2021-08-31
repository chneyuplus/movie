const express = require("express");
const router = express.Router();
let Header = require("../Default/Header");
//调数据库
let mysqlDAL = require("../MySQL/MysqlDAL");
let mysql = new mysqlDAL();
let movieid = null;
router.get('/', (req, res, next) => {
    movieid = req.query.movieid;
    //检测用户是否登录过  token
    let token = req.cookies['token'];
    if (!token) {
        res.redirect('/login');
    }
    else {
        next();
    }
}, (req, res, next) => {
    res.render("common.html", {
        menuIndex: null,
        user: res.locals['user'],
        Header,
    }, (err, html) => {
        res.send(html);
    });
});
//发表评论
router.post('/sendMsg', (req, res, next) => {
    let content = req.body.content;
    let user = res.locals['user'];
    let time=new Date().toLocaleString();
    mysql.movieCommon(movieid, user.id, content,time).then((result) => {
        let effect = result;
        if (effect.affectedRows === 1) {
            console.log("评论成功！");
        }
        else {
            console.log("评论失败！等会再试！");
        }
        setTimeout(() => {
            res.redirect(`/films/${movieid}`);
        }, 1000);
    });
});
module.exports = router;
