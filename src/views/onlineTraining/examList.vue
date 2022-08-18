<template>
  <main>
    <div class="tip-con">
      请您认真阅读 <router-link to="/help">《洛阳软件公共服务平台帮助中心》</router-link> , 了解作为开发者如何规范地在平台上参与项目，参与下列考试
    </div>
    <div class="body-con">
      <div>
        <h3>
          <div>
            <div v-for="(item, index) in shitiList" :key="index" class="asdnm">
              <div class="left">
                <p class="left_name">{{ item.title }}</p>
                <p class="left_top">{{ item.company }}</p>
                <p class="left_nav">类型:{{ item.var }}</p>
                <p class="left_tune">
                  <span>{{ item.userName }}</span>|<span>{{item.createTime}}</span>
                </p>

              </div>
              <div class="right">
                <el-button type="primary" @click="gotoExam(item.id)">去考试</el-button>
              </div>
            </div>
          </div>
        </h3>
      </div>
      <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :page-size="pageSize"
          :page-count="pageNum"
          :total="count"
      >
      </el-pagination>

      <el-dialog title="上传试题" width="40%" :visible.sync="open">
        <!--:visible指的是属性绑定，表示弹框的显示隐藏-->
        <el-steps :active="active" finish-status="success" simple>
          <el-step title="填写信息"></el-step>
          <el-step title="上传试题"></el-step>
        </el-steps>
        <div class="el-dialog-div">
          <el-form ref="editForm" :model="editForm" label-width="100px" style="margin-top: 20px; margin-right: 40px">
            <el-form-item v-if="active === 0" label="标题: " prop="title">
              <!--当active为0时显示控件-->
              <el-input v-model="editForm.title" placeholder="考试标题"/>
            </el-form-item>
            <el-form-item v-if="active === 0" label="分类" prop="varId">
              <!--当active为0时显示控件-->
              <el-select v-model="editForm.varId" placeholder="请选择">
                <el-option v-for="(item,index) in mainTabs" :key="'opt'+index" :label="item.var" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="active === 0" label="及格分数" prop="passscore">
              <!--当active为0时显示控件-->
              <el-input v-model="editForm.passscore" placeholder="及格分數"/>
            </el-form-item>
            <el-form-item v-if="active === 0" label="考试时长" prop="examTime">
              <el-select v-model="editForm.examTime" placeholder="请选择">
                <el-option label="10分钟" :value="10"></el-option>
                <el-option label="20分钟" :value="20"></el-option>
                <el-option label="30分钟" :value="30"></el-option>
                <el-option label="40分钟" :value="40"></el-option>
                <el-option label="50分钟" :value="50"></el-option>
                <el-option label="60分钟" :value="60"></el-option>
              </el-select>
              <!--当active为0时显示控件-->
            </el-form-item>
            <el-form-item
                v-if="active === 1"
                label="上传试题: "
                prop="test"
            >
              <!--当active为1时显示控件-->
              <div style="display: flex;align-items: center">
                <el-upload
                    drag
                    class="upload-con"
                    ref="uploadExcel"
                    action="https://admin.lyrjfwpt.cn/api/train/createTraining"
                    :show-file-list="false"
                    :headers="headerToken"
                    :auto-upload="false"
                    accept=".xlsx"
                    :before-upload="beforeUploadFile"
                    :on-change="fileChange"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    将文件拖到此处，或<em>点击上传</em>
                  </div>
                  <div class="el-upload__tip" slot="tip">
                    只能上传xlss.xlsx文件
                  </div>
                </el-upload>
                <!--<span class="down-btn" @click="anstall()">下载考试模板</span>-->
              </div>
            </el-form-item>
            <el-form-item
                v-if="active === 1"
                label="内容"
                prop="textarea1"
            >
              <el-input
                  type="textarea"
                  :rows="0.1"
                  placeholder="请输入内容"
                  v-model="editForm.textarea1"
                  :autosize="{ minRows: 1, maxRows: 2 }"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="display: flex;justify-content: flex-end">
          <el-button
              type="primary"
              plain
              @click="prve"
              v-if="active === 1 || active === 2"
          >上一步
          </el-button>
          <!--当active为1或2时显示按钮，点击执行prve方法-->
          <el-button
              type="primary"
              plain
              @click="next()"
              v-if="active === 0"
          >下一步
          </el-button>
          <!--当active为1或0时显示按钮，点击执行next方法-->
          <el-button type="primary" @click="submitForm()" v-if="active === 1">提交</el-button>
          <!--调用submitForm方法，关闭对话框-->
        </div>
      </el-dialog>

    </div>
  </main>
</template>

