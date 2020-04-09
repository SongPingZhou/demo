<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsinfo.newtitle}}</h3>
        <p class="subtitlt">
            <span>
                发表时间：{{newsinfo.releasetime}}
            </span>
            <span>
                点击量：{{newsinfo.click}}次
            </span>
        </p>
        <hr>
        <!-- 新闻内容区域 -->
        <div class="content" v-html="newsinfo.newbody"></div>

        <!-- 评论子组件区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import {Toast} from "mint-ui";

import comment from '../subcomment/comment.vue';//导入评论组件

export default {
    data(){
        return{
            id:this.$route.params.id, //获取url传的id 挂载到data上方便以后调用
            newsinfo:{} //新闻对象
        }
    },
    created(){
        this.getNewsInfo();
    }
    ,
    methods:{
        getNewsInfo(){
            this.$http.get("news/getNewsInfoId/"+this.id).then(res=>{
                if(res.status==200){
                    this.newsinfo=res.body;
                }else{
                    Toast("加载新闻详情失败！！");
                }
            })
        }
    },
    components:{
        "comment-box" : comment
    }
}
</script>

<style >
.newsinfo-container{
    padding: 0 4px;
}
.title{
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
}
.subtitlt{
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
}
.content img{
    width: 100%;
}
</style>