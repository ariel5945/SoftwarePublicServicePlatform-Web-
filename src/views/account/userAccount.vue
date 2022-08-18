<template>
  <div>
    <div class="top-tip">
      提示：您需要完善<span style="color: #F89F60">基本信息</span>和<span style="color: #F89F60">通过认证</span>才能发布，参与项目。
    </div>
    <div class="account-head">
      <el-upload
          class="head-img"
          action="#"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="changePictureUpload"
      >
        <img v-if="userImgUrl" :src="userImgUrl" style="width: 100%;height: 100%"/>
        <i v-else class="el-icon-plus avatar-uploader-icon"/>
      </el-upload>
      <div>
        <h4 @click="dialogVisible=true" style="margin-bottom: 20px;display: flex"><span>昵称：</span>
          <!--{{ userName }}-->
          <p v-if="roleId==36 || roleId==39">{{ userName }}</p>
          <p v-if="roleId==40 || roleId==37">{{ comForm.companyName }}</p>
          <!--<i class="el-icon-edit edit-btn"><span>修改昵称</span></i>-->
        </h4>
        <h4><span>账号：</span>{{ loginAccount }}</h4>
      </div>
    </div>
    <div class="account-text">
      <h4>认证信息</h4>
      <div class="shenhe-con">
        <!--<div v-if="approveStatus == 0 && roleId==36">-->
        <!--  审核中...-->
        <!--</div>-->
        <!--<div v-else-if="approveStatus == 0 && roleId==40">-->
        <!--  审核中...-->
        <!--</div>-->
        <!--<div v-else-if="roleId==39">-->
        <!--  已认证开发者-->
        <!--</div>-->
        <!--<div v-else-if="roleId==37">-->

        <!--  已认证企业-->
        <!--</div>-->
        <div>
          <div v-if="roleId==36 || roleId==39" class="renzheng-con">
            <div>
              <el-upload
                  class="avatar-uploader"
                  action="https://admin.lyrjfwpt.cn/api/common/upload"
                  :headers="headerToken"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload1"
              >
                <!-- <span> {{ imageUrTwo }}  </span> -->
                <div>
                  <img v-if="imageUrOne" :src="imageUrOne" class="activelist"/>
                  <p v-else>
                    <img src="@/assets/image/login_shenfenzheng1.png" class="imgs"/>
                  </p>
                  <div class="uploadButton">点击上传</div>
                </div>
              </el-upload>
            </div>
            <!--身份证反面-->
            <div>
              <el-upload
                  class="avatar-uploader"
                  action="https://admin.lyrjfwpt.cn/api/common/upload"
                  :headers="headerToken"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload2"
              >
                <!-- <span> {{ imageUrTwo }}  </span> -->
                <div>
                  <img v-if="imageUrTwo" :src="imageUrTwo" class="activelist"/>
                  <p v-else>
                    <img src="@/assets/image/login_shenfenzheng2.png" class="imgs"/>
                  </p>
                  <div class="uploadButton">点击上传</div>
                </div>
              </el-upload>
            </div>
          </div>
          <!--<span></span>-->
          <div v-if="roleId==36 || roleId==39" class="Fraudfilm-foor" @click="filezong()">
            提交
          </div>

          <div v-if="roleId==40 || roleId==37" style="margin-bottom: 20px">
            <el-upload
                class="avatar-uploader"
                action="https://admin.lyrjfwpt.cn/api/common/upload"
                :headers="headerToken"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
              <div class="main">

                <img v-if="imageUrlFront" :src="imageUrlFront" class="activelist1"/>
                <p v-else>
                  <img src="@/assets/image/login_yingyezhizhao.png" class="activelist1"/>
                </p>
                <div class="uploadButton">点击上传</div>
              </div>
            </el-upload>
          </div>
          <div v-if="roleId==40 || roleId==37" class="Fraudfilm-foor" @click="filezongQy()">
            提交
          </div>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="address-con" v-if="roleId==37 || roleId==40">
      <!--<h4>企业行业</h4>-->
      <!--<el-input-->
      <!--    type="textarea"-->
      <!--    style="width: 80%"-->
      <!--    :rows="4"-->
      <!--    placeholder="请输入企业具体地理位置"-->
      <!--    v-model="textarea">-->
      <!--</el-input>-->
      <h4>企业信息</h4>
      <el-form label-position="top" :model="comForm">
        <el-form-item label="公司名称">
          <el-input
              style="width: 80%"
              placeholder="请输入公司名称"
              v-model="comForm.companyName">
          </el-input>
        </el-form-item>
        <el-form-item label="公司logo">
          <div>
            <el-upload
                class="avatar-uploader"
                action="https://admin.lyrjfwpt.cn/api/common/upload"
                :headers="headerToken"
                :show-file-list="false"
                :on-success="handleAvatarSuccess4"
                :before-upload="beforeAvatarUpload4"
            >
              <!-- <span> {{ imageUrTwo }}  </span> -->
              <div>
                <img v-if="comForm.companyLogo" :src="comForm.companyLogo" class="activelist"/>
                <p v-else>
                  <img src="@/assets/image/nodata.png" class="imgs"/>
                </p>
                <div class="uploadButton">点击上传</div>
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="公司形象">
          <div>
            <el-upload
                class="avatar-uploader"
                action="https://admin.lyrjfwpt.cn/api/common/upload"
                :headers="headerToken"
                :show-file-list="false"
                :on-success="handleAvatarSuccess3"
                :before-upload="beforeAvatarUpload3"
            >
              <!-- <span> {{ imageUrTwo }}  </span> -->
              <div>
                <img v-if="comForm.companyImg" :src="comForm.companyImg" class="activelist"/>
                <p v-else>
                  <img src="@/assets/image/nodata.png" class="imgs"/>
                </p>
                <div class="uploadButton">点击上传</div>
              </div>
            </el-upload>
          </div>
        </el-form-item>


        <el-form-item label="行业类型">
          <el-input
              style="width: 80%"
              placeholder="请输入行业类型"
              v-model="comForm.industryType">
          </el-input>
        </el-form-item>
        <!--<el-form-item label="公司法人">-->
        <!--  <el-input-->
        <!--      style="width: 80%"-->
        <!--      placeholder="请输入公司法人"-->
        <!--      v-model="comForm.companyUserName">-->
        <!--  </el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="联系电话">
          <el-input
              style="width: 80%"
              placeholder="请输入公司联系电话"
              v-model="comForm.companyTelphone">
          </el-input>
        </el-form-item>
        <el-form-item label="联系邮箱">
          <el-input
              style="width: 80%"
              placeholder="请输入企业邮箱"
              v-model="comForm.companyEmail">
          </el-input>
        </el-form-item>
        <el-form-item label="公司地址">
          <el-input
              type="textarea"
              style="width: 80%"
              :rows="4"
              placeholder="请输入企业具体地理位置"
              v-model="comForm.companyAddr">
          </el-input>
        </el-form-item>
        <el-form-item label="公司简介">
          <el-input
              type="textarea"
              style="width: 80%"
              :rows="4"
              maxlength="200"
              show-word-limit
              placeholder="请输入公司简介"
              v-model="comForm.newsRemark">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即提交</el-button>
        </el-form-item>
      </el-form>

    </div>


    <el-dialog
        title="修改昵称"
        :lock-scroll="false"
        :visible.sync="dialogVisible"
        width="420px"
        :before-close="handleClose">
      <el-form ref="form" label-width="80px" style="padding-right: 40px">
        <el-form-item label="昵称">
          <el-input v-model="userName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="onSubmit">修 改</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import HTTP from "./../../server/http"

