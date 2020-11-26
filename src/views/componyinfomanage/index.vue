<template>
  <div>
    <tableList
      :tableConfig="tableConfig"
      :tableData="tableData"
      :totalPage="pageObj.totalPage"
      @getData="pageMutated"
      :tableLoading="tableLoading"
    ></tableList>
  </div>
</template>

<script type="text/ecmascript-6">
import { queryProportion } from "../../api/login/login";
import tableList from "../../components/TableOne";
export default {
  name: "ComponyInfoManage",
  components: {
    tableList,
  },
  data() {
    return {
      tableConfig: [
        {
          prop: "idcard",
          label: "专利号",
          minWidth: "10%",
          type: "click",
          click: {
            callback: this.clickNo,
          },
        },
        {
          prop: "pid",
          label: "专利名称",
          minWidth: "10%",
          type: "text",
        },
        {
          prop: "idcard",
          label: "专利权人",
          minWidth: "10%",
          type: "click",
          click: {
            callback: this.clickPatentee,
          },
        },
        {
          prop: "qkcount",
          label: "区域",
          minWidth: "6%",
          type: "text",
        },
        {
          prop: "sex",
          label: "所属标准",
          minWidth: "10%",
          type: "list",
        },
        {
          prop: "casenum",
          label: "所属产业（小类）",
          minWidth: "15%",
          type: "text",
        },
        {
          prop: "proportionTime",
          label: "信息来源",
          minWidth: "10%",
          type: "text",
        },
      ],
      tableData: [
        {
          no: "US8571194",
          name: "SENDING AN IDENTIFIER OF A WIRELESS LLLLLLLLLLLLLLLLLLLLLLLLL",
          date: "2016-4-28",
          patentee: "Apple Inc.",
          region: "美国",
          type: "通信系统设备制造",
          standard: ["TS 36.211", "TS 136 211", "TS 36.211"],
          project: ["3GPP", "LTE"],
          source: "ETSI欧洲电信标准化协会",
        },
        {
          no: "US8571194",
          name: "SENDING AN IDENTIFIER OF A WIRELESS LLLLLLLLLLLLLLLLLLLLLLLLL",
          date: "2016-4-28",
          patentee: "Apple Inc.",
          region: "美国",
          type: "通信系统设备制造",
          standard: ["TS 36.211", "TS 136 211", "TS 36.211"],
          project: ["3GPP", "LTE"],
          source: "ETSI欧洲电信标准化协会",
        },
      ],
      pageObj: {
        totalPage: 0,
        currentPage: 1,
        pageSize: 5,
      },
      tableLoading: false
    };
  },
  methods: {
    getQueryProportion() {
       this.tableLoading = true
      let ProporData = {
        proportionType: "",
        searchText: "",
        startTime: "",
        endTime: "",
        pageNo: this.pageObj.currentPage,
        pageSize: this.pageObj.pageSize,
        orderBy: "proportionTime desc,a.idcard",
        caseno: "",
        casename: "",
        username: "",
        idcard: "",
        nativeplace: "",
        excutedep: "",
        casenum: "",
      };
      queryProportion({ whereStr: JSON.stringify(ProporData) }).then((res) => {
         this.tableLoading = false
        this.tableData = res.RESULT.list;
        this.pageObj.totalPage = res.RESULT.sum
      });
    },
    // 页码改变
        pageMutated(pageObj) {
            // console.log(pageObj);
            this.pageObj.currentPage = pageObj.currentPage;
            this.pageObj.pageSize = pageObj.pageSize;
            this.getQueryProportion();
        },
    clickNo() {
      alert(2);
    },
    clickPatentee(){
      this.$router.push({
                path: "/test",
                query: {
                    pageType: "1"
                }
            });
    }
  },
  mounted() {
    this.getQueryProportion();
  },
};
</script>

<style scoped></style>
