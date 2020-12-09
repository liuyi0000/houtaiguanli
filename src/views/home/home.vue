<template>
  <div id="app">
    <el-container class="container">
      <el-header class="header">
        <el-row>
          <el-col :span="16" class="headerlogo">
            <div class="grid-content bg-purple" style="cursor:pointer" >
              <img @click="toHome" src ="../../assets/logo.png" style="width: 40px; height: 30px" alt="无法显示图片" />
            </div>
          </el-col>
          <el-col :span="8" class="rightsection">
            <div class="grid-content bg-purple-light">
              <span class="el-dropdown-link userinfo-inner"
                >欢迎您，管理员</span
              >
              <span class="userinfo-inner" style="cursor:pointer" @click="signout">退出</span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="aside">
          <!-- 侧边栏导航  -->
          <!-- unique-opened只展开一个 -->
          <!-- router开启路由模式 -->
          <el-menu
            :unique-opened="true"
            :router="true"
            class="menu"
            background-color=" #6666"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu
              :index="' ' + item1.order"
              v-for="item1 in menuData"
              :key="item1.path"
            >
              <!--表示可以展开的一组 -->
              <template slot="title" @click="clickTitle">
                <!--图标 -->
                <i :class="'el-icon-' + item1.icon"></i>
                <!--文字 -->
                <span>{{ item1.name }}</span>
              </template>
              <el-menu-item
                class="menuItem"
                @click="clickMenuItem"
                v-for="item2 in item1.children"
                :key="item2.path"
                :index="item2.path"
              >
                <i class="el-icon-star-off"></i>
                <!--图标 -->
                <span>{{ item2.name }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Home",
  data() {
    return {
      style: {
        display: "block",
      },
      menuData: [
        {
          name: "企业信息管理",
          order: "1",
          path: "componyinfomanage",
          icon: 's-home',
          children: [
            {
              path: "componyinfomanage",
              name: "企业信息",
            },
          ],
        },
        {
          path: "postinfomange",
          name: "岗位信息管理",
          order: "2",
          icon: 'video-play',
          children: [
            {
              path: "postinfomange",
              name: "岗位信息",
            },
          ],
        },
        {
          path: "orderinfomange",
          name: "订单信息管理",
          order: "3",
          icon: 'user',
          children: [
            {
              path: "orderinfomange",
              name: "订单信息",
            },
          ],
        },
        {
          path: "datamangeinfo",
          name: "数据字典",
          order: "4",
          icon: 'setting',
          children: [
            {
              path: "datamangeinfo",
              name: "岗位类型",
            },
          ],
        },
        {
          path: "test",
          name: "测试",
          order: "5",
          icon: 's-promotion',
          children: [
            {
              path: "test",
              name: "测试1",
            },
          ],
        },
      ],
    };
  },
  methods: {
    //退出
    signout() {
      this.$confirm("退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$router.push({ path: "/" });
      });
    },
    toHome(){
      this.$router.push({ path: "/home" });
    },
    clickMenuItem() {
      console.log("....");
      this.style.display = "none";
    },
    //回到首页
    clickTitle() {
      this.style.display = "block";
    },
  },
  created(){
    let token = sessionStorage.getItem('token');
    console.log(token)
    if (token === null || '') {
      this.$router.push({ path: "/" });
    }
  },
  mounted(){

  }
};
</script>

<style scoped>
#app{
  width: 100%;
  height: 100%;
}
.container {
  height: 100%;
  width: 100%;
}
.header {
  width: 100%;
  background-color: #eeee;
}
.aside {
  background: #666;
  color: #fff;
  height: 100%;
}
.main {
  height: 100%;
  color: #999999;
}
.headerlogo {
  line-height: 60px;
  margin-top: 10px;
}
.rightsection {
  line-height: 60px;
  text-align: center;
}
</style>
