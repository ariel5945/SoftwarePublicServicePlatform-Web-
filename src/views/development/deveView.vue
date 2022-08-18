<template>
  <main>
    <section class="banner-con hidden-md-and-down">
      <div>
        <div>
          <h3>
            软件产品
          </h3>
          <p>
            Software Products
          </p>
        </div>
        <div>
          <!--<img src="./../../assets/image/search@2x.png" alt="">-->
        </div>
      </div>
    </section>
    <!--<section class="banner-con">-->
    <!--  <div>-->
    <!--    <h3 class="banner-title">软件产品</h3>-->
    <!--    <div style="display: flex;">-->
    <!--      <div class="search-con">-->
    <!--        <div>-->
    <!--          <el-icon class="el-icon-search"></el-icon>-->
    <!--        </div>-->
    <!--        <input type="text" v-model="title" placeholder="搜索您需要的内容">-->
    <!--        <span @click="searchGetList()">搜索</span>-->
    <!--      </div>-->
    <!--      <div class="add-btn hidden-md-and-down" @click="dialogVisible=true" v-if="roleId==37">-->
    <!--        发布项目-->
    <!--      </div>-->
    <!--    </div>-->

    <!--  </div>-->
    <!--</section>-->

    <section class="page-con">
      <div style="display: flex;justify-content: space-between;margin-bottom: .4rem;align-items: center;">
        <div class="class-list">
          <div @click="changeGetList(null)" :class="{'class-act': classId === null}">
            全部
          </div>
          <div v-for="(item,index) in typeList"
               :key="'nav'+index"
               @click="changeGetList(item.valueName)"
               :class="{'class-act': item.valueName === classId}">
            {{ item.valueName }}
          </div>
        </div>

        <div>
          <div class="add-btn hidden-md-and-down" @click="dialogVisible=true" v-if="roleId==37">
            发布项目
          </div>
        </div>
      </div>
      <div class="source-list" v-loading="getLoad" element-loading-text="拼命加载中...">
        <div class="list-con" v-if="dataList.length>0">
          <el-row :gutter="20">
            <el-col :md="12" :lg="6" :xs="12" v-for="(item,index) in dataList" :key="'list'+index">
              <div class="item-con hidden-md-and-down" @click="jumpDetail(item.id)">
                <div class="img-con">
                  <img :src="item.coverImgUrl">
                </div>
                <h4>{{ item.applyName }}</h4>
                <p style="font-size: .14rem"><span>{{ item.updateTime.split("T")[0] }}</span></p>
                <p>
                  <span style="padding: .02rem 0">{{ item.createName }}</span>
                  <span style="background-color: #F8F8F8;padding: .02rem .08rem;border-radius: 12px;">{{ item.industryType }}</span>
                </p>
              </div>
              <div class="item-con hidden-sm-and-up">
                <div class="img-con">
                  <img :src="item.coverImgUrl">
                </div>

                <h4>{{ item.applyName }}</h4>
                <p style="font-size: .14rem"><span>{{ item.updateTime.split("T")[0] }}</span></p>
                <p>
                  <span style="padding: .02rem 0">{{ item.createName }}</span>
                  <span style="background-color: #F8F8F8;padding: .02rem .08rem;border-radius: 12px;">{{ item.industryType }}</span>
                </p>
              </div>
            </el-col>
          </el-row>


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

    </section>


    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
      <div style="padding-right: 100px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
          <el-form-item label="标题:" prop="applyName">
            <el-input
                v-model="ruleForm.applyName"
                autocomplete="off"
                placeholder="请输入项目标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属行业" prop="industryType">
            <el-select v-model="ruleForm.industryType" placeholder="请选择">
              <el-option
                  v-for="item in typeList"
                  :key="item.valueName"
                  :label="item.valueName"
                  :value="item.valueName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开发语言" prop="lang">
            <el-select v-model="ruleForm.applyType" placeholder="请选择">
              <el-option v-for="item in optionsvalue" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="ruleForm.phone" autocomplete="off" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item label="封面图" prop="phone">
            <el-upload
                class="avatar-uploader"
                list-type="picture-card"
                action="https://admin.lyrjfwpt.cn/api/common/upload"
                :show-file-list="false"
                :headers="headerToken"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
              <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

          </el-form-item>
          <el-form-item label="效果图及介绍" prop="content">
            <editorPage @changeContetn="changeContetn" :content="ruleForm.content"></editorPage>
            <!--<el-upload-->
            <!--    class="upload-demo"-->
            <!--    action="https://admin.lyrjfwpt.cn/api/common/upload"-->
            <!--    :headers="headerToken"-->
            <!--    :on-preview="handlePreview"-->
            <!--    :on-remove="handleRemove"-->
            <!--    :on-success="imgsuccess"-->
            <!--    :file-list="fileList"-->
            <!--    list-type="picture">-->
            <!--  <el-button size="small" type="primary">点击上传</el-button>-->
            <!--  &lt;!&ndash;<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>&ndash;&gt;-->
            <!--</el-upload>-->
          </el-form-item>
          <el-form-item label="简介">
            <el-input
                ref="upload"
                type="textarea"
                :rows="5"
                resize="none"
                v-model="ruleForm.applyIntro"
            ></el-input>
          </el-form-item>
          <el-form-item
              label="项目地址"
              prop="productLink"
          >
            <el-input v-model="ruleForm.productLink" autocomplete="off" placeholder="请输入项目地址"></el-input>
          </el-form-item>
          <el-form-item
              label="体验账号"
              prop="testAccount"
          >
            <el-input v-model="ruleForm.testAccount" autocomplete="off" placeholder="请输入体验账号"></el-input>
          </el-form-item>
          <el-form-item label="体验密码" prop="testPwd">
            <el-input v-model="ruleForm.testPwd" autocomplete="off" placeholder="请输入体验密码"></el-input>
          </el-form-item>
          <el-form-item label="允许获取信息" prop="isAuthorize">
            <el-radio-group v-model="ruleForm.isAuthorize">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="项目源码(非必选项)" prop="applyScodeLink">
            <el-input v-model="ruleForm.applyScodeLink" autocomplete="off" placeholder="请输入项目源码"></el-input>
          </el-form-item>
          <el-form-item
              label="项目源码地址(非必选项)" prop="applyScode">
            <el-input v-model="ruleForm.applyScode" autocomplete="off" placeholder="请输入项目源码地址"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-dialog>

  </main>
