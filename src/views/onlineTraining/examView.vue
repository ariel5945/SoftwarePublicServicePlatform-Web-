<template>
  <main>
    <div class="tip-con">
      请您认真阅读 <router-link to="/help">《洛阳软件公共服务平台帮助中心》</router-link> , 了解作为开发者如何规范地在平台上参与项目，参与下列考试
      <span v-if="roleId==37" style="margin-left: 30px;color: #3A62D7" @click="dialogVisible=true">添加试题</span>
    </div>
    <div class="body-con">
      <el-row :gutter="20">
        <el-col :lg="4" :md="12" v-for="(item, index) in mainTabs" :key="'title'+index">
          <div class="appbut" @click="tableChange(item.id)">
            <p>{{ item.var }}</p>
            <span>点击开始{{ item.var }}测试</span>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog
        title="上传试题"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="及格分">
          <el-input v-model="formData.passscore"></el-input>
        </el-form-item>
        <el-form-item label="试题类型">
          <el-select v-model="formData.varId" placeholder="请选择">
            <el-option v-for="(item,index) in mainTabs" :key="'var'+index" :label="item.var" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试时间">
          <el-select v-model="formData.examTime" placeholder="请选择">
            <el-option label="10分钟" :value="10"></el-option>
            <el-option label="20分钟" :value="20"></el-option>
            <el-option label="30分钟" :value="30"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试题文件" prop="describes">
          <!--:on-success="handleAvatarSuccess"-->
          <!--:headers="headerToken"-->
          <!--action="https://admin.lyrjfwpt.cn/api/common/uploadZipFile"-->
          <!--@on-change="fileChange"-->
          <el-upload
              class="upload-demo"
              drag
              action=""
              :on-change="fileChange"
              :http-request="httpRequest"
              multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <!--<el-button>取消</el-button>-->
        </el-form-item>
      </el-form>

    </el-dialog>
  </main>
</template>

<script>
import HTTP from "./../../server/http"
export default {
  name: "examList",
  data(){
    return{
      mainTabs: [],
      dialogVisible: false,
      headerToken: {
        token: localStorage.getItem("access_token")
      },
      fileUrl: "",
      formData: {},
      roleId: 36,
    }
  },
  methods:{
    handleClose(){
      this.dialogVisible = false;
    },
    onSubmit(){
      let url = "/api/train/createTraining";
      let data = this.formData;
      HTTP.post(url,data,res=>{
        // console.log(res.data.trainingId)
        let url = "/api/train/uploadExam?trainingId="+res.data.trainingId;
        let param = new FormData();
        param.append('file', this.fileUrl)
        // let data = {
        //   file: param,
        // }
        HTTP.fileForm(url,param,()=>{
          // console.log(res)
          this.handleClose();
        },false)
      },false)
    },
    handleAvatarSuccess(res) {
      this.fileUrl = res.url;
    },

    fileChange(file){
      // console.log(fileList)
      this.fileUrl = file.raw;
    },
    httpRequest(){

    },


    // 考试分类
    anifuns() {
      let url = "/portal/training/var";
      let data = {}
      HTTP.get(url,data,res=>{
        this.mainTabs = res.data;
      },false)
    },
    //tab
    tableChange(id){
      this.$confirm("是否确认开始考试",'提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        lockScroll: false,
        type: 'warning'
      }).then(() => {
        this.$router.push({
          path: "/onlineTraining/examDetail",
          query:{
            examId: id,
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });


    },

  },
  created() {
    this.anifuns();
    if(JSON.parse(localStorage.getItem("user_role"))){
      this.roleId = JSON.parse(localStorage.getItem("user_role")).roleId;
    }
  }
}
</script>

<style scoped lang="scss">
main{
  margin-top: 1.5rem;
}
.tip-con{
  width: 98%;
  max-width: 1600px;
  margin: 0 auto 40px;
  background-color: #FFFFFF;
  padding: 20px 60px;
  border-radius: 6px;
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 14%);
  text-align: center;
  color: #939393;

  a{
    color: #3291F8;
  }
}
.body-con{
  width: 96%;
  max-width: 1600px;
  margin: 0 auto;
  min-height: 400px;
}

.appbut {
  font-weight: bold;
  font-size: 22px;
  text-align: left;
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 2.4rem;
  justify-content: center;
  align-items: center;
  background-color: #3291F8;
  position: relative;
  overflow: hidden;
  background-image: url("./../../assets/image/exam-btn.png");
  background-size: 100% 100%;
  border-radius: 6px;

  p{
    //background-color: #FBE251;
    color: #FFFFFF;
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin-bottom: 20px;

  }
  span{
    color: #FFFFFF;
    font-size: 16px;
  }
}
.appbutAct{
  color: #3291F8;
}


</style>



