<template>
  <div class="FormList">
    <div class="sys_name">
      <div class="logo">
        <img src="/image/logo.45bbb710.png" alt="" />
      </div>
      <h3 class="logo_name">证券后台系统</h3>
    </div>
    <div class="user_admin">
      <span class="iconfont">&#xe697;</span>
      <input type="text" v-model="admin" />
    </div>
    <div class="user_pwd">
      <span class="iconfont">&#xe615;</span>
      <input :type="type ? 'password' : 'text'" v-model="password" />
      <i
        class="iconfont"
        @click="changType"
        v-html="type ? '&#xe610;' : '&#xe6a0;'"
      ></i>
    </div>
    <div class="rember">
      <input v-model="userCheck" type="checkbox" /><span>记住我</span>
    </div>
    <div class="user_login">
      <el-button type="primary" :loading="ulogin" @click="userLogin"
        >登录</el-button
      >
    </div>
  </div>
</template>
<script>
import { Button } from "element-ui";
import Axios from "../axios/axios";
//引入cookiesjs
import Cookies from "../cookies/cookies";
import Base64 from "base-64";
export default {
  name: "FormList",
  data() {
    return {
      type: true,
      ulogin: false,
      admin: "",
      password: "",
      userCheck: false,
    };
  },
  components: {
    [Button.name]: Button,
  },
  mounted() {
    //读取相关信息（缓存）
    let cookie = Cookies.getCookies();
    if (cookie["admin"]) {
      let stradmin = JSON.parse(Base64.decode(cookie.admin));
      this.admin = stradmin.id;
      this.password = stradmin.pwd;
    }
    //多次发送 监听一次
    this.$emitter.once("userlogin", () => {
      this.userLogin();
    });
  },
  methods: {
    changType() {
      this.type = !this.type;
    },
    userLogin() {
      //用户点击登录
      this.ulogin = true;
      //验证两个值是否都存在
      if (this.ischeck) {
        //如果这里是true两个变量都有值
        try {
          let admin = { id: this.admin, pwd: this.password };
          Axios.sendGet("/userLogin", admin)
            .then((res) => {
              if (res.data.effectRows === 1) {
                //状态写入缓存
                Cookies.setCookies("_login=true", 1000 * 60 * 60 * 24, "/");
                if (this.userCheck) {
                  //用户的账号密码写入缓存
                  Cookies.setCookies(
                    `admin=${Base64.encode(JSON.stringify(admin))}`,
                    1000 * 60 * 60 * 24,
                    "/"
                  );
                }
                //跳转路由进入主界面
                // this.$router.push({path:'/'});
                //replace 替换当前的 history路由地址
                //作用是系统不能回退
                this.$router.replace({ path: "/" });
              } else {
                this.$message({
                  message: "警告!，账号或者密码错误！",
                  type: "warning",
                });
              }
              this.ulogin = false;
            })
            .catch((err) => {});
        } catch (e) {
          throw e;
        }
      } else {
        this.$message.error("请填写账号或者密码...");
      }
    },
  },
  computed: {
    ischeck() {
      let admin = this.admin.replace(/\s/g, "");
      let password = this.password.replace(/\s/g, "");
      return admin.length && password.length ? true : false;
    },
  },
};
</script>
<style lang="less">
.FormList {
  .user_admin,
  .user_pwd {
    position: relative;
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    color: #000;
    margin-bottom: 22px;
    padding-left: 40px;
    box-sizing: border-box;
    span {
      position: absolute;
      left: 10px;
      font-size: 25px;
      top: 50%;
      transform: translateY(-50%);
    }
    i {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 25px;
    }
    input {
      outline: none;
      border: none;
      height: 52px;
      width: 330px;
      font-size: 17px;
      padding-left: 10px;
    }
  }
  .rember {
    padding: 10px 0;
    font-size: 13px;
    input {
      position: relative;
      vertical-align: middle;
      margin-right: 3px;
      outline: none;
    }
    input:checked::after {
      content: "✔";
      font-size: 12px;
      color: #fff;
    }
    input::after {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      line-height: 12px;
      text-align: center;
      background-color: #3895eb;
      border: 1px solid hsl(187, 83%, 68%);
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .user_login {
    button {
      margin-bottom: 30px;
      color: #fff;
      border: none;
      border-radius: 5px;
      height: 52px;
      width: 420px;
      outline: none;
      background: -webkit-linear-gradient(left, #2e50e1, #6878f0);
    }
  }
  .sys_name {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    .logo {
      width: 75px;
      margin-right: 15px;
    }
    .logo_name {
      font-size: 33px;
      color: #356eea;
    }
  }
}
</style>