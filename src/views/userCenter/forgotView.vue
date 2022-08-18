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
        <div class="login-type">
          <h4 :class="{'act-h4': emailForm.roleType === 'register_user_role'}" @click="emailForm.roleType = 'register_user_role'">忘记密码</h4>
        </div>

        <!-- ++++++++++++++++++++++++++++++++++++++++ 邮箱登录 ++++++++++++++++++++++++++++++++++++ -->
        <el-form :model="emailForm" :rules="emailRules" ref="emailForm">
          <el-form-item prop="loginName">
            <el-input maxlength="50" placeholder="请输入您的邮箱账号" v-model="emailForm.loginName"></el-input>
          </el-form-item>
          <el-form-item>
            <SliderVerifyCode v-model="isLock" @change="handlerLock"></SliderVerifyCode>
          </el-form-item>
          <el-form-item prop="smsCode">
            <div class="code-con">
              <el-input maxlength="10" @keydown.enter.native="submitForm('emailForm')"
                        style="width: 56%"
                        placeholder="请输入邮箱验证码"
                        v-model="emailForm.smsCode"></el-input>
              <div v-if="!userCanGet" class="get-code-no">
                {{ getCode }}s
              </div>
              <div v-else @click="getCodeBtn()" class="get-code">
                发送验证码
              </div>
              <!--<span class="get-code" @click="getCodeBtn">发送验证码</span>-->
            </div>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input maxlength="50" type="password" placeholder="请输入新的登录账号" v-model="emailForm.pwd"></el-input>
          </el-form-item>
          <el-form-item prop="pwd1">
            <el-input maxlength="50" type="password" placeholder="请再次输入新的登录账号" v-model="emailForm.pwd1"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="login-btn" @click.prevent="submitForm('emailForm')">立即修改</div>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </main>
</template>

<script>
import HTTP from "./../../server/http"
import SliderVerifyCode from './../../components/isLock.vue'

