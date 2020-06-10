import Totast from './Totast';

export default {
  install(Vue){  //执行完 Vue.use() 后会回调  install函数
    const totastCoustrustor = Vue.extend(Totast);   //创建 Totast 的组件构造器 totastCoustrustor

    const totast = new totastCoustrustor();   //使用  totastCoustrustor组件构造器，创建 totast 组件

    totast.$mount(document.createElement('div'));   //将totast 组件挂载在  div元素上

    document.body.appendChild(totast.$el);    //将totast组件的  元素 写在网页上

    Vue.prototype.$totast = totast;   //为$totast 属性 赋值
  }
};
