const actions ={
  addToCart(context,payload){

    return new Promise((resolve,reject)=>{
      let oldgoods = context.state.cartList.find(item => payload.iid === item.iid);
      if(oldgoods){
        context.commit('addCounter',oldgoods);
        resolve('商品数量加1');
      }else {
        payload.count = 1;
        context.commit('addCart',payload);
        resolve('商品添加购物车成功');
      }
    });

  }
};

export default actions;
