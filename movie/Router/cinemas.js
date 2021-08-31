
const express = require("express");
const router = express.Router();
let Header = require("../Default/Header");
//调数据库数据
let mysqlDAL = require("../MySQL/MysqlDAL");
let mysql = new mysqlDAL();

router.get("/", (req, res, next) => {
    let movieid = req.query.movieId;
    if (movieid) {
        async function movieData() {
            let moviedetail = await mysql.selectMovieid(movieid);
            let chang = await mysql.moviechang(movieid);
            return { moviedetail, chang }
        }
        let week = {
            0: '周日',
            1: '周一',
            2: '周二',
            3: '周三',
            4: '周四',
            5: '周五',
            6: '周六',
        }
        let date = new Date();
        let weekday= date.getDay();
        let day=date.getDate();
        let mon = date.getMonth() + 1;
        //获取未来五天
        let fullDate = [];
        fullDate[0] = { name: `${mon}月${day}日`, txt: '今天' };
        for (let i = 1; i < 5; i++) {
            day++;
            let wdate=new Date();
            wdate.setDate(day);
            let wmon=wdate.getMonth()+1;
            let wday=wdate.getDate();
            let wweek=wdate.getDay();
            fullDate[i] = { name: `${wmon}月${wday}日`, txt: week[wweek] };
        }
        movieData().then((result) => {
            res.render("cinemas.html", {
                Header,
                menuIndex: null,
                user: res.locals['user'],
                movie: result.moviedetail,
                chang: result.chang,
                fullDate:fullDate
            }, (err, html) => {
                res.send(html);
            });
        })
    }
    else {
        res.redirect('/');
    }


})
module.exports = router;