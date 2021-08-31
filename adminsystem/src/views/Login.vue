<template>
  <div id="Login">
    <div class="login_item">
      <div class="login_item-limg">
        <img src="/image/login_bg_1.dfe3d5ed.png" alt="" />
      </div>
      <div class="login_item-timg">
        <img src="/image/login_bg_0.100e2602.png" alt="" />
      </div>
      <div class="form-item">
        <v-form></v-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  components: {
    "v-form": () => import("../components/Form"),
  },
  mounted() {
    window.onkeypress = this.handle;
  },
  methods: {
    handle(e) {
      if (e.keyCode == 13) {
        this.$emitter.emit("userlogin");
      }
    },
  },
};
</script>
<style lang="less">
@width: 1260px;
@height: 620px;

#Login {
  width: 100%;
  height: 100%;
  background-image: url("/image/login_background.aac5fe6d.png");
  background-size: cover;
  .login_item {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -@width / 2;
    margin-top: -@height / 2;
    width: @width;
    height: @height;
    box-shadow: 0 0 50px #27265c;
    border-radius: 10px;
    background-color: #fff;
    .login_item-timg {
      position: absolute;
      right: 0;
      top: 0;
      width: @width / 9;
      img {
        width: @width / 9;
      }
    }
    .login_item-limg {
      position: absolute;
      left: 0;
      bottom: 0;
      width: @width / 2;
      height: @height;
      img {
        position: absolute;
        left: 0;
        bottom: 0;
        width: @width / 2;
      }
    }
    .form-item {
      position: absolute;
      width: @width / 3;
      right: @width / 10;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>