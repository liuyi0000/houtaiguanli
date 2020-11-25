<template>
  <div>
    <div class="advisebar">
      <div
        class="ww"
        :title="item.qiaoan"
        v-for="(item, index) in noticeinfo"
        :key="index"
      >
        <!-- <img src="" width="20" height="20" /> -->
        <i class="el-icon-apple" style="width=20px;height=20px"></i>
        <span class="ewwe"
          >公告: [{{ item.daocase }}]{{ item.qiaoan }}</span
        >
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {queryWork1} from "../../api/login/login";
export default {
  name: "PostType",
  data() {
    return {
      noticeinfo: [
        // {
        //   createtime: "2020-06-17",
        //   daocase: "飞车抢劫",
        //   qiaoan:
        //     "近一周，长安/裕华/新华/桥西 共发生抢劫抢夺案件8起，多是趁人不备飞车抢夺,近一周，长安/裕华/新华/桥西 共发生抢劫抢夺案件8起，多是趁人不备飞车抢夺,近一周，长安/裕华/新华/桥西 共发生抢劫抢夺案件8起，多是趁人不备飞车抢夺",
        // },
        // {
        //   createtime: "2018-10-24",
        //   daocase: "盗窃地下室",
        //   qiaoan: "近期，长安/鹿泉/行唐，地下室小房盗窃频繁，多为夜间盗窃",
        // },
      ],
    };
  },
  methods: {
    //公告滚动区
    scroll() {
      this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      setTimeout(() => {
        //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
        var tmparr = this.noticeinfo.splice(0, 1);
        this.noticeinfo = this.noticeinfo.concat(tmparr);
        this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 5000);
      scroll();
    },
    advertising() {
      var _this =this
       queryWork1({})
        .then(function (res) {
          _this.noticeinfo = res;
          setInterval(_this.scroll, 3000);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
  mounted() {
    this.advertising();
  },
};
</script>

<style  scoped>
.advisebar {
  height: 50px;
  border: 1px solid #bfd1e3;
  background: #fffef1;
  line-height: 50px;
  color: #333;
  padding-left: 10px;
  overflow: hidden;
}
.advisebar .ww {
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ewwe {
  color: red;
}
</style>
