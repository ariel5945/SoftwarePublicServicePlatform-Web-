<template>
  <main>
    <div class="main-body">
      <!--平台介绍-->
      <div class="jieshao-con">
        <h3>洛阳软件公共服务平台</h3>
        <p>以先进技术成就领先科技，以卓越品质铸就专业平台</p>
        <img src="./../../assets/image/login_bg2.png">
      </div>
      <div class="form-con">
        <div class="dl-tab">
          <img v-if="loginTab === 2" @click="loginTab = 1" src="./../../assets/image/pc-login.png" alt="">
          <img v-if="loginTab === 1" src="./../../assets/image/wx-login.png" alt="">
          <!--<img v-if="loginTab === 1" @click="loginTab = 2" src="./../../assets/image/wx-login.png" alt="">-->
        </div>

        <div v-if="loginTab === 1" class="login-type">
          <h4 :class="{'act-h4': loginType === 2}" @click="loginType = 2">邮箱登录</h4>
          <h4 :class="{'act-h4': loginType === 1}" @click="loginType = 1">密码登录</h4>
        </div>
        <el-form v-show="loginType === 1 && loginTab === 1" :model="loginForm" :rules="loginRules" ref="loginForm">
          <el-form-item prop="username">
            <el-input maxlength="50" placeholder="请输入您的登录账号" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input maxlength="50" @keydown.enter.native="submitForm('loginForm')" type="password" placeholder="请输入您的登录密码"
                      v-model="loginForm.password"></el-input>
          </el-form-item>
          <!--<el-form-item style="opacity: 0" prop="username">-->
          <!--  <el-input maxlength="50" placeholder="请输入您的登录账号" v-model="loginForm.username"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item>
            <div class="login-btn" @click.prevent="submitForm('loginForm')">立即登录</div>
          </el-form-item>
          <el-form-item>
            <div class="pwd-cont">
              <div>
                <el-checkbox v-model="checked">记住密码</el-checkbox>
              </div>
              <div>
                <!--<router-link class="forgot-btn" to="/forgot">忘记密码</router-link>-->
                <router-link class="register-btn" to="/register">立即注册</router-link>
              </div>

            </div>
          </el-form-item>

        </el-form>

        <!-- ++++++++++++++++++++++++++++++++++++++++ 邮箱登录 ++++++++++++++++++++++++++++++++++++ -->
        <el-form v-show="loginType === 2 && loginTab === 1" :model="emailForm" :rules="emailRules" ref="emailForm">
          <el-form-item prop="loginName">
            <el-input maxlength="50" placeholder="请输入您的邮箱账号" v-model="emailForm.loginName"></el-input>
          </el-form-item>
          <el-form-item>
            <SliderVerifyCode v-model="isLock" @change="handlerLock"></SliderVerifyCode>
          </el-form-item>
          <el-form-item prop="smsCode">
            <div class="code-con">
              <el-input maxlength="6" @keydown.enter.native="submitForm('emailForm')"
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
          <el-form-item>
            <div class="login-btn" @click.prevent="submitForm('emailForm')">立即登录</div>
          </el-form-item>
          <el-form-item>
            <div class="pwd-cont" style="justify-content: center;">
              <router-link class="register-btn" to="/register">立即注册</router-link>

            </div>
          </el-form-item>
          <!--<el-form-item prop="name">-->
          <!--  <div>-->
          <!--    记住密码-->
          <!--  </div>-->
          <!--</el-form-item>-->
        </el-form>
        <!--用户登录-->
        <!--<div style="width: 200px">-->
        <!--  <SliderVerifyCode v-model="isLock" @change="handlerLock"></SliderVerifyCode>-->
        <!--</div>-->

        <div v-if="loginTab === 2" class="login-type">
          <h4 class="act-h4">微信二维码登录</h4>
        </div>
        <div class="wx-login-con" v-show="loginTab === 2">

          <div>
            <img src="./../../assets/image/caoliao.png">
          </div>
          <h4>使用微信扫一扫登录<br>"洛阳软件公共服务平台"</h4>
          <div>
            <span @click="loginTab = 1;loginType = 1">密码登录</span>
            <router-link to="register">注册新账户</router-link>
          </div>


        </div>

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
  name: "loginView",
  data() {
    return {
      loginTab: 1,
      loginType: 2,
      getCode: 60,
      isLock: false,
      userCanGet: true,
      checked: false,
      loginForm: {
        username: "",
        password: "",
      },
      emailForm: {
        loginName: "",
        smsCode: "",
      },
      loginRules: {
        username: [
          {required: true, message: '请输入登录账号', trigger: 'blur'},
          // {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'},
          {min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
        ],
      },
      emailRules: {
        loginName: [
          {required: true, message: '请输入登录账号', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'},
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

    // 登录
    submitForm(formName) {
      // if(formName === 'emailForm'){
      if(formName === 'loginForm'){
        if(this.checked){
          localStorage.setItem('bc_user',JSON.stringify(this.loginForm));
        } else {
          localStorage.removeItem('bc_user');
          this.checked = false;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = "/apiLogin/loginApi";
            let data = this.loginForm;
            HTTP.get(url, data, res => {
              if (res.code === '0') {
                localStorage.setItem('access_token', res.token);
                this.getUserOne();
              } else {
                this.$message.warning(res.msg);
              }
            }, false)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = "/apiLogin/smsLogin";
            let data = this.emailForm;
            HTTP.get(url, data, res => {
              if (res.code === '0') {
                localStorage.setItem('access_token', res.token);
                this.getUserOne();
              } else {
                this.$message.warning(res.msg);
              }
            }, false)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
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
      console.log(data)
      // if (data) {
      //   this.$refs.form.validateField('isLock');
      // }
    },
  },
  mounted() {
    let userCheck = JSON.parse(localStorage.getItem('bc_user'));
    if(userCheck){
      this.loginForm = userCheck;
      this.checked = true;
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
  max-width: 400px;
  flex: .9;

  h3 {
    margin-bottom: 24px;
    height: 54px;
    color: rgba(255, 255, 255, 1);
    font-size: 28px;
    text-align: center;
  }

  p {
    height: .4rem;
    color: rgba(255, 255, 255, 100);
    font-size: .14rem;
    line-height: .2rem;
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
