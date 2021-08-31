//配置模拟数据
import Mock from 'mockjs'
import url from 'url'

//假设
const admin = "admin";
const pwd = "admin123";

import Store from '@/store/index.js';

//建立100条相关数据
let MenuData = Mock.mock({
    "result|100": [
        {
            'id|+1': 1,
            'menuid': '@string(5)',
            'menuname|1': ['系统管理', '公司管理', '机构菜单管理', '机构类型管理', '机构角色管理', '系统操作员', '产品列表'],
            'menutype': '交易商',
            'menuurl': '/@string(5)',
            'menulevel|1': ["一级菜单", '二级菜单', '三级菜单'],
            'menuparentid': '@string(5)',
            'menuparentname|1': ['系统管理', '公司管理', '机构菜单管理', '机构类型管理', '机构角色管理', '系统操作员', '产品列表'],
        }
    ]
});
Store.commit("updateAll",MenuData.result);
Store.commit("updatemenuData",MenuData.result);
//根据条件查找数据
Mock.mock('/findDatamsg', 'post', function (config) {
    let body = JSON.parse(config.body);
    let arr = [];
    MenuData.result.map((item) => {
        let istrue = true;
        for (let key in body) {
            if (item[key].toLowerCase() != body[key].toLowerCase()) {
                istrue = false;
            }
        }
        if (istrue) {
            arr.push(item);
        }
    });
    return {
        pageData:arr
    };
});
//根据当前页  和  一页显示多少条  返回数据
Mock.mock(RegExp(/\/getnowPage.*/), 'get', function (config) {
    let query = url.parse(config.url, true).query;
    let num = query.num;
    let now = query.now;
    let data=Store.getters.getMenuData;
    return {
        pageData: data.slice((now - 1) * num, num * now),
        totle:data.length
    };
});

Mock.mock("/getdatemsg", "post", function () {
    return [
        { value: 24, name: "完成成交" },
        { value: 12, name: "部分成交" },
        { value: 109, name: "撤单" },
        { value: 484, name: "待成交" },
    ]
});
Mock.mock("/getUser", "post", function (config) {
    let user = JSON.parse(config.body);
    return {
        id: 1,
        name: "小不点灬开心",
        face: "/image/face.png"
    }
});
Mock.mock(RegExp(/\/userLogin.*/), 'get', function (options) {
    let path = options.url;
    let query = url.parse(path, true).query;
    let result = { effectRows: 0 };
    if (query.id === admin && query.pwd === pwd) {
        result.effectRows = 1;
    }
    else {
        result.effectRows = 0;
    }
    return result;
});
Mock.mock("/getHome", 'post', () => {
    return {
        info: {
            url: "/image/b08baaf5f2db228cf97ce3c5906d169f_121_121.png",
            name: "御金汇公司",
            detail: "公司负责东南亚市场, 分管黑马证券、传智证券",
            list: [
                { num: 3, info: "下属公司" },
                { num: 12, info: "系统操作员" },
            ],
        },
        daiban: {
            icon: "el-icon-document-checked",
            title: "待办信息",
            list: [
                {
                    title: "客户管理",
                    item: [
                        { num: 3, info: "销户待办" },
                        { num: 12, info: "转组待办" },
                    ],
                },
                {
                    title: "系统用户管理",
                    item: [
                        { num: 3, info: "密码重置待办" },
                        { num: 12, info: "待办名称" },
                    ],
                },
            ],
        },
        prolist: {
            icon: "el-icon-coin",
            title: "订单统计列表",
        },
        adinfo: {
            icon: "el-icon-document-copy",
            title: "公司运营报表",
        },
        message: {
            icon: "el-icon-chat-round",
            title: "消息/通知",
            list: [
                {
                    msg: "成交通知",
                    time: "2019-10-01",
                },
                {
                    msg: "用户注册通知",
                    time: "2019-10-01",
                },
                {
                    msg: "产品下架通知",
                    time: "2019-10-01",
                },
            ],
        },
        sysmsg: {
            icon: "el-icon-set-up",
            title: "系统公告",
            list: [
                {
                    msg: "机构调整公告",
                },
                {
                    msg: "系统升级公告",
                },
                {
                    msg: "日志更新公告",
                },
            ],
        },
        syshelp: {
            icon: "el-icon-cpu",
            title: "系统帮助",
            list: [
                {
                    msg: "帮助手册v3.0",
                },
                {
                    msg: "帮助手册v2.0",
                },
                {
                    msg: "帮助手册v1.0",
                },
            ],
        },
    }
});
Mock.mock("/getmenu", 'post', function (options) {
    return [
        {
            name: "首页",
            icon: "el-icon-price-tag",
            action: "/admin"
        },
        {
            name: "机构权限管理",
            icon: "el-icon-office-building",
            child: [
                { name: "机构菜单管理", action: "/office-1" },
                { name: "机构角色管理", action: "/office-2" }
            ]
        },
        {
            name: "系统操作员用户管理",
            icon: "el-icon-user",
            action: "/user-1"
        },
        {
            name: "产品管理",
            icon: "el-icon-copy-document",
            child: [
                { name: "产品分类管理", action: "/copy-1" },
                { name: "产品列表", action: "/copy-2" }
            ]
        },
        {
            name: "公司管理",
            icon: "el-icon-folder",
            action: "/folder-1"
        },
        {
            name: "客户管理",
            icon: "el-icon-coordinate",
            child: [
                { name: "投资客户账号管理", action: "/coordinate-1" },
                { name: "客户账号列表", action: "/coordinate-2" },
                { name: "客户组列表", action: "/coordinate-3" }
            ]
        },
        {
            name: "客户消息中心",
            icon: "el-icon-chat-dot-square",
            child: [
                { name: "客户消息模板配置", action: "/square-1" },
                { name: "客户消息列表", action: "/square-2" }
            ]
        },
        {
            name: "交易管理",
            icon: "el-icon-connection",
            child: [
                { name: "订单列表", action: "/connection-1" },
                { name: "成交记录列表", action: "/connection-2" },
                { name: "仓位列表", action: "/connection-3" }
            ]
        }
    ]
});

