<template>
    <div class="content">
      <headnav></headnav>
      <div class="navlist">
        <router-link to="food" class="nav">猫粮</router-link>
        <router-link to="thing" class="nav">猫用品</router-link>
        <router-link to="clothes" class="nav">猫服装</router-link>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
  import headnav from '../../components/headNav'
    export default {
        name: "thing",
      components:{
        headnav,
      },
    }
</script>

<style scoped>
.navlist{
 display: flex;
}
.nav{
 display: block;
 height: 40px;
 line-height: 40px;
background: #cc0033;
text-decoration: none;
color:white;
text-align: center;
  box-sizing: border-box;
  flex:1;
}
.nav:hover{
  text-decoration: underline;

}

</style>
