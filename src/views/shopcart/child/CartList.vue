<template>
  <div class="cart-list">
    <scroll class="conent" ref="scroll">
      <cart-list-item v-for="(item,index) in getCartList" :key="index" :itemInfo="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem';

  import { mapGetters } from 'vuex';

  export default {
    name: "cart-list",
    computed:{
      ...mapGetters(['getCartList','CartListLength'])
    },
    components:{
      Scroll,
      CartListItem
    },
    activated() {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .cart-list {
    /*height: calc(100vh - 93px);*/
  }
  .conent {
    /*height: 100%;*/
    height: calc(100vh - 93px - 44px);
    overflow: hidden;
  }
</style>
