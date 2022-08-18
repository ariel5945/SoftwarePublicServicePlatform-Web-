<template>
  <div>
    <div class="tab-con">
      <span :class="{'active': tabType === 0}" @click="getList(0)">我发布的项目</span>
      <span :class="{'active': tabType === 1}" @click="getList(1)">我参与的项目</span>
    </div>
    <div v-if="dataList.length>0" v-loading="openLoad" style="min-height: 3rem">
      <div class="list-con" v-for="(item,index) in dataList" :key="index">
        <img class="left-img" v-if="item.iconUrl" :src="item.iconUrl" alt="">
        <div class="left-img" v-else>
          <img src="./../../assets/image/nodata.png" alt="">
        </div>
        <div class="div-conter">
          <h3>
            {{ item.title }}
            <el-tag style="margin-left: 20px" type="warning" size="mini">{{item.scale}}</el-tag>
            <el-tag style="margin-left: 20px" type="success" size="mini">{{item.startTime.slice(0,10)}}</el-tag>
          </h3>
          <p class="intro-p">{{ item.description }}</p>
          <span v-if="tabType==0" style="color: #9D9D9D;"><i class="el-icon-time"></i> {{ item.isDel }}</span>
          <span v-else style="color: #9D9D9D;"><i class="el-icon-time"></i> {{ item.createDate }}</span>
        </div>
        <div class="btn-list">
          <div class="right-btn" v-if="item.progress === 0">待审核</div>
          <div class="right-btn-w" v-else-if="item.progress === 1" @click="getRenList(item.id)">查看申请</div>
          <div class="right-btn-ok" v-else-if="item.progress == 3 && item.summary==null && tabType==0" @click="addSummary(item)">补充信息</div>
          <div class="right-btn-text" @click="jumpBtn(item.id)">查看详情</div>
        </div>
      </div>
    </div>
    <el-empty v-else description="暂无数据"></el-empty>

    <div class="page-con">
      <el-pagination
          background
          :page-size="pageSize"
          :page-count="pageNum"
          @current-change="handleIndex"
          layout="prev, pager, next"
          :total="total">
      </el-pagination>
    </div>
    <el-dialog
        title="补充详情"
        :lock-scroll="false"
        :visible.sync="dialogVisible"
        width="400px"
        :before-close="handleClose">
      <div style="padding-right: 50px">
        <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="视频录像">
            <el-upload
                class="avatar-uploader"
                action="https://admin.lyrjfwpt.cn/api/common/upload"
                :show-file-list="false"
                :headers="headerToken"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
              <video v-if="videoUrl" :src="videoUrl" class="avatar"></video>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </el-form-item>
          <el-form-item label="活动现场">
            <!--<div>-->
            <!--  <img v-for="(item,index) in fleList" :key="'img'+index" :src="item" alt="">-->
            <!--</div>-->
            <el-upload
                class="upload-demo"
                action="https://admin.lyrjfwpt.cn/api/common/upload"
                :headers="headerToken"
                :on-remove="handleRemove"
                :on-success="imgsuccess"
                :file-list="fileList"
                list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            </el-upload>

          </el-form-item>
          <el-form-item label="活动总结">
            <el-input type="textarea" v-model="ruleForm.summary"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm()">立即提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import HTTP from "@/server/http";

