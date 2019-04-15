<template>
<div>
    <div class="title">
        <img src="http://zhuyinghui.shop/images/food.png">
        <h3>猫粮</h3>
    </div>
    <div class="goods">
    <goods-nav v-for="(item,index) in foodList" :key="index" :item="item"></goods-nav>
    </div>
</div>
   
</template>

<script>
import goodsNav from '../../components/goodsNav'
    export default {
        name: "food",
          components:{
            goodsNav
        },
        computed:{
            foodList(){
                return this.$GoodsList.filter((item)=>{
                    return item.classid[0]==43
                })
            }
        },
    }
</script>

<style scoped>
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
