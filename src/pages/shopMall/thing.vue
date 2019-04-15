<template>
<div>
     <div class="title">
        <img src="http://zhuyinghui.shop/images/thing.png">
        <h3>猫用品</h3>
    </div>
    <div class="goods">
    <goods-nav v-for="(item,index) in thingList" :key="index" :item="item"></goods-nav>
    </div>

</div>
</template>

<script>
import goodsNav from '../../components/goodsNav'
    export default {
        name: "thing",
        components:{
            goodsNav
        },
        computed:{
            thingList(){
                return this.$GoodsList.filter((item)=>{
                    return item.classid[0]==44
                })
            }
        },
    }
</script>

<style scoped lang="scss">
.title{
    display: flex;
    margin: 20px;
    border-bottom: 1px solid #cc0033;
    padding: 10px;
}
   h3{
        padding: 0 10px;
    }
.goods{
    width: 100%;
    display: flex;flex-wrap: wrap;
}
</style>
