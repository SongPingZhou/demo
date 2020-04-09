<template>
    <div class="goods-list">
        <router-link class="goods-item" v-for="item in productlist" :key="item.id" 
        :to="'/Index/GoodsInfo/'+item.id" tag="div">
            <img :src="item.imgurl" alt="">
            <h1 class="title">
                {{item.title}}
            </h1>
            <div class="info">
                <p class="p">
                    <span class="now">
                        ￥{{item.sellprice}}
                    </span>
                    <span class="old">
                        ￥{{item.marketprice}}
                    </span>
                </p>
                <p class="sell">
                    <span> 热卖中</span>
                    <span> 剩{{item.stock}}件</span>
                </p>
            </div>
        </router-link>

       <mt-button type="danger" size="large" plain @click="getMove" id="btn">加载更多</mt-button>
    </div>
</template>
<script>

import {Toast} from "mint-ui";
export default {
    data(){
        return{
            productlist:[], //商品列表
            pageindex:1
        }
    },
    created(){
        this.getProductListAll()
    },
    methods:{
        getProductListAll(){
            this.$http.get("product/selectProductAll/"+this.pageindex).then(res=>{
                if(res.status==200){
                    this.productlist=this.productlist.concat(res.body);
                     
                }else{
                    Toast("获取商品列表失败")
                }
            })
        },
        getMove(){
            this.pageindex++;
            this.getProductListAll();
        }
    }
}
</script>
<style scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
}
.goods-list .goods-item{
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
}
.goods-list .goods-item img{
    width: 100%;
}
.goods-list .goods-item .title{
    font-size: 14px;
    
}
.goods-list .goods-item .info{
    background-color: #eee;
}
.goods-list .goods-item .info p{
    margin: 0;
    padding: 5px;
}
/* .goods-list .goods-item .info .price{
    
} */
.goods-list .goods-item .info .sell{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}
.goods-list .goods-item .info .now{
    color: red;
    font-weight: bold;
    font-size: 16px;
}
.goods-list .goods-item .info  .old{
    text-decoration: line-through;
    font-size: 12px;
    margin-left: 10px;
}
</style>