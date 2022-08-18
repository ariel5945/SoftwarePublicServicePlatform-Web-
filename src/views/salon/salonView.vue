<template>
  <main>
    <!-- <div class="bg-pam">
      <img src="./../../assets/video/sanlong.jpg" alt=""> -->
      <!--<video src="./../../assets/video/sanlong.mp4" autoplay="autoplay" loop="loop"></video>-->
    <!-- </div> -->


    <div style="position: relative;z-index: 2">
      <h2>我们可以向您提供 <br>优质的沙龙场地服务</h2>
      <div class="btn-list">
        <div v-for="(item,index) in typeList"
             :key="index"
             @click="jumpDetail(item.path)"
             :class="{'odd-btn':index%2===0}">
          <span>{{ item.title }}</span>
        </div>

      </div>
    </div>

  </main>
</template>

<script>
export default {
  name: "salonView",
  data() {
    return {
      roleId: 36,
      bannerHeight: "",
      screenWidth: 0,
      typeList: [
        {title: "活动预约", path: "/salonYy"},
        {title: "参与活动", path: "/salonList"},
        // {title: "场地介绍"},
      ]
    }
  },
  methods: {
    jumpDetail(typeId) {
      this.$router.push(typeId)
    },
    setSize: function () {
      // 通过屏幕宽度(图片宽度)计算高度
      this.bannerHeight = 935 / 1920 * this.screenWidth;
    },
  },
  created() {

    this.screenWidth = window.innerWidth;
    this.setSize();
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      this.setSize();
    };
    if (JSON.parse(localStorage.getItem("user_role"))) {
      this.roleId = JSON.parse(localStorage.getItem("user_role")).roleId;
      if(this.roleId !== 37){
        this.typeList.shift()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  background-image: url("./../../assets/video/sanlong.jpg");
  background-size: cover;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100.1vh;
  top: 0;
  left: 0;
  right: 0;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h2 {
    font-size: 54px;
    text-align: center;
    color: #ffffff;
    line-height: 60px;
    font-weight: 100;
    margin-bottom: 90px;
  }

  .btn-list {
    display: flex;
    justify-content: center;

    div {
      margin: 0 20px;
      width: 188px;
      padding: 0 10px;
      border-radius: 5px;
      font-size: 20px;
      color: #3291F8;
      background-color: #ffffff;
      font-weight: bold;
      height: 64px;
      line-height: 64px;
      text-align: center;
      overflow: hidden;
      cursor: pointer;
      position: relative;

    }

    .odd-btn {
      color: #ffffff;
      background: linear-gradient(90deg, #3BBFFD 0%, #0E5EAB 100%);
    }

    div:after {
      position: absolute;
      z-index: 1;
      background-color: rgba(0, 0, 0, .2);
      transition: all .3s;
      width: 100%;
      height: 100%;
      content: "";
      top: 0;
      left: 0;
      right: 0;
    }

    div:hover:after {
      background-color: rgba(0, 0, 0, 0);
    }
  }

}

main:after {
  position: fixed;
  content: "";
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .2);
}

.bg-pam {
  position: absolute;
  width: 100%;
  height: 100%;
  //background-color: #3A62D7;
  z-index: 1;

  img{

  }

}

</style>

