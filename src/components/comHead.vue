<template>
  <header v-if="!$route.meta.hideHead" ref="menuCon" :class="{'nav-bg': $route.meta.navBg || homeHead}">
    <div class="top-con hidden-md-and-down">
      <!--logo 盒子-->
      <router-link to="/" class="logo-con">
        <img class="logo-img-2" src="./../assets/image/logo_2.png" alt="">
        <img class="logo-img-1" src="./../assets/image/logo_1.png" alt="">
        <!--<span>洛阳软件公共服务平台</span>-->
      </router-link>
      <nav>
        <ul class="nav-list">
          <li v-for="(item,index) in navList" :key="'nav'+index"
              :class="{'nav-act': item.path === $route.path || item.path === $route.meta.navOpen}">
            <router-link :to="item.path">{{ item.title }}</router-link>
          </li>
          <li>
            <a href="http://fullscreen.lyrjfwpt.cn/#/index" target="_blank">平台数据</a>
          </li>
        </ul>
      </nav>
      <div style="height: 100%;display:flex;align-items: center;">
        <div v-if="isLogin">
          <div class="user-center">
            <!--<router-link to="/publishPro" class="joinpro">我参与的项目</router-link>-->
            <router-link to="/mail" class="message-img">
              <img style="width: 22px" src="./../assets/image/icon/icon_email.png" alt=""/>
            </router-link>
            <router-link to="/mail" class="message-img-F">
              <img style="width: 22px" src="./../assets/image/icon/icon_email_f.png" alt=""/>
            </router-link>
            <el-dropdown trigger="click">
              <p class="user-center">
                <el-avatar class="avata" style="height: .4rem;width: .4rem" :src="userImgUrl"></el-avatar>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </p>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/userCenter">
                  <el-dropdown-item>个人中心</el-dropdown-item>
                </router-link>
                <router-link to="/help">
                  <el-dropdown-item>帮助中心</el-dropdown-item>
                </router-link>
                <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="no-login" v-else>
          <!--<router-link class="login-btn" to="/login">登录</router-link>-->
          <!--<router-link class="register-btn" to="/register">注册</router-link>-->
        </div>

      </div>
    </div>


    <div class="hidden-lg-and-up">

      <div class="phone-box">
        <router-link to="/" class="phone-box">
          <img src="./../assets/image/logo_1.png">

        </router-link>
        <div>
          <img @click="openPhone=!openPhone" src="./../assets/image/more.png" alt="">
        </div>

      </div>
      <!--<div>-->
      <!--  -->
      <!--</div>-->
      <div class="phone-nav" :class="{'open-box': openPhone}">
        <div>
          <span @click="gotoPage('/boutique')">软件开发</span>
        </div>
        <div>
          <span @click="gotoPage('/epiboly')">软件外包</span>
        </div>
        <!--<div>-->
        <!--  <span @click="gotoPage('/onlineTraining')">软件实训</span>-->
        <!--</div>-->
        <!--<div>-->
        <!--  <span @click="gotoPage('/detection')">软件检测</span>-->
        <!--</div>-->
        <div>
          <span @click="gotoPage('/development')">软件产品</span>
          <!--<router-link to="/development">软件产品</router-link>-->
        </div>
        <div>
          <span @click="gotoPage('/companyView')">入驻企业</span>
          <!--<router-link to="/development">软件产品</router-link>-->
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import HTTP from "@/server/http";

