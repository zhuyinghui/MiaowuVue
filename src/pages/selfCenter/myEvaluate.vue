<template>
  <div>
    <PublicgrayTitle>我的评价</PublicgrayTitle>
    <div>
        <ul class="evalua" v-for="(item,index) in list" :key="index">
            <li>
                <ul>
                    <li>
                        <img :src="item.goodsimg">
                    </li>
                    <li>商品名称：{{item.goodsname}}</li>
                    <li>单价：{{item.price}}元</li>
                </ul>
            </li>
            <li>评论内容：{{item.words}}</li>
            <li>评分：{{item.grade+item.grade2+item.grade3}}</li>
            <el-button @click="delEvaluate(item.goodsid)" size="small" class="btn">删除评价</el-button>
        </ul>
    </div>
  </div>
</template>
<script>
  import PublicgrayTitle from "../../components/publicgrayTitle2";
  import Vue from 'vue';
export default {
  name: 'myEvaluate',
   components: {PublicgrayTitle},
   data(){
       return{
           list:[],
       }
   },
   methods:{
       getevaluate(){
           const userid=localStorage.getItem('userid')
           this.axios.get(this.$domain+'/api/evaluateInfo',{
               params:{
                   userid
               }
           }).then(res=>{
               this.list=res.data;
               let n=0;
               for(let item of res.data){
                this.axios.get(this.$domain+'/api/goodsList/goods',{
                   params:{
                       goodsid:item.goodsid
                   }
               }).then(res2=>{
                let goods=res2.data[0]
                Vue.set(this.list[n],'goodsname',goods.name[0])
                Vue.set(this.list[n],'price',goods.price[0])
                Vue.set(this.list[n],'goodsimg',this.$domain+'/'+goods.picture)
                n++;
               }).catch(err2=>{
                   console.log(err2)
               })
               }
           }).catch(err=>{
               console.log(err)
           })
       },
       delEvaluate(goodsid){
           const userid=localStorage.getItem('userid')
           this.axios.delete(this.$domain+'/api/evaluateInfo',{
               params:{
                   userid,goodsid
               }
           }).then(res=>{
               this.getevaluate()
           }).catch(err=>{
               console.log(err)
           })
       }
   },
   mounted(){
       this.getevaluate();
   }
}
</script>
<style scope lang="scss">
.evalua{
    background: white;
    width: 100%;
    padding:10px 50px;
    margin-top:5px;
    box-sizing: border-box;
    position: relative;
    li{
        list-style: none;
    }
    img{
        width: 100px;height: 100px;
    }
    ul{
        display: flex;align-items: center;
        li{
            margin-right: 10px;
        }
    }
    .btn{
        position: absolute;right: 50px;bottom: 10px;
    }
}
</style>