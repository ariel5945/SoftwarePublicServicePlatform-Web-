<template>
  <main>
    <section class="banner-con">
      <div>
        <h3 class="banner-title">线上培训</h3>
        <div style="display: flex;">
          <div class="search-con">
            <div>
              <el-icon class="el-icon-search"></el-icon>
            </div>
            <input type="text" v-model="title" placeholder="搜索您需要的内容">
            <span @click="searchGetList()">搜索</span>
          </div>
          <div class="add-btn hidden-md-and-down" v-if="roleId==37" @click="dialogVisible=true">
            发布视频
          </div>
        </div>
      </div>
    </section>

    <section class="page-con">
      <div class="class-list" v-if="roleId == 42">
        <div @click="getClass(1)" :class="{'class-act': classId === 1}">
          公共视频
        </div>
        <div @click="getClass(0)" :class="{'class-act': classId === 0}">
          内部视频
        </div>


      </div>
      <div class="source-list" v-loading="getLoad" element-loading-text="拼命加载中...">
        <div class="list-con" v-if="dataList.length>0">
          <el-row :gutter="20">
            <el-col :md="12" :lg="6" :xs="12" v-for="(item,index) in dataList" :key="'list'+index">
              <div class="item-con" @click="jumpDetail(item.id,item.title)">
                <div>
                  <img :src="item.iconUrl">
                  <h4>{{ item.title }}</h4>
                </div>

                <h4>{{ item.title }}</h4>
                <p>
                  <span>{{ item.company }}</span>
                  <span>{{ item.createDate }}</span>
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
      <!--{{ $route.matched[0].path }}-->
    </section>

    <el-dialog
        title="添加课程"
        :visible.sync="dialogVisible"
        :lock-scroll="false"
        width="500px"
        :before-close="handleClose">
      <div style="display: flex;justify-content: center;padding-right: 60px">
        <el-form v-if="nextBtn" :model="ruleForm" :rules="rules"
                 ref="ruleForm" label-width="100px" style="width: 100%">
          <el-form-item label="标题:" prop="title">
            <!-- 标题 -->
            <el-input style="width: 308px" v-model="ruleForm.title" autocomplete="off" placeholder="请输入项目标题"></el-input>
          </el-form-item>
          <el-form-item label="封面图:" prop="iconImg">
            <el-upload
                class="avatar-uploader"
                action="https://admin.lyrjfwpt.cn/api/common/upload"
                :headers="headerToken"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
              <div>
                <img v-if="ruleForm.iconImg" :src="ruleForm.iconImg" class="activelist"/>
                <p v-else>
                  <img src="@/assets/image/nodata.png" class="imgs"/>
                </p>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="内部视频:">
            <!-- 标题 -->
            <el-switch
                v-model="isNeibu"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" @click="submitForm('ruleForm')">发 布
            </el-button>

            <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
          </el-form-item>
        </el-form>

      </div>

    </el-dialog>
  </main>
</template>

<script>
import HTTP from "@/server/http";

