<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbolist" :key="item.id"> 
                    <img :src="item.wheelplantingimg" :class="{'isfull' : isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    props:['lunbolist','isfull']
}
</script>
<style scoped>
/* 轮播图的高度 */
.mint-swipe{
    text-align: center;
    height: 200px;
}
/* 轮播图的大小 */
.mint-swipe-item img{
        /* width: 100%; */
        height: 100%;
}
.isfull{
    width: 100%;
}
</style>