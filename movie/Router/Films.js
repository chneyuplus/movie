// 电影路由
const express = require("express");
const router = express.Router();
let Header = require("../Default/Header");
//调数据库
let mysqlDAL = require("../MySQL/MysqlDAL");
let mysql = new mysqlDAL();
//引入当前页面的变量
let { pageNum,
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
} = require('../Default/Films');
router.get('/', (req, res, next) => {
    let query = req.query;
    if (query.sortId)// 0 1 2
    {
        sort = parseInt(query.sortId);
    }
    else {
        sort = 0;
    }
    if (query.showType) {
        showTypeid = query.showType;
    }
    else {
        showTypeid = 1;
    }
    if (query.catId) {
        catId = query.catId;
    }
    else {
        catId = null;
    }
    if (query.sourceId) {
        sourceId = query.sourceId;
    }
    else {
        sourceId = null;
    }
    if (query.yearId) {
        yearId = query.yearId;
    }
    else {
        yearId = null;
    }
    next();
}, (req, res, next) => {
    let query = req.query;
    //获取 总条数进行计算
    //获取上线电影总条数
    mysql.movieAll().then((result) => {
        totleNum = Math.ceil(result[0].count / pageNum);
        if (query.now) {
            switch (query.now) {
                case 'up':
                    nowPage--;
                    if (nowPage < 1) {
                        nowPage = 1;
                    }
                    break;
                case 'down':
                    nowPage++;
                    if (nowPage > totleNum) {
                        nowPage = totleNum;
                    }
                    break;
                default:
                    nowPage = query.now;
                    break;
            }
        } else {
            nowPage = 1;
        }
        next();
    });
}, (req, res, next) => {
    let asyData = async function () {
        //电影类别
        let movieType = await mysql.movieType();
        //区域
        let movieCity = await mysql.movieCity();
        //年代
        let movieEra = await mysql.movieEra();
        //电影详细信息
        let sortText = sortContent[sort].resway;

        let movieDetail = await mysql.movieDetail(sortText, nowPage, pageNum, catId, sourceId, yearId, showTypeid);//存在数据分页

        return {
            movieType,
            movieCity,
            movieEra,
            movieDetail
        }
    }
    asyData().then((result) => {
        res.render('Films.html', {
            menuIndex: 1,
            user: res.locals['user'],
            Header,
            movieType: result.movieType,
            movieCity: result.movieCity,
            movieEra: result.movieEra,
            movieDetail: result.movieDetail,
            allPage: totleNum,//总页数
            nowPage: nowPage,//当前页
            pageEle: totleNum >= pageEles ? pageEles : totleNum,//界面显示分页元素pageEles个
            checksortid: sort,
            sortInfo: sortContent,
            catId: catId,//下面这三个是类型切换值
            sourceId: sourceId,
            yearId: yearId,
            showType: showType,
            showTypeid: showTypeid
        }, (err, html) => {
            res.send(html);
        });
    });
});
router.get("/:id", (req, res, next) => {
    //动态获取电影的id  获取电影的相关 信息
    let movieid = req.params.id;
    if (movieid && !isNaN(movieid)) {
        async function movieData() {
            let moviedetail = await mysql.selectMovieid(movieid);
            let common = await mysql.moviecommonlist(movieid);
            return { moviedetail, common }
        }
        movieData().then((result) => {
            res.render('MovieDeatil.html', {
                menuIndex: null,
                user: res.locals['user'],
                Header,
                movie: result.moviedetail,
                common:result.common
            }, (err, html) => {
                res.send(html);
            });
        })
    }
    else {
        res.redirect("/");
    }
});

module.exports = router;