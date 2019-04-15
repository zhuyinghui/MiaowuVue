<template>
  <div class="amap-wrapper">
    <el-amap class="amap-box" vid="amapDemo" :center="center" :map-manager="AMapManager" :zoom="zoom" :events="events"></el-amap>
  </div>
</template>

<script>
  import { AMapManager } from 'vue-amap';
    export default {
      name: "mapNav",
      data() {
        return {
          zoom: 12,
          center: [112.925000, 28.205000],
          AMapManager,
          events: {
            init(map) {
              AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
                const marker = new SimpleMarker({
                  iconLabel: 'O',
                  iconStyle: 'red',
                  map: map,
                  position: map.getCenter()
                });
              });
            }
          }
        }
      }
    }
</script>

<style scoped>
  .amap-wrapper {
    width: 100%;
    height: 400px;
  }
</style>