</template>

<script>
import HTTP from "@/server/http";
import editorPage from "@/components/editorPage";
export default {
  name: "deveView",
  components:{
    editorPage
  },
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        applyScodeLink: ""
      },
      fileList: [],
      imgList: [],
      rules: {},
      // 开发语言
      optionsvalue: [{
        value: '1',
        label: 'java'
      }, {
        value: '2',
        label: '其他'
      }],
      dialogImageUrl: "",
      headerToken: {
        token: localStorage.getItem("access_token")
      },
      // userData: {},

      roleId: 36,
      title: "",
      classId: null,
      pageNum: 1,
      pageSize: 12,
      typeList: [],
      dataList: [],
      getLoad: true,
      total: 0,
    }
  },
  created() {

    if(JSON.parse(localStorage.getItem("user_role"))){
      this.roleId = JSON.parse(localStorage.getItem("user_role")).roleId;
    }
    if (this.$route.params.typeId) {
      this.classId = this.$route.params.typeId;
    }
    this.getClass();
    // this.getUserOne();
  },
  methods: {
    changeContetn(data){
      this.ruleForm.content = data;
    },

    handleRemove(file, fileList) {
      this.imgList = []
      console.log(file, fileList);
      fileList.forEach(item=>{
        this.imgList.push(item.response.url)
      })
      console.log(this.imgList)
    },
    handlePreview(file) {
      console.log(file);
    },


    handleClose() {
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = "/api/apply/saveOrUpdate";
          let data = this.ruleForm;
          // data.content = JSON.stringify(this.imgList);
          HTTP.postForm(url, data, res => {
            console.log(res);
            this.$router.push("/userCenter/publishProject")
          }, false)
          // alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    imgsuccess(res) {
      // this.dialogImageUrl = URL.createObjectURL(file.raw);
      // this.ruleForm.coverImg = res.name;
      // url
      this.imgList.push(res.url)
      console.log(res.url);
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


    jumpDetail(id) {
      this.$router.push({
        path: "/developmentDetail",
        query: {
          id: id,
        }
      })
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList()
    },
    searchGetList() {
      this.classId = null;
      this.getList()
    },
    changeGetList(classId) {
      this.classId = classId;
      this.getList()
    },
    getList() {
      this.getLoad = true;
      let url = "/portal/api/index/getApplylist";
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        industryType: this.classId,
        applyName: this.title,
      }
      HTTP.get(url, data, res => {
        if (Number(res.code) === 0) {
          this.dataList = res.data;
          this.total = res.total;
          this.getLoad = false;
        }
        // console.log(res)
      }, false);
    },
    getClass() {
      let url = "/portal/api/index/getApplyListQuery";
      let data = {};
      HTTP.get(url, data, res => {
        if (Number(res.code) === 0) {
          this.typeList = res.data.epibolyRole;
          this.getList()
        }
      }, false)
    }
  }
}
</script>

