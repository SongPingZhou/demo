<template>
    <div>
       <div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='account' type="text" class="mui-input-clear mui-input" v-model="name" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" v-model="pwd" placeholder="请输入密码">
				</div>
			</form>
			<form class="mui-input-group">
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell">
						自动登录
						<div id="autoLogin" class="mui-switch">
							<div class="mui-switch-handle"></div>
						</div>
					</li>
				</ul>
			</form>
			<div class="mui-content-padded" > 
				<button id='login' @click="login" class="mui-btn mui-btn-block mui-btn-primary">登录</button>
				
			</div>
		
		</div>
    </div>
</template>

<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return{
            name:'',
            pwd:''
        }
    },
    methods:{
        login(){
            // Toast(this.name+","+this.pwd);
            this.$http.post('user/login',{"username":this.name,"password":this.pwd}).then(res=>{
                // console.log(JSON.stringify(res))
                if(!res.body.flag){
                    return Toast(res.body.msg);
                }else{
                //    console.log(JSON.stringify(res)), params: { userId: res.body.msg }
                    this.$store.commit('setuid',res.body.msg);
                   // location.reload();
                     this.$router.push({ path: '/'});//跳转到首页 不会刷新
                    location.reload();
                     //this.$router.replace({path:'/'});//重载
                   
                }
            })
        }
    },
    beforeCreate(){

        // this.$store.state.getuid

        // console.log("创建之前"+this.$store.state.uid);
        // if(null!=this.$store.state.uid){
        //     this.$router.push({ path: '/Myde'});//如果已经登录则直接进入我的页面
        // }
        // if(null!=this.$store.state.uid){
        //     this.$router.push({ path: '/Home'});
        // }
    },
    created(){
        console.log("创建之后s")
    }

}
</script>

<style scoped>
.mui-btn{
    height: 47px;
}
</style> 