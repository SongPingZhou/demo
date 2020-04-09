<template>
    <div class="photoinfo-contaniner">
        <h3>{{photoInfos.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoInfos.times}}</span>
            <span>点击次数：{{photoInfos.click}}次</span>
        </p>

        <hr>

        <!-- 缩略图 -->
       <div class="imagess">
            <vue-preview :slides="slide1"  @close="handleClose"></vue-preview>
        </div> 
        <!-- <img class="preview-img" v-for="(item,index) in slide1" :src="item.src" height="100" @click="$preview.open(index,slide1)" :key="item.src"> -->



        <!-- 图片内容区域 -->
        <div class="content" v-html="photoInfos.zhaiyao"> </div>


        <!-- 放置一个现成的评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
import comment from '../../components/subcomment/imgcomment.vue'

    export default{
        data(){
            return{
                id:this.$route.params.id ,//路由中获取
                photoInfos:[], //图片详情
                slide1: [] //缩略图
            };
        },
        created(){
            this.getPhotoInfo();
            this.getLayoutImage();//调用缩略图
        },
        methods:{
            getPhotoInfo(){
                this.$http.get("pictureSharing/selectImagesById/"+this.id).then(res=>{
                    if(res.status==200){
                        this.photoInfos=res.body;
                    }
                })
            },
            getLayoutImage(){
                this.$http.get("pictureSharing/selectLayoutimageById/"+this.id).then(res=>{
                    if(res.status==200){
                        res.body.forEach(item => {
                            item.w=600;
                            item.h=400;
                            item.src=item.msrc;
                            item.alt="picture1";
                        });
                        this.slide1=res.body;
                    }
                })
            },
            handleClose () {
                console.log('close event')
            }
        },
        components:{
            "cmt-box":comment
        }
    }
</script>

<style >
.photoinfo-contaniner{
    padding: 3px;
}
.photoinfo-contaniner h3{
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
}
.photoinfo-contaniner .subtitle{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}
.photoinfo-contaniner .content{
    font-size: 13px;
    line-height: 30px;
    clear: both;
}
/* .my-gallery figure {
  float: left;
  width: 30%; 
  height:calc(30vw - 1px);
  margin: 5px;
} */

.my-gallery figure  img {
    width: 100%;
    box-shadow: 0 0 8px #999;
}
</style>