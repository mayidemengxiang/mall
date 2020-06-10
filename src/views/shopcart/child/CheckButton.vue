<template>
    <div>
      <!--<div class="icon-selector" :class="{'selector-active': checked}" @click="selectItem">-->
      <div class="icon-selector" :class="{'selector-active': isChecked}">
        <img src="~/assets/img/cart/tick.svg" alt="">
      </div>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
		  isChecked: {
		    type: Boolean,
        default: true
      }
    }
	}
	// export default {
	// 	name: "CheckButton",
   //  props: {
	// 	  value: {
	// 	    type: Boolean,
   //      default: true
   //    }
   //  },
   //  data: function () {
	// 	  return {
	// 	    checked: this.value
   //    }
   //  },
   //  methods: {
   //    selectItem: function () {
   //      this.$emit('checkBtnClick')
   //    }
   //  },
   //  watch: {
	// 	  value: function (newValue) {
   //      this.checked = newValue;
   //    }
   //  }
	// }
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 23px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }
  .icon-selector img {
    width: 18px;
    height: 18px;
  }

  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