export default {
  components: {
    SliderVerifyCode,
  },
  name: "forgotView",
  data() {
    return {
      regTab: 1,
      getCode: 60,
      isLock: false,
      userCanGet: true,
      loginForm: {
        username: "",
        password: "",
      },
      regFoem: {
        pwd1: "",
        pwd: "",
        loginName: "",
        sType: "2",
        smsCode: "",
        roleId: 36
      },
      emailForm: {
        pwd1: "",
        pwd: "",
        loginName: "",
        sType: "2",
        smsCode: "",
        roleType: "register_user_role"
      },
      emailRules: {
        loginName: [
          {required: true, message: '请输入登录账号', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'},
          {min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          {min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur'}
        ],
        pwd1: [
          {required: true, message: '请再次输入登录密码', trigger: 'blur'},
          {min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur'}
        ],
        smsCode: [
          {required: true, message: '请输入邮箱验证码', trigger: 'blur'},
        ],
      },
    }
  },
  methods: {
    userLogin() {
      this.$emit("userLogin", true);
    },
    getUserOne() {
      let url = "/api/user/getRegisterUserByLogin";
      let data = {};
      HTTP.get(url, data, res => {
        if (res.code === '0') {
          localStorage.setItem("user_login", true);
          localStorage.setItem("user_role", JSON.stringify(res.role));
          this.userLogin();
          if (res.role.roleId === 36 || res.role.roleId === 40) {
            this.$router.push("/yanzhengname")
          } else {
            this.$router.push("/")
          }

        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },
    login() {
      let url = "/apiLogin/loginApi";
      let data = {
        username: this.emailForm.loginName,
        password: this.emailForm.pwd,
      };
      HTTP.get(url, data, res => {
        if (res.code === '0') {
          localStorage.setItem('access_token', res.token);
          this.getUserOne();
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },

    // 登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = "/apiLogin/registerLoginAccount";
          let data = this.emailForm;
          HTTP.get(url, data, res => {
            if (res.code === '0') {
              // console.log(res)
              if (res.code == '0') {
                this.$message.success("注册成功");
                this.login();
                // this.$router.push("/login");
              } else {
                this.$message.warning(res.msg);
              }
            } else {
              this.$message.warning(res.msg);
            }
          }, false)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    getCodeBtn() {
      if (!this.emailForm.loginName) {
        this.$message.warning("请先输入您的邮箱地址")
        return false;
      }
      if (!this.isLock) {
        this.$message.warning("请先将滑块移动至最右")
        return false;
      }
      this.userCanGet = false;

      this.timeDown();
      let url = "/apiLogin/sendSms";
      let data = {
        subject: this.emailForm.loginName,
        sType: 2,
      };
      HTTP.get(url,data,res=>{
        if (res.code === "0") {
          // this.codeIsOk = true;
        }
      },false)
    },
    timeDown() {
      if (this.getCode > 0) {
        let timeSet = setTimeout(() => {
          this.getCode -= 1;
          if (this.getCode === 0) {
            this.userCanGet = true;
            clearTimeout(timeSet);
          } else {
            this.timeDown();
          }
        }, 1000)
      }
      //
    },

    // 滑动条
    handlerLock(data) {
      this.isLock = data;
      // console.log(data)
      // if (data) {
      //   this.$refs.form.validateField('isLock');
      // }
    },
  },
  mounted() {
    let userCheck = JSON.parse(localStorage.getItem('bc_user'));
    if(userCheck){
      this.loginForm = userCheck;
    }
  }
}
</script>

<style lang="scss" scoped>

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
  max-width: 400px;

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
  position: relative;
  padding: 60px 50px 30px;
  //flex: 1;
  width: 458px;
  background-color: #ffffff;
  flex-direction: column;
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

  .login-type {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 40px;


    h4 {
      color: #9B9B9B;
      font-size: 20px;
      padding-bottom: 6px;
      font-weight: normal;
      border-bottom: 2px solid transparent;
      margin-right: 20px;
      cursor: pointer;
      transition: all .3s;
    }

    h4.act-h4 {
      color: #101010;
      font-size: 20px;
      padding-bottom: 6px;
      border-bottom: 2px solid #3A62D7;
    }
  }


}


.login-btn {
  height: 46px;
  line-height: 46px;
  border-radius: 3px;
  background-color: rgba(74, 129, 242, 1);
  color: rgba(255, 255, 255, 100);
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  position: relative;
}

.login-btn:after {
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

.login-btn:hover:after {
  background-color: rgba(0, 0, 0, 0);
}

.get-code{
  height: 40px;
  width: 40%;
  border-radius: 4px;
  background-color: rgba(114, 149, 249, 1);
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
  margin-left: 20px;
  min-width: 130px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  box-sizing: border-box;
}
.get-code-no{
  height: 40px;
  width: 40%;
  border-radius: 4px;
  background-color: rgba(114, 149, 249, .4);
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
  margin-left: 20px;
  min-width: 130px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  box-sizing: border-box;
}

.code-con{
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.pwd-cont{
  display: flex;
  justify-content: space-between;
}

.forgot-btn{
  color: #A6A6A6;
  margin-right: 12px;
}


//登录方式
.dl-tab{
  position: absolute;
  z-index: 99;
  width: 60px;
  height: 60px;
  top: 20px;
  right: 20px;
  cursor: pointer;
}


.wx-login-con{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px 40px;

  h4{
    font-size: 16px;
    margin: 30px;
    text-align: center;
    line-height: 24px;

  }

  img{
    width: 160px;
    height: 160px;
    margin: 0 auto 10px;
  }

  span{
    cursor: pointer;
    padding-right: 10px;
    border-right: 1px solid #A6A6A6;
    color: #A6A6A6;
  }

  a{
    color: #A6A6A6;
    margin-left: 10px;
  }

}

</style>
