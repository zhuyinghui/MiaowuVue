import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import addressDate from '../../static/data/addressData'
import chinaCity from '../../static/data/chinaCity'
import Axios from 'axios';
let store=new Vuex.Store({
  state:{
    //储存数据this.$store.state.
    goodslist:[],
    chinaCity:chinaCity,
    //存储购物车
    shoplist:[],
    //存储查看详情页的数据
    goodsdetail:[],
    //存储提交到结算页的数据
    submitlist:[],
    //已经购买的商品数据
    myorderlist:[],
    //存储收货人所有收货信息
    userlist:[],
    //存储收货人地址信息的数据
    address:addressDate,
    //切换城市面板
    ifcity:false,
    chosedcity:'',
    searchvalue:'',
    navlist:[
      { to:"/",name:"首页",status:1 },
      { to:"/cat",name:"宠物猫",status:0 },
      { to:"/shopMall",name:"猫商场",status:0 },
      { to:"/adopt",name:"领养猫",status:0 },
      { to:"/encyclopedia",name:"猫百科",status:0 }
    ],
    domain:'http://zhuyinghui.shop',
    evalgoods:[], //评价页存储的商品信息
  },
  getters:{
    //计算属性this.$store.getters.
    //购物车里的总数总额
    totalcount(state){
      let totalcount=0;
      state.shoplist.forEach(item=>{
        totalcount=totalcount+item.count;
      });
      return totalcount;
    },
    totalprice(state){
      let totalprice=0;
      state.shoplist.forEach(item=>{
        totalprice=totalprice+(item.price[0]*item.count+item.postage[0]*1)
      });
      return totalprice.toFixed(2);
    },
    //结算页的总额
    totalprice2(state){
      let totalprice=0;
      state.submitlist.forEach(item=>{
        totalprice=totalprice+(item.price[0]*item.count+item.postage[0]*1)
      });
      return totalprice.toFixed(2);
    },
  },
  mutations:{
    //方法this.$store.commit
    selectgoods(state,id){
      state.goodslist.forEach((item)=>{
        if(item._id===id){
          state.goodsdetail=item
        }
      });
    },
    //商品详情页的数目加减,对选中对象count操作，再添加到购物车列表
    addcount(state){
      let inventory=parseInt(state.goodsdetail.inventory[0]);
      if(state.goodsdetail.count<inventory){
        state.goodsdetail.count++;
      }
    },
    subcount(state){
      if(state.goodsdetail.count>1){
        state.goodsdetail.count--
      }
    },
    //购物车页的数目加减，直接对购物车列表count操作
    addcount2(state,index){
      if(state.shoplist[index].count<state.shoplist[index].inventory[0]){
        state.shoplist[index].count++
      }
    },
    subcount2(state,index){
      if(state.shoplist[index].count>1){
        state.shoplist[index].count--
      }
    },
    //从详情页加入购物车
    addshopcar(state,id){
      let a=true;
      state.shoplist.forEach(item=>{
        if(id===item._id){
          a=false;
        }
      });
      if(a){
        state.shoplist.push(state.goodsdetail);
      }
    },
    delshopcar(state,index){
      state.shoplist.splice(index,1)
    },
    // 从非详情页直接加入购物车
    addshopcar2(state,id){
      for(let item of state.goodslist){
        if(item._id===id){
          let a=true;
          state.shoplist.forEach(item2=>{
            if(item._id===item2._id){
              a=false
            }
          });
          if(a){
            state.shoplist.push(item)
          }
        }
      }
    },
    //结算
    submitlist(state){
      state.submitlist=[];
      state.shoplist.forEach(item=>{
        if(item.checked===true){
          state.submitlist.push(item)
        }
      });
    },
    buynow(state){
      state.submitlist.push(state.goodsdetail);
    },
    saveuser(state,data){
      let data2=JSON.parse(data);
      state.userlist.push(data2);
      state.userlist.forEach(item=>{
        Vue.set(item,'default',0);
      });
      let length=state.userlist.length-1;
      state.userlist[length].default=1;
    },
    setdefault(state,id){
      state.userlist.forEach((item,index)=>{
        if(id===index){
          item.default =1;
        }else{
          item.default=0;
        }
      })
    },
    //将支付完的商品添加到我的订单中,给每个订单添加一个计时器
    addmyorder(state){
      const submitlist=state.submitlist;
      const userid=localStorage.getItem('userid');
      let date=new Date();
      let dueDate=Number.parseInt(date.setDate(date.getDate()+3)/1000)
      Axios.post(state.domain+'/api/orderForm',{
        submitlist,
        userid,
        dueDate
      },).then(res=>{
        console.log(res.data)
      }).catch(err=>{
        console.log(err)
      });
    },
  }
});
export default store
