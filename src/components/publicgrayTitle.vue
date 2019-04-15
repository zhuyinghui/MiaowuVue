<template>
  <div class="publicgraytitle" >
    <div @click="backpage" class="back"><i class="el-icon-arrow-left"></i>返回</div>
    <h3><slot></slot></h3>
    <div></div>
  </div>
</template>

<script>
    export default {
        name: "publicgrayTitle",
      methods:{
        backpage(){
          history.back()
        }
      }
    }
</script>
<style scoped>
  .publicgraytitle{
    width: 100%;height: 58px;background: #5e5e5e;color: white;
    border-radius: 5px;
    display: flex;align-items: center;justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .publicgraytitle .back{
    cursor: pointer;
  }
</style>
