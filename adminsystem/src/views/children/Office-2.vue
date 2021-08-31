<template>
  <div id="office-2">
    <div class="offheader">
      <v-comform v-slot="{ item }">
        <label>角色名称</label
        ><el-input v-model="item.value1" placeholder="请输入内容"></el-input>
        <label>机构类型</label>
        <el-select v-model="item.value2" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </v-comform>
    </div>
    <div class="offcontent"></div>
  </div>
</template>
<script>
export default {
  name: "office-1",
  components: {
    "v-comform": () => import("@/components/SmallComponents/commonForm.vue"),
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },
};
</script>
<style lang="less">
#office-2 {
  display: flex;
  flex-direction: column;
  .offheader {
    padding: 22px 26px;
  }
  .offheader,
  .offcontent {
    background-color: #fff;
    margin-top: 10px;
    border-radius: 6px;
  }
}
</style>