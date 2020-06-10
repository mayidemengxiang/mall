<template>
  <div>
    <navbar class="nav-bar">
      <div slot="center">购物车({{cartListLength}})</div>
    </navbar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import Navbar from 'components/common/navbar/Navbar';
  import CartList from  './child/CartList';
  import CartBottomBar from './child/CartBottomBar';

  import { mapGetters } from 'vuex';   //引入vuex的getters的解构工具

  export default {
    name: "shopcart",
    computed:{
      ...mapGetters(['cartListLength'])      //将vuex的getters的cartListLength函数结构出来
    },
    components:{
      Navbar,
      CartList,
      CartBottomBar
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 500;
    color: #fff;
  }
</style>
