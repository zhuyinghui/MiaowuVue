<template>
  <div class="container">
    <div class="userinfo">
      <publicgray-title>确认收货地址</publicgray-title>
      <div class="useritems">
        <ul class="useritem" v-for="(item,index) in userlists" :key="index">
          <li class="default" v-show="item.default"><i class="el-icon-success"></i></li>
          <li>收货人：{{item.name}}</li>
          <li>收货地址：{{item.region+item.city+item.county+item.detailadr}}</li>
          <li>联系电话：{{item.phone}}</li>
          <li><div @click="deluser(index)">删除</div><div @click="setdefault(index)">设为默认</div></li>
        </ul>
        <div class="useritem useradd"  @click="Visible = true"><i class="el-icon-plus"></i></div>
      </div>
    </div>
    <div class="goodsinfo">
      <publicgray-title>确认订单信息</publicgray-title>
      <div class="content">
        <ul>
          <li>图片</li>
          <li>商品名称</li>
          <li>单价</li>
          <li>邮费</li>
          <li>数量</li>
        </ul>
        <ul v-for="(item,index) in submitlist" :key="index">
          <li><img :src="item.goodsimgs"></li>
          <li>{{item.name[0]}}</li>
          <li>{{item.price[0]}}</li>
          <li>{{item.postage[0]}}</li>
          <li>{{item.count}}</li>
        </ul>
      </div>
    </div>
    <div class="footer" v-if="iffooter">
      <ul class="ending">
        <li>运送方式：送货上门</li>
        <li>发货时间：卖家承诺订单在卖家付款后20小时内发货</li>
        <li>给商家留言:<input type="text"></li>
        <li>合计（含运费）：{{totalprice}}元</li>
        <li>优惠：无</li>
      </ul>
      <ul class="submit">
        <li>实付款：<font>￥{{totalprice}}</font></li>
        <li>寄送至：{{su[0].region}}{{su[0].city}}{{su[0].county}}{{su[0].detailadr}}</li>
        <li>收货人：{{su[0].name}}{{su[0].phone}}</li>
        <li><button class="redbutton" @click="emitEvent">提交订单</button></li>
      </ul>
    </div>
    <!--添加收货人信息弹出框-->
    <el-dialog title="收货地址" :visible.sync="Visible">
      <el-form :model="form">
        <el-form-item label="收货人" :label-width="labelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" :label-width="labelWidth" >
          <el-select v-model="form.regionId" placeholder="请选择省份">
            <el-option  v-for="(item,index) in address" :key="index" :label="item.region" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="form.cityId" placeholder="请选择城市">
            <el-option  v-for="(item,index) in cities" :key="index" :label="item.city" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="form.countyId" placeholder="请选择区县">
            <el-option  v-for="(item,index) in counties" :key="index" :label="item.county" :value="item.id"></el-option>
          </el-select>
          <el-input v-model="form.detailadr" placeholder="详细地址"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="labelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span class="tip1" :class="{'tip':tip}">请输入完整信息！</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="saveinfo(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import PublicgrayTitle from "../../components/publicgrayTitle";
  export default {
    name: "orderForm",
    components: {PublicgrayTitle},
    data(){
      return{
        Visible: false,
        form: {
          name: '',
          region: '',
          city:'',
          county:'',
          detailadr:'',
          regionId:'',
          cityId:'',
          countyId:''
        },
        labelWidth: '80px',
        tip:false,
      };
    },
    methods:{
      emitEvent(){
        this.$emit('my-event');
      },
      saveinfo(form){
        this.counties.forEach(item=>{
          if(item.id===this.form.countyId){
            this.form.county=item.county
          }
        });
        let a=1;
        let {values}=Object;
        for(let item of values(this.form)){
          if(item===''){
            a=0;
            this.tip=true;
          }
        }
        if(a){
          this.Visible = false;
          this.$store.commit('saveuser', JSON.stringify(form));
          this.tip=false;
        }
      },
      cancel(){
        this.Visible = false;
        this.tip=false
      },
      deluser(index){
        this.$store.state.userlist.splice(index,1);
      },
      setdefault(index){
        this.$store.commit('setdefault',index);
      }
    },
    computed:{
      submitlist(){
        return this.$store.state.submitlist
      },
      totalprice(){
        return this.$store.getters.totalprice2
      },
      address(){
        return this.$store.state.address
      },
      cities(){
        let cities=[];
        this.address.forEach(item=>{
          if(item.id===this.form.regionId){
            this.form.region=item.region;
            item.cities.forEach(city=>{
              cities.push(city)
            })
          }
        });
        return cities;
      },
      counties(){
        let counties=[];
        this.cities.forEach(item=>{
          if(item.id===this.form.cityId){
            this.form.city=item.city;
            item.counties.forEach(county=>{
              counties.push(county)
            })
          }
        });
        return counties;
      },
      userlists(){
        return this.$store.state.userlist
      },
      su() {
        return this.$store.state.userlist.filter(item => {
          return item.default === 1
        });
      },
      iffooter(){
        return this.userlists.length
      }
    },
  }
</script>

<style scoped>
  .container{
    padding: 0 50px;
  }
  .title{
    background: #5e5e5e;
  }
  .userinfo{
    display: flex;flex-direction: column;
  }
  .useritems{
    width: 100%;display: flex;flex-wrap: wrap;
  }
  .useritem{
    min-width: 222px;height: 159px;
    border-radius:5px;box-shadow: 3px 3px 5px #ccc;
    background: white;
    margin:2px 5px 10px 0;padding: 5px;
    display: flex;flex-direction: column;justify-content: space-around;
    position: relative;
  }
  .useritem li{
    list-style: none;display: flex;
  }
  .useritem li div{
    color: dodgerblue;margin-right:10px;cursor: pointer;
    font-size: 13px;
  }
  .useritem .default{
    position: absolute;top: 5px;right: 5px;font-size: 30px;
    color: white;background: dodgerblue;border-radius: 50%;
    padding: 1px;
  }
  .useradd{
    font-size: 70px;display: flex;justify-content: center;align-items: center;
    color: #5e5e5e;
  }
  h3{
    margin:10px;
  }
  .content{
    width: 100%;
  }
  .content ul{
    display: flex;background: white;
    height: 120px;margin: 10px;
  }
  .content ul:first-child{
    display: flex;
    height: 48px;background: #f2f2f2;
  }
  .content ul li{
    list-style: none;width: 130px;
    display: flex;justify-content: center;align-items: center;
    font-size: 14px;
  }
  .content ul li img{
    height: 75px;width: 100px;
  }
  .footer{
    width: 100%;display: flex;flex-direction: column;align-items: flex-end;
  }
  .ending,.submit{
    height: 140px;
    display: flex;flex-direction: column;align-items: flex-end;justify-content: space-around;
  }
  .ending li{
    font-size: 14px;list-style: none;
  }
  .submit{
    border-radius: 5px;padding: 10px;
    border: 1px solid #cc0033;background: white;
    margin-bottom: 30px;
  }
  .submit li{
    font-size: 16px;list-style: none;
  }
  .submit li font{
    font-weight: bold;font-size: 20px;color: #cc0033;
  }
  .tip1{
    color: white;
  }
  .tip{
    color:red;margin-left: 35%;
  }
</style>

