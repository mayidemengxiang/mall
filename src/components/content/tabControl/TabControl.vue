<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item" :class="{active:index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tab-control",
    props:{
      titles:{
        type:Array,
        default(){
          return [];
        }
      }
    },
    data(){
      return {
        currentIndex:0
      };
    },
    methods:{
      itemClick(index){
        this.currentIndex = index;
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 44px;
    line-height: 44px;
    background-color: #ffffff;
  }
  .tab-control-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span{
    padding: 5px;
    border-bottom: solid 3px var(--color-tint);
  }
</style>
