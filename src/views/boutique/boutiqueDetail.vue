<template>
  <main>
    <section class="banner-con" :style="'background-image: url('+ detailData.img2 +');'">
      <div>
        <h3>{{ detailData.title1 }}</h3>
        <p>{{ detailData.digest1 }}</p>
        <span @click="tiyanBtn1(dataParm.productLink,dataParm.testAccount,dataParm.testPwd)">
          <span>一键体验</span>
        </span>
      </div>
    </section>

    <section class="page-con">
      <div class="title-con">
        <h3>
          {{ detailData.title2 }}
        </h3>
        <p>
          {{ detailData.digest2 }}
        </p>
      </div>
      <el-row class="more-con" :gutter="8">
        <el-col :md="12" :lg="6">
          <!--@click="tiyanBtn(dataParm.productLink,dataParm.testAccount,dataParm.testPwd)"-->
          <div class="more-list-item bg-img1" :style="'background-image: url('+ detailData.img3 +')'">
            <div>
              <h4>{{ detailData.title3 }}</h4>
              <span>{{ detailData.digest3 }}</span>
            </div>
          </div>
        </el-col>
        <el-col :md="12" :lg="6">
          <div class="more-list-item bg-img2" :style="'background-image: url('+ detailData.img4 +')'">
            <div>
              <h4>{{ detailData.title4 }}</h4>
              <span>{{ detailData.digest4 }}</span>
            </div>
          </div>
        </el-col>
        <el-col :md="12" :lg="6">
          <div class="more-list-item bg-img3" :style="'background-image: url('+ detailData.img5 +')'">
            <div>
              <h4>{{ detailData.title5 }}</h4>
              <span>{{ detailData.digest5 }}</span>
            </div>
          </div>
        </el-col>
        <el-col :md="12" :lg="6">
          <div class="more-list-item bg-img4" :style="'background-image: url('+ detailData.img6 +')'">
            <div>
              <h4>{{ detailData.title6 }}</h4>
              <span>{{ detailData.digest6 }}</span>
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="title-con">
        <h3 style="margin-bottom: .4rem">
          场景应用
        </h3>
      </div>
      <el-row :gutter="20">
        <el-col :md="12" :lg="6" class="fa-item">
          <div @click="tiyanBtn(detailData.link1)">
            <!--<img src="@/assets/img/1.jpg" alt="图1"/>-->
            <img :src="detailData.img7" alt="图1"/>
            <div>
              <h4>{{ detailData.title7 }}</h4>
              <p>{{ detailData.digest7 }}</p>
            </div>
          </div>

        </el-col>
        <el-col :md="12" :lg="6" class="fa-item">
          <div @click="tiyanBtn(detailData.link2)">
            <!--<img src="@/assets/img/2.jpg" alt="图2"/>-->
            <img  :src="detailData.img8" alt="图2"/>
            <div>
              <h4>{{ detailData.title8 }}</h4>
              <p>{{ detailData.digest8 }}</p>
            </div>
          </div>

        </el-col>
        <el-col :md="12" :lg="6" class="fa-item">
          <div @click="tiyanBtn(detailData.link3)">
            <!--<img src="@/assets/img/3.jpg" alt="图3"/>-->
            <img  :src="detailData.img9" alt="图3"/>
            <div>
              <h4>{{ detailData.title9 }}</h4>
              <p>{{ detailData.digest9 }}</p>
            </div>
          </div>

        </el-col>
        <el-col :md="12" :lg="6" class="fa-item">
          <div @click="tiyanBtn(detailData.link4)">
            <!--<img src="@/assets/img/4.jpg" alt="图4"/>-->
            <img :src="detailData.img10" alt="图4"/>
            <div>
              <h4>{{ detailData.title10 }}</h4>
              <p>{{ detailData.digest10 }}</p>
            </div>
          </div>

        </el-col>
      </el-row>
    </section>
    <!--<section class="form-bg">-->
    <!--  <div class="form-border">-->
    <!--    <div class="form-left hidden-md-and-down">-->
    <!--      <img src="@/assets/image/logo_2.png" alt=""/>-->
    <!--      <div class="left-con">-->
    <!--        &lt;!&ndash;<div class="leftlabel">&ndash;&gt;-->
    <!--        &lt;!&ndash;  <p>名称:</p>&ndash;&gt;-->
    <!--        &lt;!&ndash;  <br/>&ndash;&gt;-->
    <!--        &lt;!&ndash;  <span class="leftan">{{ data.name }}</span>&ndash;&gt;-->
    <!--        &lt;!&ndash;</div>&ndash;&gt;-->
    <!--        <div class="leftlabel">-->
    <!--          <p>电话: <span class="leftan">{{ data.phone }}</span></p>-->
    <!--          &lt;!&ndash;<br/>&ndash;&gt;-->

    <!--        </div>-->
    <!--        <div class="leftlabel">-->
    <!--          <p>地址: <span class="leftan">{{ data.address }}</span></p>-->
    <!--          &lt;!&ndash;<br/>&ndash;&gt;-->

    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="form-right">-->
    <!--      <div class="right-con">-->
    <!--        <h3>联系我们</h3>-->
    <!--        <el-form :inline="true"-->
    <!--                 label-position="top"-->
    <!--                 :model="formInline"-->
    <!--                 class="demo-form-inline ele-input w-liaxi-form"-->
    <!--                 label-width="100px">-->
    <!--          <el-form-item label="公司名字:" class="input-con">-->
    <!--            <el-input v-model="formInline.companyName" placeholder="请输入您的公司名称"></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="姓名:" class="input-con">-->
    <!--            <el-input v-model="formInline.userName" placeholder="请输入您的姓名"></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="手机号:" class="input-con">-->
    <!--            <el-input v-model="formInline.phone" placeholder="请输入您的手机号"></el-input>-->
    <!--          </el-form-item>-->
    <!--        </el-form>-->
    <!--        <el-form label-width="100px"-->
    <!--                 label-position="top"-->
    <!--                 :model="formInline" class="demo-form-inline ele-text w-liaxi-form">-->
    <!--          <el-form-item label="备注:">-->
    <!--            <el-input type="textarea" :rows="4" v-model="formInline.remark" placeholder="备注信息"></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item>-->
    <!--            <el-button type="primary" @click="phoneUser()">提交</el-button>-->
    <!--          </el-form-item>-->
    <!--        </el-form>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--  </div>-->

    <!--</section>-->
  </main>
