const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
let app = express();
//静态资源目录
app.use(express.static(__dirname + "/Static"));
app.engine(".html", ejs.__express);
app.set("view engine", 'html');
app.set("views", __dirname + "/View");
let cookieParser=require("cookie-parser");
app.use(cookieParser('abcd'));
let bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
let port = 80;
let host = '127.0.0.1';
let Index = require("./Router/Index");
let films = require("./Router/Films");
let Common = require("./Router/Common");
let Login = require("./Router/Login");
let Cinemas = require("./Router/cinemas");
let Xseats=require("./Router/xseats")
require("./model/use")(app);

app.use('/', Index);
app.use('/films', films);
app.use('/common', Common);
app.use('/login', Login);
app.use('/cinemas', Cinemas);
app.use('/xseats',Xseats);
app.use((error, req, res) => {
    //抓到异常
    if(error.stack)
    {
        fs.appendFile(__dirname + "/Note/Note.txt", error.stack + '\n', (err) => {
            if (err) {
                console.log("写入失败！");
            }
            else {
                console.log("写入成功！");
            }
        });
    }
});
app.listen(port, host, () => {
    console.log(`http://${host}:${port}`);
});


// 搜索功能  mysql  模糊查找
//订票    生成二维数组    产生座位编号  存到数据库


