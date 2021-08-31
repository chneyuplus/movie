<template>
  <div class="data">
    <template v-for="(item, index) in list">
      <dl :key="index">
        <dt>{{ item.num }}</dt>
        <dd>{{ item.info }}</dd>
      </dl>
      <div v-if="index % 2 == 0" :key="index + item.num" class="line"></div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    list: Array,
  },
};
</script>
<style lang="less">
.data {
  color: #fff;
  padding: 0 28px;
  width: 100%;
  height: 88px;
  //   background-color: rgba(54, 139, 255, 0.5);
  display: flex;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  justify-content: center;
  dl {
    flex: 1;
    white-space: nowrap;
    dt {
      font-size: 28px;
    }
    dd {
      font-size: 14px;
    }
  }
  .line {
    width: 2px;
    height: 44px;
    background-color: #fff;
    margin: 0 28px;
    opacity: 0.39;
    border-radius: 2px;
  }
}
</style>