<template>
  <main>
    <section class="banner-con hidden-md-and-down">
      <div>
        <div>
          <h3>
            软件外包
          </h3>
          <p>
            Software Outsourcing
          </p>
        </div>
        <div>
          <!--<img src="./../../assets/image/search@2x.png" alt="">-->
        </div>
      </div>
    </section>

    <section class="class-body">
      <!--分类盒子-->
      <div class="class-con hidden-md-and-down">
        <!--<div>-->
        <!--  <h5>项目标签：</h5>-->
        <!--  <div>-->
        <!--    <span :class="{'act-on': epibolyTag === null}" @click="epibolyTag = null;getList()">全部</span>-->
        <!--    <span v-for="(item,index) in classList.epibolyTag"-->
        <!--          :class="{'act-on': epibolyTag === item.valueName}"-->
        <!--          @click="epibolyTag = item.valueName;getList()" :key="'tip'+index">{{ item.valueDescription }}</span>-->
        <!--  </div>-->

        <!--</div>-->
        <div>
          <h5>项目类型：</h5>
          <div>
            <span :class="{'act-on': epibolyType === null}" @click="epibolyType = null;pageNum=1;getList()">全部</span>
            <span v-for="(item,index) in classList.epibolyType"
                  :class="{'act-on': epibolyType === item.valueName}"
                  @click="epibolyType = item.valueName;pageNum=1;getList()" :key="'tip'+index">{{ item.valueDescription }}</span>
          </div>
        </div>
        <div>
          <h5>项目状态：</h5>
          <div>
            <span :class="{'act-on': status === null}" @click="status = null;pageNum=1;getList()">全部</span>
            <span :class="{'act-on': status === 1}" @click="status = 1;pageNum=1;getList()">招募中</span>
            <span :class="{'act-on': status === 3}" @click="status = 3;pageNum=1;getList()">已完成</span>
            <span :class="{'act-on': status === 4}" @click="status = 4;pageNum=1;getList()">已过期</span>
            <!--<span v-for="(item,index) in classList.epibolyType"-->
            <!--      :class="{'act-on': epibolyType === item.valueName}"-->
            <!--      @click="epibolyType = item.valueName;getList()" :key="'tip'+index">{{ item.valueDescription }}</span>-->
          </div>

        </div>
        <!--<div>-->
        <!--  <h5>项目周期：</h5>-->
        <!--  <div>-->
        <!--    <span :class="{'act-on': epibolyCycle === null}" @click="epibolyCycle = null;getList()">全部</span>-->
        <!--    <span v-for="(item,index) in classList.epibolyCycle"-->
        <!--          :class="{'act-on': epibolyCycle === item.valueName}"-->
        <!--          @click="epibolyCycle = item.valueName;getList()"-->
        <!--          :key="'tip'+index">{{ item.valueDescription }}</span>-->
        <!--  </div>-->
        <!--</div>-->
      </div>
    </section>

    <section class="main-body">
      <div class="body-con">
        <el-row :gutter="30" ref="list_con">
          <el-col :lg="18" :md="24">

            <div class="list-con">
              <div v-if="listData.length>0">
                <div v-for="(item,index) in listData" :key="'lis'+index" class="item-con">
                  <div class="item-img-con">
                    <p>
                      <span v-if="item.status == 1" class="zhaomu">招募中</span>
                      <span v-if="item.status == 3" class="wancheng">已完成</span>
                      <span v-if="item.status == 4" class="guoqi">已过期</span>
                      <!--<img v-if="item.status == 1" src="./../../assets/img/status-1.png" alt="">-->
                      <!--<img v-if="item.status == 3" src="./../../assets/img/status-2.png" alt="">-->
                      <!--<img v-if="item.status == 4" src="./../../assets/img/status-3.png" alt="">-->
                    </p>
                    <span> {{ getClassName(item.epibolyTag, 1) }} </span>
                    <img :src="item.coverImgUrl" alt="">
                  </div>

                  <div class="item-center">
                    <h4>{{ item.title }}</h4>
                    <div class="item-class">
                      <div>
                        <h6 class="hidden-md-and-down">项目标签：</h6>
                        <span> {{ getClassName(item.epibolyTag, 1) }} </span>
                      </div>
                      <div>
                        <h6 class="hidden-md-and-down">项目类型：</h6>
                        <span>{{ getClassName(item.epibolyType, 2) }}</span>
                      </div>
                      <div>
                        <h6 class="hidden-md-and-down">项目状态：</h6>
                        <span v-if="item.status == 1">招募中</span>
                        <span v-if="item.status == 3">已完成</span>
                        <span v-if="item.status == 4">已过期</span>
                      </div>
                    </div>
                    <p><span style="margin-right: 15px;">{{ item.name }}</span><span>发布时间：{{ item.createTime.split("T")[0] }}</span></p>
                  </div>
                  <div v-if="item.status != 4" class="wb-brn hidden-md-and-down" style="width: 100px">
                    <span>￥{{ item.epibolyAmt }}</span>
                    <div class="jump-btn" @click="jumpDetail(item.id)">详情</div>
                  </div>
                  <div v-else class="wb-brn hidden-md-and-down" style="width: 100px">
                    <span>￥{{ item.epibolyAmt }}</span>
                    <div class="jump-btn">详情</div>
                    <div class="status-out">
                      <img src="./../../assets/img/status-4.png">
                    </div>
                  </div>
                </div>
              </div>


              <el-empty v-else description="暂无数据"></el-empty>
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
          </el-col>
          <el-col :md="6" :lg="6" class="hidden-md-and-down">
            <!--<div class="user-con">-->
            <!--  <img :src="userData.userImgUrl">-->
            <!--  <span style="margin: 20px 0"> {{ userData.userName }} </span>-->
            <!--  <div style="color: #3A62D7" v-if="roleId===37">已认证企业</div>-->
            <!--  -->
            <!--</div>-->

            <!-- 工作指南 -->
            <div style="position: relative;" ref="guide_pant">
              <div class="guide" ref="guide_body">
                <h5>外包工作指南</h5>
                <div style="height: 2.4rem;padding: 0 0 0 .4rem">
                  <el-steps direction="vertical">
                    <el-step title="注册并认证身份"></el-step>
                    <el-step title="报名参加项目"></el-step>
                    <el-step title="确认合作需求方"></el-step>
                    <el-step title="项目阶段划分并启动"></el-step>
                    <el-step title="阶段交付收款"></el-step>
                  </el-steps>
                </div>
                <div v-if="roleId===37" class="fb-btn" @click="dialogVisible=true">发布外包</div>
              </div>
            </div>

          </el-col>
        </el-row>
      </div>
    </section>


    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="900px"
        :before-close="handleClose">
      <div style="padding-right: 100px">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="标题">
            <el-input
                autocomplete="off"
                v-model="form.title"
                placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <!-- 分类 -->
          <el-form-item label="分类">
            <el-select v-model="form.epibolyType" placeholder="请选择">
              <el-option
                  v-for="item in classList.epibolyType"
                  :key="item.value"
                  :label="item.valueDescription"
                  :value="item.valueName"
              >
              </el-option>
            </el-select>
            <!-- 金额 -->
          </el-form-item>
          <el-form-item label="标签">
            <el-select v-model="form.epibolyTag" placeholder="请选择">
              <el-option
                  v-for="item in classList.epibolyTag"
                  :key="item.value"
                  :label="item.valueDescription"
                  :value="item.valueName"
              >
              </el-option>
            </el-select>
            <!-- 金额 -->
          </el-form-item>
          <el-form-item label="金额">
            <el-input
                autocomplete="off"
                v-model="form.epibolyAmt"
                aria-placeholder="输入金额"
            ></el-input>
          </el-form-item>
          <!-- 项目周期 -->
          <!--<el-form-item label="周期">-->
          <!--  <el-select v-model="form.epibolyCycle" placeholder="请选择">-->
          <!--    <el-option-->
          <!--        v-for="item in classList.epibolyCycle"-->
          <!--        :key="item.value"-->
          <!--        :label="item.valueDescription"-->
          <!--        :value="item.valueName"-->
          <!--    >-->
          <!--    </el-option>-->
          <!--  </el-select>-->
          <!--</el-form-item>-->
          <!-- 封面图   附件name -->
          <el-form-item label="封面图">
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
          <!-- 介绍图文 -->
          <el-form-item label="内容">
            <editorPage @changeContetn="changeContetn" :content="form.content"></editorPage>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </div>
    </el-dialog>
  </main>
