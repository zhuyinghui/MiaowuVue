<template>
  <div id="app">
    <el-container>
      <el-aside></el-aside>
      <!--<el-header></el-header>-->
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>
<style>
  *{
    margin: 0;padding: 0;
  }
  #app{
    min-width: 1024px;
    background: #f2f2f2;
  }
  .publicredtitle{
    width: 100%;height: 58px;background: #cc0033;color: white;
    border-radius: 5px;
    display: flex;align-items: center;justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .publicredtitle .back{
    cursor: pointer;
  }
  .redbutton{
    background: #cc0033;color: white;padding: 10px 15px;
    border: none;border-radius: 5px;
  }
</style>
