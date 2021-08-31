<template>
  <div id="Header-Title">
    <span class="iconfont icon-btn" @click="sendMsg">&#xe623;</span>
    <div class="user-item">
      <span class="user-img">
        <template v-if="src">
          <img :src="src" />
        </template>
        <template>
          <i class="iconfont">&#xe60c;</i>
        </template>
      </span>
      <span>欢迎您，{{ name }}</span>
      <span class="line"></span>
      <span @click="btnClose" class="close"
        ><i class="iconfont">&#xe600;</i><span>退出</span></span
      >
    </div>
  </div>
</template>
<script>
import Cookies from "../cookies/cookies";
import { mapGetters } from "vuex";
export default {
  name: "Header-Title",
  data() {
    return {
      show: false,
      name: "",
      src: "",
    };
  },
  mounted() {
    this.name = this.getUserInfo.name;
    this.src = this.getUserInfo.face;
    console.log(this.src);
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    sendMsg() {
      //发送消息  菜单是否折叠
      this.show = !this.show;
      this.$emitter.emit("sendmsg", this.show);
    },
    btnClose() {
      //先清除登录状态  直接修改当前cookies无效
      Cookies.setCookies("_login=false", 0, "/");
      //直接到登录界面
      this.$router.replace({ path: "/Login" });
    },
  },
};
</script>
<style lang="less">
#Header-Title {
  height: 60px;
  background: url("/image/navbar_bg_1.137fb7f1.png") left top;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .icon-btn {
    font-size: 22px;
    color: #fff;
    padding: 0 15px;
  }
  .user-item {
    width: 350px;
    color: #fff;
    span {
      display: inline-block;
      font-size: 16px;
      margin-right: 10px;
      color: #dfd9d9;
      vertical-align: middle;
    }
    .close {
      i,
      span {
        vertical-align: middle;
      }
      i {
        font-size: 22px;
        margin-right: 5px;
      }
    }
    .line {
      width: 2px;
      height: 20px;
      background: #dfd9d9;
      margin: 0 20px;
    }
    .user-img {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #fff;
      color: #6dd7f1;
      line-height: 26px;
      text-align: center;
      overflow: hidden;
      img {
        width: 26px;
        height: 26px;
      }
      i {
        font-size: 20px;
      }
    }
  }
}
</style>