<template>
  <div>
    <baidu-map  id="allmap" :scroll-wheel-zoom="true" @ready="mapReady">
      <bm-marker :position="point" animation="BMAP_ANIMATION_BOUNCE">
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "OrderInfoManage",
  data() {
    return {
      point: "",
    };
  },
  methods: {
    mapReady({ BMap, map }) {
      this.point = new BMap.Point(114.373485,36.110373);
      map.centerAndZoom(this.point, 12);
    },
  },
};
</script>

<style  scoped>
/* 设定地图的大小 */
#allmap {
  height: 1000px;
  width: 1500px;
  margin: 0 auto;
  overflow: hidden;
}
</style>