</template>

<script>
import HTTP from "./../../server/http"
import editorPage from "@/components/editorPage";
export default {
  name: "epibolyView",
  components:{
    editorPage
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      headerToken: {
        token: localStorage.getItem("access_token")
      },
      form: {
        epibolyRole: 37,
        epibolyCycle: 1,
      },
      rules: {},

      roleId: 36,
      classList: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      title: "",
      epibolyTag: null,
      epibolyType: null,
      epibolyCycle: null,
      status: null,

      userData: {},

      listData: [],
    }
  },
  methods: {
    changeContetn(val){
      this.form.content = val;
    },

    jumpDetail(id){
      this.$router.push({
        path: "epibolyDetail",
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
      let url = "portal/software_epiboly/getListQuery";
      let data = {};
      HTTP.get(url, data, res => {
        this.classList = res.data;
        // console.log(res)
      }, false);
    },
    getClassName(data, type) {
      let name = ""
      if(data){
        if (type === 1) {
          this.classList.epibolyTag.forEach((item) => {
            if (item.valueName === data) {
              name = item.valueDescription
            }
          })
        } else if (type === 2) {
          this.classList.epibolyType.forEach((item) => {
            if (item.valueName === data) {
              name = item.valueDescription
            }
          })
        } else if (type === 3) {
          this.classList.epibolyCycle.forEach((item) => {
            if (item.valueName === data) {
              name = item.valueDescription
            }
          })
        }
      }

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

    getList() {
      let url = "/portal/software_epiboly/getListData";
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        title: this.title,
        epibolyTag: this.epibolyTag,
        epibolyType: this.epibolyType,
        epibolyCycle: this.epibolyCycle,
        status: this.status,
      };
      HTTP.get(url, data, res => {
        if (res.code === '0') {
          this.listData = res.data;
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
          HTTP.postForm(url,data,()=>{
            this.handleClose();
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
      this.form.coverImg = res.name;
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
  mounted() {
    let w = this.$refs.guide_pant.offsetWidth;
    let listCon = this.$refs.guide_pant;
    let bd = this.$refs.guide_body;
    bd.style.width = w+"px";
    window.onscroll = function () {
      if(listCon.getBoundingClientRect().top <=70 && listCon.getBoundingClientRect().bottom >-900){
        bd.style.position="fixed";
        bd.style.top= "1.2rem";
        bd.style.bottom= "auto";
      } else if(listCon.getBoundingClientRect().bottom <=-900) {
        bd.style.position="fixed";
        bd.style.top= "auto";
        bd.style.bottom= "5rem";
      } else {
        bd.style.position="relative";
        bd.style.top= 0;
        bd.style.bottom= "auto";
      }
    }
  },
  created() {
    // this.roleId
    if(JSON.parse(localStorage.getItem("user_role"))){
      this.roleId = JSON.parse(localStorage.getItem("user_role")).roleId;
    }
    this.getClass()
    // this.getUserOne()
    this.getList()
    //
  },
  destroyed() {
    location.reload()
  },
}
</script>

<style scoped lang="scss">
main {
  //padding-top: 1.5rem;
}
.banner-con {
  background-image: url("./../../assets/image/rjwb.png");
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

.main-body{
  display: flex;
  justify-content: center;
  width: 100%;
  padding: .8rem .2rem .7rem;
  background-color: #FFFFFF;
  margin-bottom: -40px;
}

.body-con {
  width: 98%;
  max-width: 1600px;
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

.class-body{
  background-image: url("./../../assets/image/rjwb-bg.png");
  background-size: 100% 100%;
  padding: .8rem 0 .7rem;
  display: flex;
  justify-content: center;
}

.class-con {
  padding: .4rem .56rem .2rem;
  width: 100%;
  max-width: 1600px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 5px 10px 0 rgba(87,87,87,0.08);

  >div {
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    >div{
      width: calc(100% - 84px);
      display: flex;
      flex-wrap: wrap;
    }

    h5 {
      color: #333333;
      height: 26px;
      line-height: 26px;
      width: 80px;
    }

    span {
      width: 80px;
      text-align: center;
      margin-right: 10px;
      margin-bottom: 10px;
      height: 26px;
      display: block;
      line-height: 26px;
      cursor: pointer;
      border-radius: 4px;

    }

    span.act-on {
      background: linear-gradient(90deg, #3BBFFD, #0E5EAB);
      color: #ffffff;
    }
  }
}

.list-con {
  padding: .4rem .56rem;
  width: 100%;
}

.item-con {
  padding: .24rem 0;
  display: flex;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F6;

  .item-img-con{
    position: relative;
    width: 1.8rem;
    height: 1rem;
    margin-right: .3rem;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    >span{
      z-index: 2;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
    }

    $jiconw: 1rem;
    $jiconh: .5rem;

    p{
      position: absolute;
      width: $jiconw;
      height: $jiconh;
      display: flex;
      z-index: 3;
      left: 0;
      top: 0;
      transform: rotate(-45deg);
      transform-origin: bottom left;
      color: #FFFFFF;

      span{
        width: $jiconw;
        height: $jiconh;
        display: flex;
        padding-left: .16rem;
        padding-bottom: 0.04rem;
        align-items: flex-end;
        font-size: .12rem;
      }

      .zhaomu{
        background: #F58F57;

      }
      .wancheng{
        background: #3BD354;

      }
      .guoqi{
        background: #C1C6C6;
      }
    }

    >img {
      width: 1.8rem;
      height: 1rem;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }
  }

  h4 {
    height: 26px;
    line-height: 26px;
    font-size: 16px;
    margin-bottom: 10px;
  }


}

.fb-btn {
  width: 1.6rem;
  height: .44rem;
  line-height: .44rem;
  margin: 1.1rem auto 0;
  border-radius: 6px;
  background: linear-gradient(90deg, #3BBFFD, #0E5EAB);
  color: #fff;
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

  p{

    span{
      font-size: .14rem;
      color: #636363;
      opacity: 0.6;
    }


  }
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

  span{
    min-font-size: 14px !important;
  }
}

/* 工作指南 */
.guide {
  padding: .3rem .5rem .5rem;
  width: 100%;
  background-color: #FFFFFF;
  border-radius: .1rem;
  top: 1rem;
  background-image: url("./../../assets/image/rjwb-right.png");
  background-size: 100% 100%;

}

.guide h5 {
  margin-bottom: .6rem;
  text-align: center;
  //width: 1.4rem;
  height: 29px;
  color: rgba(16, 16, 16, 1);
  font-weight: bold;
  font-size: .2rem;
}

.wb-brn {
  width: 100px;
  position: relative;

  span {
    font-size: 20px;
    color: #3291F8;
    display: block;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  .jump-btn {
    width: 100%;
    height: 36px;
    line-height: 36px;
    border-radius: 4px;
    background: linear-gradient(90deg, #3BBFFD, #0E5EAB);
    color: #FFFFFF;
    cursor: pointer;
    text-align: center;
  }
  .status-out{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,.6);
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
      width: 90%;
    }
  }
}


//分页
.pagination-con {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

@media screen and (max-width: 1200px){
  main{
    padding-top: 60px;
  }

  .phone-class-con{
    width: 100%;
    height: 36px;
    line-height: 36px;
    background-color: #FFFFFF;
    margin-bottom: 10px;
    padding: 0 14px;
    display: flex;
    justify-content: space-between;

    div{
      flex: 1;
      text-align: center;
    }
  }

  .item-con{
    display: block;

    img{
      width: 100%;
      height: 160px;
      margin-bottom: 10px;
    }
  }

}

@media screen and (max-width: 1200px){
  .list-con {
    padding: 0;
    width: 100%;
    background-color: transparent;
  }
  .item-con{
    margin-bottom: 20px;
    padding: 0;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.14);

    img{
      height: auto;
    }
  }

  .item-center{
    padding: 10px 14px;
  }
}

</style>
