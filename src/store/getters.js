export default {
  getCartList(state){
    return state.cartList;
  },
  cartListLength(state,getters){
    return getters.getCartList.length;
  },
  checkedGoodsLength(state,getters){
    return getters.getCartList.filter(item => item.isChecked ===true).length;
  },
  isSelectedAll(state,getters){
    return state.cartList.length !== 0 ? getters.checkedGoodsLength === getters.cartListLength : false;
  },
  checkedTotalPrice(state,getters){
    return getters.getCartList.filter(item => item.isChecked ===true).reduce((preValue,item)=>{
      return preValue + item.count * item.realPrice;
    },0);
  }
};
