<template>
  <div id="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <tab-control ref="tabControl1" v-show="isTabControl" class="fixed" :titles="['流行','新款','精选']" :class="{fixed:isTabControl}" @tabControlClick="tabControlClick"></tab-control>
    <scroll class="content" ref="scroll" :pullUpLoad="true" :probeType="3" @pullingUp="LoadMore" @scroll="contentScroll">
      <home-swiper :banners="banners" @swiperImgLoaded="swiperImgLoaded"></home-swiper>
      <home-recommends :recommends="recommends"></home-recommends>
      <feature-view></feature-view>
      <tab-control ref="tabControl2" :titles="['流行','新款','精选']" @tabControlClick="tabControlClick"></tab-control>
      <!--<tab-control ref="tabControl" :titles="['流行','新款','精选']" :class="{'fixed':isTabControl}" @tabControlClick="tabControlClick"></tab-control>-->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <div>
      <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    </div>
  </div>
</template>

<script>
  import Navbar from 'components/common/navbar/Navbar';
  import HomeSwiper from 'views/home/childrenCom/HomeSwiper';
  import HomeRecommends from 'views/home/childrenCom/HomeRecommends'
  import FeatureView from 'views/home/childrenCom/FeatureView'
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll';
  import BackTop from 'components/content/backTop/BackTop';


  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from "common/utils";

  export default {
    name: "home",
    data(){
      return {
        currentType:'pop',      //当前商品类型
        isShowBackTop:false,   //是否显示回到顶部的按钮
        tabOffsetTop:0,        //tabControl组件的 偏移量
        isTabControl:false,   //tabcontrol是否吸顶
        saveY:{
          'pop':0,
          'new':0,
          'sell':0
        },               //离开时的Y的位置
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
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created(){
      //获取首页轮播图和推荐数据
      this.getMultidata();

      //获得首页分类的商品信息
      this.getGoods('pop');
      this.getGoods('new');
      this.getGoods('sell');
    },
    activated(){
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0,this.saveY[this.currentType],0);
    },
    // deactivated(){
    //   this.saveY[this.currentType] = this.$refs.scroll.getScrollY();
    // },
    mounted(){
      if(this.$route.name === 'home'){
        const refresh = debounce(this.$refs.scroll.refresh,100);
        this.$bus.$on('itemImageLoad',()=>{
          refresh();
        });
      }

    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    methods:{
      /*
      * 实例方法
      * */
      tabControlClick(index){
        //记录之前的商品类型的位置
        this.saveY[this.currentType] = this.$refs.scroll.getScrollY();
        //根据Index更改当前的商品类型
        switch (index) {
          case 0 :
            this.currentType = 'pop';
            break;
          case 1 :
            this.currentType = 'new';
            break;
          case 2 :
            this.currentType = 'sell';
        }
        this.$refs.scroll.scrollTo(0,this.saveY[this.currentType],0);
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backTop(){
        this.$refs.scroll.scrollTo(0,0,500);
      },
      contentScroll(position){
        this.isShowBackTop = -position.y >= 1000;

        this.isTabControl = (-position.y) >= this.tabOffsetTop;

        if(this.isTabControl === false && this.$route.name === 'home'){
          this.saveY.pop = this.$refs.scroll.getScrollY()<= -this.tabOffsetTop ? -this.tabOffsetTop : this.$refs.scroll.getScrollY();
          this.saveY.new = this.$refs.scroll.getScrollY()<= -this.tabOffsetTop ? -this.tabOffsetTop : this.$refs.scroll.getScrollY();
          this.saveY.sell = this.$refs.scroll.getScrollY()<= -this.tabOffsetTop ? -this.tabOffsetTop : this.$refs.scroll.getScrollY();
        }else{
          this.saveY[this.currentType] = this.$refs.scroll.getScrollY();
        }
      },
      swiperImgLoaded(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      //上拉加载更多
      LoadMore(){
        this.getGoods(this.currentType);
      },
      /*
      * 网络请求方法
      * */
      getGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list); //解构请求过来的数组，并push到goods数组中
          this.goods[type].page ++ ;

          this.$refs.scroll.finishPullUp();
        })
      },
      getMultidata(){
        getHomeMultidata().then(res => {
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          }
        );
      }
    }
  }
</script>

<style scoped>
  #home {
    position: relative;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    z-index: 10;
  }

  /*.tab-control {*/
    /*position: sticky;*/
    /*top: 44px;*/
    /*z-index: 9;*/
  /*}*/
  .fixed {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
