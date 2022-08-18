<template>
  <main>
    <section class="banner-con hidden-md-and-down">
      <div>
        <div>
          <h3>
            人才中心
          </h3>
          <p>
            Talent Center
          </p>
        </div>
        <div>
          <!--<img src="./../../assets/image/search@2x.png" alt="">-->
        </div>
      </div>
    </section>

    <div class="class-con">
      <div>
        <span :class="{'act-on': skillLabel === null}" @click="skillLabel = null;pageNum=1;getList()">全部</span>
        <span v-for="(item,index) in classList.devresumeTag"
              :class="{'act-on': skillLabel === item.valueName}"
              @click="skillLabel = item.valueName;pageNum=1;getList()" :key="'tip'+index">{{ item.valueDescription }}</span>
      </div>
      <!--<div>-->
      <!--  <h5>工作经验：</h5>-->
      <!--  <span :class="{'act-on': rangeYears === null}" @click="rangeYears = null;getList()">全部</span>-->
      <!--  <span v-for="(item,index) in yearList.rangeYears"-->
      <!--        :class="{'act-on': rangeYears === item.valueName}"-->
      <!--        @click="rangeYears = item.valueName;getList()" :key="'tip'+index">{{ item.valueDescription }}</span>-->
      <!--</div>-->
    </div>

    <div class="body-con">
      <div class="left-con">


        <div class="list-con">

          <div v-for="(item,index) in listData" :key="'lis'+index" class="item-con">
            <!--<img :src="item.coverImgUrl" alt="">-->
            <div class="item-center">
              <h4>{{ item.userName }}</h4>
              <div class="item-class">
                <div>
                  <h6>技能标签：</h6>
                  <span> {{ item.skillLabel }} </span>
                </div>
                <div>
                  <h6>工作经验：</h6>
                  <span> {{ getClassName(item.workYears) }} </span>
                </div>
                <!--<div>-->
                <!--  <h6>项目类型：</h6>-->
                <!--  <span>{{ getClassName(item.workYears, 2) }}</span>-->
                <!--</div>-->
                <!--<div>-->
                <!--  <h6>项目周期：</h6>-->
                <!--  <span>{{ getClassName(item.epibolyCycle, 3) }}</span>-->
                <!--</div>-->
              </div>
              <p><span>{{ item.name }}</span><span>{{ item.createTime.split("T")[0] }}</span></p>
            </div>
            <div class="wb-brn" style="width: 100px">
              <div @click="jumpDetail(item.id)">详情</div>
            </div>

          </div>

        </div>

        <div class="pagination-con">
          <el-pagination
              background
              @current-change="handleCurrentChange"
              :hide-on-single-page="true"
              :page-size="pageSize"
              :page-count="pageNum"
              layout="prev, pager, next"
              :total="total">
          </el-pagination>
        </div>
      </div>


      <!--<div class="right-con">-->
      <!--  <div class="user-con">-->
      <!--    <img :src="userData.userImgUrl">-->
      <!--    <span style="margin: 20px 0"> {{ userData.userName }} </span>-->
      <!--    <div style="color: #3A62D7" v-if="roleId===37">已认证企业</div>-->
      <!--    <router-link to="/userCenter/userResume" v-if="roleId===39" class="fb-btn">我的简历</router-link>-->
      <!--  </div>-->

      <!--</div>-->
    </div>



  </main>
</template>

<script>
import HTTP from "./../server/http"

export default {
  name: "epibolyView",
  data() {
    return {
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
      yearList: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      title: "",

      workYears: null,
      rangeYears: null,
      skillLabel: null,

      userData: {},

      listData: [],
    }
  },
  methods: {
    jumpDetail(id){
      this.$router.push({
        path: "/talentsDetail",
        query: {
          detailId: id
        }
      })
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList()
    },


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
        this.userData = res.data;
        this.roleId = res.role.roleId;
      }, false)
    },

    getList() {
      let url = "/api/devresume/listApi";
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        userName: this.title,
        workYears: this.workYears,
        rangeYears: this.rangeYears,
        skillLabel: this.skillLabel,
      };
      HTTP.get(url, data, res => {
        if (res.code == '0') {
          this.listData = res.rows;
          this.total = res.total;
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
          HTTP.postForm(url,data,res=>{
            this.handleClose();

            console.log(res);
          },false)
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
  },
  created() {
    this.getClass()
    this.getYearList()
    this.getUserOne()
    this.getList()
    //
  }
}
</script>

<style scoped lang="scss">
main{
  background-color: #FFFFFF;
  padding-bottom: .4rem;
  margin-bottom: -0.4rem;
}

.body-con {
  width: 94%;
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.left-con {
  width: 100%;
  //background-image: url("./../assets/image/rencai-class.png");
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
  width: 100%;
  background-image: url("./../assets/image/rencai-class.png");
  background-size: 100% auto;

  div {
    display: flex;
    width: 96%;
    max-width: 1600px;
    margin: 0 auto;
    padding: .6rem .26rem .6rem;
    font-size: .2rem;

    h5 {
      color: #939393;
      margin-right: 20px;
      height: 24px;
      line-height: 24px;
    }

    span {
      padding: 0 .2rem;
      height: .42rem;
      line-height: .42rem;
      cursor: pointer;
      font-weight: bold;
      border-radius: .04rem;
    }

    span.act-on {
      color: #3291F8;
    }
  }
}

.list-con {
  padding: 40px 56px;
  width: 100%;
  border-radius: 10px;
  //background-color: #ffffff;
}

.item-con {
  padding: 24px 0;
  display: flex;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F6;

  h4 {
    height: 26px;
    line-height: 26px;
    font-size: 16px;
    margin-bottom: 10px;
  }

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
  background: linear-gradient(90deg, #3BBFFD, #0E5EAB);
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
    background: linear-gradient(90deg, #3BBFFD, #0E5EAB);
    color: #FFFFFF;
    cursor: pointer;
    text-align: center;
  }
}


//分页
.pagination-con {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.banner-con {
  background-image: url("./../assets/image/rencai-bg.png");
  background-size: 100% 100%;
  background-position: center;
  height: 3.8rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  > div {
    color: #fff;
    width: 98%;
    max-width: 1200px;
    display: flex;

    h3 {
      font-size: .28rem;
      margin-bottom: 7px;
    }

    p {
      font-size: .28rem;
      margin-bottom: .22rem;
      position: relative;
    }

    p:after {
      position: absolute;
      content: "";
      width: 6px;
      height: 15px;
      background: linear-gradient(0deg, #3BBFFD, #0E5EAB);
      bottom: -0.29rem;
      left: .3rem;
    }

  }

}

</style>
