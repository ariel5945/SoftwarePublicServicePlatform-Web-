<template>
  <main>
    <h2>灵活、高效、<br>提供一站式测试服务</h2>
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
  name: "detectionView",
  data() {
    return {
      typeList: [
        {title: "检测中心测试",path: "/detactionDetail"},
        {title: "自助在线检测",path: "/detectionList"},
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
main {
  background-image: url("./../assets/image/bg_xiangmujiance@2x.png");
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

    a {
      margin: 0 20px;
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
</style>
