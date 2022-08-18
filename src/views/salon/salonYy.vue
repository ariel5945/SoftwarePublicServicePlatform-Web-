<template>
  <main>
    <div class="body-con">
      <h3>活动预约</h3>
      <el-form label-width="100px" :model="formData" style="width: 50%" :rules="rules" ref="ruleForm">
        <el-form-item label="预约时间：" style="width: 100%;">
          <div style="display: flex;align-items: center">
            <el-input
                v-model="yyTime"
                disabled
                placeholder="选择预约时间"
            ></el-input>
            <div class="selcet-time" @click="dialogVisible =true">
              <i class="el-icon-date "></i>
              点击选择
            </div>

          </div>

        </el-form-item>
        <el-form-item label="企业名称：" prop="firmName">
          <el-input
              v-model="formData.firmName"
              placeholder="请填写企业名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="username">
          <el-input
              placeholder="请填写联系人姓名"
              v-model="formData.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone">
          <el-input
              v-model="formData.phone"
              placeholder="请填写手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动标题：" prop="title">
          <el-input
              v-model="formData.title"
              placeholder="请填写活动标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动规模：">
          <el-select v-model="formData.scale" placeholder="请选择活动规模" style="width: 100%">
            <el-option label="0-10" value="0-10"></el-option>
            <el-option label="10-50" value="10-50"></el-option>
            <el-option label="50-100" value="50-100"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="活动展示：">
          <el-upload
              class="avatar-uploader"
              list-type="picture-card"
              action="https://admin.lyrjfwpt.cn/api/common/upload"
              :show-file-list="false"
              :headers="headerToken"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="dialogImageUrl" :src="dialogImageUrl" style="width: 100%;height: 100% !important;display: block">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>
        <el-form-item label="活动简介">
          <el-input
              type="textarea"
              resize="none"
              rows="4"
              placeholder="活动简介"
              v-model="formData.description"
          ></el-input>
        </el-form-item>

      </el-form>
      <el-form label-width="100px">
        <el-form-item label="活动介绍：">
          <editorPage @changeContetn="changeContetn" :content="formData.introduction"></editorPage>
          <!--<el-input-->
          <!--    type="textarea"-->
          <!--    resize="none"-->
          <!--    rows="4"-->
          <!--    placeholder="活动内容详细"-->
          <!--    v-model="formData.description"-->
          <!--&gt;</el-input>-->
        </el-form-item>
        <el-form-item>
          <el-button class="subbtn" type="primary" @click="submit('ruleForm')">
            提交信息
          </el-button>
        </el-form-item>
      </el-form>


    </div>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :lock-scroll="false"
        width="500px"
        :before-close="handleClose">
      <div>
        <div class="list-head">
          <ul>
            <li>日</li>
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
          </ul>
        </div>
        <div class="time-body">
          <ul>
            <li v-for="(item,index) in timeListData" :key="index">
              <div class="time-one-con" :class="{'time-act': setTimeParam==item.data}" v-if="item!=null">
                <div class="time-top" :class="{'time-top-none': setD1Param || setD2Param,'time-top-border': item.d1==1 || item.d2==1}" v-if="item.d1==0 || item.d2==0">
                  {{getOneTime(item.data)}}
                </div>
                <div class="time-bottom" v-if="item.d1==0 || item.d2==0">
                  <span class="am-con" :class="{'am-con-act': setD1Param}" v-if="item.d1==0" @click="setTimeData(item,1)">上午</span>
                  <span class="am-con1" v-else>上午</span>
                  <span class="pm-con" :class="{'pm-con-act': setD2Param}" v-if="item.d2==0" @click="setTimeData(item,2)">下午</span>
                  <span class="pm-con1" v-else>下午</span>
                </div>
                <div class="time-top1" v-else>
                  {{getOneTime(item.data)}}
                </div>

              </div>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="cerrtneBtn">确 定</el-button>
      </span>
    </el-dialog>
  </main>
</template>

<script>
import editorPage from "@/components/editorPage";
import HTTP from "./../../server/http"

