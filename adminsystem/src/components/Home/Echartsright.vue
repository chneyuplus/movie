<template>
  <div id="echartsRight">
    <div class="cktime">
      <span class="ck-info">数据类型:</span>
      <el-select v-model="region" placeholder="请选择">
        <el-option label="平台盈利" value="zy"></el-option>
      </el-select>
    </div>
    <div class="canvas" ref="main" style="width: 440px; height: 250px"></div>
  </div>
</template>
<script>
import { Select } from "element-ui";
import * as echarts from "echarts";
export default {
  components: {
    [Select.name]: Select,
  },
  data() {
    return {
      region: null,
      main: null,
      echart: null,
      result:{
          date:["2020年1月", "2020年2月", "2020年3月", "2020年4月", "2020年5月", "2020年6月"],
          value:[120, 200, 150, 80, 70, 110]
      }
    };
  },
  mounted() {
    this.main = this.$refs.main;
    this.echart = echarts.init(this.main);
    this.setOptions();
  },
  methods: {
    setOptions() {
      let option = {
        tooltip: {},
        xAxis: {
          type: "category",
          data:this.result.date,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.result.value,
            type: "bar",
            barWidth: "21%",
            itemStyle: {
              borderRadius: [50, 50, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
          },
        ],
      };
      option && this.echart.setOption(option);
    },
  },
};
</script>
<style>
</style>