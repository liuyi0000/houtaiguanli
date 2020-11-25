<template>
  <div class="table">
    <div
      class="table_style_one"
      :style="{ height: getHeight }"
      style="width: 100%; overflow: auto"
    >
      <slot></slot>
      <el-table
        @selection-change="pl_handleSelectionChange"
        stripe
        :data="tableData"
        :header-cell-style="styleObj"
        v-if="tableConfig"
        sortable="custom"
        @sort-change="changeTableSort"
        :show-header="showHeader"
        ref="tableRef"
        v-loading="loading"
        element-loading-text="加载中..."
      >
        <el-table-column
          v-if="isCheckBox"
          type="selection"
          align="center"
          width="70"
        ></el-table-column>

        <el-table-column
          :label="item.label"
          :prop="item.prop"
          :sortable="item.sortable"
          :fixed="item.fixed"
          :width="item.width"
          :align="item.align"
          :min-width="item.minWidth"
          :header-align="item.headerAlign"
          v-for="(item, index) in tableConfig"
          :key="index"
        >
          <template slot-scope="scope">
            <div
              class="click_div"
              v-if="item.type == 'route'"
              @click="toDetails(item.path, scope.row)"
              @mouseenter="isTip($event, scope.row[item.prop])"
            >
              <i class="tip" v-html="scope.row[item.prop]"></i>
              <span v-html="scope.row[item.prop]" class="add_class"></span>
            </div>
            <div
              class="click_div"
              v-if="item.type == 'routes'"
              @click="item.click.callback(scope.row, scope.column)"
              @mouseenter="isTip($event, scope.row[item.prop])"
            >
              <i class="tip" v-html="scope.row[item.prop]"></i>
              <span v-html="scope.row[item.prop]" class="add_class"></span>
            </div>
            <!-- 详情查看 -->
            <div
              class="click_div"
              v-if="item.type == 'link_fd'"
              @click="toOpenDetails(item.path, scope.row)"
              @mouseenter="isTip($event, scope.row[item.prop])"
            >
              <i class="tip" v-html="scope.row[item.prop]"></i>
              <span v-html="scope.row[item.prop]" class="add_class"></span>
            </div>
            <!--列表页点击获取详情 -->
            <div
              class="click_div"
              v-if="item.type == 'routeB'"
              @click="item.click.callback(item.path, scope.row)"
              @mouseenter="isTip($event, scope.row[item.prop])"
            >
              <i class="tip" v-html="scope.row[item.prop]"></i>
              <span v-html="scope.row[item.prop]" class="add_class"></span>
            </div>
            <div v-if="item.type == 'index'">{{ scope.$index + 1 }}</div>
            <div
              v-if="item.type == 'text'"
              :class="scope.row[item.prop] == '待解答' ? 'nexts' : ''"
              @mouseenter="isTip($event, scope.row[item.prop])"
            >
              <i class="tip" v-html="scope.row[item.prop]"></i>
              <span
                v-html="scope.row[item.prop]"
                style="padding: 0; margin: 0"
              ></span>
            </div>

            <!-- 序号 -->
            <div v-if="item.type == 'orderNumber'">{{ scope.$index + 1 }}</div>
            <!-- 系统消息-事件发生时间 -->
            <div v-if="item.type == 'text-time-icon'">
              <i class="el-icon-time"></i>
              {{ scope.row[item.prop] }}
            </div>
            <div v-if="item.type == 'operate'" class="butClass">
              <el-button
                v-for="(btn, idx) in item.btns"
                :key="idx"
                style="font-size: 14px; border-radius: 0"
                @click="
                  btn.callback({
                    id: scope.row.id ? scope.row.id : '',
                    answerId: scope.row.answerId ? scope.row.answerId : '',
                    exercise_id: scope.row.exercise_id
                      ? scope.row.exercise_id
                      : '',
                    userNum: scope.row.user_num ? scope.row.user_num : '',
                    type_s: scope.row.type_s ? scope.row.type_s : '',
                    status: scope.row.status ? scope.row.status : '',
                    data: scope.row,
                  })
                "
                type="text"
              >
                <!-- {{ btn.text }} -->
                {{
                  scope.row.remarksStatus &&
                  scope.row.remarksStatus == "无" &&
                  btn.text == "编辑备忘录"
                    ? btn.otherText
                    : btn.text
                }}
              </el-button>
            </div>
            <div v-if="item.type == 'operate1'" class="butClass">
              <el-button
                v-for="(btn, idx) in item.btns"
                :key="idx"
                style="font-size: 14px; border-radius: 0"
                @click="
                  btn.callback({
                    id: scope.row.id ? scope.row.id : '',
                    answerId: scope.row.answerId ? scope.row.answerId : '',
                    exercise_id: scope.row.exercise_id
                      ? scope.row.exercise_id
                      : '',
                    userNum: scope.row.user_num ? scope.row.user_num : '',
                    type_s: scope.row.type_s ? scope.row.type_s : '',
                    status: scope.row.status ? scope.row.status : '',
                    data: scope.row,
                  })
                "
                type="text"
              >
                <!-- {{ btn.text }} -->
                {{
                  scope.row.remarksStatus === "有" ? btn.otherText : btn.text
                }}
              </el-button>
            </div>
            <!-- icon -->
            <div v-if="item.type === 'icon'">
              <i
                :class="scope.row.icon"
                v-if="item.level"
                @click="item.click.callback(scope.row)"
                :style="{ color: scope.row.color }"
              ></i>
              <i
                :class="scope.row.icon"
                v-else
                :style="{ color: scope.row.color }"
              ></i>
            </div>
            <!-- switch 开关 -->
            <div v-if="item.type == 'switch'">
              <el-switch
                v-model="scope.row.isShow"
                :active-value="0"
                :inactive-value="1"
                active-color="#284fd1"
                @change="changestate(scope.row)"
                inactive-color="#dae1e5"
              ></el-switch>
            </div>

            <div
              v-if="item.type == 'clicks'"
              @mouseenter="isTip($event, scope.row[item.prop])"
              class="click_div"
            >
              <i class="tip" v-html="scope.row[item.prop]"></i>
              <span
                style="padding: 0; magin: 0"
                :class="{ click_item: scope.row[item.prop] === '有' }"
                @click="item.click.callback(scope.row)"
                v-html="scope.row[item.prop]"
                >{{ scope.row[item.prop] }}</span
              >
            </div>
            <!-- click更改悬浮不显示-->
            <div
              v-if="item.type == 'click'"
              class="click_div"
              @mouseenter="isTip($event, scope.row[item.prop])"
              @click="item.click.callback(scope.row)"
            >
              <i class="tip" v-html="scope.row[item.prop]"></i>
              <span v-html="scope.row[item.prop]" class="click_item"></span>
            </div>
            <div v-if="item.type == 'list'">
              <div
                v-for="(text, index) in scope.row[item.prop]"
                :key="index"
                @mouseenter="isTip($event, text)"
              >
                <i class="tip" v-html="text"></i>
                <span v-html="text" style="padding: 0; magin: 0"></span>
              </div>
            </div>
            <div v-if="item.type == 'jsonlist'">
              <div
                class="click_div"
                v-for="(text, index) in scope.row[item.prop]"
                :key="index"
                @click="item.click.callback(text)"
                @mouseenter="
                  isTip(
                    $event,
                    text.institution_name
                      ? text.institution_name
                      : text.institutionName
                  )
                "
              >
                <i
                  class="tip"
                  v-html="
                    text.institution_name
                      ? text.institution_name
                      : text.institutionName
                  "
                ></i>
                <span class="click_item">{{
                  text.institution_name
                    ? text.institution_name
                    : text.institutionName
                }}</span>
                <br />
              </div>
            </div>
            <!-- 查询系统-诉讼查询添加type值 -->
            <div v-if="item.type == 'jsonlists'">
              <div
                class="click_div"
                v-for="(text, index) in scope.row[item.prop]"
                :key="index"
                @click="item.click.callback(text)"
                @mouseenter="
                  isTip(
                    $event,
                    text.institution_name
                      ? text.institution_name
                      : text.institutionName
                  )
                "
              >
                <i
                  class="tip"
                  v-html="
                    text.institution_name
                      ? text.institution_name
                      : text.institutionName
                  "
                ></i>
                <span
                  class="click_item"
                  v-html="
                    text.institution_name
                      ? text.institution_name
                      : text.institutionName
                  "
                ></span>
                <br />
              </div>
            </div>
            <div v-if="item.type == 'aidlist'">
              <span v-for="(text, index) in scope.row[item.prop]" :key="index">
                <span v-if="typeof text == 'string'">{{ text }}</span>
                <span v-else>
                  <i v-if="index != 0">、</i>
                  {{ text.dicValue }}
                </span>
              </span>
            </div>
            <div v-if="item.type == 'patentlist'">
              <div
                class="click_item"
                v-for="(text, index) in scope.row[item.prop]"
                :key="index"
                @click="item.click.callback(text)"
                @mouseenter="isTip($event, text.institutionName)"
              >
                <i class="tip" v-html="text.institutionName"></i>
                <span class="click_item" v-html="text.institutionName"></span>
                <!-- <div>
                                    {{ text.institutionName }}
                                    <br />
                                </div> -->
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="one-pagination" v-if="pageTotal > pageSize && loading == false">
      <div class="pagination-wrap">
        <el-pagination
          ref="pagination"
          background
          v-if="pageTotal > pageSize"
          :pager-count="page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="propObj.currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, slot, jumper"
          :total="pageTotal"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tableone",
  props: {
    totalPage: Number,
    tableConfig: {
      type: Array,
      default() {
        return [];
      },
    },
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    showHeader: {
      type: Boolean,
      default() {
        return true;
      },
    },
    page: {
      type: Number,
      default: 7,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    resetPaging: { type: Boolean },
    reflowed: { type: Boolean },
    // setHeight:{
    //    type: Boolean
    // },
    getHeight: {
      type: String,
      default: "",
    },
    tableLoading: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      value: "",
      tableHeight: "", // 表格高度
      djd: true,
      styleObj: {
        // background: '#0b1780',
        // color: "#fff",
        // padding: "10px 0"
        // textAlign: 'center'
      },
      propObj: {
        currentPage: 1,
        pageSize: 5,
        prop: "",
        order: "",
      },
      pageTotal: this.totalPage,
      loading: this.tableLoading,
    };
  },
  watch: {
    totalPage(val, oldval) {
      this.pageTotal = val;
    },
    resetPaging(val) {
      // console.log(val)
      this.propObj.currentPage = 1;
    },
    tableData() {
      // this.propObj.currentPage = 1
    },
    reflowed() {
      this.$refs.tableRef.doLayout();
    },
    // getHeight(val){ // 是否需要固定高度
    // debugger
    //   this.tableHeight = this.getHeight
    // }
    tableLoading(val) {
      // loading 监听
      this.loading = val;
    },
  },
  mounted() {
    // debugger
    // console.log(this.getHeight + '子组件值')
  },
  computed: {
    isCheckBox() {
      // 先判断this.tableConfig是一个数组
      const isArray = Array.isArray(this.tableConfig);
      // 判断this.tableConfig[0]是一个对象
      const isObj =
        Object.prototype.toString.call(this.tableConfig[0]) ==
        "[object Object]";
      if (!isArray) return false; // 不是数组返回false
      if (!isObj) return false; // 不是对象返回false
      return this.tableConfig[0].type == "selection"; // 是数组和对象，判断type值是否为selection
    },
    // 列表样式
    // tableStyle() {
    //     return {
    //         height: `calc(100% - ${(this.pageTotal > 10 ? 46 : 0)}px)`
    //     }
    // },
    pagesTotal() {
      return Math.ceil(this.pageTotal / this.propObj.pageSize);
    },
  },
  methods: {
    pl_handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changestate(row) {
      // return this.$store.getters.patentList;
      // console.log(this.$store.state.patentList.switchlist  );
      // console.log(row);
      // console.log(this.tableData);
      let total = 0;
      this.tableData.forEach((item) => {
        if (item.isShow == 0) total += 1;
      });
      if (total < 4) {
        this.$utils.message("error", "首页展示不能少于4个");
        this.tableData.forEach((item) => {
          if (item.id == row.id) item.isShow = 0;
        });
      } else {
        this.$store.state.patentList.switchlist.push(row.id);
      }
    },
    // 跳转到首页
    jumpFirstPage() {
      console.log(this.$refs.pagination);
      this.$refs.pagination.handleCurrentChange(1);
      this.$emit("handleCurrentChange", 1);
    },
    // 跳转到尾页
    jumpLastPage() {
      this.$refs.pagination.handleCurrentChange(this.pagesTotal);
      this.$emit("handleCurrentChange", this.pagesTotal);
    },
    // 切换页码
    handleSizeChange(val) {
      this.propObj.pageSize = val;
      this.$emit("getData", this.propObj);
    },
    handleCurrentChange(val) {
      this.propObj.currentPage = val;
      this.$emit("getData", this.propObj);
    },
    // 跳转到详情页
    toDetails(path, param) {
      // 直接调用$router.push 实现携带参数的跳转
      let query =
        path === "/firmDetail"
          ? {
              id: param.followInstitutionId,
              // areaCode: param.areaCode
            }
          : {
              id: param.institutionid || param.institutionId, // 点击当前列表的数据
              caseId: param.id || param["case_id"],
              expertId: param.expertId,
              case_type: param.useCaseType,
              case_big_type: param.case_big_type,
              agencyId: param.agencyId,
            };
      let routeUrl = this.$router.resolve({
        path,
        query,
      });
      window.open(routeUrl.href, "_blank");
    },
    // 弹出新页面，企业详情，路由跳转 yijon
    toOpenDetails(path, param) {
      let routeUrl = this.$router.resolve({
        name: "FirmDetail",
        query: { id: param.institutionId },
      });
      window.open(routeUrl.href, "_blank");
    },
    changeTableSort({ column, order, prop }) {
      this.$emit("changeTableSort", prop, order);
      this.propObj.currentPage = 1;
    },
    // changeCellStyle (row, column, rowIndex, columnIndex) {
    //     console.log(row, column, rowIndex, columnIndex)
    //     if (row.columnIndex === 2) {
    //         return 'add_class'
    //     } else {
    //         return ''
    //     }
    // }
    /*  sortChange ({ column, prop, order }) {
                      if (prop && order) {
                        this.propObj.prop = prop
                        this.propObj.order = order
                        this.$emit('getData', this.propObj)
                      }
                    }  */
    // 判断是否文字超长
    isTip(e, val) {
      let textWidth = e.target.children[0].scrollWidth; // 文本宽度
      let maxWidth = e.target.offsetWidth; // 容器宽度\\
      e.target.setAttribute("title", ""); // 重置TIP
      // ie浏览器下，超出一行文字省略，其他浏览器超出两行，文字省略
      // e.target.setAttribute('title', val)
      if (textWidth > maxWidth) {
        e.target.setAttribute("title", val);
      }
    },
  },
};
</script>
<style scoped >
  @import '../assets/css/reset.css';
.tip {
  position: absolute;

  opacity: 0;
  white-space: nowrap;
}
.add_class {
  padding: 0;
  margin: 0;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow: hidden;
  text-overflow: ellipsis;
  display: initial;
  border-bottom: 1px solid #284fd1;
  cursor: pointer !important;
  color: #284fd1;
  line-height: 1;
  margin: 0 5px;
}
.click_item {
  padding: 0;
  margin: 0;
}
.click_div {
  position: relative;
  cursor: pointer;
}
</style>