export default {
  name: "userAccount",
  data() {
    return {
      dialogVisible: false,
      headerToken: {
        token: localStorage.getItem("access_token")
      },
      userImgUrl: require("./../../assets/image/login_icon_kaifazhe.png"), // 头像
      userName: "", // 头像
      loginAccount: "", // 头像
      roleId: 36,

      approveStatus: 0,

      basetwo: "",
      baseone: "",
      imageUrOne: "",
      imageUrTwo: "",
      imageUrlFront: "",

      comForm: {
        companyAddr: "",
        companyCode: "",
        companyEmail: "",
        companyIntroduce: "",
        companyLogo: "",
        companyName: "",
        companyTelphone: "",
        industryType: "",
        companyUserName: "",
        companyImg: "",
        newsRemark: "",
      },
      companyId: "",
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    onSubmit() {
      let url = "/api/companyInfo/update?id=" + this.companyId;
      let data = this.comForm;
      HTTP.postForm(url, data, res => {
        if(res.code === 1){
          this.$message.success("操作成功");
        } else {
          this.$message.error(res.msg);
        }
      }, false)
    },
    getImgCode(img, type) {
      let url = "/portal/common/fileNameToUrl";
      let data = {
        name: img
      }
      HTTP.get(url, data, res => {
        if (type == 1) {
          this.imageUrOne = res.url
        } else if (type == 2) {
          this.imageUrTwo = res.url
        } else {
          this.imageUrlFront = res.url
        }

      }, false)
    },


    getUserAccount() {
      let url = "/api/user/getRegisterUserByLogin";
      let data = {}
      HTTP.get(url, data, res => {
        if (res.data.userImgUrl) {
          this.userImgUrl = res.data.userImgUrl
        }
        this.getImgCode(res.data.idCardUrl, 2);
        this.getImgCode(res.data.idCardReverseUrl, 1);
        // this.getqyCode1(res.data.idCardUrl);
        // this.getqyCode2(res.data.idCardReverseUrl);
        this.userName = res.data.userName
        this.baseone = res.data.idCardReverseUrl;
        this.basetwo = res.data.idCardUrl;
        this.roleId = res.role.roleId;
        if (res.role.roleId == 37 || res.role.roleId == 40) {
          this.getCompanyId(res.data.loginAccountId)
        }
        this.getUserRole(res.data.loginAccount)

        this.loginAccount = res.data.loginAccount
        // console.log(res)
      }, false)

    },
    changePictureUpload(file) {
      const isJPG = file.raw.type === "image/jpeg";
      const isPNG = file.raw.type === "image/png";
      const isLt2M = file.raw.size / 1024 / 1024 < 2;
      if (file.raw) {
        if (isJPG || isPNG) {
          const fileFormData = new FormData();
          fileFormData.append("multipartFile", file.raw);
          let url = "/api/user/updateUserImgByLogin";
          let data = fileFormData;
          HTTP.post(url, data, res => {
            if (res) {
              this.userImgUrl = URL.createObjectURL(file.raw)
              //接口调用成功后赋值src
              this.$message({
                message: '恭喜你，上传成功！',
                type: 'success'
              })
            }
          }, false);
        } else {
          this.$message.error("上传图片只能是 JPG或PNG 格式!");
        }
      }

      if (!isLt2M) {
        this.$message.error('图片尺寸限制最小为270 x 270，大小不可超过3MB，比例为1:1');

      }
      // 返回图是jpg或png格式并且大小不超过2MB
      return (isJPG || isPNG) && isLt2M;
    },
    getUserRole(username) {
      let data = {
        loginAccount: username
      }
      let url = "/api/auth/state"
      HTTP.get(url, data, res => {
        // console.log(res.data.approveStatus)
        this.approveStatus = res.data.approveStatus
      }, false);
    },

    filezong() {
      let url = "/api/auth/iden";
      let data = {
        role: '39',
        idCardContrary: this.basetwo,
        idCardFront: this.baseone
      }
      HTTP.post(url, data, res => {
        if (res.code == 0) {
          this.$message.success("身份认证提交成功");
        } else {
          this.$message.error(res.msg);
        }
      }, false)
    },
    filezongQy() {
      let url = "/api/auth/iden";
      let data = {
        role: '37',
        license: this.license,
      }
      HTTP.post(url, data, res => {
        if (res.code == 0) {
          this.$message.success("身份认证提交成功");
        } else {
          this.$message.error(res.msg);
        }
      }, false)
    },

    // 企业上传
    handleAvatarSuccess(res, file) {
      this.imageUrlFront = URL.createObjectURL(file.raw);
      this.license = res.name;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.raw.type === "image/jpeg";
      // const isPNG = file.raw.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isLt2M;
    },

    // 身份证背面上传
    handleAvatarSuccess2(res, file) {
      this.imageUrTwo = URL.createObjectURL(file.raw);
      this.basetwo = res.name;
    },
    beforeAvatarUpload2(file) {
      // const isJPG = file.raw.type === "image/jpeg";
      // const isPNG = file.raw.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isLt2M;
    },

    // 身份证正面上传
    handleAvatarSuccess1(res, file) {
      this.imageUrOne = URL.createObjectURL(file.raw);
      this.baseone = res.name;
    },
    beforeAvatarUpload1(file) {
      // const isJPG = file.raw.type === "image/jpeg";
      // const isPNG = file.raw.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isLt2M;
    },





    // 身份证背面上传
    handleAvatarSuccess3(res) {
      // console.log(res.url)
      this.comForm.companyImg = res.url;
      //
      // this.imageUrTwo = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload3(file) {
      // const isJPG = file.raw.type === "image/jpeg";
      // const isPNG = file.raw.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isLt2M;
    },// 身份证背面上传
    handleAvatarSuccess4(res) {
      // console.log(res.url)
      this.comForm.companyLogo = res.url;
      //
      // this.imageUrTwo = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload4(file) {
      // const isJPG = file.raw.type === "image/jpeg";
      // const isPNG = file.raw.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isLt2M;
    },

    // bolo转换base64
    blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          resolve(e.target.result);
        };
        // readAsDataURL
        fileReader.readAsDataURL(blob);
        fileReader.onerror = () => {
          reject(new Error("文件流异常"));
        };
      });
    },

    getCompanyId(id) {
      let url = "/portal/companyInfo/getConpanyInfoByAccountId";
      let data = {
        accountId: id,
      };
      HTTP.get(url, data, res => {
        if (res.code == 0) {
          this.getImgCode(res.data.businessLicenseUrl, 3);
          this.companyId = res.data.id
          // this.comForm
          this.comForm.companyAddr = res.data.companyAddr;
          this.comForm.companyCode = res.data.companyCode;
          this.comForm.companyEmail = res.data.companyEmail;
          this.comForm.companyIntroduce = res.data.companyIntroduce;
          this.comForm.companyLogo = res.data.companyLogo;
          this.comForm.companyName = res.data.companyName;
          this.comForm.companyTelphone = res.data.companyTelphone;
          this.comForm.industryType = res.data.industryType;
          this.comForm.companyUserName = res.data.companyUserName;
          this.comForm.companyImg = res.data.companyImg;
          this.comForm.newsRemark = res.data.newsRemark;
          // console.log(res)
          // console.log(res.data.businessLicenseUrl)
        } else {
          this.$message.error(res.msg)
        }
      }, false);
    }

  },
  created() {
    this.getUserAccount()
  }
}
</script>

