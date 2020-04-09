import Vue from 'vue'
import Router from 'vue-router'
import Car from '@/components/tabbar/Car'
import Home from '@/components/tabbar/Home'
import Index from '@/components/tabbar/Index'
import Member from '@/components/tabbar/Member'
import NewList from '@/components/news/NewList'
import NewInfo from '@/components/news/NewInfo'
import Register from '@/components/my/Register'
import PhotoList from '@/components/photo/PhotoList'
import PhotoInfo from '@/components/photo/Photoinfo'
import GoodsList from '@/components/goods/GoodsList'
import GoodsInfo from '@/components/goods/GoodsInfo'
import GoodsComment from '@/components/goods/GoodsComment'
import GoodsDesc from '@/components/goods/GoodsDesc'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
   
    {
      path: '/',
      redirect:'/Index'
    },{
      path: '/Car',
      name: 'Car',
      component: Car
    },{
      path: '/Home',
      name: 'Home',
      component: Home
    },{
      path: '/Index',
      name: 'Index',
      component: Index
    },{
      path: '/Member',
      name: 'Member',
      component: Member
    },{
      path: '/Index/NewList',
      name: 'NewList',
      component: NewList
    },{
      path: '/Index/NewInfo/:id',
      name: 'NewInfo',
      component: NewInfo
    },{
      path: '/Register',
      name: 'Register',
      component: Register
    },{
      path: '/Index/PhotoList',
      name: 'PhotoList',
      component: PhotoList
    },{
      path: '/Index/photoinfo/:id',
      name: 'PhotoInfo',
      component: PhotoInfo
    },{
      path: '/Index/goodslist',
      name: 'GoodsList',
      component: GoodsList
    },{
      path: '/Index/GoodsInfo/:id',
      name: 'GoodsInfo',
      component: GoodsInfo
    },{
      path: '/Index/GoodsComment/:id',
      name: 'GoodsComment',
      component: GoodsComment
    },{
      path: '/Index/GoodsDesc/:id',
      name: 'GoodsDesc',
      component: GoodsDesc
    }


  ],
  linkActiveClass:'mui-active'
})
