<template>
  <div>
    <div>
      <div class="shop-item">
        <img :src="item.goodsimgs">
        <ul>
          <li>{{item.name[0]}}</li>
          <li>数量：{{item.count}}</li>
          <li>价格：{{item.price[0]}}元</li>
        </ul>
        <el-button type="info" icon="el-icon-delete" circle size="mini" @click="delshopcar(index)"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "shopcarNav",
      props: ['item','index'],
      methods:{
          delshopcar(index){
            this.$store.commit('delshopcar',index)
          }
      }
    }
</script>

<style scoped>

  .shop-item{
    width: 100%;height: 77px;
    display: flex;align-items: center;justify-content: space-between;
    padding: 20px 5px;
    box-sizing: border-box;
    margin-bottom: 5px;

  }
  .shop-item img{
    width: 80px;height: 60px;
  }
  .shop-item ul{
    display: flex;flex-direction: column;margin-left:-60px;
  }
  .shop-item ul li{
    list-style: none;
  }

</style>
