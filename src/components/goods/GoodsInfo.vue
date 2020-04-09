<template>
    <div class="goods-info">
        <!-- 点击加入购物车出现的小球 -->
        <transition 
         @before-enter="beforeEnter"
         @enter="enter" 
         @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball" ></div>
        </transition>
        

        <!-- 商品轮播图区域 -->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbolist="productImages" :isfull="false"></swiper>
					</div>
				</div>
			</div>

        <!-- 商品购买区域 -->
            <div class="mui-card">
				<div class="mui-card-header">{{productInfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价：<del>￥{{productInfo.sellprice}}</del>&nbsp;&nbsp;销售价：<span class="now_price"> ￥{{productInfo.marketprice}} </span>
                        </p>
                        <p>
                        <span v-for="item in colors" :key="item.id" @click="clickstock(item.colorcount)">
                            <input type="radio" name="radios" value="1" ><label>{{item.colorname}}</label>&nbsp;
                        </span>
                        </p>
                        <p>购买数量：<number @getcount="getselectedCount" :maxnum="stocks==0 ? productInfo.stock:stocks"></number></p>
                        
                        <p></p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToshopCar">加入购物车</mt-button>
                        </p>
					</div>
				</div>
			</div>

        <!-- 商品参数区域 -->

            <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{productInfo.number}}</p>
						<p>库存情况：{{ stocks==0 ? productInfo.stock:stocks }}件</p>
						<p>上架时间：{{productInfo.addtime}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="getGoodsDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="getGoodsComment(id)">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>

<script>

import swiper from '../../../src/components/subcomment/Swiper.vue'
import number from '../../../src/components/subcomment/goodsinfo_numbox.vue'
import {Toast} from "mint-ui";
export default {
    data(){
        return{
            id : this.$route.params.id,//路由中获取商品id
            productImages:[],//商品的所有配图
            productInfo:[],//获取商品详情
            colors:[],
            stocks:0, //库存数量
            ballFlag:false, //点加入购物车出现的小球 控股小球隐藏和显示的标识符
            selectedCount:1 //用户购买的数量 默认为1

        }
    },
    created(){
        this.getLunbo();//获取轮播图
        this.getProductInfo();//获取商品详情
        this.getColors();//获取颜色列表
        this.addClick();//加载完之后点击量+1
    },
    methods:{
        getLunbo(){
            this.$http.get("product/selectProductimageByPid/"+this.id).then(res=>{
                if(res.status==200){
                    res.body.forEach(item => {
                        item.wheelplantingimg=item.productimageurl;
                    });
                    this.productImages=res.body;
                }else{
                    Toast("获取轮播图失败");
                }
            })
        },
        getProductInfo(){
            this.$http.get("product/selectProductById/"+this.id).then(res=>{
                if(res.status==200){
                    this.productInfo=res.body;
                }else{
                    Toast("获取商品详情失败");
                }
            })
        },
        getColors(){//
            this.$http.get("product/selectColorSizeByPid/"+this.id).then(res=>{
                if(res.status==200){
                    this.colors=res.body;
                }else{
                    Toast("获取商品颜色列表失败");
                }
            })
        },
        clickstock(num){
            this.stocks=num;
        },
        getGoodsDesc(id){
            this.$router.push({name:'GoodsDesc',paramr:{id}})
            
        },
        getGoodsComment(id){
            this.$router.push({name:'GoodsComment',paramr:{id}})
           
        },
        addClick(){
            this.$http.get("product/addClick/"+this.id)
        },
        addToshopCar(){//添加到购物车
            this.ballFlag= !this.ballFlag;
            //  console.log("addToshopCar");
            //拼接出购物车的对象
            var goodsinfo={id:this.id,count:this.selectedCount,price:this.productInfo.sellprice,selected:true}
            this.$store.commit('addToCar',goodsinfo);//调用store中的mutations的方法
        },
        beforeEnter(el){
            el.style.transform='translate(0,0)'
            // console.log("beforeEnter");
        },
        enter(el, done){
             
            el.offsetWidth

            //获取小球的位置
            const ballPosition=this.$refs.ball.getBoundingClientRect();

            //获取徽标的位置
            const badgePosition=document.getElementById("badge").getBoundingClientRect();

            const xdist=badgePosition.left - ballPosition.left;
            const ydist=badgePosition.top - ballPosition.top;
        
            el.style.transform = `translate(${xdist}px,${ydist}px)`

            el.style.transition="all 0.5s cubic-bezier(.4,-0.3,1,.68)"
            
            // console.log("enter");
            done();
        },
        afterEnter(el){
            setTimeout(this.stop, 450);
            //  console.log("after");
        },
        getselectedCount(count){
            //当子组件把选中的 数量传递给父组件的时候 把选择的值保存到data上
            this.selectedCount=count;
            // console.log('父组件的值'+count)
        },
        stop(){
            this.ballFlag= !this.ballFlag;
        }
    },
    components:{
        swiper,number
    }
}
</script>
<style scoped>
.goods-info{
    background-color: #eee;
    overflow: hidden;
    
}
.now_price{
    color: red;
    font-size: 16px;
    font-weight: bold;
}
.mui-card-footer{
    display: block;
}
.mui-card-footer button{
    margin: 15px 0;
}
.goods-info .ball{
    width: 15px;
    height: 15px;
    border-radius:50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 440px;
    left: 146px;
    
    
}

</style>