<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image"/>
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "home-recommends",
    props:{
      recommends:{
        type:Array,
        default(){
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 15px;
    padding: 10px 10px 20px;
    border-bottom: #eee solid 10px;
  }
  .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    width: 90%;
    margin-bottom: 8px;
  }
</style>
