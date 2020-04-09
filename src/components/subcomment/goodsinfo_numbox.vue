<template>
   <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='maxnum'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
import mui from '../../../libs/mui/js/mui.min.js';
export default {
    mounted(){
        mui(".mui-numbox").numbox();
        console.log(this.maxnum);
    },
    methods:{
        countChange(){ //购买数量改变时
            // console.log(this.$refs.numbox.value);
            this.$emit('getcount',parseInt(this.$refs.numbox.value));
        }
    },
    props:['maxnum'],
    watch:{
        maxnum:function(newVal,oldVal){
            mui(".mui-numbox").numbox().setOption('max',newVal);
        }
    }
}
</script>
<style scoped>

</style>