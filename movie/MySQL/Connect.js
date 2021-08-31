//数据库连接文件
const mysqlClient = require("mysql");
const set = require("./Settings");

class Connect {
    //声明一个变量
    client;
    constructor() {

    }
    //返回json数据的方法
    JSONParser(args) {
        return JSON.parse(JSON.stringify(args));
    }
    queryMysql(str = '', data = null) {
        try {
            //创建连接对象
            //连接数据的方法
            this.connectMysql();
            this.client.connect();//连接数据库
            return new Promise((resolve, reject) => {
                this.client.query(str, data ? data : null, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(this.JSONParser(res));
                    }
                });
            });
        }
        catch (e) {
            throw e;
        } finally {
            if (this.client) {
                //关闭数据库
                this.client.end();
            }
        }
    };
    //每次更新的时候会出现错误，所以要封装一个方法 每次刷新的时候都要连接
    connectMysql() {
        try {
            this.client = mysqlClient.createConnection({
                user: set.user,
                password: set.password,
                host: set.host,
                database: set.database,
                port: set.port
            });
        }
        catch (e) {
            throw e;
        }
    }
}
//暴露出去Connect   class用Es6写的
module.exports = Connect;