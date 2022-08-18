<template>
  <main>
    <BannerCon class="bg-img">
      <template v-slot:bannerTitle>检测中心检测</template>
      <template v-slot:bannerText>Test center testing</template>
    </BannerCon>


    <div class="body-con">
      <div class="tab-con">
        <span :class="{active: tabId===1}" @click="tabId=1">业务指南</span>
        <div style="width: .6rem"></div>
        <span :class="{active: tabId===2}" @click="tabId=2">检测流程</span>
      </div>
      <div v-show="tabId===1" style="padding-top: .4rem" class="yw-list">
        <el-row :gutter="44">
          <el-col :lg="8" :md="24" class="item-con">
            <h4>软件登记评测</h4>
            <h6>Software registration evaluation</h6>
            <div>
              <img src="./../assets/image/rjjc/jc-1.png" alt="">
            </div>

            <p>
              围绕电子信息类产业发展为政府提供全面技术支持。2011年国务院颁布的“4号文”，
              在财税政策、重大项目建设等方面更加大了对软件与集成电路产业的扶持力度，
              明确提出从事软件开发、信息系统集成、咨询和运营维护业务的企业，免征营业税。
            </p>
          </el-col>
          <el-col :lg="8" :md="24" class="item-con">
            <h4>软件鉴定评测</h4>
            <h6>Software qualification evaluation</h6>
            <div>
              <img src="./../assets/image/rjjc/jc-2.png" alt="">
            </div>

            <p>
              接受科研机构、高校、软件企业等对软件科技成果鉴定的评测需求，依据国标对相关软件进行鉴定评测，为科技主管部门规范软件类科技成果鉴定提供技术保障。
            </p>
          </el-col>
          <el-col :lg="8" :md="24" class="item-con">
            <h4>软件验收评测</h4>
            <h6>Software acceptance evaluation</h6>
            <div>
              <img src="./../assets/image/rjjc/jc-3.png" alt="">
            </div>

            <p>
              承担软件验收评测业务。作为国家实验室认可的第三方软件评测实验室，对客户委托的软件产品，依据相关国标、产品详细需求说明书、产品操作手册等进行验收测试，客观公正，避免争议，维护甲乙双方的权益。
            </p>
          </el-col>
          <el-col :lg="8" :md="24" class="item-con">
            <h4>软件确认评测</h4>
            <h6>Software confirmation evaluation</h6>
            <div>
              <img src="./../assets/image/rjjc/jc-4.png" alt="">
            </div>

            <p>
              对客户委托软件产品进行功能和性能确认试验，判断是否符合产品规格说明要求。特别是对产品质量产生异议时，作出独立的第三方结论。
            </p>
          </el-col>
          <el-col :lg="8" :md="24" class="item-con">
            <h4>企业信息化评测</h4>
            <h6>Enterprise informatization evaluation</h6>
            <div>
              <img src="./../assets/image/rjjc/jc-5.png" alt="">
            </div>

            <p>
              依据河南省信息化办颁布的河南省企业信息化评测体系文件，并针对不同的行业特点，对相关企业，在信息化基础建设，应用以及生产自动化应用、
              信息安全等方面进行评测，为政府主管部门分析企业信息化发展状况，制定相关行业政策，提供依据。
            </p>
          </el-col>
          <el-col :lg="8" :md="24" class="item-con">
            <h4>信息系统工程验收</h4>
            <h6>Information systems engineering acceptance</h6>
            <div>
              <img src="./../assets/image/rjjc/jc-6.png" alt="">
            </div>

            <p>
              依据相关国标以及信息化项目验收规范承担政府信息化项目的验收业务，为规范信息化项目建设质量和效率，提供技术平台。并接受客户委托，对相关信息化工程，智能建筑工程进行竣工验收。
            </p>
          </el-col>
        </el-row>


        <!--<img src="./../assets/image/detactiondetail.png">-->
      </div>
      <div v-show="tabId===2" style="width: 100%">

        <img style="margin-top: .3rem;width: 100%;" src="./../assets/image/rjjc/liuchen.png" alt="">

        <!--<el-form :model="ruleForm" style="width: 50%" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
        <!--  <el-form-item label="产品名称" prop="title">-->
        <!--    <el-input v-model="ruleForm.title"></el-input>-->
        <!--  </el-form-item>-->
        <!--  <el-form-item label="联系电话" prop="phone">-->
        <!--    <el-input v-model="ruleForm.phone"></el-input>-->
        <!--  </el-form-item>-->
        <!--  <el-form-item label="项目简介" prop="describes">-->
        <!--    <el-input type="textarea" v-model="ruleForm.describes"></el-input>-->
        <!--  </el-form-item>-->
        <!--  &lt;!&ndash;:http-request="httpRequest"&ndash;&gt;-->
        <!--  <el-form-item label="项目文件" prop="describes">-->
        <!--    <el-upload-->
        <!--        class="upload-demo"-->
        <!--        drag-->
        <!--        action="https://admin.lyrjfwpt.cn/api/common/uploadZipFile"-->
        <!--        :headers="headerToken"-->
        <!--        :http-request="httpRequest"-->
        <!--        :on-success="handleAvatarSuccess"-->
        <!--        multiple>-->
        <!--      <i class="el-icon-upload"></i>-->
        <!--      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
        <!--      <div class="el-upload__tip" slot="tip">文件格式为:ZIP</div>-->
        <!--    </el-upload>-->
        <!--  </el-form-item>-->


        <!--  <el-form-item>-->
        <!--    <div style="display: flex;justify-content: center">-->
        <!--      <el-button style="width: 120px;margin-left: -60px" type="primary" @click="submitForm('ruleForm')">立即预约</el-button>-->
        <!--    </div>-->

        <!--  </el-form-item>-->
        <!--</el-form>-->
      </div>
    </div>


  </main>
