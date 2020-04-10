// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/iconfont/iconfont.css'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import '../libs/mui/css/mui.min.css'

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import { Header ,Swipe, SwipeItem,Tabbar, TabItem,Field,Button,Lazyload} from 'mint-ui'

import MintUI from'mint-ui'
Vue.use(MintUI);
import 'mint-ui/lib/style.css'
import Mint from'mint-ui'
import'mint-ui/lib/style.css'

Vue.use(Mint);


import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root="http://127.0.0.1:8001/move"



Vue.http.options.emulateJSON = true;//设置全局的post提交为applaction/x-ww-form-rulencoded

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.use(Lazyload);

Vue.use(ElementUI);
Vue.config.productionTip = false


import Vuex from 'vuex'

Vue.use(Vuex)
var car=JSON.parse(localStorage.getItem('car') || '[]');
var uid =JSON.parse(localStorage.getItem('uid')|| null);
var store =new Vuex.Store({
  state:{
    car:car,//将购物车中的数据用一个数组 存储起来，在car数组中存储一些商品的对象 例如：{id:商品id,count:购买数量,price:商品单价,selected:是否选中状态}
    uid:uid
  },
  mutations:{
    addToCar(state,goodsinfo){//点击加入购物车保存到vuex的car上
      //判断购物车是否以及存在。如果存在只更新数量
      var flag=false;//假设没找到
      state.car.some(item=>{
        if(item.id==goodsinfo.id){ 
          item.count+=parseInt(goodsinfo.count)
          flag=true;
          return true
        }
      })
      //如果最后循环完毕后还是没有找到商品直接push
      if(!flag){
        state.car.push(goodsinfo)
      }


      //当更新car数组狗存储到本地的localStorage中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsInfo(state,goodsinfo){
      //修改购物车中的商品的数量值
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count=parseInt(goodsinfo.count)
          return true
        }
      })
      //修改完之后把商品的数量更新到本地存储中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeCar(state,id){
    //根据id删除购物车的数据
      state.car.some((item,i)=>{
        if(item.id==id){
          state.car.splice(i,1);
          return true
        }
      })

      //删除之后保存到最新的购物车数据
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id==info.id){
          item.selected=info.selected
        }
      })

      localStorage.setItem('car',JSON.stringify(state.car))
    },
    setuid(state,userid){
      localStorage.setItem('uid',userid);//把获取的uid存到本地
     
    }
  },
  getters:{
    getAllCount(state){
      var c=0;
      state.car.forEach(item=>{
        c+=item.count
      })
      return c;
    },
    getGoodsCount(state){
      var o={};
      state.car.forEach(item=>{
        o[item.id]=item.count
      })
      return o;
    },
    getGoodsSelected(state){
      var o={}
      state.car.forEach(item=>{
        o[item.id]=item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state){
      var o={
        count:0, //勾选的数量
        amount:0 //勾选的 总量
      }


      state.car.forEach(item=>{
        if(item.selected){
          o.count+=item.count
          o.amount+=item.price * item.count
        }
      })

      return o
    }
  }
})
/* eslint-disable no-new */
new Vue({ 
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
