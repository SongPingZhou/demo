<template>
    <div class="goods-container">
        <!-- 商品列表区域 -->
        <div class="goods-list"> 
            <div class="mui-card"  v-for="(item,i) in goodsList" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch 
                        v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.imgurl">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sellprice}}</span>
                                    <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="#" @click.passive="remove(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
				</div>
			</div>
        </div>

<!-- 结算区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计（不含运费）：</p>
                            <p>已勾选商品 <span class="red"> {{ this.$store.getters.getGoodsCountAndAmount.count }}</span> 件 ，
                            总价 ￥<span class="red">  {{ this.$store.getters.getGoodsCountAndAmount.amount }}</span>元</p>
                        </div>
                         <mt-button type="danger">去结算</mt-button>
					</div>
                   
				</div>
			</div>
    </div>

</template>

<script>
import numbox from'../../components/subcomment/car_numbox.vue'
export default {
    data(){
        return{
            goodsList:[]
        }
    },
    created(){
        this.getCarList() 
    },
    methods:{
        getCarList(){//显示购物车的全部数据
            //获取全局的store中所有商品的id
            var idArr=[];
            this.$store.state.car.forEach(item=>{
                idArr.push(item.id);
            })
            if(idArr.length<=0){
                return;
            }
            this.$http.get("product/selectProduct/"+idArr.join(",")).then(res=>{
                if(res.status==200){
                    this.goodsList=res.body;
                }
            })

        },
        remove(id,index){
            //点击删除把商品从store删除，同时删除goodsList中的数据 根据下标删除的
            this.goodsList.splice(index,1);
            this.$store.commit("removeCar",id);
        },
        selectedChange(id,val){
            //每当点击开关把最新的开关状态同步到store中
            this.$store.commit('updateGoodsSelected',{id,selected:val});
        }
    },
    components:{
        numbox
    }
}
</script>

<style scoped>

.goods-container{
    background-color: #eee;
    overflow: hidden;
}
.goods-list img{
    width: 60px;
    height: 60px;
}
.goods-list h1{
    font-size: 13px;
}
.goods-list .info .price{
    color: red;
    font-weight: bold;
}
.mui-card-content-inner{
    display: flex;
    align-items: center;
}
.goods-list .info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.jiesuan{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.red{
    color: red;
    font-weight: bold;
    font-size: 16px;
}
</style>