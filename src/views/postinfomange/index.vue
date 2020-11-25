<template>
  <div>
    <div class="block time_color">
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM"
        @change="queryChartData"
      >
      </el-date-picker>
      <el-select v-model="value" selected="selected" clearable placeholder="请选择" @change="queryChartData">
        <el-option
          v-for="item in options"
          :key="item.dtcode1"
          :label="item.dtname1"
          :value="item.dtname1"
        >
        </el-option>
      </el-select>
      <el-select v-model="wheres" selected="selected" clearable placeholder="请选择">
        <el-option
          v-for="item in where"
          :key="item.id"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
      <div @click="zhex" class="font_big"><i class="el-icon-star-on"></i></div>
      <div @click="zhuz" class="font_big"><i class="el-icon-star-off"></i></div>
    </div>

    <div>
      <div id="main" style="width: 1000px; height: 400px" v-show="isShow" v-loading="loading"></div>
      <div
        id="main1"
        style="width: 1000px; height: 400px"
        v-show="!isShow"
        v-loading="loading"
      ></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getCaseAreaList,getCaseTypeList,query110DZLXDic} from "../../api/login/login";
import echarts from "echarts";
export default {
  name: "PostInfoManage",
  data() {
    return {
      loading:false,
      isShow: true,
      value1: "",
      where:[],
      xData:[],
      yDataCall:[],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      wheres:"",
      value: "侵财",
    };
  },
  watch: {},
  methods: {
    // 折线图
    myEcharts() {
      var myChart = echarts.init(document.getElementById("main"));
      var option = {
        xAxis: {
          type: "category",
          // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          data:this.xData
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            // data: [820, 932, 901, 934, 1290, 1330, 1320],
            data:this.yDataCall,
            type: "line",
          },
        ],
      };
      myChart.setOption(option);
    },
    // 柱状图
    myEcharts1() {
      var myChart1 = echarts.init(document.getElementById("main1"));
      var option1 = {
        xAxis: {
          type: "category",
          data: this.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.yDataCall,
            type: "bar",
            barWidth: 20,
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      };

      myChart1.setOption(option1);
    },
    queryChartData(){
      const params = {
        caseType1: '',
        caseType2: '',
        date: this.value1,
      };
      this.loading =true
      getCaseAreaList(params).then(res=>{
          res.list.forEach((item) => {
             this.loading =false
            this.xData.push(item.area_name);
            this.yDataCall.push(item.call_count);
            this.myEcharts();
            this.myEcharts1();
          });
      })
      getCaseTypeList().then(res=>{
        // console.log(res)
        this.options=res.list
      })
    },
    getquery110DZLXDic(){
      let params={
        dtname:'110地址类别'
        }
      query110DZLXDic(params).then(res=>{
        this.where=res
      })
    },
    //折
    zhex() {
      this.isShow = true;
    },
    // 柱
    zhuz() {
      this.isShow = false;
    },
  },
  mounted() {
      this.getquery110DZLXDic()
    this.$nextTick(() => {
      this.queryChartData()
    });
  },
};
</script>

<style  scoped>
.time_color {
  display: flex;
}
.font_big {
  font-size: 30px;
}
</style>