<style scoped lang="scss">
//.banner-con {
//  background-image: url("./../../assets/image/bg_kaifaxiangmu.png");
//  background-size: cover;
//  background-position: center;
//  height: 434px;
//  padding-top: 120px;
//  width: 100%;
//  margin-bottom: 52px;
//  display: flex;
//  justify-content: center;
//  align-items: center;
//}
//
//.banner-title {
//  color: #ffffff;
//  font-size: 26px;
//  margin-bottom: 20px;
//}
//
//.search-con {
//  display: flex;
//  height: 55px;
//  line-height: 55px;
//  background-color: rgba(255, 255, 255, .58);
//  overflow: hidden;
//  border-radius: 10px;
//  font-size: 14px;
//
//  div {
//    width: 55px;
//    height: 55px;
//    display: flex;
//    justify-content: center;
//    align-items: center;
//  }
//
//  span {
//    width: 105px;
//    background-color: #3291F8;
//    text-align: center;
//    line-height: 55px;
//    -o-user-select: none;
//    /// 火狐 firefox /
//    -moz-user-select: none;
//    ///webkit浏览器/
//    -webkit-user-select: none;
//    /// IE10 + /
//    -ms-user-select: none;
//    ///早期的浏览器/
//    -khtml-user-select: none;
//    user-select: none;
//    cursor: pointer;
//    color: #ffffff;
//    position: relative;
//  }
//
//  input {
//    width: 30vw;
//  }
//
//  span:after {
//    position: absolute;
//    z-index: 1;
//    background-color: rgba(0, 0, 0, .1);
//    transition: all .3s;
//    width: 100%;
//    height: 100%;
//    content: "";
//    top: 0;
//    left: 0;
//    right: 0;
//
//  }
//
//  span:hover:after {
//    background-color: rgba(0, 0, 0, 0);
//  }
//}


.banner-con {
  background-image: url("./../../assets/image/rjcp-bg.png");
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

.page-con {
  min-height: 400px;
  width: 96%;
  max-width: 1600px;
  margin: 0 auto;
  border-radius: 10px;
  padding: .8rem 54px;
}

.class-list {
  display: flex;

  div {
    font-size: .2rem;
    color: #333333;
    margin-right: .3rem;
    cursor: pointer;
    transition: all .3s;
    font-weight: bold;
  }

  div:hover {
    color: #3291F8;
  }

  div.class-act {
    color: #3291F8;
  }
}

.source-list {
  min-height: 400px;
  width: 100%;
}

.list-con {
  box-sizing: border-box;
}

.item-con {
  margin-bottom: 26px;
  background-color: #ffffff;
  cursor: pointer;
  overflow: hidden;
  border-radius: .1rem;
  transition: all .3s;
  border-bottom: 1px solid #EDEDED;

  .img-con {
    width: 100%;
    height: 2.2rem;
    min-height: 100px;
    margin-bottom: 6px;
    overflow: hidden;

    img{
      width: 100%;
    }
  }

  h4 {
    line-height: .24rem;
    font-size: .18rem;
    color: #535353;
    height: .48rem;
    padding: .04rem .1rem;
    margin-bottom: .1rem;
    /*将对象作为弹性伸缩盒子模型显示*/
    //display: -webkit-box;
    /*设置子元素排列方式*/
    //-webkit-box-orient: vertical;
    /*设置显示的行数，多出的部分会显示为...*/
    //-webkit-line-clamp: 2;

    ///*文本不会换行*/
    white-space: nowrap;
    ///*当文本溢出包含元素时，以省略号表示超出的文本*/
    text-overflow: ellipsis;
  }

  p {
    display: flex;
    padding: .06rem .1rem .14rem;
    justify-content: space-between;
    color: #939393;
    font-size: .16rem;

    span{
      max-width: 3.2rem;
      overflow: hidden;
      ///*文本不会换行*/
      white-space: nowrap;
      ///*当文本溢出包含元素时，以省略号表示超出的文本*/
      text-overflow: ellipsis;

    }

  }

}

.item-con:hover {
  box-shadow: 1px 1px 20px 3px rgba(0, 0, 0, .14);
}

//分页
.pagination-con {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}


.add-btn {
  width: 1.2rem;
  height: .44rem;
  line-height: .44rem;
  background: linear-gradient(90deg, #3BBFFD, #0E5EAB);
  color: #ffffff;
  font-size: 14px;
  text-align: center;
  margin-left: 20px;
  border-radius: .04rem;
  -o-user-select: none;
  /// 火狐 firefox /
  -moz-user-select: none;
  ///webkit浏览器/
  -webkit-user-select: none;
  /// IE10 + /
  -ms-user-select: none;
  ///早期的浏览器/
  -khtml-user-select: none;
  user-select: none;
  cursor: pointer;
  position: relative;
}

.add-btn:after {
  position: absolute;
  z-index: 1;
  background-color: rgba(0, 0, 0, .1);
  transition: all .3s;
  width: 100%;
  height: 100%;
  content: "";
  top: 0;
  left: 0;
  right: 0;

}

.add-btn:hover:after {
  background-color: rgba(0, 0, 0, 0);
}

@media screen and (max-width: 1200px){
  main{
    padding-top: 40px;
  }
  .banner-con{
    height: 200px;
    padding: 0;
    justify-content: center;
    margin-bottom: 0;

    >div{
      width: auto;
    }
  }
  .page-con{
    padding: 20px .34rem .4rem;
  }

  .banner-title{
    font-size: 24px;
  }
  .search-con{
    height: 44px;
    line-height: 44px;
    border-radius: 4px;
    >div{
      width: 44px;
      height: 44px;
    }
    >input{
      width: 160px;
    }
    >span{
      width: 80px;
      height: 44px;
      line-height: 44px;
    }
  }

  .item-con{
    img{
      height: 100px;
    }
  }
}


</style>
