<template>
  <form>
    <div id="commonForm">
      <div>
        <slot :item="item"></slot>
      </div>
      <div>
        <el-button type="primary" @click="searchData">搜索</el-button>
        <el-button type="danger" native-type="reset">重置</el-button>
      </div>
    </div>
  </form>
</template>
<script>
import { Input, Select, Option, Button } from "element-ui";
export default {
  name: "commonForm",
  components: {
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Button.name]: Button,
  },
  props:["list"],
  data() {
    return {
      item: {
        value0: "",
        value1: "",
        value2: "",
        value3: "",
      },
    };
  },
  methods: {
    searchData() {
      let obj={};
      let list=this.$props.list.split(",");
      list.forEach((item,index) => {
        obj[item]=this.item['value'+index];
      });
      this.$emit("search",obj);
    },
  },
};
</script>
<style lang="less">
#commonForm {
  display: flex;
  flex-direction: column;
  div {
    margin: 3px 0;
    display: flex;
    align-items: center;
    label {
      white-space: nowrap;
      margin: 0 10px;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
.el-select,
.el-input {
  width: 220px;
}
</style>