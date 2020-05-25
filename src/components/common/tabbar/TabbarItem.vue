<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-show="!isActive"><slot name="item-icon"></slot></div>
    <div v-show="isActive"><slot name="item-icon-active"></slot></div>
    <div :style="currentColor"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "tabbar-item",
    props:{
      ownPath:{
        type:String,
        required:true
      },
      fontActiveColor:{
        type:String,
        default:'red'
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.ownPath) !=-1;
      },
      currentColor(){
        return this.isActive ? {color:this.fontActiveColor} : {};
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.ownPath).catch(err=>{});
      }
    }
  }
</script>

<style scoped>
  .tabbar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tabbar-item img{
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>
