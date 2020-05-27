<template>
  <div id="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommends :recommends="recommends"></home-recommends>
    <feature-view></feature-view>
    <tab-contorl class="tab-control" :titles="['流行','新款','精选']"></tab-contorl>

    <ul>
      <li v-for="(item,index) in a">{{index+1}}</li>
    </ul>
  </div>
</template>

<script>
  import Navbar from 'components/common/navbar/Navbar';
  import HomeSwiper from 'views/home/childrenCom/HomeSwiper';
  import HomeRecommends from 'views/home/childrenCom/HomeRecommends'
  import FeatureView from 'views/home/childrenCom/FeatureView'
  import TabContorl from 'components/content/tabControl/TabControl';

  import {getHomeMultidata} from "network/home";


  export default {
    name: "home",
    data(){
      return {
        a:new Array(100),

        banners:[],
        recommends:[],
        goods:{
          pop:{page:0,list:[]},
          new:{page:0,list:[]},
          sell:{page:0,list:[]}
        }
      };
    },
    components:{
      Navbar,
      HomeSwiper,
      HomeRecommends,
      FeatureView,
      TabContorl
    },
    created(){
      getHomeMultidata().then(res => {;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        }
      )
    }
  }
</script>

<style scoped>
  #home {
    margin-top: 44px;
    margin-bottom: 100px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 10;
  }
  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>
