/*
首页路由
*/
const express = require("express");
const router = express.Router();
let Header = require("../Default/Header");

//调数据库
let mysqlDAL = require("../MySQL/MysqlDAL");
let mysql = new mysqlDAL();
router.get('/', (req, res, next) => {
    let getData = async () => {
        //正在热映几条
        let hotNum = await mysql.HotMovieNum();
        //正在热映
        let hotMovie = await mysql.findHotMovieSort();
        //即将上映几条
        let willNum = await mysql.willMovieNum();
        //即将上映
        let willmovie = await mysql.findwillMovie();
        //点击量排行热播
        let clickMovie = await mysql.findClickMovie();
        //获取今日票房前5
        let todayMovie = await mysql.todayMovieMoney();
        //获取实时总票
        let allMoney = await mysql.totleMoney();
        //期待榜单
        let awitMovie = await mysql.waitMovie();
        //评分排行
        let scoreSort = await mysql.scoreSort();
        return {
            hotNum,
            hotMovie,
            willNum,
            willmovie,
            clickMovie,
            todayMovie,
            allMoney,
            awitMovie,
            scoreSort,
        }
    }
    getData().then((result) => {
        res.render('Index.html', {
            menuIndex: 0,
            user:res.locals['user'],
            Header,
            hotNum: result.hotNum,
            hotMovie: result.hotMovie,
            willNum: result.willNum,
            willMovie: result.willmovie,
            clickMovie: result.clickMovie,
            todayMovie: result.todayMovie,
            allMoney: result.allMoney[0],
            awitmovie: result.awitMovie,
            sSort:result.scoreSort,
        }, (err, html) => {
            res.send(html);
        });
    });
});

module.exports = router;