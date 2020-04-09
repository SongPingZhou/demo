<template>
    <div>
        <!-- 顶部滑块区域 -->
        <!-- 1.取消 mui-fullscreen -->
        <!-- 2.初始化js -->
        <div id="slider" class="mui-slider ">
            <div id="sliderSegmentedCotrol" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0 ? 'mui-active' : ''] " data-wid="tab-top-subpage-1.html"  v-for="item in imgcategorys" :key="item.id" @click="getImagesByPid(item.id)">
                        {{item.imgcategoryname}}
                    </a>
                </div>
            </div>
        </div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/Index/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.imgurl">
                <!-- 图片上的灰色标题区域 -->
                <div class="info">
                    <h1 class="info-title">
                        {{item.title}}
                    </h1>
                    <div class="info-body">
                        {{item.zhaiyao}}
                    </div>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
 //1.导入mui的js文件
import mui from '../../../libs/mui/js/mui.min.js';
import {Toast} from "mint-ui";
export default {
    data(){
        return{
                imgcategorys:[], //全部的类别名称数组
                list:[] //图片列表的数组
        }
    },
    created(){
        this.getImgcategoryAll();
        //初次进入默认加载全部图片
        this.getImagesByPid(0);
    },
    mounted(){//当组件中的dom中的组件被选然好 被放到页面中后会执行这个钩子函数
        
        //2.初始化滑动控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration : 0.0005
        });
    },
    methods:{
        getImgcategoryAll(){//获取全部的图片分享类别的名称
            this.$http.get("pictureSharing/selectImgCategoryAll").then(res=>{
                if(res.status==200){
                    res.body.unshift({imgcategoryname:"全部",id:0});
                    this.imgcategorys=res.body;
                }else{
                    Toast("获取图片类别列表失败")
                }
            })
        },
        getImagesByPid(pid){//根据类别id获取图片 为0 则获取全部的图片
        this.$http.get("pictureSharing/selectImagesByPid/"+pid).then(res=>{
            if(res.status==200){
                this.list=res.body;
            }else{
                Toast("获取图片列表失败")
            }
        });

        }
    }
}
</script>
<style scoped>
*{
    touch-action: pan-y;
}


.photo-list li img[lazy="loading"] {
    width: 40px;
    height: 300px;
    margin: auto;
}
img{
    width: 100%;
    vertical-align: middle;
}
.photo-list li{
    background-color: #ccc;
    list-style-type:none;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;

    position: relative;
}
.photo-list{
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
}
.info {
    color: white;
    text-align: left;
    bottom: 0;
    position: absolute;
    background-color: rgba(0,0,0,0.4);
    width: 100%;
    max-height: 84px;
}
.info .info-title{
    font-size: 14px;
    
}
.info .info-body{
    font-size: 13px;
}
</style>