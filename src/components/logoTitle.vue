<template>
  <div class="logotitle">
    <span @click="backpage" class="back"><i class="el-icon-arrow-left"></i>返回</span>
    <span class="logo">MiaoWu</span>
    <div></div>
  </div>
</template>

<script>
    export default {
        name: "logoTitle",
      methods:{
          backpage(){
            history.back()
          }
      }
    }
</script>

<style scoped>
  .logotitle{
    width: 100%;background: black;color: white;margin-bottom: 10px;
    display: flex;justify-content:space-between ;
    align-items:center;padding: 0 30px 0 10px;
    box-sizing: border-box;
  }
  .back{
    cursor: pointer;
  }
  .logo{
    font-family: "Segoe Script";font-size: 40px;
  }
</style>
