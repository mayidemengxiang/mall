<template>
  <div class="wrapper" ref="scroll">
    <div class="contend">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BtScroll from 'better-scroll';

  export default {
    name: "scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        btScroll:null
      };
    },
    methods:{
      scrollTo(x,y,time=500){
        this.btScroll && this.btScroll.scrollTo(x,y,time);
      },
      finishPullUp(){
        this.btScroll.finishPullUp();
      },
      refresh(){
        this.btScroll && this.btScroll.refresh();
      }
    },
    mounted(){
      this.btScroll = new BtScroll(this.$refs.scroll,{
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,
        click:true
      });

      //probeType为2或者3时启动监听scroll事件
      if(this.probeType === 2 || this.probeType === 3){
        this.btScroll.on('scroll',position=>{
          this.$emit('scroll',position);
        });
      }

      //当pullUpLoad为true时才监听上拉加载更多
      if(this.pullUpLoad){
        this.btScroll.on('pullingUp',()=>{
          this.$emit('pullingUp');
        });
      }

    }
  }
</script>

<style scoped>
  .wrapper {

  }

  .contend {

  }
</style>
