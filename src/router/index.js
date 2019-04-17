import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const router = new Router({
  routes:[
    {
      path:'/',component:()=>import('../pages/home')
    },
    {
      path:'/cat',component:()=>import('../pages/cat')
    },
    {
      path:'/shopMall',component:()=>import('../pages/shopMall/shopMall'),
      redirect:'/shopMall/food',
      children:[
        {
          path:'thing',component:()=>import('../pages/shopMall/thing')
        },
        {
          path:'food',component:()=>import('../pages/shopMall/food')
        },
        {
          path:'clothes',component:()=>import('../pages/shopMall/clothes')
        }
      ]
    },
    {
      path:'/adopt',component:()=>import('../pages/adopt')
    },
    {
      path:'/encyclopedia',component:()=>import('../pages/encyclopedia')
    },
    {
      path:'/goodsDetail',component:()=>import('../pages/goodsDetail')
    },
    {
      path:'/shopCar',component:()=>import('../pages/shopCar'),meta:{ requireAuth:true }
    },
    {
      path:'/orderForm',component:()=>import('../pages/orderForm/orderForm'),meta:{ requireAuth:true }
    },
    {
      path:'/search',component:()=>import('../pages/search')
    },
    {
      path:'/login',component:()=>import('../pages/login')
    },
    {
      path:'/myInfomation',component:()=>import('../pages/selfCenter/myInfomation'),meta:{ requireAuth:true }
    },
    {
      path:'/myOrder',component:()=>import('../pages/selfCenter/myOrder'),meta:{ requireAuth:true }
    },
    {
      path:'/myEvaluate',component:()=>import('../pages/selfCenter/myEvaluate'),meta:{ requireAuth:true }
    },
    {
      path:'/myAdopt',component:()=>import('../pages/selfCenter/myAdopt'),meta:{ requireAuth:true }
    },
    {
      path:'/logistics',component:()=>import('../pages/selfCenter/logistics'),meta:{ requireAuth:true }
    },
    {
      path:"/evaluate",component:()=>import('../pages/selfCenter/evaluate'),meta:{ requireAuth:true }
    }
  ]
});

router.beforeEach((to,from,next)=>{
  const token=localStorage.getItem('name') ;
  if(to.meta.requireAuth){
    if(token){
      next()
    }else{
      next({path:'/login'})
    }
  }else{
    next()
  }
});
export default router;