</template>

<script>
import HTTP from "./../../server/http"
export default {
  name: "DetailPage",

  data() {
    return {
      formInline: {
        applyInfoGoodId: "",
        applyUserId: "",
        companyName: "",
        userName: "",
        phone: "",
        remark: "",
      },
      dataParm: {},
      data: {
        company: "恒凯科技",
        name: "ccz",
        phone: "13838818881",
        address: "洛阳市西工区信息科技城3189号",
      },

      detailData: {},
    };
  },

  mounted() {
    let detailId = this.$route.query.detailId;
    this.formInline.applyInfoGoodId = detailId
    let url = "/api/applyinfogood/showDetails"
    let data = {
      id: detailId
    };
    HTTP.get(url,data,res=>{
      // console.log(res);
      this.detailData = res.data;
    },false)

    this.getDetail(detailId)
  },
  methods: {
    phoneUser(){
      let url = "/portal/applyinfogooduser/addSave"
      let data = this.formInline;
      HTTP.postForm(url,data,()=>{
        this.$message.success("提交成功")
      },false)
    },

    getDetail(id) {
      let url = "/api/applyinfogood/showDetails"
      let data = {
        id: id
      };
      HTTP.get(url,data,res=>{
        // console.log(res.data.applyInfoId);
        this.getOne(res.data.applyInfoId)
        // this.detailData = res.data;
      },false)
    },
    getOne(id){
      let url = "/portal/api/index/getApplyForm";
      let data = {
        id: id,
      };
      HTTP.get(url,data,res=>{
        this.dataParm = res.data.entity;
      },false)
    },
    tiyanBtn1(url,account,password){
      if(account === "nomal"){
        window.open(`${url}`)
      } else {
        window.open(`${url}?username=${account}&password=${password}`)
      }
    },
    tiyanBtn(url){
    // ,account,password
      window.open(`${url}`)
      // if(account === "nomal"){
      //   window.open(`${url}`)
      // } else {
      //   window.open(`${url}?username=${account}&password=${password}`)
      // }

    },
  },
};
</script>

