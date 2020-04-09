<template>
    <div class="goodsdesc-containcer">
        <h3>{{info.title}}</h3>
        <p>
            <span>上架时间：{{info.addtime}}</span>
            <span>点击量：{{info.click}}次</span>
        </p>
        <hr>
        <div class="contene" v-html="info.zhaiyao"></div>
    </div>
</template>
<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return{
            info:{} //图文数据
        }
    },
    created(){
        this.getGoodsDesc();//获取图文信息
    },
    methods:{
        getGoodsDesc(){
            this.$http.get("product/selectProductById/"+this.$route.params.id).then(res=>{
                if(res.status==200){
                    this.info=res.body;
                }else{
                    Toast("获取图文数据失败");
                }
            })
        }
    }
}
</script>
<style >
.goodsdesc-containcer{
    padding: 4px;
    padding: 0 ;
}
.goodsdesc-containcer h3{
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
}
.goodsdesc-containcer img{
    width: 100%;
}
.goodsdesc-containcer p{
    margin: 0;
    padding: 0 5px;
    font-size: 11px;
    display: flex;
    justify-content: space-between;
}
</style>