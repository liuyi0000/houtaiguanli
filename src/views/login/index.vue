<template>
  <div class="longin_wrsp">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm login_from"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
        <el-checkbox
          label="记住密码"
          name="remember"
          v-model="remember"
        ></el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { signIn } from "../../api/login/login";
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatename = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      remember: false,
      ruleForm: {
        name: "",
        pass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        name: [{ validator: validatename, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      //测试版本
      // if (this.ruleForm.name !== "" && this.ruleForm.pass !== "") {
      //   this.$router.push({ path: "/home" });
      //   //  2.提示成功
      //   this.$message({
      //     showClose: true,
      //     message: "登录成功",
      //     type: "success",
      //   });
      // } else {
      //   this.$message({
      //     showClose: true,
      //     message: "用户名和密码不能为空",
      //     type: "error",
      //   });
      // }
      let params ={loginName:this.ruleForm.name,pwd:this.ruleForm.pass}
      signIn({loginName:this.ruleForm.name,pwd:this.ruleForm.pass}).then(res=>{
        console.log(res)
      })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            loginName: this.ruleForm.name,
            pwd: this.ruleForm.pass,
          };
          signIn({
            loginName: this.ruleForm.name,
            pwd: this.ruleForm.pass,
          }).then((res) => {
            console.log(res)
            sessionStorage.setItem("token", "K4RjqkRSdTWiIYf+CEj6yw==");

            if (this.remember) {
              localStorage.setItem("loginName", this.ruleForm.name);
              localStorage.setItem("pwd", this.ruleForm.pass);
            } else {
              localStorage.removeItem("loginName");
              localStorage.removeItem("pwd");
            }

            this.$router.push({ path: "/home" });
          });
          this.$message({
            showClose: true,
            message: "登录成功",
            type: "success",
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    this.ruleForm.name = localStorage.getItem("loginName");
    this.ruleForm.pass = localStorage.getItem("pwd");
    this.remember = Boolean(
      localStorage.getItem("loginName") && localStorage.getItem("pwd")
    );
  },
};
</script>

<style scoped>
.longin_wrsp {
  height: 100%;
  background: #9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_from {
  background: #fff;
  width: 400px;
  padding: 30px;
}
</style>
