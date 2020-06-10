<template>
  <div class="totast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "totast",
    data(){
      return {
        message:'',
        isShow:false
      };
    },
    methods:{
      show(message='默认文字',delay =1500){
        this.isShow = true;
        this.message = message;
        this.hidden(delay);
      },
      hidden(delay){
        setTimeout(()=>{
          this.isShow = false;
          this.message = '';
        },delay);
      }
    }
  }
</script>

<style scoped>
  .totast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 5px 10px;
    white-space: nowrap;
    color: white;
    background-color: rgba(0,0,0,0.75);
    z-index: 999;
  }
</style>
