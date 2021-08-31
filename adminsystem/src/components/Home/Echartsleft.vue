<template>
  <div id="echartsLeft">
    <div class="cktime">
      <span class="ck-info"> 开始:</span>
      <el-date-picker v-model="startTime" type="date" placeholder="选择日期">
      </el-date-picker>
      <span class="ck-info"> 结束:</span>
      <el-date-picker
        v-model="endTime"
        @change="timeend"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
    </div>
    <div class="canvas" ref="main" style="width: 440px; height: 250px"></div>
  </div>
</template>
<script>
import { DatePicker } from "element-ui";
import * as echarts from "echarts";
import axios from "@/axios/axios.js";
export default {
  components: {
    [DatePicker.name]: DatePicker,
  },
  data() {
    return {
      startTime: "",
      endTime: "",
      main: null,
      echart: null,
      result: [
        { value: 1048, name: "完成成交" },
        { value: 735, name: "部分成交" },
        { value: 580, name: "撤单" },
        { value: 484, name: "待成交" },
      ],
    };
  },
  mounted() {
    this.main = this.$refs.main;
    this.echart = echarts.init(this.main);
    this.setOptions();
  },
  methods: {
    timeend() {
      if (this.startTime) {
        console.log(this.startTime, this.endtime);
        this.getData();
      } else {
        this.$message({
          message: "警告!，请选择开始日期",
          type: "warning",
        });
      }
    },
    getData() {
      axios
        .sendPost("/getdatemsg", { stime: this.startTime, etime: this.endtime })
        .then((result) => {
          this.result = result.data;
          this.setOptions();
        });
    },
    setOptions() {
      let option = {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            labelLine: {
              show: true,
            },
            data: this.result,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && this.echart.setOption(option);
    },
  },
};
</script>
<style lang="less">
#echartsLeft {
  .cktime {
    line-height: 40px;
    font-size: 14px;
    white-space: nowrap;
    .ck-info:nth-child(2) {
      padding-left: 10px;
    }
    span.ck-info {
      padding-right: 10px;
    }
  }
  .canvas {
    margin-top: 10px;
  }
}
.el-date-editor.el-input {
  width: 140px;
}
</style>