<template>
    <div>
         <!--页面标题栏开始-->
			<div class="mui-navbar-inner mui-bar mui-bar-nav">
				<img src="../../assets/images/IMG_7164.jpg">
                <h1 class="mui-center mui-title">{{useraccount}}</h1>
			</div>
			<!--页面标题栏结束-->
             <!--页面主内容区开始-->
        <div class="mui-page-content">
            <div class="mui-scroll-wrapper">
                <div class="mui-scroll">
                    <ul class="mui-table-view mui-table-view-chevron">
                        <li class="mui-table-view-cell">
                            <a id="rate" class="mui-navigate-right">评分鼓励</a>
                        </li>
                        <li class="mui-table-view-cell">
                            <a id="share" class="mui-navigate-right">分享推荐</a>
                        </li>
                        <li class="mui-table-view-cell">
                            <a id="tel" class="mui-navigate-right">客服电话</a>
                        </li>
                        <li class="mui-table-view-cell">
                            <a id="feedback-btn" href="#feedback" class="mui-navigate-right">问题反馈</a>
                        </li>
                    </ul>
                    <!-- <ul class="mui-table-view mui-table-view-chevron">
                        <li class="mui-table-view-cell">
                            <a href="#lock" class="mui-navigate-right">设置锁屏图案</a>
                        </li>
                    </ul> -->
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell" style="text-align: center;">
                            <a id='exit' @click="tuichu">退出当前账户</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>   
    </div>
</template>
<script>
import {Toast} from "mint-ui";
export default {
     data(){
        return{
           useraccount:'账户名',
           userimg:'../../assets/images/IMG_7164.jpg'
        }
    },
     beforeCreate(){

        this.$store.state.getuid

        console.log("创建之前");
        if(null==this.$store.state.uid){//id等于空去登录页面
            this.$router.push({ path: '/Myde'});
        }else{//id不等于空则根据id查询信息
            this.$http.post("user/selectUserById",{"uid":parseInt(this.$store.state.uid)}).then(res=>{
                this.useraccount=res.body.username;
                
            })
        }

    },
    created(){
        
    },
    methods:{
        tuichu(){
           localStorage.removeItem("uid");
           localStorage.removeItem("car");
           this.$router.push({ path: '/Myde'});//跳转到登录页
           location.reload();
        }
    }
}
</script>
<style scoped>
.mui-table-view{
    margin-top: 88px;
}
.mui-navbar-inner{
    margin-top: 40px;
}
img{
    width: 45px;
    height: 45px;
     border-radius:50%; 
}
</style>