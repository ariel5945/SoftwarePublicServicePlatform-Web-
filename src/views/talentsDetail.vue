<template>
  <main>
    <div class="body-con">
      <div style="width: 100%">
        <div class="list-con">
          <div v-if="roleId == 37" style="display: flex;justify-content: flex-end;width: 100%;margin-bottom: 20px">
            <el-button type="primary" @click="dayinBtn">打印简历</el-button>
            <a class="down-btn" :href="dataDet.fileResumeUrl">下载附件</a>
          </div>
          <div style='opacity: 0.11'></div>
          <h3 style="margin-bottom: 40px;text-align: center">个人简历</h3>

          <!--<el-divider></el-divider>-->
          <!--startprint-->
          <div class="table-body">
            <div style="width: calc(100% - 140px);">
              <!--简历第一行-->
              <div class="table-item">
                <div>
                  <div class="laber-con"><span style="margin-right: 36px">姓</span>  名</div>
                  <div class="table-item-con">{{ dataDet.userName }}</div>
                </div>
                <div>
                  <div class="laber-con"><span style="margin-right: 36px">年</span> 龄</div>
                  <div class="table-item-con">{{ dataDet.age }}</div>
                </div>
              </div>
              <!--简历第二行-->
              <div class="table-item">
                <div>
                  <div class="laber-con">技术方向</div>
                  <div class="table-item-con">{{ dataDet.skillLabel }}</div>
                </div>
                <div>
                  <div class="laber-con">工作经验</div>
                  <div class="table-item-con">{{ dataDet.workYears }}年</div>
                </div>
              </div>
              <!--简历第三行-->
              <div class="table-item">
                <div>
                  <div class="laber-con">联系方式</div>
                  <div class="table-item-con">{{ dataDet.phone }}</div>
                </div>
              </div>
            </div>

            <!--右侧头像-->
            <div class="table-head-img">
              <img v-if="dataDet.image" :src="dataDet.image" alt="">
              <img v-else-if="dataDet.sex==='男'" src="./../assets/image/head2.jpg" alt="">
              <img v-else-if="dataDet.sex==='女'" src="./../assets/image/head1.jpg" alt="">
              <!--<span>{{dataDet}}</span>-->
            </div>
          </div>
          <div class="hidd-body">
            <div class="laber-con">个人简介</div>
            <div class="per-div" v-html="dataDet.persoanlProfile"></div>
          </div>

          <div class="hidd-body">
            <div class="laber-con">工作经历</div>
            <div class="per-div" v-html="dataDet.workExperience"></div>
          </div>
        </div>
        <div style="opacity: 0.12"></div>


        <!--endprint-->
      </div>


      <!--<div class="right-con">-->
      <!--  <div class="user-con">-->
      <!--    <img :src="userData.userImgUrl">-->
      <!--    <router-link to="/userCenter/userResume" v-if="roleId===39" class="fb-btn">我的简历</router-link>-->
      <!--  </div>-->

      <!--</div>-->
    </div>

  </main>
</template>

<script>
import HTTP from "./../server/http"

