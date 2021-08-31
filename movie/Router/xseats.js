// 选座路由
const express = require("express");
const router = express.Router();
let Header = require("../Default/Header");
//调数据库
let mysqlDAL = require("../MySQL/MysqlDAL");
let mysql = new mysqlDAL();
router.get('/', (req, res) => {
    let cinemaId = req.query.cinemaId;
    let movieId = req.query.movieId;
    let cid = req.query.cid;
    if(cinemaId){
        async function findInfo(){
            let seat=await mysql.findxseat(cinemaId);
            let byseat=await mysql.findmovieseat(cid,movieId);
            let movie=await mysql.selectMovieid(movieId);
            let cinfo=await mysql.findLook(movieId,cinemaId,cid);
            return {seat,byseat,movie,cinfo}
        }
        findInfo().then((result)=>{
            let info={};
            result.byseat.map((item)=>{
                let arr=item.seat.split('-');
                info[item.seat]=arr[1];
            });
            //对已买的座位处理  构造成行和类
            res.render('xseats.html', {
                menuIndex: null,
                Header,
                user: res.locals['user'],
                xseat:eval(result.seat[0].secat),
                byseat:info,
                movie:result.movie,
                cinfo:result.cinfo[0]
            }, (err, html) => {
                res.send(html);
            });
        });
    }
});
module.exports = router;