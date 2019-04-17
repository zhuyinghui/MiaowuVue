<template>
    <div class="container">
      <div class="top1">
        <div class="welcome" v-if="!username">
          <span>欢迎来到喵呜网！</span>
          <router-link to="/login" class="login"><span>请登录/注册</span></router-link>
        </div>
        <div class="welcome" v-else>
          <span>欢迎【{{username}}】来到喵呜网！</span>
          <div class="login" @click="delusername"><span>退出账号</span></div>
        </div>
        <div class="changecity">
          <i class="el-icon-location-outline"></i>
          <span v-if="!chosedcity">长沙</span>
          <span v-else>{{chosedcity}}</span>
          <span @click="selectcity">切换城市</span>
        </div>
        <div class="chinacity" v-if="ifcity">
          <ChinaCity v-for="(item,index) in cities" :key="index" :item="item"></ChinaCity>
        </div>
      </div>
      <div class="top2">
        <ul class="headlist">
          <li class="logo">MiaoWu</li>
          <template v-for="(item,index) in navlists">
            <router-link :to="item.to" tag="li" :key="index"><span :class="{ 'navchoosed':item.status}" @click="navchoosed(index)">{{item.name}}</span></router-link>
          </template>
        </ul>
        <div>
          <img src="../../static/assets/images/search.png" />
          <router-link to="/search">
            <input placeholder="搜索商品" v-model="search" class="search" />
          </router-link>
          <ul class="asidelist">
            <li>
              <div class="mine"></div>
              <div class="box-card">
                <div v-for="item in minelist" :key="item.id">
                  <router-link :to="item.path" class="text">{{item.name}}</router-link>
                </div>
              </div>
            </li>
            <li>
              <router-link to="/shopCar"><div class="shopcar"></div></router-link>
              <div class="goodscount" v-if="shopcount">{{shopcount}}</div>
              <div class="shop-card">
                <div v-if="shopcount">
                <div class="shop-items">
                  <shopcarNav v-for="(item,index) in shoplist" :key="index" :item="item" :index="index"></shopcarNav>
                </div>
                <div class="shop-bottom">
                  <div>总数：{{totalcount}}</div>
                  <div>总价：{{totalprice}}元</div>
                  <router-link to="/shopCar"><button>去购物车</button></router-link>
                </div>
              </div>
                <div v-else class="empty">
                  <img src="../../static/assets/images/empty.jpg" alt="">
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
  import shopcarNav from '../components/shopcarNav';
  import ChinaCity from  '../components/ChinaCity';
    export default {
        name: "headNav",
      components:{
          shopcarNav,ChinaCity
      },
      data(){
          return{
            search:'',
            minelist:[{
              id:1,name:'个人资料',path:'/myInfomation' 
              },
              {
              id:2,name:'我的订单',path:'/myOrder' 
              },
              {
              id:3,name:'我的评价',path:'/myEvaluate' 
              },
              {
              id:4,name:'我的领养',path:'/myAdopt' 
              },
              {
              id:5,name:'设置',path:''
              }],
            username:'',
          }
      },
      methods:{
        selectcity(){
          this.$store.state.ifcity=!this.$store.state.ifcity
        },
        navchoosed(num){
          this.$store.state.navlist.forEach((item,index)=>{
            if(num===index){
              item.status=1;
            }
            else{
              item.status=0;
            }
          });
        },
        delusername(){
          localStorage.removeItem('name');
          this.username='';
        }
      },
      computed:{
          shoplist(){
            return this.$store.state.shoplist
        },
        shopcount(){
            return this.shoplist.length
        },
        totalcount(){
            return this.$store.getters.totalcount
        },
        totalprice(){
            return this.$store.getters.totalprice
        },
        ifcity(){
            return this.$store.state.ifcity
        },
        chosedcity() {
            return this.$store.state.chosedcity
        },
        navlists(){
            return this.$store.state.navlist
        },
        cities(){
            return this.$store.state.chinaCity
        },
      },
      watch: {
        search:{
          handler:function (val) {
            this.$store.state.searchvalue=val;
          },
          deep:true
        }
      },
      mounted(){
          this.username=localStorage.getItem('name');
      }
    }
</script>

