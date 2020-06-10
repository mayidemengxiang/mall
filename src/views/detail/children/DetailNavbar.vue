<template>
  <div>
    <navbar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg">
      </div>
      <div class="title" slot="center">
        <div class="title-item" :class="{active:currentIndex ===index}" @click="itemClick(index)" v-for="(item,index) in titles">{{item}}</div>
      </div>
    </navbar>
  </div>
</template>

<script>
  import Navbar from 'components/common/navbar/Navbar';

  export default {
    name: "detail-navbar",
    data(){
      return {
        currentIndex:0,
        titles:['商品','参数','评论','推荐']
      };
    },
    components:{
      Navbar
    },
    methods:{
      itemClick(index){
        this.currentIndex = index;
        this.$emit('titleClick',index);
      },
      backClick(){
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .back img {
    margin-top: 12px;
  }
</style>
