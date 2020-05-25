<template>
  <tabbar>
    <tabbar-item ownPath="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg">
      <div slot="item-text">首页</div>
    </tabbar-item>
    <tabbar-item ownPath="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg">
      <div slot="item-text">分类</div>
    </tabbar-item>
    <tabbar-item ownPath="/shopcart">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg">
      <div slot="item-text">购物车</div>
    </tabbar-item>
    <tabbar-item ownPath="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg">
      <div slot="item-text">我的</div>
    </tabbar-item>
  </tabbar>
</template>

<script>
  import Tabbar from 'components/common/tabbar/Tabbar';
  import TabbarItem from 'components/common/tabbar/TabbarItem';
  export default {
    name: "main-tabbar",
    components:{
      Tabbar,
      TabbarItem
    }
  }
</script>

<style scoped>

</style>
