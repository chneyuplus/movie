<template>
  <div id="daiban">
    <div class="box" v-for="(it, index) in item" :key="index">
      <div class="box-title">
        <span>{{ it.title }}</span>
      </div>
      <v-dl :list="it.item"></v-dl>
    </div>
  </div>
</template>
<script>
export default {
  name: "daiban",
  props: {
    item: Array,
  },
  components: {
    "v-dl": () => import("./Dl.vue"),
  },
};
</script>
<style lang="less">
#daiban {
  border-radius: 6px;
  display: flex;
  .box:first-child {
    background-image: url("/image/bg_1.6cc399e5.png");
    margin-right: 10px;
  }
  .box:last-child {
    background-image: url("/image/bg_0.f1493f69.png");
  }
  .box {
    position: relative;
    flex: 1;
    height: 142px;
    border-radius: 12px;
    background-size: cover;
    color: #fff;
    .box-title {
      line-height: 40px;
      font-size: 13px;
      span {
        margin-left: 15px;
      }
    }
  }
}
</style>