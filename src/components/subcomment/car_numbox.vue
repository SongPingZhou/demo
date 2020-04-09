<template>
   <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='maxnum' style="height:25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChange" ref="numbox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
import mui from '../../../libs/mui/js/mui.min.js';
export default {
    data(){
        return{
            maxnum:100
        }
    },
    mounted(){
        mui(".mui-numbox").numbox(); 
        console.log(this.initcount);
    },
    methods:{
        countChange(){ //数量改变时
        //    console.log(this.$refs.numbox.value)
        this.$store.commit("updateGoodsInfo",{id:this.goodsid,count:this.$refs.numbox.value})
        }
    },
    props:['initcount','goodsid']
}
</script>
<style scoped>

</style>