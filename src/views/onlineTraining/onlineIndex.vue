<template>
  <main>
    <h2>提供优质的视频课程<br>在线题库</h2>
    <div class="btn-list">
      <router-link :to="item.path" v-for="(item,index) in typeList"
           :key="index"
           :class="{'odd-btn':index%2 === 0}">
        <span>{{ item.title }}</span>
      </router-link>
    </div>
  </main>
</template>

<script>
export default {
  name: "resourceView",
  data() {
    return {
      typeList: [
        {title: "视频课程",path: "/onlineTraining/video"},
        {title: "在线考试",path: "/onlineTraining/exam"},
      ],
    }
  },
  created() {
    // if(JSON.parse(localStorage.getItem("user_role"))){
    //   let roleId = JSON.parse(localStorage.getItem("user_role")).roleId;
    //   if(roleId == 39){
    //     this.typeList = [
    //       {title: "视频课程",path: "/onlineTraining/video"},
    //       {title: "在线考试",path: "/onlineTraining/exam"},
    //     ];
    //   } else if(roleId == 41){
    //     this.typeList = [
    //       {title: "视频课程",path: "/onlineTraining/video"},
    //       {title: "在线考试",path: "/onlineTraining/examList"},
    //     ];
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
main {
  background-image: url("./../../assets/image/bg_xspx.png");
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
    line-height: 70px;
    font-weight: 100;
    margin-bottom: 90px;
    //word-spacing: 6px;
  }

  .btn-list {
    display: flex;

    a {
      margin: 0 20px;
      display: block;
      width: 158px;
      padding: 0 10px;
      border-radius: 5px;
      font-size: 14px;
      color: #3291F8;
      background-color: #ffffff;
      height: 54px;
      line-height: 54px;
      text-align: center;
      overflow: hidden;
      cursor: pointer;
      position: relative;

    }

    .odd-btn {
      color: #ffffff;
      background: linear-gradient(90deg, #3BBFFD 0%, #0E5EAB 100%);
    }

    a:after {
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

    a:hover:after {
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


@media screen and (max-width: 1200px){
  .btn-list a:last-child{
    display: none;
  }

  .btn-list a{
    width: 100px !important;
    height: 44px !important;
    line-height: 44px !important;
  }

  main{
    h2{
      font-size: 26px;
    }


  }
}

</style>
