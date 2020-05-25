import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

const routes =[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:()=>import('../views/home/Home.vue'),
    meta:{
      title:'首页'
    }
  },
  {
    path:'/category',
    component:()=>import('../views/category/Category.vue'),
    meta:{
      title:'分类'
    }
  },
  {
    path:'/shopcart',
    component:()=>import('../views/shopcart/Shopcart.vue'),
    meta:{
      title:'购物车'
    }
  },
  {
    path:'/profile',
    component:()=>import('../views/profile/Profile.vue'),
    meta:{
      title:'我的'
    }
  }
];

const router = new VueRouter({
  routes,
  mode:'history'
});
// router.beforeEach((to, from, next) => {
//   document.title= to.matched[0].meta.title;
//   next();
// })

router.afterEach((to, from) => {
  console.log(to);
  console.log(from);
   document.title= to.matched[0].meta.title;
})

export default router;