export default {
  name: "salonYy",
  components: {
    editorPage
  },
  data() {
    return {
      dialogVisible: false,
      timeListData: [],
      setTimeParam: "",
      setD1Param: false,
      setD2Param: false,

      roleId: 36,

      headerToken: {
        token: localStorage.getItem("access_token")
      },

      dialogImageUrl: "", //图片回显
      uploadFiles: "", // img 文件
       // 弹框的出现与否

      base64: "",
      file: "",
      yyTime: "",
      formData: {
        title: "",
        firmName: "",
        scale: "0-10",  // 活动规模
        phone: "",
        username: "",
        endTime: "",
        startTime: "",
        description: "",
        content: "",
        icon: "",
      },
      rules: {
        title:[
          { required: true, message: '请输入活动标题', trigger: 'blur' },
        ],
        firmName:[
          { required: true, message: '请输入举办企业', trigger: 'blur' },
        ],
        username:[
          { required: true, message: '请输入联系人', trigger: 'blur' },
        ],
        phone:[
          { required: true, message: '请输入联系电话', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    if (JSON.parse(localStorage.getItem("user_role"))) {
      this.roleId = JSON.parse(localStorage.getItem("user_role")).roleId;
    }
    this.getTimeList();
  },
  methods: {
    cerrtneBtn(){
      if(this.setD1Param && this.setD2Param){
        this.yyTime = `${this.setTimeParam} 全天`;
        this.formData.startTime = `${this.setTimeParam} 08:00:00`;
        this.formData.endTime = `${this.setTimeParam} 16:00:00`;
      } else if(this.setD1Param && !this.setD2Param){
        this.yyTime = `${this.setTimeParam} 上午`;
        this.formData.startTime = `${this.setTimeParam} 08:00:00`;
        this.formData.endTime = `${this.setTimeParam} 12:00:00`;
      } else if(!this.setD1Param && this.setD2Param){
        this.yyTime = `${this.setTimeParam} 下午`;
        this.formData.startTime = `${this.setTimeParam} 12:00:00`;
        this.formData.endTime = `${this.setTimeParam} 16:00:00`;
      }
      this.dialogVisible = false;
      // this.yyTime = this.setTimeParam
      // this.startTime;
      // this.endTime;
    },
    setTimeData(data,type){
      if(this.setTimeParam != data.data){
        this.setTimeParam = data.data;
        this.setD1Param = false;
        this.setD2Param = false;
      }
      if(type == 1){
        this.setD1Param = !this.setD1Param;
      } else {
        this.setD2Param = !this.setD2Param;
      }
      if(!this.setD1Param && !this.setD2Param){
        this.setTimeParam="";
      }
    },

    handleClose(){
      this.dialogVisible = false;
    },
    getOneTime(time){
      if(time){
        return time.substr(8,2);
      }
    },
    getTimeList(){
      let time1 = new Date();
      // console.log(time1.getDay())

      let url = "/api/salon/getSalonDate"
      let data = {}
      HTTP.get(url,data,res=>{
        this.timeListData = res.data;
        for(let i=0;i<time1.getDay()+1;i++){
          this.timeListData.unshift(null)
        }
        // console.log(res);
      },false);
    },

    changeContetn(data){
      this.formData.introduction = data;
    },

    handleBeforeUpload(file) {
      if (file.type === "image/png" ||
          file.type === "image/gif" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg") {
        this.$notify.warning({
          title: "警告",
          message:
              "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片",
        });
      }
      let size = file.size / 1024 / 1024 / 2;
      if (size > 2) {
        this.$notify.warning({
          title: "警告",
          message: "图片大小必须小于2M",
        });
      }
    },

    handleAvatarSuccess(res,file) {
      this.dialogImageUrl = URL.createObjectURL(file.raw);
      this.base64 = res.name;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.raw.type === "image/jpeg";
      // const isPNG = file.raw.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;

      // if (!isJPG && !isPNG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isLt2M;
    },
    submit(formName) {

      console.log(this.formData.introduction)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.formData;
          data.icon = this.base64
          data = JSON.stringify(data);
          let url = "/api/salon/addSalon"
          HTTP.post(url, data, res => {
            if (res.code == 0) {
              this.$router.push("/userCenter/publishSalon")
              this.$message({
                message: "上传成功",
                type: "success",
              });
            }
          }, false)
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.salon()
    },

  },
}
</script>

<style scoped lang="scss">

.selcet-time{
  margin-left: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: space-between;
  cursor: pointer;

  i{
    font-size: 20px;
  }
}

main {
  padding-top: 1.5rem;
}

.body-con {
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 14%);
  width: 98%;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #FFFFFF;
  padding: 50px 60px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  h3{
    text-align: center;
    margin-bottom: 60px;
    font-size: 32px;
    font-weight: normal;
  }
}

.list-head ul{
  display: flex;
  width: 100%;

}
.list-head ul li{
  width: 14%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px transparent solid;
}
.time-body ul{
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.time-body ul li{
  width: 14%;
}

.time-one-con:hover{
  border: 1px #ddd solid;
}
.time-one-con:hover .time-top{
  display: none;
}
.time-one-con:hover .time-bottom{
  display: flex;
  height: 100%;
  width: 100%;
}

.time-top{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.time-act .time-top-none{
  display: none;
}
.time-act .time-bottom{
  display: flex;
}

.time-top-border{
  border: 1px #909399 solid;
  border-radius: 2px;
}
.time-top1{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  //border: 1px #909399 solid;
  background-color: #909399;
  color: #FFFFFF;
  border-radius: 2px;
}

.time-bottom{
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px #3291F8 solid;
  border-radius: 2px;
}
.time-act{
  border: 1px #3291F8 solid !important;
}
.time-one-con{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 60px;
  border: 1px transparent solid;
  border-radius: 2px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;

  span{
    //position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.am-con{
  width: 50%;
  height: 100%;
}
.am-con1,.pm-con1{
  width: 50%;
  height: 100%;
  word-wrap: break-word;
  font-size: 12px;
  display: flex;
  position: relative;
  color: #FFFFFF;
  background-color: #909399;
}
.time-act .am-con-act{
  background-color: #67c23a !important;
  color: #FFFFFF !important;
}
.time-act .pm-con-act{
  background-color: #67c23a !important;
  color: #FFFFFF !important;
}

//.am-con1:after,.pm-con1:after{
//  position: absolute;
//  content: "";
//  width: 100%;
//  height: 100%;
//  background-color: rgba(0,0,0,.6);
//}
.pm-con1{
  width: 50%;
  height: 100%;
  word-wrap: break-word;
  font-size: 12px;
  //background-color: #5d5d5d;
}

.pm-con{
  width: 50%;
  height: 100%;
}
.am-con:hover,.pm-con:hover{
  background-color: #3291F8;
  color: #FFFFFF;
}

</style>