export default {
  name: "videoView",
  data() {
    return {
      headerToken: {
        token: localStorage.getItem("access_token")
      },

      dialogVisible: false,
      nextBtn: true,

      roleId: 36,
      companyList: "",
      isNeibu: true,
      imageUrl: '',
      ruleForm: {
        title: "",
        iconImg: "",
        companyId: "",
      },

      rules: {
        title: [
          {required: true, message: '请输入视频标题', trigger: 'blur'},
        ],
        iconImg: [
          {required: true, message: '请上传封面图', trigger: 'blur'},
        ],
      },
      title: "",
      classId: 1,
      pageNum: 1,
      pageSize: 12,
      dataList: [],
      getLoad: true,
      total: 0,
      subjectId: 0,
    }
  },
  created() {
    if (JSON.parse(localStorage.getItem("user_role"))) {
      this.roleId = JSON.parse(localStorage.getItem("user_role")).roleId;
      this.ruleForm.companyId = localStorage.getItem("compay_Id");
      this.companyList = localStorage.getItem("compay_Id");
    }
    this.getList()
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = "/api/train/createSubject";
          let data = JSON.parse(JSON.stringify(this.ruleForm));
          if(!this.isNeibu){
            data.companyId = "";
          }
          HTTP.post(url, data, res => {
            this.subjectId = res.data.subjectId
            this.$message.success("提交发布审核");
            this.handleClose();
          }, false)
          // alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // submitFormQr() {
    //   let url = ""
    //   if(this.roleId != 37 && this.roleId != 41){
    //     url = "/api/train/uploadVideo";
    //   } else {
    //     url = "/api/train/uploadVideo";
    //   }
    //
    //   let data = this.ruleFormList;
    //   HTTP.post(url, data, res => {
    //     console.log(res)
    //     // this.dialogVisible = false;
    //     this.$message.success("提交发布审核");
    //   }, false)
    // },

    // 上传
    handleAvatarSuccess(res) {
      this.ruleForm.iconImg = res.name;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isLt2M;
    },

    jumpDetail(id,title) {
      this.$router.push({
        path: "/onlineTraining/videoDetail",
        query: {
          videoId: id,
          title: title,
        }
      })
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList()
    },
    searchGetList() {
      this.dataList = [];
      this.getList()
    },
    getClass(type){
      this.classId = type;
      this.dataList = [];
      this.getList()
    },

    getList() {
      this.getLoad = true;
      let url = "";
      let data = {};
      if(this.classId !== 0){
        url = "/portal/training/subjectList";
        data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          title: this.title,
        }
      } else {
        url = "/portal/training/subjectCompanyList";
        data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          title: this.title,
          companyId: Number(this.companyList)
        }
      }
      HTTP.get(url, data, res => {
        if (Number(res.code) === 0) {
          this.dataList = res.data.subject;
          // console.log(this.dataList)
          this.total = res.data.count * this.pageSize;
          this.getLoad = false;
        }
        // console.log(res)
      }, false);
    },
  }
}
</script>

<style scoped lang="scss">


.banner-con {
  background-image: url("./../../assets/image/shixun-bg.png");
  background-size: cover;
  background-position: center;
  height: 434px;
  padding-top: 1.2rem;
  width: 100%;
  margin-bottom: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;


}

.banner-title {
  color: #ffffff;
  font-size: 26px;
  margin-bottom: 20px;
}

.add-btn {
  width: 160px;
  height: 54px;
  line-height: 54px;
  border-radius: 10px;
  background-color: #3291F8;
  color: #ffffff;
  font-size: 14px;
  text-align: center;
  margin-left: 20px;
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

.search-con {
  display: flex;
  height: 55px;
  line-height: 55px;
  background-color: rgba(255, 255, 255, .58);
  overflow: hidden;
  border-radius: 10px;
  font-size: 14px;

  div {
    width: 55px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    width: 105px;
    background-color: #3291F8;
    text-align: center;
    line-height: 55px;
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
    color: #ffffff;
    position: relative;
  }

  input {
    width: 30vw;
  }

  span:after {
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

  span:hover:after {
    background-color: rgba(0, 0, 0, 0);
  }
}

.page-con {
  min-height: 400px;
  width: 96%;
  max-width: 1600px;
  margin: 0 auto;
  border-radius: 10px;
  padding: 44px 54px;
}

.class-list {
  display: flex;
  margin-bottom: 40px;

  div {
    font-size: 16px;
    color: #333333;
    margin-right: 30px;
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
  margin-bottom: 20px;
  background-color: #ffffff;
  cursor: pointer;
  overflow: hidden;
  border-radius: 4px;
  transition: all .3s;
  border-bottom: 1px solid #EDEDED;

  div{
    display: flex;
    position: relative;
    height: 220px;
    margin-bottom: 6px;
    overflow: hidden;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      position: absolute;
      z-index: 1;
    }

    h4{
      position: relative;
      z-index: 2;
      width: 80%;
      color: #FFFFFF;
      text-align: center;
    }
  }



  h4 {
    line-height: 24px;
    font-size: 16px;
    color: #535353;
    height: 54px;
    padding: 4px 10px;
    /*将对象作为弹性伸缩盒子模型显示*/
    display: -webkit-box;
    /*设置子元素排列方式*/
    -webkit-box-orient: vertical;
    /*设置显示的行数，多出的部分会显示为...*/
    -webkit-line-clamp: 2;

    ///*文本不会换行*/
    //white-space: nowrap;
    ///*当文本溢出包含元素时，以省略号表示超出的文本*/
    //text-overflow: ellipsis;
  }

  p {
    display: flex;
    padding: 6px 10px 10px;
    justify-content: space-between;
    color: #939393;
    font-size: 12px;
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

.fengmian-con{
  width: 154px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px #D6D8DB dashed;
  border-radius: 4px;
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