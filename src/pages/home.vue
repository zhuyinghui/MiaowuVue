<template>
    <div>
      <head-nav :username="username"></head-nav>
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="item in player" :key="item">
          <img :src="item" class="player" alt="轮播广告">
        </el-carousel-item>
      </el-carousel>
      <div >
        <div class="publicredtitle">
          <div></div>
          <h2>热门推荐</h2>
          <div class="changesome" @click="changesome"><i class="el-icon-refresh"></i>换一批</div>
        </div>
        <div class="goods">
          <goods-nav v-for="(item,index) in goodslist" :key="index" :item="item"></goods-nav>
        </div>
      </div>
      <foot-nav></foot-nav>
    </div>
</template>

<script>
  import headNav from '../components/headNav'
  import goodsNav from '../components/goodsNav'
  import footNav from '../components/footNav'
  import { getGoods } from "../../static/data/getGoods";

    export default {
      data() {
        return {
          player: [
            require('../../static/assets/images/cat1.jpg'),
            require('../../static/assets/images/cat2.jpg'),
            require('../../static/assets/images/cat3.jpg'),
            require('../../static/assets/images/cat4.jpg'),
            require('../../static/assets/images/cat5.jpg'),
          ],
          goodslist: [],
          username: this.$route.query.name,
          len:0
        }
      },
      components: {
        goodsNav, footNav, headNav
      },
      methods: {
        changesome() {
          let arr = [];
          let n = 0;
          while (n < 10) {
            let a = Number.parseInt(Math.random() * this.len);
            arr.push(this.$GoodsList[a]);
            n++;
          }
          this.goodslist = arr;
        }
      },
      mounted() {
        getGoods(data => {
          this.$store.state.goodslist = data;
          this.len=data.length;
          this.changesome();
        });
      }
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .player{
    width: 100%;height: 100%;
  }
  .goods{
    display: flex;flex-wrap: wrap;justify-content: center;
  }
  .changesome{
    cursor: pointer;
  }
</style>
