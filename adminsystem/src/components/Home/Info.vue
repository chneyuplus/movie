<template>
  <div id="info">
    <div class="logo">
      <img :src="url" alt="" />
    </div>
    <div class="mes">
      <h3>{{ name }}</h3>
      <h5>{{ detail }}</h5>
    </div>
    <div class="msgdata">
      <v-dl :list="list"></v-dl>
    </div>
  </div>
</template>
<script>
export default {
  name: "info",
  components:{
    "v-dl":()=>import("./Dl.vue")
  },
  props: {
    url: String,
    name: String,
    detail: String,
    list: Array,
  },
};
</script>
<style lang="less">
#info {
  position: relative;
  margin-top: 10px;
  width: 100%;
  border-radius: 6px;
  height: 118px;
  padding: 0 27px;
  background-image: url("/image/company_bg.d0846830.png");
  background-size: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  .logo {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .mes {
    margin-left: 10px;
    color: #fff;
    h5 {
      margin-top: 5px;
    }
  }
  .msgdata{
    position: absolute;
    right: 27px;
  }
  
}
</style>