<template>
<div id="msgalert" @click.self="hidealert">
    <div id="pos-alert">
        <v-title :icon="icon" :title="title"></v-title>
        <div class="form">
            <slot></slot>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name:"msgalert",
    components:{
        'v-title':()=>import("./alertTitle"),
    },
    props:{
        icon:String,
        title:String
    },
    methods:{
        hidealert(){
            this.$store.state.show=false;
        }
    }
}
</script>
<style lang="less">
#msgalert{
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.459);
    #pos-alert{
        position: relative;
        margin: 0 auto;
        top: 50%;
        transform: translatey(-50%);
        width: 700px;
        padding-bottom: 15px;
        background-color: #fff;
        border-radius: 15px;
    }
}
</style>