<style scoped lang="scss">

.imgs {
  width: 240px;
}

.activelist {
  width: 232px;
  //height: 153px;
}

.activelist1 {
  width: 244px;
  //height: 212px;
}


.top-tip {
  padding: 0 34px;
  height: 54px;
  line-height: 54px;
  background-color: #FFF6DE;
  color: #A0A6AD;
}

.account-head {
  border: 1px solid rgba(214, 216, 219, 1);
  border-radius: 4px;
  padding: 30px;
  margin: 30px auto 47px;
  display: flex;
  align-items: center;

  h4 {
    font-size: 20px;
    font-weight: normal;

    span {
      color: #A0A6AD;
    }
  }

  .head-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 37px;

    img, div {
      width: 100px;
      height: 100px;
    }
  }

}

.account-text {
  h4 {
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 20px;
  }
}

.shenhe-con {
  padding-top: 20px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.renzheng-con {
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;

  > div {
    width: 48%;
  }
}


.uploadButton {
  width: 100%;
  height: 44px;
  line-height: 44px;
  border-radius: 0px 0px 4px 4px;
  background-color: rgba(50, 145, 248, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
}

.Fraudfilm-foor {
  width: 120px;
  height: 44px;
  line-height: 44px;
  border-radius: 4px;
  background-color: rgba(50, 145, 248, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
  margin: 10px auto 20px;
  cursor: pointer;
}


.address-con {

  h4 {
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 20px;
  }

}

.edit-btn {
  margin-left: 40px;
  color: #3291F8;
  cursor: pointer;

  span {
    color: #3291F8 !important;
    font-size: 14px;
  }

}

</style>