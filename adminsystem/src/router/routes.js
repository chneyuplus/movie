//配置路由节点
//引入组件模块
//使用异步加载
const Index = () => import("../views/Index");
const Login = () => import("../views/Login");


//引入cookies文件
import Cookies from '@/cookies/cookies.js'
import Axios from '@/axios/axios.js';
import Base64 from "base-64";
//引入store
import Store from '@/store/index.js';
const routes = [
    {
        path: '/',
        name: "Index",
        component: Index,
        redirect: '/admin',
        beforeEnter: (to, from, next) => {
            if (from.name == "Login") {
                let cookie = Cookies.getCookies();
                if (cookie["admin"]) {
                    let user = JSON.parse(Base64.decode(cookie.admin));
                    Axios.sendPost("/getUser", user).then((result) => {
                        Store.commit("updateUser",result.data);
                        next();
                        //Store.dispatch('updateUserInfo',result.data);
                    });
                }
            }
            else{
                next();
            }
        },
        children: [
            {
                path: "admin",
                name: "admin",
                component: () => import("@/views/children/Admin.vue")
            },
            {
                path: "office-1",
                name: "office1",
                component: () => import("@/views/children/Office-1.vue")
            },
            {
                path: "office-2",
                name: "office2",
                component: () => import("@/views/children/Office-2.vue")
            },
            {
                path: "user-1",
                name: "user1",
                component: () => import("@/views/children/User-1.vue")
            },
            {
                path: "copy-1",
                name: "copy1",
                component: () => import("@/views/children/Copy-1.vue")
            },
            {
                path: "copy-2",
                name: "copy2",
                component: () => import("@/views/children/Copy-2.vue")
            },
            {
                path: "folder-1",
                name: "folder",
                component: () => import("@/views/children/Folder-1.vue")
            },
            {
                path: "coordinate-1",
                name: "coordinate1",
                component: () => import("@/views/children/Coordinate-1.vue")
            },
            {
                path: "coordinate-2",
                name: "coordinate2",
                component: () => import("@/views/children/Coordinate-2.vue")
            },
            {
                path: "coordinate-3",
                name: "coordinate3",
                component: () => import("@/views/children/Coordinate-3.vue")
            },
            {
                path: "square-1",
                name: "square1",
                component: () => import("@/views/children/Square-1.vue")
            },
            {
                path: "square-2",
                name: "square2",
                component: () => import("@/views/children/Square-2.vue")
            },
            {
                path: "connection-1",
                name: "connection1",
                component: () => import("@/views/children/Connection-1.vue")
            },
            {
                path: "connection-2",
                name: "connection2",
                component: () => import("@/views/children/Connection-2.vue")
            },
            {
                path: "connection-3",
                name: "connection3",
                component: () => import("@/views/children/Connection-3.vue")
            }
        ]
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    }
]
export default routes;