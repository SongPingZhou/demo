<template>

    <div>
       
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<router-link :to="'/Index/NewInfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.newimg">
						<div class="mui-media-body">
							<h1>{{item.newtitle}}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间：{{item.releasetime}}</span>
                                <span>点击：{{item.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
				
			</ul>

    </div>

</template>
<script>
import {Toast} from "mint-ui";

export default{
    data(){
		return{
			newslist:[] //新闻列表
		}
	},
	created(){
		this.getNewsList();
	},
	methods:{
		getNewsList(){
			this.$http.post("news/getNewsList").then(res=>{
				if(res.status==200){
					this.newslist=res.body;
				}else{
					Toast("新闻列表获取失败！！");
				}
			})
		}
	}
}
</script>

<style scoped>
/* 设置新闻标题的字体 */
.mui-table-view li h1{
    font-size: 14px;
}
/* 设置新闻的 显示时间 和字体颜色 以及显示状态时两端对齐 */
.mui-ellipsis {
    font-size: 12px;
    color: #226aff;   
    display: flex;
    justify-content: space-between;
}

</style>