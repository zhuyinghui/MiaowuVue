<template>
    <div>
     <publicgray-title>我的订单</publicgray-title>
      <div v-if="myorderlist.length" class="container">
        <div class="content" v-for="(item,index) in myorderlist" :key="index">
          <h4>商品{{index+1}}<i class="el-icon-arrow-right"></i></h4>
          <ul>
            <li><img :src="item.goodsimg" alt="订单图片"></li>
            <li>商品名称：{{item.goodsname}}</li>
            <li>共{{item.count}}件商品</li>
            <li>单价：{{item.price}}元</li>
            <li>邮费：{{item.postage}}元</li>
            <li>合计：{{item.price*item.count*1+item.postage*1}}元</li>
          </ul>
          <div class="bottom">
            <template v-if="item.iftime===1">
              <span>距离自动收货还有：
              {{Number.parseInt(item.time/(24*60*60))}}天
              {{Number.parseInt(item.time%(24*60*60)/(60*60))}}时
              {{Number.parseInt(item.time%(24*60*60)%(60*60)/60)}}分
              {{item.time%(24*60*60)%60}}秒
            </span>
              <!-- <el-button @click.once="delay_time(index)">延长收货</el-button> -->
              <el-button @click="comfirm_receipt(index,item._id)">确认收货</el-button>
              <el-button @click="looklogistics">查看物流</el-button>
            </template>
            <template v-else>
              <el-button type="danger" disabled>已签收</el-button>
              <el-button @click="evaluatenow(item.goodsid,item)" v-if="item.ifeval===0">立即评价</el-button>
              <el-button type="danger" disabled v-if="item.ifeval===1">已评价</el-button>
              <el-button @click="deleteOrder(item._id)">删除订单</el-button>
            </template>
          </div>
        </div>
      </div>
      <div v-else class="empty">
        <img src="../../../static/assets/images/empty.jpg" alt="我的订单为空">
      </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import {mapState} from 'vuex'
  import PublicgrayTitle from "../../components/publicgrayTitle2";
    export default {
        name: "myOrder",
      components: {PublicgrayTitle},
      data(){
        return{
          myorderlist:[],
          Timer:[],
          goodsidlist:[]
        }
      },
      methods:{
        //加载用户订单数据
        initData(){
          const id=localStorage.getItem('userid');
          this.axios.get(this.$domain+'/api/orderForm',{
            params:{
              userid:id
            }
          }).then(res=>{
            this.myorderlist=res.data;
            // console.log('请求订单数据：')
            // console.log(this.myorderlist)
            //给每个订单添加定时器
            let time=new Date();
            let nowtime=Number.parseInt(time.getTime()/1000); //进入订单页的时间
            for(let item of this.myorderlist){
              let remain=item.dueDate-nowtime;  //剩余时间
              let iftime=1;
              if(remain<0){
                remain=0;
                iftime=0
              }
              Vue.set(item,'time',remain);
              Vue.set(item,'iftime',iftime);
              let timer=setInterval(()=>{
                if(item.time<=0){
                  clearInterval(timer)
                }else{
                  item.time--;
                }
              },1000);
              this.Timer.push(timer);
            }
            this.ifevaluated();
          }).catch(err=>{
            console.log(+err)
          })
        },
        //确认收货 
        comfirm_receipt(id,orderid){
          this.$confirm('您确定要确认收货吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '您已成功确认收货！'
            });
            this.myorderlist.forEach((item,index)=>{
              if(id===index){
                this.clearTimer(id,orderid);
                item.iftime=0;
              }
            });
            
          })
        },
        clearTimer(id,orderid){  //清除定时器
          let num=this.Timer[id];
          clearInterval(num);
          //修改商品的过期时间,传递订单编号_id
          this.axios.get(this.$domain+'/api/orderForm/update',{
            params:{ orderid }
          }).then(res=>{
            console.log(res.data)
          }).catch(err=>{
            console.log(err)
          })
        },
        //查看物流
        looklogistics(){
          this.$router.push({path:'logistics'})
        },
        //立即评价,传递的是用户id和商品id
        evaluatenow(goodsid,goods){
          this.$router.push({ path:'/evaluate',query:{ id:goodsid } })
          this.$store.state.evalgoods=goods;
        },
        //判断是否已评价
        ifevaluated(){
          const userid=localStorage.getItem('userid');
          this.axios.get(this.$domain+'/api/evaluateInfo',{
            params:{
              userid
            }
          }).then(res=>{
            //存储被评价了的商品编号
            let list=res.data;
            let goodsidlist=[];
            for(let item of list){
              goodsidlist.push(item.goodsid)
            }
            for(let item of this.myorderlist){
              Vue.set(item,'ifeval',0);
               for(let i=0;i<goodsidlist.length;i++){
                if(item.goodsid===goodsidlist[i]){
                  item.ifeval=1;
                }
              }   
            }
          }).catch(err=>{
            console.log(err)
          })
        },
        //删除订单,就是把数据库表中数据删除，但this.myorderlist并未删除
        deleteOrder(orderid){
          this.axios.delete(this.$domain+'/api/orderForm',{
            params:{
              orderid
            }
          }).then(res=>{
            console.log(res.data);
            this.initData();
          }).catch(err=>{
            console.log(err)
          })
        }
      },
    mounted(){
      this.initData();
  
    }

  }
</script>

<style lang="scss" scoped>
.container{
  display: flex;flex-direction: column-reverse;
}
.content{
  margin-bottom:20px;
  padding-left: 30px;
  box-sizing: border-box;
  width: 100%;background: white;
  border-radius: 15px;
  h4{
    padding: 20px 0 20px 0;
  }
  ul{
    display: flex;align-items: center;
    li{
      list-style: none;padding-right: 30px;
      img{
        width: 80px;height: 80px;
      }
    }
  }
  .bottom{
    padding-bottom: 20px;
    display: flex;justify-content: flex-end;align-items: center;
    padding-right: 30px;
    span{
      margin-right: 10px;
      color: #cc0033;
    }
  }
}
.empty {
  width: 100%;
  background: white;
  img {
    width: 50%;
    margin-left: 25%;
  }
}
</style>
