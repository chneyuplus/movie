<template>
  <div id="office-1">
    <div class="offheader">
      <v-comform
        v-slot="{ item }"
        list="menuid,menuname,menulevel,menutype"
        @search="getData"
      >
        <label>菜单编号</label
        ><el-input v-model="item.value0" placeholder="请输入内容"></el-input>
        <label>菜单名称</label
        ><el-input v-model="item.value1" placeholder="请输入内容"></el-input>
        <label>菜单等级</label>
        <el-select v-model="item.value2" clearable placeholder="请选择">
          <el-option
            v-for="item in level"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <label>机构类型</label>
        <el-select v-model="item.value3" clearable placeholder="请选择">
          <el-option
            v-for="item in type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </v-comform>
    </div>
    <div class="offcontent">
      <v-dataTable :totle="totle" :currentPage="nowPage">
        <template #btnlist>
          <el-button
            type="primary"
            @click="showAlert('el-icon-office-building', '新增菜单','insert')"
            icon="el-icon-circle-plus"
            >新增菜单</el-button
          >
        </template>
        <template #table>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="id" label="序号" width="120">
            </el-table-column>
            <el-table-column prop="menuid" label="菜单编号" width="120">
            </el-table-column>
            <el-table-column prop="menuname" label="菜单名称" width="120">
            </el-table-column>
            <el-table-column prop="menutype" label="机构类型" width="120">
            </el-table-column>
            <el-table-column prop="menuurl" label="菜单路径" width="120">
            </el-table-column>
            <el-table-column prop="menulevel" label="菜单等级" width="120">
            </el-table-column>
            <el-table-column prop="menuparentid" label="父菜单编号" width="120">
            </el-table-column>
            <el-table-column
              prop="menuparentname"
              label="父菜单名称"
              width="120"
            >
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <a class="cao_btn">删除</a>
                <a
                  class="cao_btn"
                  @click="
                    showAlert('el-icon-document-add', '修改菜单','update', scope.row)
                  "
                  >修改</a>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </v-dataTable>
    </div>
    <keep-alive>
      <component
        v-if="showStore"
        :icon="title.icon"
        :title="title.txt"
        :is="active"
      >
        <v-insertform  :formdata="fdata" :type="caotype"></v-insertform>
      </component>
    </keep-alive>
  </div>
</template>
<script>
import axios from "@/axios/axios.js";
import { mapMutations, mapGetters } from "vuex";
let alert = () => import("@/components/SmallComponents/msgalert.vue");
export default {
  name: "office-1",
  components: {
    "v-comform": () => import("@/components/SmallComponents/commonForm.vue"),
    "v-dataTable": () => import("@/components/SmallComponents/DataTable.vue"),
    "v-alert": alert,
    "v-insertform": () => import("@/components/SmallComponents/newInsert.vue")
  },
  data() {
    return {
      level: [
        {
          value: "一级菜单",
          label: "一级菜单",
        },
        {
          value: "二级菜单",
          label: "二级菜单",
        },
        {
          value: "三级菜单",
          label: "三级菜单",
        },
      ],
      type: [
        {
          value: "运营中心",
          label: "运营中心",
        },
        {
          value: "顶层公司/集团",
          label: "顶层公司/集团",
        },
        {
          value: "交易商",
          label: "交易商",
        },
      ],
      tableData: [],
      nowPage: 1,
      pageNum: 10,
      active: "v-alert",
      title: {
        icon: "",
        txt: "",
      },
      fdata:null,
      caotype:''
    };
  },
  mounted() {
    //https://www.maodou.com/findPage?now=1&num=10;
    this.getPageNowData();

    this.$emitter.on("updatenewData", ()=>{
      console.log("wo geng xin");
      this.getPageNowData();
    })
  },
  computed: {
    ...mapGetters({
      showStore: "getShow",
      totle: "getTotle",
    }),
  },
  methods: {
    ...mapMutations(["updatemenuData", "changeShow", "updatetotle"]),
    showAlert(icon, txt,type,row) {
      this.caotype=type;
      //如果row存在  获取值  
      if(row)
      {
          //进行修改
          this.fdata=row;
          console.log(this.fdata);
      }
      this.title = {
        icon,
        txt,
      };
      //修改vuex  中的show
      this.changeShow(true);
    },
    getData(args) {
      //数据分页返回1
      this.nowPage=1;
      //搜索 如果上面的四个文本框都没有值    相当查找所有的数据
      //优质才是过滤
      let obj = {};
      let ishas = false;
      for (let key in args) {
        if (!args[key].length) {
          continue;
        }
        obj[key] = args[key];
        ishas = true;
      }
      if (!ishas) {
        //获取所有数据分页的方法
        this.updatemenuData(this.$store.state.allData);
        this.getPageNowData();
      } else {
        axios.sendPost("/findDatamsg", obj).then((result) => {
          this.updatemenuData(result.data.pageData);
          this.getPageNowData();
        });
      }
    },
    getPageNowData() {
      let src = "/getnowPage";
      axios
        .sendGet(src, { num: this.pageNum, now: this.nowPage })
        .then((result) => {
          //返回当前页的数据
          this.tableData = result.data.pageData;
          this.updatetotle(result.data.totle);
        });
    },
    handleSelectionChange() {},
  },
};
</script>
<style lang="less">
#office-1 {
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
  .offcontent {
    padding: 15px;
  }
}
.cao_btn {
  color: #249ef0;
  font-size: 13px;
  display: block;
  text-align: center;
}
</style>