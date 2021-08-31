<template>
  <div id="Menu-List">
    <div class="logo">
      <img src="/image/logo.45bbb710.png" alt="" />

      <transition name="hide">
        <h1 v-if="!isCollapse">证券后台系统</h1>
      </transition>
    </div>
    <div class="scrollbar">
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#4667d8"
        text-color="#fff"
        active-text-color="rgb(115, 249, 210)"
        :unique-opened="unique"
        :router="router"
      >
        <template v-for="(item, index) in MenuData">
          <el-submenu
            v-if="item.child"
            :key="index"
            :index="`${index}`"
            :class="ckindex == index ? 'add-active' : ''"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(it, id) in item.child"
                :key="id"
                :index="`${index}-${id}`"
                @click="addClass(index)"
                :route="it.action"
              >
                {{ it.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item
            :class="ckindex == index ? 'add-active' : ''"
            @click="addClass(index)"
            v-else
            :key="index"
            :index="`${index}`"
            :route="item.action"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script>
import { Menu, MenuItem } from "element-ui";
import Axios from "../axios/axios";
export default {
  name: "Menu-List",
  components: {
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
  },
  data() {
    return {
      router:true,
      isCollapse: false,
      MenuData: null,
      ckindex: 0,
      unique: true,
    };
  },
  created() {
    //获取当前menu的信息
    Axios.postUrl("/getmenu")
      .then((res) => {
        this.MenuData = res.data;
      })
      .catch((err) => {});
  },
  mounted() {
    //挂载完成监听
    this.$emitter.on("sendmsg", (args) => {
      this.isCollapse = args;
    });
  },
  methods: {
    addClass(index) {
      this.ckindex = index;
    },
  },
};
</script>
<style lang="less">
.hide-enter-active {
  width: 0;
  transition: all 0.5s ease-in;
}
.hide-leave-active {
  width: 114px;
  transition: all 0.5s ease-in;
}
.hide-enter-from,
.hide-leave-to {
  opacity: 0;
  width: 0;
}
.el-submenu .el-menu-item {
  min-width: 195px;
}
.el-menu-item-group__title {
  padding: 0 !important;
}
.el-menu-item i,
.el-submenu__title i {
  color: #fff !important;
}
.el-menu {
  border-right: none;
}
.add-active {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 56px;
    border-left: 2px solid #73f9d2;
  }
  color: #73f9d2;
  i,
  span {
    color: #73f9d2 !important;
  }
}
#Menu-List {
  height: 100%;
  .scrollbar {
    background: #4667d8;
    height: 100%;
  }
  .logo {
    height: 60px;
    background: url("/image/navbar_bg.2b61542e.png") no-repeat;
    background-position: top center;
    background-size: cover;
    text-align: center;
    line-height: 60px;
    img {
      width: 40px;
      margin-right: 12px;
      vertical-align: middle;
    }
    h1 {
      display: inline-block;
      font-size: 19px;
      color: #fff;
      line-height: 50px;
      vertical-align: middle;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>