<style scoped>
  .container{
    display: flex;flex-direction: column;
    width: 100%;
    background: black;
  }
  .top1{
    background: #f0f2f5;color: black;
    display: flex;justify-content: flex-end;
    margin-top: -20px;
    height: 22px;
  }
  .welcome{
    display: flex;justify-content: space-around;
    font-size: 14px;
    margin-right: 30px;
  }
  .welcome .login{
    color: #cc0033;cursor: pointer;
    text-decoration: none;
  }
  .welcome .login:hover{
    text-decoration: underline;
  }
  .top2{
    display: flex;align-items: center;justify-content: space-between;
    height: 58px;
  }
  .headlist{
  display: flex;align-items: center;
}
  .top2>div{
    display: flex;align-items: center;margin-right: 30px;height: 100%;
  }
  .top2>div>img{
    height: 20px;position: relative;left: 30px;
  }
  .logo{
    font-family: "Segoe Script";font-size: 40px;
    padding: 0 130px 0 50px;
  }
  .headlist li{
  list-style: none;color: white;
    width: 60px;height: 100%;
    line-height: 58px;
    text-align: center;
    cursor: pointer;
  }
  .headlist li span{
    display: block;
    width: 60px;height: 100%;
  }
  .navchoosed{
    background: #cc0033;
  }
  .headlist li:hover{
      background: #282828;
    }
  .headlist li:first-child:hover{
    background: #000000;cursor: default;
  }
  .search{
    width: 170px;height: 30px;border-radius: 5px;
    margin-right: 30px;
    padding: 2px 0 2px 33px;

  }
  .asidelist{
    display: flex;flex: 1;
    height: 100%;
  }
  .asidelist li{
    list-style: none;
    position: relative;
    display: flex;align-items: center;
    padding: 0 10px;
    height: 100%;
  }
  .mine{
    width: 30px;height: 30px;
    background: url("../../static/assets/images/mine1.png");
    background-size: 30px 30px;
    cursor: pointer;
  }
  .shopcar{
    width: 35px;height: 35px;
    background: url("../../static/assets/images/shopcar1.png");
    background-size: 35px 35px;
    cursor: pointer;
  }
  .text{
    display: block;
    font-size: 14px;text-align: center;
    padding: 18px 0;
    text-decoration: none;
    color: black;
  }
  .text:hover{
    background: #282828;color: white;
  }
  .box-card {
    width: 195px;background: white;
    position: absolute;top: 58px;right: -78px;
    z-index: 500;
    visibility: hidden;
    opacity: 0;
    cursor: pointer;
  }
  .asidelist li:first-child:hover .box-card{
    opacity: 1;
    transition: opacity 0.5s;
    visibility: visible;
  }
  .asidelist li:first-child:hover .mine{
    background: url("../../static/assets/images/mine2.png");
    background-size: 30px 30px;
  }
  .asidelist li:last-child:hover .shop-card{
    visibility: visible;
    opacity: 1;
    transition: opacity 0.5s;
  }
  .asidelist li:last-child:hover .shopcar{
    background: url("../../static/assets/images/shopcar2.png");
    background-size: 35px 35px;
  }
  .shop-card{
    width: 292px;
    z-index: 500;
    position: absolute;top:58px;right: -20px;
    font-size: 13px;
    background: white;
    box-shadow: 2px 2px 2px #ccc;
    border-radius: 5px;
    opacity: 0;
    visibility: hidden;
  }
  .empty{
    width: 292px;
    height: 250px;
    background-size: contain;
  }
  .empty img{
    width: 100%;
    height: 100%;
  }

  .shop-items{
    width: 100%;max-height: 300px;
    overflow-y: auto;
  }
  .shop-bottom{
    width: 100%;height: 53px;
    display: flex;align-items: center;justify-content: space-around;
  }
  .shop-bottom button{
    width: 81px;height: 33px;
    color: white;background: #cc0033;
    border-radius: 5px;
    border: none;cursor: pointer;
  }
  .goodscount{
    width: 25px;height: 25px;background: red;
    text-align: center;line-height: 25px;border-radius: 50%;
    color: white;
    position: absolute;right: -25px;top: 0;
  }
  .changecity{
    font-size: 16px;
  }
  .changecity span:last-child{
    font-size: 13px;text-decoration: underline;
    margin: 0 15px 0 5px;cursor: pointer;
  }
  .chinacity{
    height: 505px;width: 480px;background: #282828;
    position: absolute;top:20px;right: 20px;
    z-index: 500; overflow-y: auto;
    padding: 10px;
  }



</style>
