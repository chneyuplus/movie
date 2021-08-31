<template>
<div id="templatePro">
    <div class="tem-icon">
        <i :class="icon"></i>
        <span>{{title}}</span>
    </div>
    <slot></slot>
</div>
</template>
<script>
export default {
    name:"templatePro",
    props:{
        icon:String,
        title:String
    }
}
</script>
<style lang="less">
#templatePro{
    background-color: #fff;
    padding: 5px 15px;
    border-radius: 6px;
    margin-top: 10px;
    .tem-icon{
        margin: 10px 0;
        font-size: 13px;
        i{
            color: #37b1f8;
            margin-right: 5px;
        }
    }
}
</style>