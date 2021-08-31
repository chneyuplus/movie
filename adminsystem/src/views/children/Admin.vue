<template>
  <div id="PageIndex">
    <div class="main-left">
      <!-- 公司简单信息组件 -->
      <v-info
        :url="gurl"
        :name="gname"
        :detail="gdetail"
        :list="glist"
      ></v-info>
      <v-template :icon="dicon" :title="dtitle">
        <v-daiban :item="dlist"></v-daiban>
      </v-template>
      <div class="echarts">
        <div class="echarts-1">
          <v-template :icon="picon" :title="ptitle">
            <v-echartcopy></v-echartcopy>
          </v-template>
        </div>
        <div class="echarts-2">
          <v-template :icon="picon" :title="ptitle">
            <v-echartline></v-echartline>
          </v-template>
        </div>
      </div>
    </div>
    <div class="main-right">
      <div class="mainright-top">
        <v-template :icon="micon" :title="mtitle">
          <div class="msglist">
            <ul v-for="(item, index) in mlist" :key="index">
              <li class="msg-list">
                <div>{{ item.msg }}</div>
                <span>{{ item.time }}</span>
              </li>
            </ul>
          </div>
        </v-template>
      </div>
      <div class="mainright-bottom">
        <div class="mainright-t">
          <v-template :icon="sicon" :title="stitle">
            <div class="msglist">
              <ul v-for="(item, index) in slist" :key="index">
                <li class="msg-list">
                  <div>{{ item.msg }}</div>
                  <span>{{ item.time }}</span>
                </li>
              </ul>
            </div>
          </v-template>
        </div>
        <div class="mainright-b">
          <v-template :icon="shicon" :title="shtitle">
            <div class="msglist">
              <ul v-for="(item, index) in shlist" :key="index">
                <li class="msg-list">
                  <div>{{ item.msg }}</div>
                  <span>{{ item.time }}</span>
                </li>
              </ul>
            </div>
          </v-template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/axios/axios.js";
export default {
  name: "PageIndex",
  components: {
    "v-info": () => import("@/components/Home/Info.vue"),
    "v-template": () => import("@/components/Home/Template.vue"),
    "v-daiban": () => import("@/components/Home/Daiban.vue"),
    "v-echartcopy": () => import("@/components/Home/Echartsleft.vue"),
    "v-echartline": () => import("@/components/Home/Echartsright.vue"),
  },
  data() {
    return {
      gurl: "",
      gname: "",
      gdetail: "",
      glist: [],
      dicon: "",
      dtitle: "",
      dlist: [],
      picon: "",
      ptitle: "",
      micon: "",
      mtitle: "",
      mlist: "",
      sicon: "",
      stitle: "",
      slist: "",
      shicon: "",
      shtitle: "",
      shlist: "",
    };
  },
  mounted() {
    //挂载完成之后请求数据
    axios.postUrl("/getHome").then((res) => {
      let data = res.data;
      this.gurl = data.info.url;
      this.gname = data.info.name;
      this.gdetail = data.info.detail;
      this.glist = data.info.list;
      this.dicon = data.daiban.icon;
      this.dtitle = data.daiban.title;
      this.dlist = data.daiban.list;
      this.picon = data.prolist.icon;
      this.ptitle = data.prolist.title;
      this.micon = data.message.icon;
      this.mtitle = data.message.title;
      this.mlist = data.message.list;
      this.sicon = data.sysmsg.icon;
      this.stitle = data.sysmsg.title;
      this.slist = data.sysmsg.list;
      this.shicon = data.syshelp.icon;
      this.shtitle = data.syshelp.title;
      this.shlist = data.syshelp.list;
    });
  },
};
</script>
<style lang="less">
#PageIndex {
  height: 100%;
  display: flex;
  .main-left {
    width: 80%;
    .echarts {
      display: flex;
      height: 338px;
      overflow: hidden;
      .echarts-1 {
        flex: 1;
        margin-right: 10px;
      }
      .echarts-2 {
        flex: 1;
      }
    }
  }
  .main-right {
    width: 20%;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    .mainright-top {
      .msglist {
        height: 270px;
        overflow: hidden;
      }
    }
    .mainright-bottom {
      height: 330px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      .mainright-t {
        flex: 1;
        background-color: #fff;
      }
      .mainright-b {
        flex: 1;
        background-color: #fff;
      }
    }
  }
}
.msg-list {
  margin: 0 0 10px;
  padding-left: 15px;
  position: relative;
  line-height: 15px;
  list-style: none;
  &::after {
    content: "·";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #2998f3;
    font-weight: bold;
    font-size: 20px;
  }
  div {
    font-size: 13px;
    color: #2998f3;
  }
  span {
    font-size: 11px;
    color: #9c9c9e;
  }
}
</style>