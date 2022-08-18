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
        <h3>请选择注册身份</h3>
        <div @click="jumpReg(1)">
          <img src="./../../assets/image/login_icon_kaifazhe.png" alt="">
          <div>
            <h4>我是开发者</h4>
            <p>可在平台在线学习，参与项目以及线下活动等</p>
          </div>
        </div>
        <div @click="jumpReg(2)">
          <img src="./../../assets/image/login_icon_qiye.png" alt="">
          <div>
            <h4>我是企业</h4>
            <p>可在平台发布项目需求，视频，线下活动组织资源等</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "roleView",
  data() {
    return {}
  },
  methods:{
    jumpReg(roleTyoe) {
      this.$router.push({
        name: "register",
        params: {
          roleTyoe: roleTyoe
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
  padding: 60px 50px;
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

  > div {
    * {
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
    }

    border: 1px solid rgba(208, 208, 208, 1);
    border-radius: 10px;
    padding: 16px 24px 16px;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;

    img {
      width: 60px;
      height: 60px;
    }

    div {
      height: 100px;
      padding-left: 13px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    h4 {
      height: 32px;
      color: rgba(50, 145, 248, .6);
      font-size: 22px;
      margin-bottom: 4px;
      line-height: 32px;
    }

    p {
      height: 24px;
      color: rgba(143, 151, 159, 100);
      font-size: 14px;
      line-height: 24px;
      width: 380px;
    }
  }

  > div:hover {
    box-shadow: 1px 1px 20px 3px rgba(0, 0, 0, .1);

    h4 {
      color: rgba(50, 145, 248, 1);
    }
  }

}

</style>
