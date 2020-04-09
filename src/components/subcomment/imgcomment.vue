<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入评论（最多输入120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>

        <div class="cmt-list" >
            <div class="cmt-item" v-for="(item , i) in commentList" :key="item.id">
                <div class="cmt-title">第{{i+1}}楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：{{item.commenttime}}</div>
                <div class="cmt-body">{{item.commentbody}}</div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMove" id="btn">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return{
            pageindex:1, //默认显示页数
            commentList:[],  //评论列表
            msg:""
        }
    },
    created(){
        this.getComments();
        //加载完之后点击量+1
        this.addClick();
    },
    methods:{
        getComments(){
            this.$http.get('pictureSharing/getImagecomment/'+this.id+'/'+this.pageindex).then(res=>{

                if(res.status==200){
                   
                    this.commentList=this.commentList.concat(res.body);
                    // if(res.body.length==0){
                    //   Toast("暂无更多评论！")
                    // }
                }else{
                    Toast("获取评论出错！！");
                }
            })
        },
        getMove(){
            this.pageindex++;
            this.getComments();
        },
        addComment(){
            //发表评论
            //参数1 ：url路径
            //参数2 ：提交的参数对象
            //参数3 ：设置表单中的数据格式
            if(this.msg.trim()==0){
                return Toast("评论不能为空！");
            }
            this.$http.post("pictureSharing/addImagecomment",{
                commentbody:this.msg.trim(),
                imageid:this.$route.params.id,
                commentuser:'1' //当前登录人的id这里没有登录进行模拟数据
            }).then(function(res){
               
                if(res.body==1){
                    //拼接出一个评论对象
                    var cmt ={
                        user_name:"匿名用户",
                        add_time:Date.now(),
                        commentbody:this.msg.trim()
                    }
                    this.commentList.unshift(cmt);
                    this.msg='';
                    Toast("评论成功！");
                }else{
                     Toast("评论出错！");
                }
            })
        },
        addClick(){
            this.$http.get("pictureSharing/addClick/"+this.$route.params.id)
        }
    }
    ,props:['id']
}
</script>

<style scoped>
.cmt-container h3{
    font-size: 18px; 
}
.cmt-container textarea{
    font-size: 14px;
    height: 85px;
    margin: 0;
}
.cmt-container .cmt-list {
    margin: 5px 0;
}
.cmt-container .cmt-list .cmt-item{
    font-size: 13px;
}
.cmt-container .cmt-list .cmt-item .cmt-title{
    line-height: 30px;
    background-color: #ccc;
    text-indent: 1em;
}
.cmt-container .cmt-list .cmt-item .cmt-body{
    line-height: 35px;
    text-indent: 2em;
}
</style>