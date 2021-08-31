<template>
  <div id="newInsert">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <ul>
        <li>
          <el-form-item label="菜单编号" prop="menuid">
            <el-input v-model="ruleForm.menuid"></el-input>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="菜单名称" prop="menuname">
            <el-input v-model="ruleForm.menuname"></el-input>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="机构类型" prop="menutype">
            <el-select v-model="ruleForm.menutype" placeholder="请选择类型">
              <el-option label="运营中心" value="运营中心"></el-option>
              <el-option
                label="顶层公司/集团"
                value="顶层公司/集团"
              ></el-option>
              <el-option label="交易商" value="交易商"></el-option>
            </el-select>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="菜单Url" prop="menuurl">
            <el-input v-model="ruleForm.menuurl"></el-input>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="菜单等级" prop="menuleavel">
            <el-select v-model="ruleForm.menuleavel" placeholder="请选择等级">
              <el-option label="一级菜单" value="一级菜单"></el-option>
              <el-option label="二级菜单" value="二级菜单"></el-option>
              <el-option label="三级菜单" value="三级菜单"></el-option>
            </el-select>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="父级菜单" prop="menuparent">
            <el-select v-model="ruleForm.menuparent" placeholder="请选择类型">
              <el-option label="运营中心" value="运营中心"></el-option>
              <el-option
                label="顶层公司/集团"
                value="顶层公司/集团"
              ></el-option>
              <el-option label="交易商" value="交易商"></el-option>
            </el-select>
          </el-form-item>
        </li>
      </ul>
      <div class="btnlist">
        <el-button @click="resetForm('ruleForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm', type)"
          >确定</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "newInsert",
  props: {
    formdata: Object,
    type: String,
  },
  data() {
    return {
      ruleForm: {
        id: "",
        menuid: "",
        menuname: "",
        menutype: "",
        menuurl: "",
        menuleavel: "",
        menuparent: "",
      },
      rules: {
        menuid: [
          { required: true, message: "请输入菜单编号", trigger: "blur" },
        ],
        menuname: [
          { required: true, message: "请输入菜单编号", trigger: "blur" },
        ],
        menutype: [
          { required: true, message: "请选择机构类型", trigger: "blur" },
        ],
        menuurl: [
          { required: true, message: "请输入菜单Url", trigger: "blur" },
        ],
        menuleavel: [
          { required: true, message: "请选择菜单等级", trigger: "blur" },
        ],
        menuparent: [
          { required: true, message: "请选择父菜单", trigger: "blur" },
        ],
      },
      allData: [], //所有的数据
    };
  },
  mounted() {
    let formData = this.$props.formdata;
    if (formData) {
      this.ruleForm = {
        id: formData.id,
        menuid: formData.menuid,
        menuname: formData.menuname,
        menutype: formData.menutype,
        menuurl: formData.menuurl,
        menuleavel: formData.menulevel,
        menuparent: formData.menuparentname,
      };
    }
    //获取所有所有数据
    this.allData = this.$store.state.allData;
  },

  methods: {
    submitForm(formName, type) {
      if (type == "insert") {
        let obj = {
          id: this.allData.length + 1,
          menuid: this.ruleForm.menuid,
          menulevel: this.ruleForm.menuleavel,
          menuname: this.ruleForm.menuname,
          menuparentid: "",
          menuparentname: this.ruleForm.menuparent,
          menutype: this.ruleForm.menutype,
          menuurl: this.ruleForm.menuurl,
        };
        //添加的方法
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.allData.push(obj);
            this.$message({
              message: "恭喜! 增加成功！",
              type: "success",
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        //修改对应的obj
        let menuData=this.$store.state.menuData;
        this.allData.map((item, index) => {
          if (item.id === this.ruleForm.id) {
            item.menuid = this.ruleForm.menuid;
            item.menulevel = this.ruleForm.menuleavel;
            item.menuname = this.ruleForm.menuname;
            item.menuparentname = this.ruleForm.menuparent;
            item.menutype = this.ruleForm.menutype;
            item.menuurl = this.ruleForm.menuurl;

            menuData[index]==item;
            this.$store.state.menuData=menuData;
            this.$message({
              message: "恭喜! 修改成功！",
              type: "success",
            });

            this.$emitter.emit("updatenewData");
          }
        });
      }
      this.$store.commit("updateAll", this.allData);
      this.$store.state.show = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less">
#newInsert {
  padding: 15px;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    li {
      width: 50%;
      list-style: none;
      font-weight: 700;
    }
  }
  .btnlist {
    text-align: center;
  }
}
</style>