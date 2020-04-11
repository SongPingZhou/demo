<template>
    <div>
        <div class="mui-content">
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner ">
                        <p class="titless">
                            <span>收货人：a</span>
                            <span>联系电话： 13837805243</span>
                        </p>
						
					</div>
				</div>
			</div>
			<div class="mui-card">
				<div class="mui-card-header" style="color:red"><strong>自提点：河南省开封市兰考县堌阳镇</strong></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p>河南省开封市兰考县堌阳镇宋营村</p>
                        <p>物流电话：<font style="color:red">13837805243</font></p>
                    </div>
				</div>
			</div>



			<div>
               <ul class="mui-card mui-table-view">
                    <li class="mui-table-view-cell mui-media" v-for="item in OrdergoodsList" :key="item.id">
                        <a href="javascript:;">
                            <img class="mui-media-object mui-pull-left" :src="item.imgurl">
                            <div class="mui-media-body">
                                {{item.name}}
                                <p class='mui-ellipsis'>
                                    <span>
                                        <font style="color:red"  >￥{{item.price}}</font>
                                        <!-- <del>￥{{item.price}}</del> -->
                                    </span>
                                    <span>x{{item.count}}</span>
                                </p>
                            </div>
                        </a>
                    </li>

                </ul>
            </div>


             <div class="mui-card">
				<div class="mui-card-header" >
                    
                    <span>
                        <p>总计<font>{{ this.$store.getters.getGoodsCountAndAmount.count }}</font>件商品</p>
                    </span>
                    <span>
                        <p>应付金额：<font style="color:red">￥<strong>{{ this.$store.getters.getGoodsCountAndAmount.amount }}</strong></font></p>
                    </span>
                </div>
			</div>

             <div class="mui-card">
				<div class="mui-card-header" >
                    
                    <span>
                         合计 <strong><font style="color:red"  >￥{{ this.$store.getters.getGoodsCountAndAmount.amount }}</font></strong>
                    </span>
                    <span>
                        <button type="button" @click="tijiaoOrder" class="mui-btn mui-btn-danger">
                            提交订单
                        </button>
                    </span>
                </div>
			</div>
            <div class="dibu">
                <p>
                 &nbsp;&nbsp;1.如果您购买的商品有任何质量问题，请直接与购买的门店进行联系！门店将为您处理，让您售后无忧！
                </p>
                <p>
                    &nbsp;&nbsp;2.如果您找不到购物的提货门店，请致电Mr商城帮忙热线！4008229997
                </p>
            </div>
            
		</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            OrdergoodsList:[]
        }
    },
    created(){
         //获取全局的store中所有商品的id
            var list=[];
            this.$store.state.car.forEach(item=>{
                if(item.selected){
                  
                    list.push(item);
                }
            })
            this.OrdergoodsList=list
            
    },
    methods:{
        tijiaoOrder(){
            this.OrdergoodsList.forEach(item=>{
                this.$store.commit("removeCar",item.id);
            })
            
            this.$router.push({ path: '/Zhifu'});
        }
    }
}
</script>
<style scoped>
.titless p{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.mui-ellipsis{
    display: flex;
    justify-content: space-between;
}
.dibu p{
    margin-left: 6px;
}
</style>