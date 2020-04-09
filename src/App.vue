<template>
  <div class="app">
    <!-- 顶部区域 -->
    <mt-header  fixed title="欢迎来到Mr商城">
        <span  slot="left" @click="goBack" v-show="flag">
            <mt-button icon="back">返回</mt-button>
        </span>
    </mt-header>
    <!-- 中间区域 -->
    
        
        <transition>
            <router-view/>
        </transition>

<!-- 底部区域 -->

   <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-llb " to="/Index">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/Member">
				<span class="mui-icon iconfont icon-discover"></span>
				<span class="mui-tab-label">发现</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/Car">
				<span class="mui-icon iconfont icon-gouwuche">
                        <span class="mui-badge" id="badge">{{this.$store.getters.getAllCount}}</span>
                    </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/Home">
				<span class="mui-icon iconfont icon-i"></span>
				<span class="mui-tab-label">我的</span>
			</router-link>
		</nav>
  </div>
</template>

<script>


export default {
  name: 'App',
  data(){
      return{
            flag:false
      };
  },
  created(){
      this.flag=this.$route.path=='/' || this.$route.path=='/Index' ? false:true
  },
  methods:{
      goBack(){//点击后退
          this.$router.go(-1)
      }
  },
  watch:{
      '$route.path':function(newVal){
          if(newVal=='/Index' || newVal=='/'){
              this.flag=false
          }else{
              this.flag=true
          }
      }
  }
}
</script>

<style>
/* 距离顶部的距离（去掉顶部模块的高度） */
.app {
  /* text-align: center; */
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}
/* 设置路由连接切换开始 */
.v-enter{
    opacity: 0;
    transform: translateX(100%);
}
.v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
}
.v-enter-active,
.v-leave-active{
    transition: all 0.5s ease;
}
/* 设置路由连接切换结束 */




.mui-bar-tab .mui-tab-item-llb.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-llb {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

.mint-header{
    z-index: 99;
}
</style>
