<template>
  <main>
    <div class="page-con">
      <h3>{{ title }}</h3>
      <p><span>{{ danwei }}</span></p>
    </div>
    <div class="video-con" v-if="subsvido">
      <video
          class="videoPlayer"
          controls
          :src="subsvido"
          width="100%"
          height="100%"
      ></video>
    </div>
    <div class="video-list">
      <div class="item-con-title">
        <h4>课程章节</h4>
        <div v-if="roleId==37" style="cursor: pointer;" @click="dialogVisible=true">添加章节</div>
      </div>
      <div v-for="(item,index) in videoList" :key="index" @click="getOne(item)" class="item-con">
        <div>{{ item.title }}</div>
        <div><div v-if="roleId==37" style="cursor: pointer;" @click="JumpExam()">立即测试</div></div>
      </div>
      <!--111-->
    </div>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :lock-scroll="false"
        width="40%"
        :before-close="handleClose">
      <div style="display: flex;justify-content: center">

        <el-form :model="ruleFormList[0]" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="小节标题:" prop="title">
            <!-- 标题 -->
            <el-input v-model="ruleFormList[0].title" autocomplete="off" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="视频链接:" prop="title">
            <!-- 标题 -->
            <el-input v-model="ruleFormList[0].link" autocomplete="off" placeholder="请输入链接地址"></el-input>
          </el-form-item>
          <el-form-item label="相关试题:">
            <el-upload
                class="upload-demo"
                drag
                action="https://admin.lyrjfwpt.cn/api/train/createTraining"
                multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <div style="display: flex;justify-content: center">
              <el-button style="width: 120px;margin-left: -50px" type="primary" @click="submitFormQr()">发布
              </el-button>
            </div>

            <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
          </el-form-item>
        </el-form>
      </div>

    </el-dialog>
  </main>
</template>

<script>
import HTTP from "./../../server/http"
export default {
  name: "videoDetail",
  data(){
    return{
      id: 1,
      title: "",
      danwei: "",
      // time: "2022-03-25",
      subsvido: "",

      dialogVisible: false,
      dialogVisible1: false,

      videoList: [],
      ruleFormList: [
        {title: "",link: "",sort: 1},
      ],

      roleId: 0
    }
  },
  methods:{
    JumpExam(){
      this.$router.push("/onlineTraining/exam")
    },

    handleClose(){
      this.dialogVisible = false;
    },
    getVideo(){
      let url = "api/train/subjectDetail";
      let data = {
        subjectId: this.id,
      }
      HTTP.get(url,data,res=>{
        this.videoList = res.data;
        this.getOne(this.videoList[0]);
        // console.log(res);
      },false);
    },
    getOne(param){
      // console.log(param);
      this.title = param.title;
      this.subsvido = param.link;
    },
    submitFormQr() {
      let url = "/api/train/uploadVideo";
      let data = this.ruleFormList;
      data[0].subjectId = this.id;
      // console.log(data)
      // return
      HTTP.post(url, data, res => {
        console.log(res)
        this.getVideo();
        this.handleClose()
        // this.dialogVisible = false;
        this.$message.success("提交发布审核");
      }, false)
    },
  },
  created() {
    this.id = this.$route.query.videoId;
    this.danwei = this.$route.query.title;
    if(JSON.parse(localStorage.getItem("user_role"))){
      this.roleId = JSON.parse(localStorage.getItem("user_role")).roleId;
    }
    // loginAccountId
    // console.log(this.id )
    this.getVideo();
  }
}
</script>

<style scoped lang="scss">
main{
  padding: 1.7rem 30px 0;
  display: flex;
  //justify-content: center;
  align-items: center;
  flex-direction: column;

  .page-con{
    width: 100%;
    max-width: 1200px;

    h3{
      color: #101010;
      height: 24px;
      line-height: 24px;
      margin-bottom: 16px;
      font-size: 18px;
      font-weight: normal;
    }
    p{
      color: #939393;
      margin-bottom: 60px;

      span{
        margin-right: 20px;
      }
    }
  }
}

.video-con{
  width: 1200px;
  height: 675px;
  background-color: #ffffff;
  margin-bottom: 58px;
  border-radius: 4px;
}

.video-list{
  width: 1200px;
  //height: 675px;
  background-color: #ffffff;
  //margin-bottom: 58px;
  border-radius: 4px;
  padding: 58px 64px;
}

.item-con{
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-left: 2px solid #3291F8;
  height: 24px;
  line-height: 24px;
  margin-bottom: 32px;
  padding-left: 12px;
  cursor: pointer;
}

.item-con-title{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}

</style>
