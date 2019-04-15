<template>
  <div>
    <el-steps :active="active" finish-status="success" class="step">
      <el-step title="确认订单"></el-step>
      <el-step title="确认支付"></el-step>
      <el-step title="完成支付"></el-step>
    </el-steps>
    <orderNav @my-event="next" v-if="active===0"></orderNav>
    <payNav @my-event="next" v-if="active===1"></payNav>
    <finishpayNav v-if="active===2"></finishpayNav>
  </div>
</template>

<script>
  import orderNav from './orderNav'
  import PayNav from "./payNav";
  import finishpayNav from './finishpayNav'
  export default {
    name: "orderForm",
    data(){
      return{
        active:0
      }
    },
    components:{
      finishpayNav,
      PayNav,
      orderNav
    },
    methods:{
      next() {
        this.active++
      },
    }
  }
</script>

<style scoped>
.step{
  padding: 10px 200px;
}
</style>
