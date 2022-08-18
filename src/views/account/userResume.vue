<template>
  <div class="body-main">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="ruleForm.userName" placeholder="请输入您的姓名"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="phone">
        <el-upload
            class="avatar-uploader"
            action="https://admin.lyrjfwpt.cn/api/common/upload"
            :show-file-list="false"
            :headers="headerToken"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
          <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar" style="width: 58px;height: 58px">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="ruleForm.sex" placeholder="请选择" style="width: 100%">
          <el-option label="男士" value="1"></el-option>
          <el-option label="女士" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="ruleForm.age" placeholder="请输入您的年龄"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="ruleForm.phone" placeholder="请输入您的联系方式"></el-input>
      </el-form-item>
      <el-form-item label="技术方向">
        <el-select v-model="ruleForm.skillLabel" placeholder="请选择" style="width: 100%">
          <el-option v-for="item in classList.devresumeTag"
                     :key="item.valueDescription"
                     :label="item.valueDescription"
                     :value="item.valueName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作经验" prop="workYears">
        <el-select v-model="ruleForm.workYears" placeholder="请选择" style="width: 100%">
          <el-option label="1年内" :value="1"></el-option>
          <el-option label="1-2" :value="2"></el-option>
          <el-option label="3-4" :value="3"></el-option>
          <el-option label="五年以上" :value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="个人简介">
        <el-input type="textarea" placeholder="请输入您的个人简介" v-model="ruleForm.persoanlProfile"></el-input>
      </el-form-item>
      <el-form-item label="工作经历">
        <el-input type="textarea" placeholder="请输入您的工作经历" v-model="ruleForm.workExperience"></el-input>
      </el-form-item>
      <el-form-item label="上传简历附件">
        <el-upload
            class="upload-demo"
            drag
            action="https://admin.lyrjfwpt.cn/api/common/upload"
            :headers="headerToken"
            :on-success="handleAvatarSuccess1"
            :before-upload="beforeAvatarUpload1"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传不超过5Mb的文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <div style="display: flex;justify-content: flex-end">
          <el-button v-if="ruleForm.id==''" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button v-else type="primary" @click="submitFormSea('ruleForm')">提交</el-button>
        </div>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import HTTP from "@/server/http";

export default {
  name: "userResume",
  data() {
    return {
      headerToken: {
        token: localStorage.getItem("access_token")
      },
      dialogImageUrl: "",
      ruleForm: {
        id: "",
        userName: "",
        sex: 1,
        age: 20,
        phone: "",
        image: "",
        skillLabel: "",
        fileResume: "",
      },
      rules: {},
      classList: [],
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.dialogImageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.image = res.url;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    handleAvatarSuccess1(res) {
      this.ruleForm.fileResume = res.name;
    },
    beforeAvatarUpload1(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = "/api/devresume/addSave";
          let data = this.ruleForm
          HTTP.postForm(url,data,res=>{
            if(res.code == 0){
              this.$message.success("操作成功");
            } else {
              this.$message.error(res.msg);
            }
          },false)

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitFormSea(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = "/api/devresume/editSave";
          let data = this.ruleForm
          HTTP.postForm(url,data,res=>{
            if(res.code == 0){
              this.$message.success("操作成功");
            } else {
              this.$message.error(res.msg);
            }
          },false)

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getClass() {
      let url = "/portal/api/index/getDevresumeTag";
      let data = {};
      HTTP.get(url, data, res => {
        this.classList = res.data;
        // console.log(res)
      }, false);
    },
    getOne() {
      let url = "/api/devresume/getDevResumeByLogin";
      let data = {};
      HTTP.get(url, data, res => {
        this.ruleForm = res.data;
        this.dialogImageUrl = res.data.image;
        // console.log(res)
      }, false);
    },
  },
  created() {
    this.getClass();
    this.getOne();
  }
}
</script>

<style scoped>
.body-main {
  display: flex;
  justify-content: center;
}

.demo-ruleForm {
  width: 60%;
}

.avatar-uploader{
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px #9B9B9B dashed;
}
</style>