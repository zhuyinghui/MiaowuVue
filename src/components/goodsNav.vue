<template>
    <div class="goods-item">
      <img :src="item.goodsimgs" alt="商品图片">
      <div>{{item.name[0]}}</div>
      <div>￥{{item.price[0]}}</div>
      <div class="featrue">{{item.feature[0]}}</div>
      <div>
        <el-button size="mini" @click="addshopcar2(item._id)">加入购物车</el-button>
          <router-link :to="{ path:'/goodsDetail',query:{ goodsid:item._id }}" class="detail">查看详情</router-link>
      </div>
    </div>
</template>
<script>
    export default {
      name: "goodsNav",
      props:['item'],
      methods:{
          addshopcar2(id){
            this.$store.commit('addshopcar2',id);
            this.$alert('成功加入商品到购物车！', '提示',
              {confirmButtonText: '确定'});
          },
      }
    }
</script>
<style scoped>
  .goods-item{
    width: 222px;height: 320px;
    display: flex;flex-direction: column;align-items: center;justify-content: space-between;
    background: white;
    padding: 10px;
    margin: 10px 5px;
    box-shadow: 3px 3px 5px #aeaeae;
  }
  .goods-item:hover{
    box-shadow: 3px 3px 5px #aeaeae;
    transform: scale(1.05,1.05);
  }
  .goods-item img{
    width: 200px;height: 150px;
  }
   .featrue{
    font-size: 13px;color: #949494;
    height: 80px;
    overflow: hidden;
   }
  .goods-item div:nth-child(2){
    font-size: 16px;color: black;
    height: 45px;
    overflow: hidden;
   
  }
  .goods-item div:nth-child(3){
    font-size: 16px;color: red;
  }
  .detail{
    text-decoration: none;
    color: dodgerblue;
    padding-left: 20px;
  }

</style>
