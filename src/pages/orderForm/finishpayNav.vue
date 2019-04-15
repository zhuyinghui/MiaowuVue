<template>
    <div class="container">
      <div>
        <i class="el-icon-success"></i>成功支付
      </div>
      <div>返回首页(正在跳转中...{{seconds}}s)</div>
    </div>
</template>

<script>
    export default {
        name: "finishpayNav",
      data(){
          return{
            seconds:3
          }
      },
      mounted(){
        let time=setInterval(()=>{
          this.seconds--;
          if(this.seconds===0){
            clearInterval(time);
            this.$router.push({path:'/'})
          }
        },1000) ;
      }
    }
</script>

<style scoped>
  .container{
    display: flex;flex-direction: column;align-items: center;
    margin: 20px;font-size: 20px;
  }
  .container div{
    margin-top: 20px;
  }
</style>
