const mutations ={
  //修改购物车内已有商品的数量
  addCounter(state,payload){
  payload.count ++;
},
  //将新商品添加到购物车
  addCart(state,payload){
    payload.isChecked = true;
    state.cartList.push(payload);
},
  checkGoods(state,payload){
    let goods = state.cartList.find(item => item.iid === payload)
    if(goods){
      goods.isChecked = !goods.isChecked;
    }
  },
  selectedAllClick(state){
    const cartList = state.cartList;
    const checkedLength= cartList.filter(item => item.isChecked === true).length;
    const allLength = cartList.length;
    if(checkedLength == allLength){
      cartList.forEach(item => item.isChecked = false);
    }
    else {
      cartList.forEach(item => item.isChecked = true)
    }
  }
};

export default mutations;
