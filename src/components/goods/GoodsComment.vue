<template>
    <div>
        <cmtbox :id="$route.params.id"></cmtbox>
    </div>
</template>
<script>
import cmtbox from '../../components/subcomment/productcomment.vue'
export default {
    components:{
        cmtbox
    }
}
</script>
<style scoped>

</style>