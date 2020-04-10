<template>
    <div>
        <img src="../../assets/images/zhifu.png">
        <span><font>{{totalTime}}</font>秒钟后回到首页</span>
        <mt-button type="primary" id="btns" size="large" @click="goIndex">回到首页</mt-button>
    </div>
</template>
<script>
let clock
export default {
    data(){
        return{
             totalTime: 3
        }
    },
    created(){
         clock = window.setInterval(() => {
            this.totalTime--
             if (this.totalTime < 0) {     //当倒计时小于0时清除定时器
                window.clearInterval(clock)
                  this.$router.push({ path: '/'});
                }
            },1000)
    },
    methods:{
        goIndex(){
              window.clearInterval(clock)
              this.$router.push({ path: '/'});
        }
    }
}
</script>
<style scoped>
img{
    width: 100%;
}
span{
    font-size: 14px;
    color: green;
}
div{
 text-align: center;
}
</style>