<style lang="scss" scoped>
.banner-con {
  width: 100%;
  height: 4.1rem;
  background-size: 100% 100%;
  display: flex;
  padding-top: 1rem;
  justify-content: center;
  align-items: center;

  div {
    width: 98%;
    max-width: 1200px;
    color: #fff;

    p {
      margin-top: .12rem;
      margin-bottom: .12rem;
      font-size: 16px;
      color: #f1e8e8;
    }

    h3 {
      font-size: 30px;
      line-height: 48px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    span{
      padding: .14rem .3rem;
      background-color: #FFFFFF;
      margin-top: .2rem;
      display: inline-block;
      font-size: .2rem;
      border-radius: .02rem;
      cursor: pointer;

      >span{
        padding: 0;
        margin: 0;
        background: linear-gradient(90deg, #3BBFFD 0%, #0E5EAB 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}

.page-con {
  width: 98%;
  max-width: 1400px;
  margin: 0 auto 1.2rem;
  padding-top: .5rem;

  .title-con {
    h3 {
      font-size: 24px;
      text-align: center;
      margin: .2rem 0;
    }

    p {
      color: #808080;
      font-size: 16px;
      text-align: center;
      margin-bottom: .2rem;
    }
  }

}

.right-con h3 {
  font-size: 28px;
  font-weight: 600;
  margin: .6rem .4rem .3rem;
}

.leftlabel {
  color: #fff;
  margin: 20px 0;
  font-size: 20px;
}

.leftan {
  font-size: 20px;

  color: #b6b5b5;
}

.form-bg {
  background-image: url("@/assets/image/bounitefoot_bg.jpg");
  background-size: cover;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: .8rem 0;
  margin: 40px 0 -40px;
  position: relative;
}
.form-bg:after{
  background-color: rgba(0,0,0,.4);
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}

.form-border {
  width: 12.8rem;
  border-radius: 10px;
  display: flex;
  overflow: hidden;
  position: relative;
  z-index: 2;
}

.form-left {
  flex: 1;
  background-image: url("@/assets/image/bounitefoot2_bg.png");
  background-size: 100% 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: .3rem .6rem;

  img{
    height: .5rem;
    margin-bottom: .6rem;
  }
}

.form-right {
  flex: 1;
  background-color: #fff;
  padding-bottom: .4rem;
}

.more-con {
  padding: 22px 0;
  width: 100%;
  height: 4rem;
  margin-bottom: 1.2rem;

  // wyh

  .more-list-item {
    background-size: 100% 100%;
    transition: all .3s;
    background-position: center center;
    cursor: pointer;
    height: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > div {
      width: 100%;
      height: 4rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, .4);
    }

    h4 {
      font-weight: normal;
      font-size: 34px;
      color: #FFFFFF;
      position: relative;
      text-align: center;
      line-height: 42px;
    }

    h4:after {
      color: #FFFFFF;
      position: absolute;
      content: "";
      width: 30px;
      height: 2px;
      border-radius: 1px;
      background-color: #FFFFFF;
      left: 50%;
      margin-left: -15px;
      bottom: -0.3rem;
      transition: all .3s;
    }

    span {
      margin-top: 0.6rem;
      height: 0;
      overflow: hidden;
      color: #FFFFFF;
      opacity: 0;
      transition: all .3s;
      font-size: .16rem;
      width: 70%;
      line-height: 20px;
      text-align: center;
    }
  }

  .more-list-item:hover {
    background-size: 110% 110%;

    h4:after {
      width: 42px;
      margin-left: -21px;
    }

    span {
      opacity: 1;
      height: 60px;
    }
  }
}

.bg-img1 {
  background-image: url("./../../assets/img/5.jpg");
}

.bg-img2 {
  background-image: url("./../../assets/img/6.jpg");
}

.bg-img3 {
  background-image: url("./../../assets/img/7.jpg");
}

.bg-img4 {
  background-image: url("./../../assets/img/8.jpg");
}

.fa-item {
  > div {
    background-color: #FFFFFF;
    cursor: pointer;

    div {
      padding: .2rem;

      h4 {
        font-size: 16px;
        margin-bottom: 10px;
        transition: color .3s;
        font-weight: bold;
      }

      p {
        line-height: 20px;
      }
    }

  }
}

.fa-item:hover > div {
  box-shadow: 1px 1px 20px 3px rgba(0, 0, 0, .1);

  h4 {
    color: #f00;
  }
}

.demo-form-inline{
  width: 90%;
  margin: 0 auto;
}
.input-con{
  width: 40%;
  box-sizing: border-box;
  margin: 0 10% .1rem 0;
}

@media screen and (max-width: 960px){
  .page-con{
    padding: 20px 32px;
  }

  .more-con{
    height: auto;
  }
  .more-list-item{
    height: 200px !important;
    margin-bottom: 10px;

    div{
      height: 100% !important;

      h4{
        font-size: 22px !important;
      }
      span{
        height: auto !important;
        opacity: 1 !important;
        margin-top: 20px !important;
        text-align: center !important;
      }
    }
  }

  .banner-con{
    height: 200px;
    padding-top: 48px;

    h3{
      font-size: 24px !important;
      text-align: center;
    }
  }

  .form-border{
    width: 90% !important;
  }

}




</style>