<template>
  <div id="Index">
    <div class="main-left-title">
      <v-menu></v-menu>
    </div>
    <div class="main-right-content">
      <v-header></v-header>
      <!-- 所有的系统子路由都显示在这个位置 -->
      <div class="main-content">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Index",
  components: {
    "v-header": () => import("../components/Header"),
    "v-menu": () => import("../components/LeftMenu"),
  },
  data() {
    return {
      showWidth: false,
    };
  },
};
</script>
<style lang="less">
#Index {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .main-left-title {
    overflow: hidden;
  }
  .main-right-content {
    flex: 1;
    .main-content {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 0 10px 50px;
      background-color: #f5f3f3;
      overflow-y: scroll;
      overflow-x: hidden;
      box-sizing: border-box;
    }
  }
}
.fade-enter-active {
  transition: all 0.3s 0.3s ease-in;
}
.fade-leave-active {
  transform: translateX(50px);
  transition: all 0.3s ease-in;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>