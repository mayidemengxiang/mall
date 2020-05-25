<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "tabbar"
  }
</script>

<style scoped>
  #tabbar{
    display: flex;
    background-color: #e9e9e9;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
