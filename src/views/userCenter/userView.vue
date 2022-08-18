<template>
  <main>
    <el-row>
      <el-col :span="6">
        <div style="padding: 20px">
          <section class="left-nav">
            <ul v-if="roleId === 37 || roleId === 40">
              <li v-for="(item,index) in lsftNavQY" :key="'nav'+index">
                <router-link :to="item.path" :class="{'nav-title': item.path === $route.path,'act-title': index%2===0}">
                  <img :src="item.path === $route.path ? item.actIcon : item.icon">
                  {{ item.title }}
                </router-link>
              </li>
            </ul>
            <ul v-else-if="roleId === 39 || roleId === 36">
              <li v-for="(item,index) in lsftNavGR" :key="'nav'+index">
                <router-link :to="item.path" :class="{'nav-title': item.path === $route.path,'act-title': index%2===0}">
                  <img :src="item.path === $route.path ? item.actIcon : item.icon">
                  {{ item.title }}
                </router-link>
              </li>
            </ul>
            <ul v-else-if="roleId === 41">
              <li v-for="(item,index) in lsftNavYG" :key="'nav'+index">
                <router-link :to="item.path" :class="{'nav-title': item.path === $route.path,'act-title': index%2===0}">
                  <img :src="item.path === $route.path ? item.actIcon : item.icon">
                  {{ item.title }}
                </router-link>
              </li>
            </ul>
          </section>
        </div>

      </el-col>
      <el-col :span="18">
        <section style="padding: 20px">
          <router-view class="right-body" @nologin="nologin"/>
        </section>
      </el-col>
    </el-row>
  </main>
</template>

<script>
export default {
  name: "userView",
  data() {
    return {
      roleId: 37,

      lsftNavQY: [
        {
          title: "账户信息",
          path: "/userCenter",
          icon: require("./../../assets/image/icon/icon_1.png"),
          actIcon: require("./../../assets/image/icon/icon_highlight1.png")
        }, {
          title: "企业员工",
          path: "/userCenter/yuangongView",
          icon: require("./../../assets/image/icon/yuangong1.png"),
          actIcon: require("./../../assets/image/icon/yuangong.png")
        }, {
          title: "我的开发项目",
          path: "/userCenter/publishProject",
          icon: require("./../../assets/image/icon/icon_3.png"),
          actIcon: require("./../../assets/image/icon/icon_highlight3.png")
        }, {
          title: "我的外包项目",
          path: "/userCenter/publishEpiboly",
          icon: require("./../../assets/image/icon/icon_4.png"),
          actIcon: require("./../../assets/image/icon/icon_highlight4.png")
        }, {
          title: "我的项目检测",
          path: "/userCenter/detection",
          icon: require("./../../assets/image/icon/icon_6.png"),
          actIcon: require("./../../assets/image/icon/icon_highlight6.png")
        }, {
          title: "技术沙龙",
          path: "/userCenter/publishSalon",
          icon: require("./../../assets/image/icon/icon_7.png"),
          actIcon: require("./../../assets/image/icon/icon_highlight7.png")
        }, {
          title: "修改密码",
          path: "/userCenter/password",
          icon: require("./../../assets/image/icon/icon_8.png"),
          actIcon: require("./../../assets/image/icon/icon_highlight8.png")
        },
      ],
      lsftNavGR: [
        {
          title: "账户信息",
          path: "/userCenter",
          icon: require("./../../assets/image/icon/icon_1.png"),
          actIcon: require("./../../assets/image/icon/icon_highlight1.png")
        }, {
          title: "我的简历",
          path: "/userCenter/userResume",
          icon: require("./../../assets/image/icon/icon_2.png"),
          actIcon: require("./../../assets/image/icon/icon_highlight2.png")
        }, {
          title: "考试信息",
          path: "/userCenter/userExam",
          icon: require("./../../assets/image/icon/icon_3.png"),
          actIcon: require("./../../assets/image/icon/icon_highlight3.png")
        }, {
          title: "技术沙龙",
          path: "/userCenter/inSalon",
          icon: require("./../../assets/image/icon/icon_7.png"),
          actIcon: require("./../../assets/image/icon/icon_highlight7.png")
        }, {
          title: "修改密码",
          path: "/userCenter/password",
          icon: require("./../../assets/image/icon/icon_8.png"),
          actIcon: require("./../../assets/image/icon/icon_highlight8.png")
        },
      ],
      lsftNavYG: [
        {
          title: "账户信息",
          path: "/userCenter",
          icon: require("./../../assets/image/icon/icon_1.png"),
          actIcon: require("./../../assets/image/icon/icon_highlight1.png")
        }, {
          title: "考试信息",
          path: "/userCenter/userExam",
          icon: require("./../../assets/image/icon/icon_3.png"),
          actIcon: require("./../../assets/image/icon/icon_highlight3.png")
        }, {
          title: "修改密码",
          path: "/userCenter/password",
          icon: require("./../../assets/image/icon/icon_8.png"),
          actIcon: require("./../../assets/image/icon/icon_highlight8.png")
        },
      ],
    }
  },
  methods: {
    nologin() {
      this.$emit("nologin")
    },
  },
  created() {
    if (JSON.parse(localStorage.getItem("user_role"))) {
      this.roleId = JSON.parse(localStorage.getItem("user_role")).roleId;
    }
  }
}
</script>

<style scoped lang="scss">

main {
  width: 98%;
  max-width: 1200px;
  margin: 1.3rem auto 0;
  overflow: hidden;
}

.left-nav {
  background-color: #ffffff;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 14%);
  float: left;

  .nav-title {
    color: #3291F8;
  }

  .act-title {
    background-color: #F2F2F2;
  }

  ul > li > a {
    display: flex;
    height: 50px;
    line-height: 50px;
    padding: 0 40px;
    align-items: center;

    img {
      width: 22px;
      height: 22px;
      margin-right: 12px;
    }
  }
}

.right-body {
  background-color: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 1px 1px 25px 4px rgba(0, 0, 0, .06);
  width: 100%;
  padding: .4rem .6rem;
  float: right;
}
</style>
