<template>
    <div>
      <div class="oneclass">
        <span class="title">
          {{item.title}}
        </span>
        <div class="city" v-for="it in item.lists" @click="chosedcity(it)">
          {{it}}
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ChinaCity",
      props:['item'],
     methods:{
       chosedcity(name){
         this.$store.state.chosedcity=name;
         this.$store.state.ifcity=false;
       }
     }
    }
</script>

<style lang="scss" scoped>
    .oneclass{
      display: flex;flex-wrap: wrap;margin-top: 10px;
      color: #fff;
      .title{
        width: 100%;
      }
      .city{
        margin-right: 10px;cursor: pointer;
        &:hover{
          color: #cc0033;
        }
      }
      .line{
        width: 100%;height: 1px;background: #ccc;
      }
    }
</style>
