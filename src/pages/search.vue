<template>
    <div>
      <div class="top">
        <logo-title></logo-title>
        <input placeholder="搜索商品" v-model="search" class="search"></input>
        <el-button type="primary">搜索</el-button>
      </div>
        <h3>搜索结果</h3>
      <div class="reasult" v-if="aftersearch.length">
          <goods-nav v-for="(item,index) in aftersearch" :key="index" :item="item"></goods-nav>
      </div>
      <div v-else>暂无搜索结果</div>
    </div>
</template>

<script>
  import goodsNav from '../components/goodsNav'
  import headnav from '../components/headNav'
  import logoTitle from '../components/logoTitle'
    export default {
        name: "search",
      data(){
          return{
            aftersearch:[],
            search:''
          }
      },
      components:{
        logoTitle,goodsNav,headnav
      },
      computed:{
          goodslist(){
            return this.$GoodsList
          }
      },
      watch:{
          search:{
            handler:function(val){
              this.aftersearch=[];
              let reg=new RegExp(val);
              for(let item of this.goodslist){
                if(item.name[0].match(reg)!==null){
                  this.aftersearch.push(item)
                }
              }
            },
            deep:true
          }
      },
      mounted(){
        this.aftersearch=this.goodslist
      }

    }
</script>

<style scoped>
  .top{
    width: 100%;text-align: center;;
  }
.reasult{
  width: 100%;display: flex;flex-wrap: wrap;justify-content: flex-start;
}
  .title{
    background: #5e5e5e;
  }
.search{
  width: 200px;height: 30px;border-radius: 5px;
  margin-right: 5px;
  padding: 2px 0 2px 20px;
}
</style>
