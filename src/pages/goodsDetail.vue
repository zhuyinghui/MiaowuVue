<template>
    <div>
      <publicgray-title>商品详情</publicgray-title>
      <div class="content">
        <div class="imgs">
          <img :src="goodsdetail.goodsimgs">
          <template v-for="item in 5">
            <img :src="goodsdetail.goodsimgs" class="smallpic">
          </template>
        </div>
        <ul class="infos">
          <li><h3>{{name}}</h3></li>
          <li>价格：<div class="price">￥{{price}}</div></li>
          <li>运费：<font>￥{{postage}}</font></li>
          <li>数量：
            <i class="el-icon-remove" @click="subcount"></i>
            <div class="count">{{goodsdetail.count}}</div>
            <i class="el-icon-circle-plus" @click="addcount"></i>
          </li>
          <li>库存：{{inventory}}</li>
          <li>总计：<font>￥{{totalprice}}</font></li>
          <li>
            <el-button @click="addshopcar(id)">加入购物车</el-button>
            <div class="space"></div>
            <router-link to="/orderForm"><el-button type="danger" @click="buynow">立即购买</el-button></router-link>
          </li>
        </ul>
      </div>
      <div class="evaluate">
        <h3>用户评价</h3>
        <ul v-for="(item,index) in evallist" :key="index">
          <li><h4>{{item.username}} : </h4></li>
          <li>{{item.words}}</li>
          <li class="grade">评分：{{item.grade+item.grade2+item.grade3}}</li>
        </ul>
      </div>
    </div>
</template>

<script>
    import PublicgrayTitle from "../components/publicgrayTitle";
    export default {
        name: "goodsDetail",
      components: {PublicgrayTitle},
      data(){
          return{
            id:this.$route.query.goodsid,
            name:'',price:0,postage:0,inventory:0,
            evallist:[],
          }
      },
      methods: {
        addcount() {
          this.$store.commit('addcount');
          if (this.goodsdetail.count === this.inventory) {
            this.$message({
              message: '商品添加数量达到上限！',
              type: 'warning'
            });
          }
        },
        subcount() {
          this.$store.commit('subcount')
        },
        addshopcar(id) {
          this.$store.commit('addshopcar', id);
          this.$alert('成功加入商品到购物车！', '提示',
            {confirmButtonText: '确定'});
        },
        buynow(){
          this.$store.commit('buynow')
        },
        getevaluate(){
          //加载用户对该商品的评价
          const goodsid=this.$route.query.goodsid;
          this.axios.get(this.$domain+'/api/evaluateInfo/goods',{
            params:{goodsid}
          }).then(res=>{
            console.log(res.data);
            this.evallist=res.data
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      computed:{
        goodsdetail(){
          return this.$store.state.goodsdetail
       },
        totalprice(){
          let totalprice=this.goodsdetail.count*this.price+this.postage;
          return totalprice.toFixed(2)
        }
      },
      mounted() {
          //传递id
        this.$store.commit('selectgoods',this.id);
        this.name=this.goodsdetail.name[0];
        this.price=this.goodsdetail.price[0]*1;
        this.postage=this.goodsdetail.postage[0]*1;
        this.inventory=this.goodsdetail.inventory[0]*1;
        this.getevaluate();
      }
    }
</script>
<style lang="scss" scoped>
  .content {
    width: 100%;
    height: 440px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content .imgs {
    width: 400px;
    height: 380px;
    margin-right: 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-between;
  }
  .content .imgs .smallpic {
    width: 70px;
    height: 70px;
  }
  .content .imgs .smallpic:hover{
    border: 1px solid #cc0033;
    box-sizing: border-box;
  }
  .content .imgs img:first-child {
    width: 400px;
    height: 300px;
    box-shadow: 3px 3px 5px gray;
  }
  .content .infos {
    width: 300px;
    height: 374px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .content .infos li {
    list-style: none;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  .content .infos li .price {
    height: 42px;
    background: #cc0033;
    color: white;
    font-weight: bold;
    font-size: 30px;
    border-radius: 5px;
    padding: 0 15px;
  }
  .content .infos li font {
    color: #cc0033;
    font-weight: bold;
  }
  .content .infos li .count {
    margin: 0 20px;
  }
  .space{
    width: 50px;
  }
  .evaluate{
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    h3{
      width: 100%;padding: 10px 0;
      text-align: center;
      color: #5e5e5e;
      border: 1px solid #5e5e5e;
     margin: 10px 0;
    }
    ul{
      display: flex;
      padding: 10px;
      position: relative;
      li{
        list-style: none;
      }
      .grade{
        position: absolute;right: 10px;
      }
    }
  }

</style>
