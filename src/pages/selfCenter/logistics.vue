<template>
  <div>
    <publicgray-title>查看物流</publicgray-title>
    <map-nav></map-nav>
    <div class="content">
      <div class="steps">
        <!-- <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline> -->
      </div>
    </div>

  </div>

</template>

<script>
import Vue from 'vue';
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '04e2d9e82b3450b6a3eeb93caffbd890',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4',
  uiVersion: '1.0.11' // 版本号
});
    import PublicgrayTitle from "../../components/publicgrayTitle";
    import MapNav from "../../components/mapNav";
    export default {
        name: "logistics",
      components: {MapNav, PublicgrayTitle},
      data(){
          return{
            reverse: false,
            activities: [
            {
              content: '【收货地址】湖南省长沙市岳麓区湖南财政经济学院',
              timestamp: ''
            }, {
              content: '已签收',
              timestamp: '2018-04-13 15:45'
            }, {
              content: '派送中',
              timestamp: '2018-04-13 13：30'
            },{
              content:'已揽件',
              timestamp: '2018-04-13 13：28'
            },{
              content:'已发货',
              timestamp: '2018-04-13 13：00'
            },{
              content:'等待商家发货',
              timestamp: '2018-04-13 12：28'
            },{
              content:'买家已付款',
              timestamp: '2018-04-13 10：00'
            }],
            value4: null
          }
      }
    }
</script>

<style lang="scss" scoped>
.content{
  width: 100%;
  .steps{
    background: white;width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