export default {
  props: {
    isLogin: {},
    homeHead: {},
  },
  data() {
    return {
      userImgUrl: "",
      openPhone: false,
      navList: [
        {title: "软件开发", path: "/boutique"},
        {title: "软件外包", path: "/epiboly"},
        {title: "软件实训", path: "/onlineTraining",},
        {title: "软件检测", path: "/detection"},
        {title: "软件产品", path: "/development"},
        {title: "技术沙龙", path: "/salon"},
        {title: "人才中心", path: "/talents"},
        {title: "入驻企业", path: "/companyView"},
        {title: "资源下载", path: "/resource"},
      ],
    }
  },
  methods: {
    gotoPage(path) {
      this.openPhone = false;
      this.$router.push(path)
    },

    logout() {
      localStorage.clear();
      sessionStorage.clear();
      this.$router.push("/")
      this.$emit("nologin");
      // setTimeout(()=>{
      //   location.reload();
      // },100);
    },
    getUserOne() {
      let url = "/api/user/getRegisterUserByLogin";
      let data = {};
      HTTP.get(url, data, res => {
        if (res.code === '0') {
          localStorage.setItem("user_role", JSON.stringify(res.role));
          if (res.role.roleId === 37) {
            this.getCompanyId(res.role.accountId)
          } else if (res.role.roleId === 41) {
            this.userImgUrl = res.data.userImgUrl;
            localStorage.setItem("compay_Id", JSON.stringify(res.data.companyId));
            // companyId  companyId
          } else {
            this.userImgUrl = res.data.userImgUrl;
          }
          // console.log(res)
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },
    getCompanyId(id) {
      let url = "/portal/companyInfo/getConpanyInfoByAccountId";
      let data = {
        accountId: id
      };
      HTTP.get(url, data, res => {
        if (res.code === '0') {
          localStorage.setItem("compay_Id", JSON.stringify(res.data.id));
          this.userImgUrl = res.data.companyLogo
          // console.log()
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    }
  },

  mounted() {
    if (this.isLogin) {
      this.getUserOne();
    }
    let that = this;
    window.onscroll = function () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let classList = that.$refs.menuCon.classList;
      if (scrollTop > 70) {
        classList.add("top-menu")
      } else {
        classList.remove("top-menu");
      }
    }
  },
  watch: {
    isLogin(val) {
      if (val) {
        this.getUserOne();
      }
    },
  }

}
</script>

<style lang="scss" scoped>
* {
  transition: all .3s;
}

.nav-bg {
  //background-color: #ffffff;
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 14%);

  .top-con {

    //.logo-img-2 {
    //  display: none;
    //}

    nav li.nav-act {
      a {
        color: #3291F8;
      }
    }

    .user-center {
      .message-img {
        //display: flex;
      }

      .message-img-F {
        //display: none;
      }
    }


    nav {
      a {
        color: #fff;
      }
    }

    span {
      color: #333;
    }

    //.logo-img-1 {
    //  display: block;
    //}

    .login-btn {
      border: 1px solid #333;
      //box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.14);
    }

  }
}

header {
  height: 1rem;
  background-color: rgba(0, 0, 0, .5);
  transition: all .3s;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  padding: 0 .6rem 0 .7rem;
  box-sizing: border-box;
  // z-index: 999;
  z-index:2100;
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
  /*opacity: 0;*/

  .top-con {
    height: 1rem;
    display: flex;
    width: 100%;

    nav {
      a {
        color: #ffffff;
        opacity: .7;
      }
    }

    span {
      color: #ffffff;
    }

    .logo-img-2 {
      display: block;
    }

    .logo-img-1 {
      display: none;
    }

    .user-center {
      .message-img {
        display: none;
      }

      .message-img-F {
        //display: flex;
      }
    }
  }
}

.nav-list, .logo-con {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

.logo-con {


  img {
    //width: .22rem;
    height: .46rem;
    display: block;
  }

  span {
    padding-left: .11rem;
  }
}

nav {
  flex: 1;
  height: 1rem;
  padding-left: .2rem;
}

.nav-list {
  color: #333333;
  font-size: .18rem;
  height: 1rem;
  padding-right: 1rem;

  li {
    //padding-left: .1rem;
    height: 100%;
    display: flex;
    align-items: center;

    a {
      padding: .24rem 10px;
      display: block;
      height: 1rem;
      line-height: .52rem;
      position: relative;
      //border-bottom: .02rem solid transparent;
    }

    a:after{
      position: absolute;
      width: 100%;
      content: "";
      height: 0.02rem;
      left: 0;
      bottom: 0;
      opacity: 0;
      background: linear-gradient(90deg, #3BBFFD, #0E5EAB);
    }

    //background: linear-gradient(90deg, #3BBFFD, #0E5EAB);

    a:hover {
      padding: .24rem 10px;
      display: block;
      height: 1rem;
      opacity: 1;
      color: #FFFFFF !important;
      //border-bottom: .02rem solid #FFFFFF;
      //background-color: rgba(50,145,248,.8);
      //background-color: #3291F8;
      //color: #3291F8;
    }
    a:hover:after {
      opacity: 1;
    }
  }

}

nav li.nav-act {
  a {
    padding: .24rem 10px;
    display: block;
    height: 1rem;
    color: #FFFFFF !important;
    opacity: 1;
    //border-bottom: 2px solid #FFFFFF;
    //background-color: #3291F8;
  }
  a:after{
    opacity: 1;
  }
}


//顶部样式更改
header.top-menu {
  //background-color: #ffffff;
  box-shadow: 0 .05rem .1rem 0 rgba(0, 0, 0, .14);

  .top-con {

    .logo-img-2 {
      //display: none;
    }

    nav li.nav-act {
      a {
        //color: #3291F8;
      }
    }


    nav {
      a {
        //color: #333;
      }
    }

    span {
      color: #333;
    }

    .logo-img-1 {
      //display: block;
    }

    .login-btn {
      border: 1px solid #333;
      //box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.14);
    }

    .user-center {
      .message-img {
        //display: flex;
      }

      .message-img-F {
        //display: none;
      }
    }
  }
}

//登录注册按钮
.no-login {
  display: flex;
  align-items: center;
  height: 100%;
  padding-right: .60rem;
}

.login-btn {
  width: .8rem;
  height: .42rem;
  line-height: .42rem;
  border-radius: .04rem;
  background-color: rgba(255, 255, 255, 100);
  color: rgba(16, 16, 16, 100);
  font-size: .14rem;
  text-align: center;
  margin-right: .13rem;
  cursor: pointer;
  border: 1px solid transparent;
  display: block;
  //box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.14);
}

.register-btn {
  cursor: pointer;
  width: .80rem;
  height: .42rem;
  line-height: .42rem;
  border-radius: .04rem;
  background-color: rgba(74, 129, 242, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
  text-align: center;
  display: block;
}


.user-center {
  display: flex;
  align-items: center;
  height: .52rem;

  a {
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: .2rem;
  }
}


@media screen and (max-width: 1200px) {
  header {
    height: auto;
    padding: 0;
    background-color: #FFFFFF !important;

    .hidden-lg-and-up {
      width: 100%;
    }
  }
}

.phone-box {
  padding: 0 18px;
  display: flex;
  justify-content: space-between;
  width: 100%;

  > a > img {
    height: 28px;
    margin: 10px 0;
  }

  div {
    height: 48px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 24px;
    padding-right: 4px;

    img {
      width: 20px;
      cursor: pointer;
    }

  }
}

.phone-nav {
  margin-top: 0;
  border-top: 1px solid rgba(0, 0, 0, .04);
  font-size: 14px !important;
  height: 0;
  overflow: hidden;

  div {
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-bottom: 1px rgba(0, 0, 0, .04) solid;

    span {
      display: block;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
}

.open-box {
  margin-top: 10px;
  height: 240px;
}


</style>
