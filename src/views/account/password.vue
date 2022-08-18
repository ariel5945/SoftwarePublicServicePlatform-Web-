<template>
  <div class="page-con">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="当前密码" prop="oldpass">
        <el-input type="password" v-model="ruleForm.oldpass" placeholder="请输入当前密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpass">
        <el-input type="password" v-model="ruleForm.newpass" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repeatpass">
        <el-input type="password" v-model="ruleForm.repeatpass" placeholder="请再次输入新密码"></el-input>
      </el-form-item>
      <el-form-item style="display: flex;justify-content: center">
        <el-button style="width: 100px" type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import HTTP from "./../../server/http"
export default {
  name: "passwordView",
  data(){
    return{
      ruleForm: {
        oldpass: "",
        newpass: "",
        repeatpass: "",
      },
      rules:{
        oldpass: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        newpass: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        repeatpass: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    logout() {
      localStorage.clear();
      sessionStorage.clear();
      this.$router.push("/")
      this.$emit("nologin");
      // setTimeout(()=>{
      //   location.reload();
      // },100);
    },
    submitForm(formName){
      if(this.ruleForm.newpass !== this.ruleForm.repeatpass){
        this.$message.error("两次密码不一致！请检查后重新提交！")
        return false
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = "/api/user/updatePassWordByLogin";
          let data = this.ruleForm;
          HTTP.get(url,data,res=>{
            if(Number(res.code) === 0){
              this.$message.success("修改成功")
              this.logout();
            } else {
              this.$message.error(res.msg)
            }
            // console.log();
          },false)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.page-con{
  display: flex;
  justify-content: center;
  padding: 80px 0;
}
.demo-ruleForm{
  width: 360px;
}
</style>