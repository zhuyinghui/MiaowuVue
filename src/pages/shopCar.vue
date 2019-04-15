<template>
  <div class="container">
    <publicgray-title>购物车</publicgray-title>
    <div v-if="shoplist.length">
      <div class="content">
        <ul>
          <li></li>
          <li>图片</li>
          <li>商品名称</li>
          <li>单价</li>
          <li>邮费</li>
          <li>数量</li>
          <li>操作</li>
        </ul>
          <ul v-for="(item,index) in shoplist" :key="index">
            <li @click="changeicon(index)">
              <i class="el-icon-circle-check" v-if="item.checked"></i>
              <i class="el-icon-remove-outline" v-else></i>
            </li>
            <li><img :src="item.goodsimgs"></li>
            <li>{{item.name[0]}}</li>
            <li>{{item.price[0]}}</li>
            <li>{{item.postage[0]}}</li>
            <li>
              <i class="el-icon-remove" @click="subcount(index)"></i>
              <div class="count">{{item.count}}</div>
              <i class="el-icon-circle-plus" @click="addcount(index)"></i>
            </li>
            <li @click="delshopcar(index)" style="cursor: pointer">删除</li>
          </ul>
      </div>
      <ul class="shopbottom">
        <li @click="allcheck">
          <i class="el-icon-circle-check" v-if="allchecked"></i>
          <i class="el-icon-remove-outline" v-else></i>
          全选
        </li>
        <li @click="delselect">删除</li>
        <li>已选中{{selectcount}}件商品</li>
        <li>共计:{{totalcount}}件</li>
        <li>合计（含邮费）：<font>{{totalprice}}</font>元</li>
        <li><router-link to="/orderForm"><button class="redbutton" @click="submitlist">去结算</button></router-link></li>
      </ul>
    </div>
    <div v-else class="empty">
      <img src="../../static/assets/images/empty.jpg" alt="购物车为空">
    </div>
  </div>
</template>

<script>
  import logotitle from '../components/logoTitle'
  import PublicgrayTitle from "../components/publicgrayTitle";
    export default {
        name: "shopCar",
      components:{
        PublicgrayTitle,
          logotitle
      },
      data(){
          return{
            allchecked:false
          }
      },
      methods:{
          addcount(index){
            this.$store.commit('addcount2',index);
            let inventory=parseInt(this.shoplist[index].inventory);
            if (this.shoplist[index].count === inventory) {
              this.$message({
                message: '商品添加数量达到上限！',
                type: 'warning'
              });
            }
          },
        subcount(index){
            this.$store.commit('subcount2',index)
        },
        delshopcar(index){
            this.$store.commit('delshopcar',index)
        },
        changeicon(index){
          this.$store.state.shoplist[index].checked=!this.$store.state.shoplist[index].checked;
          this.$store.state.shoplist.forEach(item=>{
            if(item.checked===false){
              this.allchecked=false
            }
          })
        },
        allcheck(){
            if(this.allchecked===true){
              this.$store.state.shoplist.forEach(item=>{
                item.checked=false
              });
              this.allchecked=false;
            }else{
              this.$store.state.shoplist.forEach(item=>{
                item.checked=true
              });
              this.allchecked=true;
            }
        },
        delselect(){
          let arr=[]; let n=0;
          this.$store.state.shoplist.forEach((item,index)=>{
            if(item.checked===true){
              arr.push(index);
            }
          });
          arr.forEach(item=>{
            this.$store.state.shoplist.splice(item-n,1);
            n++;
          })
        },
        submitlist() {
            this.$store.commit('submitlist')
        },
      },
      computed:{
        shoplist(){
            return this.$store.state.shoplist
          },
        totalcount(){
            return this.$store.getters.totalcount
        },
        totalprice() {
          return this.$store.getters.totalprice;
        },
        selectcount() {
          let count = 0;
          this.$store.state.shoplist.forEach(item => {
            if (item.checked === true) {
              count = count + item.count
            }
          });
          return count;
        }

      }
    }
</script>
<style scoped>
  .content{
    width: 100%;background: white;
  }
  .shopbottom{
    width: 100%;height: 55px;background: #5e5e5e;color: white;
    display: flex;align-items: center;
    box-sizing: border-box;font-size: 14px;
  }
  .shopbottom li{
    list-style: none;margin: 0 30px;
  }
  .shopbottom li font{
    font-size: 18px;font-weight: bold;
  }
  .content ul{
    display: flex;height: 120px;
    border: 3px solid white;
    box-sizing: border-box;
    background: #f2f2f2;
  }
  .content ul li{
    list-style: none;width: 130px;
    display: flex;justify-content: center;align-items: center;
    font-size: 14px;
  }
  .content ul li:last-child{
    color: red;
  }
  .content ul li img{
    height: 75px;width: 100px;
  }
  .content>ul:first-child{
    height: 48px;background: white;
  }
  .count{
    margin: 0 20px;
  }
  i{
    font-size: 20px;
  }
  .empty{
    width: 100%;background: white;
  }
  .empty img{
    width: 50%;margin-left:25%;
  }
</style>
