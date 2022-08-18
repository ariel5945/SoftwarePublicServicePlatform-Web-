<template>
  <main>
    <div class="body-con">
      <div class="left-con">
        <el-carousel indicator-position="outside" height="480px">
          <el-carousel-item v-for="item in banner" :key="item">
            <img style="height: 100%;width: 100%" :src="item" alt="">
          </el-carousel-item>
        </el-carousel>

        <div>

          <div style="line-height: 22px;display: flex;flex-wrap: wrap">
            <div class="shu-con">
              <h5>项目名称：</h5>
              <span>{{ dataParm.applyName }}</span>
            </div>
            <div class="shu-con">
              <h5>所属企业：</h5>
              <span>{{ dataParm.createName }}</span>
            </div>
            <div class="hang-con">
              <h5>所属行业：</h5>
              <span>{{ dataParm.industryType }}</span>
            </div>
            <div class="hang-con">
              <h5>开发语言：</h5>
              <span>{{ dataParm.applyType }}</span>
            </div>
            <div class="hang-con">
              <h5>发布时间：</h5>
              <span>{{ dataParm.createTime.split("T")[0] }}</span>
            </div>


          </div>

        </div>
        <!--{{ dataParm }}-->
      </div>
      <div class="right-con">
        <div class="xiangqin">
          <h4 style="font-size: 20px;margin-bottom: 20px">项目简介</h4>
          {{ dataParm.applyIntro }}
        </div>

        <!--<div class="user-con">-->
        <!--  <img :src="userData.userImgUrl">-->
        <!--  <span style="font-size: 18px;margin-bottom: 20px;">{{ userData.userName }}</span>-->
        <!--  <span style="font-size: 12px">(我参与的项目数量 {{alpNum}})</span>-->
        <!--  &lt;!&ndash;<div v-if="roleId===37" class="fb-btn" @click="dialogVisible=true">发布外包</div>&ndash;&gt;-->
        <!--</div>-->



        <!--<div v-if="dataParm.isAuthorize==1">-->
        <!--  <div class="hang-con">-->
        <!--    <h5>项目地址：</h5>-->
        <!--    <span>{{ dataParm.productLink }}</span>-->
        <!--  </div>-->
        <!--  <div class="hang-con">-->
        <!--    <h5>体验账号：</h5>-->
        <!--    <span>{{ dataParm.testAccount }}</span>-->
        <!--  </div>-->
        <!--  <div class="hang-con">-->
        <!--    <h5>体验密码：</h5>-->
        <!--    <span>{{ dataParm.testPwd }}</span>-->
        <!--  </div>-->
        <!--</div>-->

        <div>
          <div class="goto-object" @click="tiyanBtn(dataParm.productLink,dataParm.testAccount,dataParm.testPwd)">
            一键体验
          </div>
          <div v-if="btnClose" class="goto-object" @click="yuyueBtn()">项目合作</div>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
import HTTP from "@/server/http";

export default {
  name: "developmentDetail",
  data(){
    return{
      id: 0,
      dataParm: {
        createTime: "T"
      },
      userData: {},
      banner: [],
      alpNum: 0,
      btnClose: true,
    }
  },
  methods:{
    getOne(){
      let url = "/portal/api/index/getApplyForm";
      let data = {
        id: this.id,
      };
      HTTP.get(url,data,res=>{
        this.dataParm = res.data.entity;
        this.banner = this.getImgSrc(res.data.entity.content)
      },false)
    },
    getImgSrc(rich) {
      var imgList = [];
      rich.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
        imgList.push(capture);
      });
      return imgList;
    },
    tiyanBtn(url,account,password){
      if(account === "nomal"){
        window.open(`${url}`)
      } else {
        window.open(`${url}?username=${account}&password=${password}`)
      }
    },


    getUserOne() {
      let url = "/api/user/getRegisterUserByLogin";
      let data = {};
      HTTP.get(url, data, res => {
        if (res.code == '0') {
          this.userData = res.data;
          this.roleId = res.role.roleId;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },
    getUserAlp() {
      let url = "/api/applyinfouser/getApplylistByInfoUser";
      let data = {};
      HTTP.get(url, data, res => {
        if (res.code === '0') {
          this.alpNum = res.data.length;
          // this.userData = res.data;
          // this.roleId = res.role.roleId;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },
    getUserList() {
      let url = "/api/applyinfouser/list";
      let data = {
        applyInfoId: this.id
      };
      HTTP.get(url, data, res => {
        if (res.code == '0') {
          res.rows.forEach(item=>{
            if(item.applyUserId == this.userData.loginAccountId){
              this.btnClose = false;
            }
          })

          // this.alpNum = ;
          // this.userData = res.data;
          // this.roleId = res.role.roleId;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },
    yuyueBtn(){
      let url = "/api/applyinfouser/add";
      let data = {
        applyInfoId: this.id,
      };
      HTTP.postForm(url,data,(res)=>{
        if(res.code == 0){
          this.$message.success("提交合作成功");
          // this.$router.push("/userCenter/publishProject")
        }
        this.$router.push({
          path: "/userCenter/publishProject",
          query: {
            publishType: 1,
          }
        })
      },false)
    },
  },
  created() {
    this.id = this.$route.query.id;
    this.getUserOne()
    this.getUserAlp()

    this.getOne();
  }
}
</script>

<style scoped lang="scss">
main{
  padding-top: 1.7rem;
}
.body-con{
  width: 98%;
  max-width: 1200px;
  overflow: hidden;
  margin: 0 auto;
  //display: flex;
  justify-content: space-between;

  .left-con{
    width: 73%;
    float: left;
    //background-color: #FFFFFF;
    border-radius: 6px;
    //box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.14);
  }
  .right-con{
    width: 25%;
    float: right;

    .xiangqin{
      padding: 40px 40px;
      border-radius: 6px;
      background-color: #FFFFFF;
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.14);
      margin-bottom: 30px;
      height: 360px;
      line-height: 18px;
      overflow-y: auto;
    }
  }
}
.user-con {
  width: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    margin-bottom: 20px;
  }
}

.shu-con{
  display: flex;
  margin-bottom: 14px;
  margin-right: 20px;
  width: 40%;
  h5{
    font-weight: normal;
    height: 24px;
  }
  span{
    color: #5b5e62;
  }
}
.hang-con{
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
  margin-right: 20px;
  h5{
    font-weight: normal;
    margin-bottom: 8px;
  }
  span{
    color: #949CA4;
  }
}

.fb-btn {
  width: 160px;
  height: 44px;
  line-height: 44px;
  margin: 60px auto 0;
  border-radius: 10px;
  background-color: rgba(50, 145, 248, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.goto-object{
  width: 100%;
  height: .6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: .2rem;
  border-radius: 4px;
  border: 1px solid #3291F8;
  cursor: pointer;
  color: #fff;
  font-size: 22px;
  background: linear-gradient(-45deg, rgba(50,145,248, .6), #3291F8,rgba(50,145,248, .6));
}



</style>