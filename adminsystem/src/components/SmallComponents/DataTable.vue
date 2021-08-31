<template>
  <div id="datatable">
    <div>
      <slot name="btnlist"></slot>
    </div>
    <div>
      <slot name="table"></slot>
    </div>
    <div class="page-item">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totle"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "@/axios/axios.js";
export default {
  name: "datatable",
  props:['totle','currentPage'],
  data() {
    return {
      pageNum: 10,
      nowpage:1
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageNum = val;
    },
    handleCurrentChange(val) {
      this.nowpage = val;
      let src = "/getnowPage";
      axios
        .sendGet(src, { num: this.pageNum, now: this.nowpage })
        .then((result) => {
          //返回当前页的数据
          this.$parent.tableData = result.data.pageData;
        });
    },
  },
};
</script>
<style lang="less">
.page-item {
  margin: 10px 0;
}
</style>
