<template>
  <div class="goods">
      <goods-list-item v-for="goodsItem in goods" :goodsItem="goodsItem"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem';

  export default {
    name: "goods-list",
    props:{
      goods:{
        type:Array,
        default(){
          return [];
        }
      }
    },
    components:{
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>
