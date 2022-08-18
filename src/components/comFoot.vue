<template>
  <footer>
    <div class="foot-con hidden-md-and-down">
      <div style="display: flex;justify-content: space-between">
        <div>
          <h4 class="ft-h4">关于平台</h4>

          <div class="list-con">
            <!-- <router-link class="ft-text" to="/about">平台介绍</router-link> -->
            <!--<router-link class="ft-text" to="/">平台案例</router-link>-->

            <a class="ft-text" href="http://admin.lyrjfwpt.cn">平台管理</a>
            <div class="ft-text">
              <router-link class="login-btn" to="/login">登录</router-link>
              <router-link class="login-btn" to="/register">注册</router-link>
            </div>
            <div class="ft-text">
              <el-popover
                  popper-class="xcx-pop"
                  placement="top-start"
                  trigger="hover"
                  width="20px"
                  content=""
              >
                <p style="textAlign: center;color: #2d2d2d">微信扫一扫</p>
                <img class="QR-img" src="../assets/img/QR.jpg" alt="" />
                <el-button slot="reference">
                  <img
                      class="xcx-icon"
                      src="../assets/image/icon/icon_xcx.png"
                      alt=""
                  />
                </el-button>
              </el-popover>
            </div>
          </div>
        </div>
        <div>
          <h4 class="ft-h4">帮助</h4>
          <div class="list-con">
            <router-link class="ft-text" to="/help"
            >如何发布项目需求？</router-link
            >
            <router-link class="ft-text" to="/help"
            >如何为发布的项目需求定价？</router-link
            >
            <router-link class="ft-text" to="/help">查看更多>></router-link>
          </div>
        </div>
        <div>
          <h4 class="ft-h4">联系方式</h4>
          <div class="list-con">
            <p class="ft-text">联系人：赵先生</p>
            <p class="ft-text">联系电话：15516388266</p>
            <p class="ft-text">周一至周六 08:30-18:00</p>
          </div>
        </div>
        <div>
          <h4 class="ft-h4">条款说明</h4>
          <div class="list-con">
            <router-link class="ft-text" to="/registrationProtocol"
            >用户注册协议</router-link
            >
            <router-link class="ft-text" to="/serviceAgreement"
            >用户服务协议</router-link
            >
            <router-link class="ft-text" to="/privacy"
            >平台隐私政策</router-link
            >
          </div>
        </div>
      </div>
      <!--  <div>-->
      <!--    <h4 class="ft-h4">资源下载</h4>-->
      <!--    <div class="list-con">-->
      <!--      <p v-for="(item,index) in typeList" :key="index" @click="jumpDetail(item.valueName)" class="ft-text" to="/">{{ item.valueDescription }}</p>-->
      <!--      <router-link class="ft-text" to="/resource">查看更多>></router-link>-->
      <!--    </div>-->
      <!--  </div>-->
    </div>

    <div class="beian-con">
      Copyright 2019-2023 洛阳软件公共服务平台（lyrjfwpt.cn）版权所有
      <a style="color: #fff" href="https://beian.miit.gov.cn"
        >豫ICP备2022014433号-1</a
      >
    </div>
  </footer>
</template>

<script>
// import HTTP from "./../server/http";
export default {
  name: "comFoot",
  data () {
    return {
      typeList: [
        { title: "" },
      ]
    }
  },
  created () {
    // let url = "/api/source/getSourceType";
    // let data = {};
    // HTTP.get(url,data,res=>{
    //   if(Number(res.code) === 0){
    //     this.typeList = res.data.slice(0,2);
    //   }
    // },false)
  },
  methods: {
    jumpDetail (typeId) {
      this.$router.push({
        name: "resourceDetail",
        params: {
          typeId: typeId
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
footer {
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
  margin-top: 40px;
  background-color: #2d2d2d;
  padding: 1.09rem .34rem 0;
  margin-bottom: -2px;

  .foot-con {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto 54px;
  }

  .ft-h4 {
    font-size: .2rem;
    color: #ffffff;
    margin-bottom: .4rem;
    position: relative;
  }
  .ft-h4:after{
    position: absolute;
    content: "";
    width: .4rem;
    height: 2px;
    left: 0;
    background: linear-gradient(90deg, #3BBFFD, #0E5EAB);
    bottom: -0.2rem;
  }

  .list-con {
    display: flex;
    width: 100%;
    flex-direction: column;

    .ft-text {
      color: rgba(255, 255, 255, 0.77);
      width: 100%;
      display: block;
      font-size: .14rem;
      margin-bottom: .2rem;
    }

    .ft-text:hover {
      color: #ffffff;
      cursor: pointer;
    }

    .el-button {
      width: 20px;
      height: 20px;
        background-color: #2d2d2d;
        border: none;
        text-align: left;
        padding: 0;
        .xcx-icon {
          width: 20px;
          height: 20px;
        }
      }
    
  }
}

.beian-con {
  color: #ffffff;
  text-align: left;
  border-top: 1px solid rgba(255,255,255,.16);
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  height: .6rem;
  line-height: .6rem;
}

// 屏幕自适应  当浏览器可视区域宽度小于1200xp时
@media screen and (max-width: 1200px) {
  footer {
    font-size: 12px;
    padding: 20px 20px 10px;
    line-height: 20px;
  }
  .beian-con {
    margin-bottom: 0;
    float: left;
  }
}
.el-popover.xcx-pop {
  background-color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.77);
  box-shadow: none;
  .QR-img {
    width: 100px;
    height: 100px;
    margin: 12px;
  }
}

.login-btn{
  padding: 4px 6px;
  background-color: #FFFFFF;
  color: #0085E1;
  border-radius: 4px;
  font-size: .14rem;
  margin-right: 10px;
}

</style>