</template>

<script>
import HTTP from "./../server/http";
import BannerCon from "@/components/bannerCon";

export default {
  name: "detactionDetail",
  components: {
    BannerCon
  },
  data() {
    return {
      dialogVisible: false,
      tabId: 1,
      tabItem: 0,
      headerToken: {
        token: localStorage.getItem("access_token")
      },

      ruleForm: {},
      fd: {},
      rules: {},

      grade: 100,
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },

    handleAvatarSuccess(res) {
      // console.log(res)
      this.ruleForm.muZip = res.url;
      // this.ruleForm.coverImg = res.name;
    },
    httpRequest(param) {
      const fileObj = param.file // 相当于input里取得的files
      this.fd = new FormData()
      this.fd.append('muZip', fileObj)// 文件对象
      // console.log(param.file,'卧室少123')
      // console.log(fileObj)
    },

    // listTab(type){
    //   this.tabItem();
    // },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = "/api/datection/upload";
          this.fd.append('phone', this.ruleForm.phone)
          this.fd.append('title', this.ruleForm.title)
          this.fd.append('describes', this.ruleForm.describes)
          this.fd.append('state', 3)
          // let data = this.ruleForm
          HTTP.post(url, this.fd, res => {
            if (res.code == 0) {
              this.$message.success("预约成功");
              // console.log(res);
            } else {
              this.$message.error(res.msg);
            }

          }, false)
          // alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped lang="scss">

.bg-img {
  background-image: url('./../assets/image/rjjc/jiance-bg.png');
}

.body-con {
  background-color: #FFFFFF;
  width: 100%;
  margin-bottom: -40px;
}

.tab-con {
  margin-bottom: .6rem;
  padding: .9rem .3rem 0;
  display: flex;
  justify-content: center;

  span {
    font-size: .3rem;
    color: #333;
    padding: 0 0 .1rem;
    cursor: pointer;
    position: relative;
  }

  span.active {
    background: linear-gradient(0deg, #3BBFFD 0%, #0E5EAB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  span.active:after {
    position: absolute;
    content: "";
    width: 100%;
    height: .02rem;
    background: linear-gradient(90deg, #3BBFFD, #0E5EAB);
    bottom: 0;
    left: 0;
  }
}

.yw-list {
  width: 96%;
  max-width: 1600px;
  margin: .2rem auto;

  .item-con {
    margin-bottom: .72rem;

    h4 {
      font-size: .24rem;
      font-weight: bold;
      background: linear-gradient(0deg, #3BBFFD 0%, #0E5EAB 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: .1rem;
    }

    div {
      overflow: hidden;
      max-height: 1.7rem;
    }

    img {
      transition: all .3s;
    }

    h6 {
      font-size: .18rem;
      color: #000000;
      opacity: .6;
      margin-bottom: .2rem;
    }

    p {
      font-size: .16rem;
      color: #242424;
      line-height: .26rem;
      text-indent: .36rem;
      margin-top: .2rem;
      height: 1.08rem;
    }

  }

  .item-con:hover {
    img {
      transform: scale(1.1);
    }
  }

}

@media screen and (max-width: 1200px) {
  main {
    padding-top: 70px;
  }

  .body-con {
    padding: 20px 30px;
  }
}


</style>
