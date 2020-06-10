<template>
  <div id="detail">
    <detail-navbar ref="navbar" class="detail-nav" @titleClick="titleClick"></detail-navbar>
    <scroll class="conent" ref="scroll" :probeType="3" @scroll="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!--<detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>-->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
      <detail-commont-info ref="commont" :comment-info="commentInfo"></detail-commont-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <!--<totast></totast>-->
  </div>
</template>

<script>
  import DetailNavbar from './children/DetailNavbar';
  import DetailSwiper from './children/DetailSwiper';
  import DetailBaseInfo from './children/DetailBaseInfo';
  import DetailShopInfo from './children/DetailShopInfo';
  import DetailGoodsInfo from './children/DetailGoodsInfo';
  import DetailParamInfo from './children/DetailParamInfo';
  import DetailCommontInfo from './children/DetailCommontInfo';
  import GoodsList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll';
  import DetailBottomBar from './children/DetailBottomBar';

  import {getDetail,getRecommmend,Goods,Shop,GoodsParam} from "network/detail";

  // import Totast from 'components/common/totast/Totast';

  export default {
    name: "detail",
    data(){
      return {
        iid:null,
        topImages:[],    //顶部轮播图
        goods:{},        //商品信息
        shop:{},          //店铺信息
        detailInfo:{},   //下拉详情信息
        paramInfo:{},    //商品参数信息
        commentInfo:{},  //评论信息
        recommends:[],    //推荐信息
        offsetTops:[0],     //偏移位置信息函数
        getOffsetTops:null    //获取偏移信息的函数
      };
    },
    methods:{
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.offsetTops[index],300);
      },
      scroll(position){
        if(-position.y < this.offsetTops[1]){
          this.$refs.navbar.currentIndex = 0;
        }else if(-position.y >= this.offsetTops[1] && -position.y < this.offsetTops[2]){
          this.$refs.navbar.currentIndex = 1;
        }else if(-position.y >= this.offsetTops[2] && -position.y < this.offsetTops[3]){
          this.$refs.navbar.currentIndex = 2;
        }else if(-position.y >= this.offsetTops[2]){
          this.$refs.navbar.currentIndex = 3;
        }
      },
      addCart(){
        const goods = {};
        goods.iid = this.iid;
        goods.image = this.topImages[0];
        goods.title = this.goods.title;
        goods.desc = this.goods.desc;
        goods.price = this.goods.newPrice;
        goods.realPrice = this.goods.realPrice;
        this.$store.dispatch('addToCart',goods).then(res=>{
          this.$totast.show(res,2000);
        });
      },
      imageLoad(){
        this.$refs.scroll.refresh();
        this.getOffsetTops();
      },
      // imgLoad(){
      //   this.$refs.scroll.refresh();
      // },
      debounce(func,delay){
        let timmer;
        return (...args)=>{
          clearTimeout(timmer);
          timmer = setTimeout(()=>{
            func.apply(this,args);
          },delay);
        }
      }
    },
    components:{
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommontInfo,
      GoodsList,
      DetailBottomBar,
      Scroll
      // Totast
    },
    created(){
      this.iid = this.$route.params.iid;
      //获得详情信息
      Promise.all([
        getDetail(this.iid),
        getRecommmend()
      ]).then(result=>{
        const data = result[0].result;
        this.topImages = data.itemInfo.topImages;   //顶部轮播图
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);  //商品信息
        this.shop = new Shop(data.shopInfo);     //店铺信息
        this.detailInfo = data.detailInfo;     //下拉详情信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);   //商品参数信息
        this.commentInfo = data.rate.cRate > 0 ? data.rate.list[0] : {};   //评论信息

        this.recommends =  result[1].data.list;   //获得推荐信息
        //获取偏移信息，进行点击导航跳转.并进行防抖
        this.getOffsetTops = this.debounce(()=>{
          this.offsetTops.push(this.$refs.params.$el.offsetTop);
          this.offsetTops.push(this.$refs.commont.$el.offsetTop);
          this.offsetTops.push(this.$refs.recommend.$el.offsetTop);
        },100);
      });

      // getDetail(this.iid).then(res=>{
      //   const data = res.result;
      //   this.topImages = data.itemInfo.topImages;   //顶部轮播图
      //   this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);  //商品信息
      //   this.shop = new Shop(data.shopInfo);     //店铺信息
      //   this.detailInfo = data.detailInfo;     //下拉详情信息
      //   this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);   //商品参数信息
      //   this.commentInfo = data.rate.cRate > 0 ? data.rate.list[0] : {};   //评论信息
      // });
      // getRecommmend().then(res=>{
      //   this.recommends = res.data.list;   //获得推荐信息
      // });
    },
    mounted(){
      if(this.$route.name === 'detail'){
        const refresh = this.debounce(this.$refs.scroll.refresh,200);
        this.$bus.$on('itemImageLoad',()=>{
          refresh();
        });
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 11;
    background-color: #ffffff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .conent {
    height: calc(100% - 93px);
    overflow: hidden;
  }
</style>
