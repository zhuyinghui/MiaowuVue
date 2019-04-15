<template>
    <div class="container">
      <div>您需要支付{{totalprice}}元</div>
      <el-button type="primary" @click="emitEvent">确定支付</el-button>
    </div>
</template>

<script>
    export default {
        name: "payNav",
        methods:{
          emitEvent(){
            this.$emit('my-event');
            this.$store.commit('addmyorder');
            this.$store.state.submitlist=[]; //清空结算页面的商品信息
          }
        },
      computed:{
        totalprice() {
            return this.$store.getters.totalprice2;
          }
      }
    }
</script>

<style scoped>
.container{
  display: flex;flex-direction: column;align-items: center;
  padding: 20px;
}
  .container div{
    margin-top: 20px;
  }
</style>
