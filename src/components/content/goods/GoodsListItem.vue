<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "goods-list-item",
    methods:{
      imgLoad(){
        this.$bus.$emit('itemImageLoad');
      }
    },
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {};
        }
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    width: 48%;
    position: relative;
    padding-bottom: 40px;
  }
  .goods-item img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    text-align: center;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
  }
  .goods-info p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
