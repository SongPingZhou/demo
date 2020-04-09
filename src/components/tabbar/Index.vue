<template>
   <div>
       <!-- 轮播图 -->
        <swiper :lunbolist="lunbolist" :isfull="true"></swiper>

    <!-- 六宫格类别 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/Index/NewList">
                    <img src="../../assets/images/men1.jpg">
                    <div class="mui-media-body">新闻资讯</div></router-link>
                    </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/Index/PhotoList">
                    <img src="../../assets/images/men5.jpg">
                    <div class="mui-media-body">图片专区</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/Index/goodslist">
                  <img src="../../assets/images/men6.jpg">
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                   <img src="../../assets/images/men2.jpg">
                    <div class="mui-media-body">秒杀专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                  <img src="../../assets/images/men3.jpg">
                    <div class="mui-media-body">Chat</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                   <img src="../../assets/images/men4.jpg">
                    <div class="mui-media-body">留言反馈</div></a></li>
            
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../assets/images/men7.jpg">
                    <div class="mui-media-body">联系我们</div></a></li>
            
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../assets/images/men8.jpg">
                    <div class="mui-media-body">关于我们</div></a></li>
            
        </ul> 

   </div>
</template>

<script>

import  { Toast } from "mint-ui";

import swiper from '../../../src/components/subcomment/Swiper.vue'

export default {
    data(){
        return{
            lunbolist:[] //轮播列表    
        }
    },
    created(){
        this.getlunbo();//加载轮播图
    },
    methods:{
        getlunbo(){
          this.$http.get("lunbo/selectLunboAll").then(res=>{
                  if(res.status==200){
                          //如果没有失败则把数据赋值给 lunbolist 轮播列表
                        this.lunbolist=res.body;
                  }else{
                      Toast("获取轮播图失败！！")   
                  }
          })       
        }
    },
    components:{
        swiper
    }
}
</script>

<style scoped>

/* 设置首页的类别的背景颜色 */
.mui-grid-view.mui-grid-9{
     background-color: #fff;
     border: none;
}
/* 去除类别的边框 */
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: 0px;
}
/* 设置所有类别图标宽高 */
img{
    width: 60px;
    height: 60px;
}
/* 设置类别的字大小 */
.mui-media-body{
    font-size: 13px;
}
</style>