<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="imgLoaded">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper';
  export default {
    name: "home-swiper",
    data(){
      return {
        isImgLoaded:false
      };
    },
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      banners:{
        type:Array,
        default(){
          return [];
        }
      }
    },
    methods:{
      imgLoaded(){
        if(!this.isImgLoaded){
          this.$emit('swiperImgLoaded');
          this.isImgLoaded = true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
