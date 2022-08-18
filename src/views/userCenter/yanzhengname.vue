<template>
  <main>
    <div class="main-body">
      <!--平台介绍-->
      <div class="jieshao-con">
        <h3>洛阳软件信息技术平台</h3>
        <p>优质服务加持，让企业领先不止一步</p>
        <img src="./../../assets/image/login_bg2.png">
      </div>
      <div class="form-con">
        <h3 v-if="roleId===36">开发者认证</h3>
        <h3 v-else-if="roleId===40">企业认证</h3>
        <div v-if="roleId===36" class="renzheng-con">
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
        <div v-if="roleId===36" class="Fraudfilm-foor" @click="filezong()">
          提交
        </div>

        <div v-if="roleId===40" style="margin-bottom: 20px">
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
        <div v-if="roleId===40" class="Fraudfilm-foor" @click="filezongQy()">
          提交
        </div>

        <div class="jump-btn" @click="jumpReg()">
          跳过
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import HTTP from "@/server/http";

export default {
  name: "yanzhengView",
  data() {
    return {
      headerToken: {
        token: localStorage.getItem("access_token")
      },

      roleId: 36,
      basetwo: "",
      baseone: "",
      imageUrOne: "",
      imageUrTwo: "",
      imageUrlFront: "",
    }
  },
  methods: {
    jumpReg() {
      this.$router.push({
        path: "/"
      })
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
          this.jumpReg();
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
          this.jumpReg();
        } else {
          this.$message.error(res.msg);
        }
      }, false)
    },

    // 企业上传
    handleAvatarSuccess(res,file) {
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
    handleAvatarSuccess2(res,file) {
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
    handleAvatarSuccess1(res,file) {
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
  },
  created() {
    if(JSON.parse(localStorage.getItem("user_role"))){
      this.roleId = JSON.parse(localStorage.getItem("user_role")).roleId;
    }
  }
}
</script>

<style lang="scss" scoped>
.activelist {
  width: 232px;
  height: 153px;
}
.activelist1{
  width: 244px;
  height: 212px;
}

.Fraudfilm-foor {
  width: 160px;
  height: 54px;
  line-height: 54px;
  border-radius: 10px;
  background-color: rgba(50, 145, 248, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
}

.jump-btn {
  color: #5d5d5d;
  cursor: pointer;
}

* {
  transition: all .3s;
}

main {
  height: 100.1vh;
  background-image: url("./../../assets/image/login_bg.png");
  background-size: cover;
  background-position: center;
  padding-top: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}

.main-body {
  display: flex;
  overflow: hidden;
  border-radius: 4px;
}

.jieshao-con {
  background-color: rgba(74, 129, 242, .8);
  padding: 40px 16px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: .9;
  max-width: 600px;

  h3 {
    margin-bottom: 24px;
    height: 54px;
    color: rgba(255, 255, 255, 1);
    font-size: 28px;
    text-align: center;
  }

  p {
    height: 40px;
    color: rgba(255, 255, 255, 100);
    font-size: 18px;
    text-align: center;
  }

  img {
    width: 60%;
    margin-top: 20px;
  }

}

.form-con {
  display: flex;
  padding: 60px 40px;
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h3 {
    height: 54px;
    color: #333;
    font-size: 20px;
    text-align: center;
    margin-bottom: 23px;
  }

  .renzheng-con {
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;

    > div {
      width: 48%;
    }
  }

}

.imgs{
  width: 240px;
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

</style>
