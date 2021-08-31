<template>
<div id="alerttitle">
    <i :class="icon"></i>
    <span>{{title}}</span>
    <span class="close el-icon-close" @click="hidealert"></span>
</div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    name:"alerttitle",
    props:{
       icon:{
           type:String,
           default:"el-icon-office-building"
       } ,
       title:{
           type:String,
           default:"新增菜单"
       }
    },
    methods:{
        ...mapMutations(["changeShow"]),
        hidealert(){
            //修改vuex中的show
            //this.changeShow(false);
            this.$store.state.show=false;
        }
    }
}
</script>
<style lang="less">
#alerttitle{
    padding: 15px;
    position: relative;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d1cece;
    i{
        display: inline-block;
        color: #0084ff;
        font-size: 20px;
        margin-right: 5px;
    }
    span{
        display: inline-block;
        font-weight: 600;
    }
    .close{
        position: absolute;
        right: 15px;
    }
    
}
</style>