<script>
import HTTP from "./../../server/http"
export default {
  name: "examView",
  data(){
    return{
      tabActive: 0,
      roleId: 37,
      shitiList: [],
      mainTabs: [],
      headerToken: {
        token: localStorage.getItem("access_token")
      },

      pageSize: 10,
      pageNum: 1,
      count: 0,
      countDet: 0,

      open: false,
      active: 0, //定义并设置active初始值
      editForm: {
        title: "",
        varId: "",
        passscore: "",
        examTime: "",
      },
    }
  },
  methods:{
    // 考试分类
    anifuns() {
      let url = "/portal/training/var";
      let data = {}
      HTTP.get(url,data,res=>{
        this.mainTabs = res.data;
      },false)
    },
    prve() {
      --this.active; //active自减一
      if (this.active < 0) this.active = 0; //设置active最小值
    },
    //  添加發佈
    next() {
      ++this.active;
      if (this.active > 2) this.active = 2;
      let ass = {
        title: `${this.editForm.title}` ,
        varId: `${this.editForm.varId}`,
        passscore: `${this.editForm.passscore}`,
        examTime: `${this.editForm.examTime}`,
      };
      this.$apiFun.goodpassscore(ass).then((item) => {
        console.log(item.data.trainingId, "考试1");
        console.log(item);
        this.ids = item.data.trainingId;
      });
    },

    gotoExam(id){
      this.$router.push({
        path: "/onlineTraining/examDetail",
        query:{
          examId: id,
        }
      })
    },

    //上传
    beforeUploadFile(file) {
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== "xlsx") {
        this.$notify.warning({
          title: "警告",
          message: `只能上传Excel（即后缀是.xlsx）的文件`,
        });
      }
      if (size > 10) {
        this.$notify.warning({
          title: "警告",
          message: `文件大小不得超过10M`,
        });
      }
    },

    fileChange(file) {
      this.form.file = file.raw;
    },


    submitForm() {
      this.open = false;
      let formData = new FormData();
      formData.append("file", this.form.file);
      formData.append("trainingId", this.ids);
      //设置open为false关闭dialog对话框
      this.$apiFun.goodmiit(formData).then((item) => {
        console.log(item, "我是123");
      });
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.getArtList()
    },
    //tab
    tableChange(id){
      this.tabActive = id;
      this.getArtList();
    },
    //考试题目
    getArtList() {
      let data = {
        pageNum: this.pageNum,
        companyId: "62",
      }
      let url = "/portal/training/trainingListByCompanyId"
      HTTP.get(url,data,res=>{
        this.count = res.data.count;
        this.shitiList = res.data.list
      },false)
    },
  },
  created() {
    this.anifuns();
    this.getArtList();
  }
}
</script>

<style scoped lang="scss">
main{
  margin-top: 1.7rem;
}
.tip-con{
  width: 98%;
  max-width: 1600px;
  margin: 0 auto 30px;
  background-color: #FFFFFF;
  padding: 20px 60px;
  border-radius: 10px;
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 14%);
  text-align: center;
  color: #939393;

  a{
    color: #3291F8;
  }
}
.body-con{
  width: 98%;
  max-width: 1600px;
  margin: 0 auto;
  background-color: #FFFFFF;
  padding: 50px 60px;
  border-radius: 10px;
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 14%);
}

.appbut {
  border: none;
  background: #fff;
  padding-left: 20px;
  //color: rgba(50, 145, 248, 100);
  color: #333;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
}
.appbutAct{
  color: rgba(50, 145, 248, 100);
}



.asdnm {
  padding-top: 20px;
  border-top: 1px solid #ccc;
  border-left: none;
  border-right: none;
  border-bottom: none;
  display: flex;
  justify-content: space-between;
  margin: 20px auto;


  .left {
    line-height: 25px;
    margin-top: 5px;
  }

  .left p:nth-child(1) {
    margin-top: 10px;
  }
}

.left_name {
  color: rgba(11, 11, 11, 100);
  font-size: 20px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.left_top {
  color: rgba(11, 11, 11, 100);
  font-size: 20px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.left_nav {
  color: rgba(157, 157, 157, 100);
  font-size: 16px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.left_tune {
  color: rgba(157, 157, 157, 100);
  font-size: 14px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.dibuttino {
  margin-top: 40px;
  border-radius: 10px;
  line-height: 50px;
  background-color: rgba(50, 145, 248, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
  text-align: center;
  font-family: Microsoft Yahei;
  width: 160px;
  height: 54px;
}

.content_wonfs {
  line-height: 20px;
  border-radius: 10px;
  color: rgba(16, 16, 16, 100);
  font-size: 14px;
  text-align: center;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.14);
  font-family: Roboto;
  background-color: #FFFFFF;
  padding-bottom: 40px;
}

.content_woens {
  display: flex;
  justify-content: space-between;
  margin: auto;
}

</style>