export default {
  name: "publishSalon",
  data() {
    return {
      tabType: 0,
      headerToken: {
        token: localStorage.getItem("access_token")
      },

      dataList: [],
      applyinfouserList: [],
      dialogVisible: false,
      openLoad: true,

      ruleForm:{
        id: "",
        summary: "",
        createUser: "",
        commemorateBase64: "",
        video: "",
      },
      videoUrl: "",
      fileList: [],
      fleList: [],
      imgList: [],

      total: 0,
      pageSize: 10,
      pageNum: 1,

      createUser: 0,
    }
  },
  methods: {
    jumpBtn(id){
      this.$router.push({
        path: "/salonDetial",
        query:{
          tpId: id
        }
      })
    },

    //
    submitForm(){
      let url = "api/salon/updateSalon";
      let data = this.ruleForm;
      data.commemorateBase64 = this.imgList.join(",")
      HTTP.post(url,data,res=>{
        console.log(res);
      },false);
    },
    imgsuccess(res) {
      this.imgList.push(res.url)
    },
    handleRemove(file, fileList) {
      this.imgList = []
      // console.log(file, fileList);
      fileList.forEach(item=>{
        this.imgList.push(item.response.url)
      })
      console.log(this.imgList)
    },

    addSummary(item){
      this.fleList=[];
      this.dialogVisible =true;
      this.ruleForm.id = item.id;
      this.ruleForm.summary = item.summary;
      this.ruleForm.createUser = item.createUser;
      // this.ruleForm.commemorate = ;
      if(item.commemorate.indexOf(",")>0){
        this.fleList = item.commemorate.split(",")
      } else {
        this.fleList.push(item.commemorate)
      }

      this.ruleForm.commemorateBase64 = item.commemorateBase64;
      this.ruleForm.video = item.video;
      this.videoUrl = item.video;
    },

    handleAvatarSuccess(res, file) {
      this.videoUrl = URL.createObjectURL(file.raw);
      this.ruleForm.video = res.name;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'video/mp4';
      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!isJPG) {
        this.$message.error('上传视频只能是 mp4 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isJPG && isLt2M;
    },

    handleClose(){
      this.dialogVisible =false;
    },
    handleIndex(val){
      this.openLoad = true;
      this.pageNum = val;
      if(this.tabType===0){
        this.getUserList();
      } else {
        this.getUserAlp();
      }
    },
    jumpBat(id){
      this.$router.push({
        path: "/salonDetial",
        query:{
          tpId: id,
        }
      })
    },
    getList(type) {
      this.tabType = type;
      if(type===0){
        this.getUserList();
      } else {
        this.getUserAlp();
      }
    },
    getUserAlp() {
      // createUser=97
      this.dataList=[]
      let url = "/api/salon/selectSalonByApplyUser";
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      HTTP.get(url, data, res => {
        let clearTime = setTimeout(()=>{
          this.openLoad = false;
          clearTimeout(clearTime)
        },500)
        if (res.code === '0') {
          this.dataList = res.data;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },
    getUserList() {
      this.dataList=[]
      let url = "/portal/salon/find";
      let data = {
        createUser: this.createUser,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      HTTP.get(url, data, res => {
        let clearTime = setTimeout(()=>{
          this.openLoad = false;
          clearTimeout(clearTime)
        },500)
        if (res.code === '0') {
          this.dataList = res.data.list;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },

  },
  created() {
    if(localStorage.getItem("user_role")){
      this.createUser = JSON.parse( localStorage.getItem("user_role")).accountId;
      this.getList(0)
    }
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader{
  width: 180px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px #9B9B9B dashed;
}


.tab-con {
  display: flex;
  justify-content: center;
  position: relative;
  height: 30px;
  line-height: 30px;
  margin-bottom: 30px;

  span {
    font-size: 18px;
    padding: 0 30px;
    cursor: pointer;
    color: #9D9D9D;
  }

  span.active {
    color: #3291F8;
  }
}

.tab-con:after {
  position: absolute;
  content: "";
  width: 1px;
  height: 14px;
  top: 8px;
  right: 50%;
  background-color: #9D9D9D;
}

.list-con{
  display: flex;
  width: 100%;
  padding: 14px 14px;
  border-bottom: 1px solid #D6D8DB;
  align-items: center;
  justify-content: space-between;
  .div-conter{
    width: calc(100% - 280px);
  }
  .left-img {
    width: 120px;
    height: 75px;
    margin-right: 14px;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eff0f1;

    img {
      height: 40px;
    }
  }

  h3{
    font-size: 18px;
    font-weight: normal;
    height: 32px;
    display: flex;
    align-items: center;
  }
  p{
    color: #9D9D9D;
    height: 28px;
    line-height: 28px;
  }

}
.right-btn{
  width: 80px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  background-color: rgba(215, 215, 215, 1);
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 10px;
}
.right-btn-ok{
  width: 80px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  background-color: #64C37C;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  margin-bottom: 10px;
}
.right-btn-w{
  width: 80px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  background-color: #FCCA00;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
}

.right-btn-text{
  width: 80px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}

.intro-p{
  width: 100%;
  overflow: hidden;
  ///*文本不会换行*/
  white-space: nowrap;
  ///*当文本溢出包含元素时，以省略号表示超出的文本*/
  text-overflow: ellipsis;
}

.page-con{
  padding-top: 30px;
  display: flex;
  justify-content: center;
}

.btn-list{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>