export default {
  name: "epibolyDetail",
  data() {
    return {
      detailId: 0,

      dialogVisible: false,
      dialogImageUrl: "",
      headerToken: {
        token: localStorage.getItem("access_token")
      },
      form: {
        epibolyRole: 37,
      },

      roleId: 36,
      classList: [],
      yearList: {
        rangeYears: [],
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      title: "",

      workYears: null,
      rangeYears: null,
      skillLabel: null,

      userData: {},

      dataDet: {},
    }
  },
  methods: {

    handleClose() {
      this.dialogVisible = false;
    },
    getClass() {
      let url = "/portal/api/index/getDevresumeTag";
      let data = {};
      HTTP.get(url, data, res => {
        this.classList = res.data;
        // console.log(res)
      }, false);
    },
    getYearList() {
      let url = "/portal/api/index/getRangeYears";
      let data = {};
      HTTP.get(url, data, res => {
        this.yearList = res.data;
        this.getOne()
        // console.log(res)
      }, false);
    },
    getClassName(data) {
      let name = ""
      this.yearList.rangeYears.forEach((item) => {
        if (item.valueName == data) {
          // console.log(item)
          name = item.valueDescription
        }
      })
      return name
    },

    getUserOne() {
      let url = "/api/user/getRegisterUserByLogin";
      let data = {};
      HTTP.get(url, data, res => {
        if (res.code === '0') {
          this.userData = res.data;
          this.roleId = res.role.roleId;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },

    getOne() {
      let url = "/api/devresume/getDevResumeById";
      let data = {
        id: this.detailId,
      };
      HTTP.get(url, data, res => {
        if (res.code === '0') {
          this.dataDet = res.data;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = "/api/software_epiboly/insertEpiboly";
          let data = this.form;
          HTTP.postForm(url, data, res => {
            this.handleClose();

            console.log(res);
          }, false)
          // alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.dialogImageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.coverImg = res.name;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.raw.type === "image/jpeg";
      // const isPNG = file.raw.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG && !isPNG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },

    dayinBtn() {
      let bdhtml=window.document.body.innerHTML;
      let sprnstr="opacity: 0.11"; //开始打印标识字符串有17个字符
      let eprnstr="opacity: 0.12"; //结束打印标识字符串
      let prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+22); //从开始打印标识之后的内容
      // console.log(bdhtml.indexOf(sprnstr))
      prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr)); //截取开始标识和结束标识之间的内容
      window.document.body.innerHTML=prnhtml; //把需要打印的指定内容赋给body.innerHTML
      window.print(); //调用浏览器的打印功能打印指定区域
      window.document.body.innerHTML=bdhtml;//重新给页面内容赋值；
      return false;
    },
  },
  created() {
    this.detailId = this.$route.query.detailId;
    this.getClass()
    this.getYearList()
    this.getUserOne()

    //
  }
}
</script>

<style scoped lang="scss">
main {
  padding-top: 1.7rem;
}

.body-con {
  width: 96%;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}


.user-con {
  padding: 40px 56px;
  margin-bottom: 30px;
  width: 100%;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.14);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
}

.class-con {
  padding: 40px 56px;
  margin-bottom: 30px;
  width: 100%;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.14);

  div {
    margin-bottom: 20px;
    display: flex;

    h5 {
      color: #939393;
      margin-right: 20px;
      height: 24px;
      line-height: 24px;
    }

    span {
      padding: 0 20px;
      height: 24px;
      line-height: 24px;
      cursor: pointer;
      border-radius: 4px;
    }

    span.act-on {
      background-color: #3291F8;
      color: #ffffff;
    }
  }
}

.list-con {
  padding: 40px 56px;
  width: 100%;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.14);

  h3 {
    text-align: center;
    font-size: 26px;
    margin-bottom: 20px;
  }

  h4 {
    height: 26px;
    line-height: 26px;
    font-size: 22px;
    font-weight: normal;
    margin-bottom: 20px;
  }

  h5 {
    height: 26px;
    line-height: 26px;
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 10px;
  }
}

.item-con {
  padding: 24px 0;
  display: flex;
  cursor: pointer;


  img {
    width: 180px;
    height: 100px;
    margin-right: 30px;
    border-radius: 6px;
  }
}

.fb-btn {
  width: 160px;
  height: 44px;
  line-height: 44px;
  margin-top: 60px;
  border-radius: 10px;
  background-color: rgba(50, 145, 248, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}

.item-center {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.item-class {
  display: flex;
  margin-bottom: 10px;

  div {
    display: flex;
    margin-right: 20px;
    height: 24px;
    line-height: 24px;
  }

  h6 {
    color: #9D9D9D;
    font-weight: normal;
  }
}

/* 工作指南 */
.guide {
  margin-top: 60px;
  width: 360px;
  height: 370px;
  background-color: #FFFFFF;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
}

.guide h5 {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 26px 0;
  text-align: left;
  margin-left: 56px;
  width: 140px;
  height: 29px;
  color: rgba(16, 16, 16, 100);
  font-size: 20px;
}

.wb-brn {
  width: 100px;

  span {
    font-size: 20px;
    color: #3291F8;
    display: block;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  div {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #3291F8;
    color: #FFFFFF;
    cursor: pointer;
    text-align: center;
  }
}

.bm-btn {
  width: 200px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #3291F8;
  color: #FFFFFF;
  cursor: pointer;
  text-align: center;
  margin: 20px auto 0;
}

.table-body {
  display: flex;
  width: 100%;
  border-top: 2px solid #D6D8DB;
  border-left: 2px solid #D6D8DB;
  border-right: 2px solid #D6D8DB;
}

.table-item {
  display: flex;
  width: 100%;
  //border: 1px #9B9B9B solid;

  > div {
    display: flex;
    flex: 1;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
  }
}

.table-head-img {
  width: 140px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #D6D8DB;

  img {
    width: 100%;
    height: 100%;
  }
}

.laber-con {
  width: 140px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  border-right: 2px solid #D6D8DB;
  border-bottom: 2px solid #D6D8DB;
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-item-con {
  padding: 0 20px;
  border-bottom: 2px solid #D6D8DB;
  border-right: 2px solid #D6D8DB;
  width: calc(100% - 140px);
}

.hidd-body {
  border-left: 2px solid #D6D8DB;
  display: flex;
  font-size: 16px;

  .laber-con {
    line-height: 60px;
  }

  .per-div {
    line-height: 20px;
    padding: 20px;
    border-right: 2px solid #D6D8DB;
    border-bottom: 2px solid #D6D8DB;
    width: calc(100% - 140px);
    min-height: 180px;
  }
}

.down-btn {
  margin-left: 20px;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  background-color: #64C37C;
  color: #FFFFFF;
}

</style>


