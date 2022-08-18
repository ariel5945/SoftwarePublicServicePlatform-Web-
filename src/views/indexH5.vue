<template>
  <div class="swiper-vertical">
    <div class="swiper-wrapper">
      <!-- 首屏 -->
      <div class="swiper-slide">
        <el-carousel trigger="click" height="100vh">
          <!-- <el-carousel-item
            class="first-screen"
            v-for="(item, index) in homeList"
            :key="index"
            max-width:100%;max-heightt:100% }"
          > -->
          <el-carousel-item
            class="first-screen"
            v-for="(item, index) in homeList"
            :key="'home' + index"
          >
            <!-- <h3 class="sp-title">{{ item.title }}</h3>
            <p class="sp-content">
              {{ item.digest }}
            </p> -->
            <h3 class="sp-title">软件公共服务平台</h3>
            <p class="sp-content">
              数十年服务经验积累，雄厚与专业的技术力量
              用心为您，值得信赖。为您的企业提供相关行业基础应用一站式解决方案，助力业务快速发展
            </p>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 软件产品 -->
      <div
        class="swiper-slide"
        v-for="(item, index) in softwareList"
        :key="'software' + index"
      >
        <div
          class="software"
          :style="{ backgroundImage: `url(${item.imgBg})` }"
        >
          <img class="software-icon" :src="item.imgUrl" alt="" />
          <h3 class="software-title">{{ item.title }}</h3>
          <p class="software-En">{{ item.titleEn }}</p>
          <div
            class="box"
            v-show="
              item.title === '软件产品' ||
              item.title === '软件开发' ||
              item.title === '软件外包'
            "
          >
            <div class="software-content">
              <p class="software-num">
                <span class="num">{{ item.num }}</span>
                <span :class="{ plusSign: item.numSub == '+' }">{{
                  item.numSub
                }}</span>
              </p>
              <p class="software-describe">{{ item.describe }}</p>
            </div>
          </div>

          <div class="box" v-show="item.title === '软件实训'">
            <div class="software-content">
              <p class="software-num">
                <span class="num">{{ item.num }}</span>
                <span :class="{ plusSign: item.numSub == '+' }">{{
                  item.numSub
                }}</span>
              </p>
              <p class="software-describe">{{ item.describe }}</p>
            </div>
            <div class="software-content">
              <p class="software-num">
                <span class="num">500</span>
                <span :class="{ plusSign: item.numSub == '+' }">+</span>
              </p>
              <p class="software-describe">视频课程</p>
            </div>
          </div>
          <!-- <router-link :to="item.path">{{ item.title }}</router-link> -->
          <div class="toView">点击查看</div>
        </div>
      </div>

      <!-- 新闻动态 -->
      <div class="swiper-slide">
        <div class="news">
          <div class="news-top">
            <h3 class="news-title">新闻动态</h3>
            <img
              class="more-icon"
              src="../assets/icon/icon_more@2x.png"
              alt=""
            />
          </div>
          <div class="title-bg"></div>

          <div class="news-swiper">
            <div class="swiper">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(item, index) in newsList"
                  :key="'news' + index"
                >
                  <div class="news-item">
                    <div
                      class="news-img"
                      :style="{ backgroundImage: `url(${item.coverImg})` }"
                    >
                      <!-- <img :src="item.coverImg" alt="" /> -->
                    </div>
                    <div class="news-text">
                      <h3>{{ item.title }}</h3>
                      <p>{{ item.newsIntro }}</p>
                      <div class="text-bottom">
                        <span class="time">{{
                          item.createTime.split("T")[0].replaceAll("-", "/")
                        }}</span>
                        <span class="toDetails">查看详情</span>
                      </div>
                      <div class="right-icon"></div>
                    </div>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="news-item" style="opacity: 0"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="toMore">查看更多</div>
        </div>
      </div>

      <!-- 合作企业 -->
      <!-- <div class="swiper-slide">
        <div class="enterprise">
          <h3 class="qy-title title">合作企业</h3>
          <div class="swiper qy-swiper" style="height: 241px">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide qy-imgs"
                v-for="(item, index) in companyLogoList"
                :key="index"
              >
                <el-row :gutter="10">
                  <el-col
                    :xs="8"
                    :sm="8"
                    :md="8"
                    :lg="8"
                    :xl="8"
                    v-for="(item1, index1) in item"
                    :key="index1"
                  >
                    <div class="grid-content bg-purple">
                      <img class="text-img" :src="item1.companyLogo" />
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template slot="title">
                <span>关于平台</span>
              </template>
              <router-link
                ><el-menu-item index="1-1">平台数据</el-menu-item></router-link
              >
              <router-link
                ><el-menu-item index="1-2">平台管理</el-menu-item></router-link
              >
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <span>帮助中心</span>
              </template>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <span>联系方式</span>
              </template>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <span>条款说明</span>
              </template>
            </el-submenu>
          </el-menu>
        </div>
      </div> -->

      <!-- element -->
      <div class="swiper-slide">
        <div class="enterprise">
          <h3 class="qy-title title">合作企业</h3>
          <el-carousel trigger="click" :interval="5000" class="qy-swiper">
            <el-carousel-item
              class="qy-imgs"
              v-for="(item, index) in companyLogoList"
              :key="'company' + index"
            >
              <el-row :gutter="10">
                <el-col
                  :xs="8"
                  :sm="8"
                  :md="8"
                  :lg="8"
                  :xl="8"
                  v-for="(item1, index1) in item"
                  :key="'qy' + index1"
                >
                  <div class="grid-content bg-purple">
                    <img class="text-img" :src="item1.companyLogo" />
                  </div>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>

          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :unique-opened="true"
          >
            <el-submenu index="1">
              <template slot="title">
                <span>关于平台</span>
              </template>
              <el-menu-item index="1-1">平台数据</el-menu-item>
              <el-menu-item index="1-2">平台管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <span>帮助中心</span>
              </template>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <span>联系方式</span>
              </template>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <span>条款说明</span>
              </template>
            </el-submenu>
          </el-menu>
        </div>
      </div>

      <!-- 关于平台 -->
      <div class="swiper-slide">
        <div class="about">
          <div class="about-top">
            <h3 class="about-title title">关于平台</h3>
          </div>
          <div class="title-bg"></div>
          <div class="about-content">
            <div class="content-list">
              <div class="list-left">
                <span class="num">{{ companyNum }}</span
                ><span class="">家</span>
              </div>
              <div class="list-right">
                <div class="right-title title">入驻企业</div>
                <div class="right-content">
                  覆盖周边各种优秀科技公司，交流、共享、合作等方式，实现业务服务在线化。实现业务服务在线化。
                </div>
              </div>
            </div>

            <div class="content-list">
              <div class="list-left">
                <span class="num">{{ salonNum }}</span
                ><span class="">次</span>
              </div>
              <div class="list-right">
                <div class="right-title title">技术沙龙</div>
                <div class="right-content">
                  举办前沿技术分享活动，召开学术分享研讨会议，提供开放发布会展厅。
                </div>
              </div>
            </div>

            <div class="content-list">
              <div class="list-left">
                <!-- <span class="num">{{ projectNum }}</span> -->
                <span class="num" v-if="projectNum < 100">{{
                  projectNum
                }}</span>
                <span class="num" v-else-if="projectNum < 1000">{{
                  Math.floor(projectNum / 10) / 10
                }}</span>
                <span class="num" v-else-if="projectNum < 10000">{{
                  Math.floor(projectNum / 100) / 100
                }}</span>
                <span class="num" v-else>{{
                  Math.floor(projectNum / 100) / 100
                }}</span>
                <span v-if="projectNum < 100">个</span>
                <span v-else-if="projectNum < 1000">百</span>
                <span v-else-if="projectNum < 10000">千</span>
                <span v-else>万</span>
              </div>
              <div class="list-right">
                <div class="right-title title">软件产品</div>
                <div class="right-content">
                  涵盖多款数字化产品应用于企业，建设多领域数据平台服务于行业。
                </div>
              </div>
            </div>

            <div class="content-list">
              <div class="list-left">
                <!-- <span class="num">5.1</span><span class="">万</span> -->
                <span class="num" v-if="usersNum < 100">{{ usersNum }}</span>
                <span class="num" v-else-if="usersNum < 1000">{{
                  Math.floor(usersNum / 10) / 10
                }}</span>
                <span class="num" v-else-if="usersNum < 10000">{{
                  Math.floor(usersNum / 100) / 100
                }}</span>
                <span class="num" v-else>{{
                  Math.floor(usersNum / 100) / 100
                }}</span>
                <!-- <span v-if="usersNum < 100">人</span>
                <span v-else-if="usersNum < 1000">百</span>
                <span v-else-if="usersNum < 10000">千</span> -->
                <span>万</span>
              </div>
              <div class="list-right">
                <div class="right-title title">注册用户</div>
                <div class="right-content">
                  汇聚科技领先企业，吸纳行业尖端人才。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
// import { findHomeList, findNewsList } from '@/api'
import request from '@/utils/request'
export default {
  name: 'indexPage',
  created() {

  },
  mounted() {
    this.getHomeList()
    this.getIndexNews()
    this.getCompanyList()
    this.getSystemWorkbench()
    // this.getCompanyLogoList()
    // 首页swiper
    new Swiper('.swiper-vertical', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      direction: 'vertical',
      effect: 'fade',
    })
    // 新闻swiper
    new Swiper('.swiper', {
      pagination: '.swiper-pagination',
      slidesPerView: 'auto',
      centeredSlides: false, //设定为true时，活动块会居中，而不是默认状态下的居左
      // paginationClickable: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      speed: 1000,
      autoplayDisableOnInteraction: false,
      // loop: true, //复制多份循环(这里就是让轮播看起来是循环的，去掉这个就恢复了默认的swiper轮播)
      disableOnInteraction: false,
      // spaceBetween: 25,//slide之间的距离（单位px）
      observer: true,            //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true,      //修改swiper的父元素时，自动初始化swiper
      touchRatio: 1,             //解决滑动卡顿
      longSwipesRatio: 0.1,
      threshold: 10,             //如果触摸距离小于该值滑块不会被拖动
      followFinger: false,
    })
    // 企业Logo swiper
    new Swiper('.qy-swiper', {
      pagination: { el: '.swiper-pagination', clickable: true, },
      bulletElement: 'li',
      paginationClickable: true,
      //设定初始化时slide的索引
      initialSlide: 0,
      loop: true, //复制多份循环(这里就是让轮播看起来是循环的，去掉这个就恢复了默认的swiper轮播)
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      }, //自动
      // 解决卡顿
      observer: true,            //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true,      //修改swiper的父元素时，自动初始化swiper
      touchRatio: 1,
      longSwipesRatio: 0.1,
      threshold: 10,             //如果触摸距离小于该值滑块不会被拖动
      followFinger: false,
    })
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 12,
      // 关于我们统计数据
      companyNum: 0,
      salonNum: 0,
      projectNum: 0,
      usersNum: 0,
      numLeng: 0,
      time: 0,
      // 首屏
      homeList: [],
      // 新闻
      newsList: [],
      // 企业
      companyList: [],
      // 企业Logo
      companyLogoList: [],
      // 软件
      softwareList: [
        {
          imgBg: require("../assets/imgs/bg_jiance@2x.png"),
          imgUrl: require("../assets/icon/icon_ruanjianjiance@2x.png"),
          title: "软件产品",
          titleEn: "Software Product",
          num: "24",
          numSub: "h",
          describe: "一站式测试"
        },
        {
          imgBg: require("../assets/imgs/bg_kaifa@2x.png"),
          imgUrl: require("../assets/icon/icon_ruanjiankaifa@2x.png"),
          title: "软件开发",
          titleEn: "Software Development",
          num: "10",
          numSub: "+",
          describe: "开源系统"
        },
        {
          imgBg: require("../assets/imgs/bg_shixun@2x.png"),
          imgUrl: require("../assets/icon/icon_ruanjianshixun@2x.png"),
          title: "软件实训",
          titleEn: "Software Training",
          num: "3w",
          numSub: "+",
          describe: "在线题库"
        },
        {
          imgBg: require("../assets/imgs/bg_waibao@2x.png"),
          imgUrl: require("../assets/icon/icon_ruanjianwaibao@2x.png"),
          title: "软件外包",
          titleEn: "Software Outsourcing",
          num: "600",
          numSub: "+",
          describe: "外包项目"
        }
      ],
    }
  },
  methods: {
    handleOpen() {

    },
    handleClose() {

    },
    // 首屏
    // async getHomeList() {
    //   const res = await findHomeList()
    //   this.homeList = res.data.rows
    // },
    // // 新闻
    // async getNewsList() {
    //   const res = await findNewsList({
    //   })
    //   this.newsList = res.data.data.newsList
    //   // console.log(res.title)
    //   console.log(this.newsList)
    //   console.log(this.newsList[0].newsIntro)
    // },

    // 数字动画
    getNumAm(getNum1 = 74, getNum2 = 37, getNum3 = 124, getNum4 = 41) {
      let num1 = getNum1
      let num2 = getNum2
      let num3 = getNum3
      let num4 = getNum4
      let leng = 30
      let timeSet = ""
      if (this.numLeng <= leng) {
        this.numLeng += 1
        timeSet = setTimeout(() => {
          this.companyNum += num1 / 30
          this.salonNum += num2 / 30
          this.projectNum += num3 / 30
          this.usersNum += num4 / 30
          this.companyNum = Math.floor(this.companyNum)
          this.salonNum = Math.floor(this.salonNum)
          this.projectNum = Math.floor(this.projectNum)
          this.usersNum = Math.floor(this.usersNum)
          this.getNumAm(num1, num2, num3, num4)
        }, 30)
      } else {
        this.companyNum = num1
        this.salonNum = num2
        this.projectNum = num3
        this.usersNum = num4
        clearTimeout(timeSet)
      }
    },
    // // 页面切换延时
    // pageTab(type) {
    //   if (type > 0) {
    //     if(this.pageNum === 0){
    //       setTimeout(()=>{
    //         this.pageNum = 1;
    //       },200)

    //     } else if(this.pageNum === 1){
    //       setTimeout(()=>{
    //         this.pageNum = 2;
    //       },200)
    //     } else if(this.pageNum === 2){
    //       setTimeout(()=>{
    //         this.pageNum = 3;
    //       },200)
    //     } else if(this.pageNum === 3){
    //       setTimeout(()=>{
    //         this.pageNum = 4;
    //       },200)
    //     }

    //     // if(this.pageNum>0){
    //     //   this.$emit("headBg", true);
    //     //
    //     // } else {
    //     //   this.$emit("headBg", false);
    //     // }
    //     if (this.pageNum === 1) {
    //       this.companyNum = 0;
    //       this.salonNum = 0;
    //       this.projectNum = 0;
    //       this.usersNum = 0;
    //       this.numLeng = 0;
    //       this.getSystemWorkbench();
    //     }
    //   } else {
    //     if(this.pageNum === 4){
    //       this.pageNum = 3;
    //     } else if(this.pageNum === 3){
    //       this.pageNum = 2;
    //     } else if(this.pageNum === 2){
    //       this.pageNum = 1;
    //     } else if(this.pageNum === 1){
    //       this.pageNum = 0;
    //     }

    //     if (this.pageNum === 1) {
    //       this.companyNum = 0;
    //       this.salonNum = 0;
    //       this.projectNum = 0;
    //       this.usersNum = 0;
    //       this.numLeng = 0;
    //       this.getSystemWorkbench()
    //     }
    //   }
    // },

    // 首屏
    getHomeList() {
      let url = "/portal/api/index/getSlideshowList"
      let data = {
        pageNum: 1,
        industryType: "",
        applyName: "",
      }
      request.get(url, data, (res) => {
        if (Number(res.code) === 0) {
          this.homeList = res.rows
        }
        // console.log('首屏', this.homeList)
      }, false)
    },
    // 新闻
    getIndexNews() {
      let url = "/portal/api/index/getIndexMessageList"
      let data = {
        pageNum: 1,
        pageSize: 5,
      }
      request.get(url, data, (res) => {
        if (Number(res.code) === 0) {
          this.newsList = res.data.newsList
        }
        // console.log('新闻', this.newsList)
      }, false)
    },
    // 企业
    getCompanyList() {
      let url = "/portal/companyInfo/loadCompanyList"
      let data = {
        pageNum: 1,
        pageSize: 12,
      }
      request.get(url, data, res => {
        if (Number(res.code) === 0) {
          this.companyList = res.data
        }
        let arr = []
        let newArr = []
        this.companyList.forEach((item) => {
          arr.push({ companyLogo: item.companyLogo })
        })
        for (let index = 0; index < arr.length / 9 + 1; index++) {
          newArr = arr.splice(0, 9)
          this.companyLogoList.push(newArr)
        }

        // console.log('arr', arr)
        // console.log('图标', this.companyLogoList)
        // console.log('公司', this.companyList)
      }, false)

    },
    // 关于平台
    // 获取统计数据
    getSystemWorkbench() {
      let url = "/portal/api/index/getSystemWorkbench"
      let data = {}
      request.get(url, data, (res) => {
        this.getNumAm(res.companyNumber, res.salonNumber, res.applyInfoNumber, res.registerUserNumber)
        // console.log('统计数据', res)
      }, false)
    },


  },
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: AlibabaPuHuiTi_2_95_ExtraBold;
  src: url("../assets/font//AlibabaPuHuiTi-2-95-ExtraBold.ttf");
}
@font-face {
  font-family: AlibabaPuHuiTi_2_55_Regular;
  src: url("../assets/font/AlibabaPuHuiTi-2-55-Regular.ttf");
}
@font-face {
  font-family: AlibabaPuHuiTi_2_85_Bold;
  src: url("../assets/font/AlibabaPuHuiTi-2-85-Bold.ttf");
}
@font-face {
  font-family: AlibabaPuHuiTi_2_105_Heavy;
  src: url("../assets/font/AlibabaPuHuiTi-2-105-Heavy.ttf");
}
@font-face {
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  src: url("../assets/font/AlibabaPuHuiTi-2-75-SemiBold.ttf");
}
@font-face {
  font-family: AlibabaPuHuiTi_2_65_Medium;
  src: url("../assets/font/AlibabaPuHuiTi-2-65-Medium.ttf");
}

* {
  color: #ffffff;
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 18px;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  h3 {
    font-size: 28px;
    font-weight: normal !important;
    height: 40px;
    font-family: AlibabaPuHuiTi_2_85_Bold;
  }
  span {
    font-family: AlibabaPuHuiTi_2_85_Bold;
  }
  .title {
    font-family: AlibabaPuHuiTi_2_75_SemiBold !important;
  }
}
.swiper-vertical {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

// 修改走马灯指示器
// 首屏指示器
::v-deep .el-carousel__indicator--horizontal .el-carousel__button {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 50%;
  opacity: 0.45;
}
::v-deep .el-carousel__indicator--horizontal.is-active .el-carousel__button {
  width: 20px;
  height: 10px;
  background: #ffffff;
  border-radius: 10px;
  opacity: 1;
}
::v-deep .el-carousel__indicator--horizontal {
  // background-color: rgb(20, 255, 169);
  margin-bottom: 42px;
  padding: 0;
  margin-left: 5px;
}

// 首屏
.first-screen {
  background: url("../assets/imgs/bg_shouping@2x.png") no-repeat;
  // background-repeat: no-repeat;
  background-size: cover;
  color: #dbdbdb;
  .sp-title {
    color: #dbdbdb;
    font-family: AlibabaPuHuiTi_2_95_ExtraBold;
    line-height: 150px;
    margin: 0 auto;
    width: 230px;
    height: 40px;
    margin-top: 30vh;
    line-height: 40px;
  }
  .sp-content {
    color: #dbdbdb;
    margin: 0 auto;
    width: 299px;
    height: 96px;
    text-align: left;
    margin-top: 9.8vh;
    font-size: 16px;
    line-height: 24px;
  }
}
// 软件产品
.software {
  // background: url("../assets/img/bg_jiance@2x.png");
  // background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  .software-icon {
    width: 65px;
    height: 65px;
    margin-top: 18.7vh;
  }
  .software-title {
    margin-top: 9.4vh;
    line-height: 40px;
  }
  .software-En {
    margin-top: 1.6vh;
  }
  .box {
    width: 180px;
    height: 12.2vh;
    margin: 0 auto;
    margin-top: 9.4vh;
    display: flex;
    justify-content: space-between;
    .software-content {
      height: 100%;
      width: 24.8vw;
      margin: 0 auto;
      .software-num {
        font-size: 26px;
        .num {
          font-size: 26px;
          margin-left: 5px;
        }
        .plusSign {
          width: 27px;
          height: 37px;
          font-size: 26px;
          text-align: center;
          line-height: 37px;
          font-family: AlibabaPuHuiTi_2_55_Regular;
          letter-spacing: 1px;
          margin-left: 6px;
        }
        span {
          font-size: 16px;
          margin-left: 3px;
        }
      }
      .software-describe {
        margin-top: 2.5vh;
        letter-spacing: 0.75px;
      }
    }
  }

  // 查看更多
  .toView {
    width: 140px;
    height: 46px;
    font-size: 18px;
    text-align: center;
    line-height: 46px;
    border-radius: 2px;
    border: 2px solid rgba(255, 255, 255, 0.65);
    margin: 0 auto;
    margin-top: 14vh;
    box-sizing: border-box;
  }
}
// 新闻动态
.news {
  background: url("../assets/imgs/bg_xinwendongtai@2x.png") no-repeat;
  background-size: cover;
  height: 100vh;
  .news-top {
    width: 86.9vw;
    height: 40px;
    margin-left: 33px;
    margin-top: 11.5vh;
    // background-color: #fff;
    .news-title {
      width: 115px;
      height: 40px;
      line-height: 40px;
      font-size: 28px;
      float: left;
    }
    .more-icon {
      width: 15px;
      height: 15px;
      float: right;
      margin-right: 16px;
      margin-top: 12px;
    }
  }
  .title-bg {
    width: 71px;
    height: 19px;
    margin-top: -19px;
    margin-left: 20px;
    background: #ffffff;
    opacity: 0.23;
    bottom: 0;
    float: left;
  }

  // 轮播图**************************
  .news-swiper {
    .swiper {
      // width: 100%;
      margin-top: 5.5vh;
      .swiper-slide {
        width: 243px;
        height: 412px;
        margin-right: 5px;
        margin-left: 20px;
        // aspect-ratio: 0.91;
      }
      .news-item {
        width: 100%;
        // height: 100%;
        background-color: #ffffff;
        position: relative;
        aspect-ratio: 0.59;
        .news-img {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          aspect-ratio: 1.28;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          img {
            max-height: 100%;
          }
        }
        .news-text {
          width: 211px;
          height: 182px;
          margin: 20px auto;
          box-sizing: border-box;
          letter-spacing: 0.58px;
          // aspect-ratio: 1.34;
          line-height: 20px;
          h3 {
            font-family: AlibabaPuHuiTi_2_65_Medium;
            height: 40px;
            text-align: left;
            color: #2d2d2d;
            font-size: 14px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          p {
            width: 100%;
            height: 100px;
            color: #2d2d2d;
            font-size: 14px;
            text-align: left;
            line-height: 20px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            text-overflow: ellipsis;
            overflow: hidden;
            opacity: 0.8;
            margin-top: 1.6vh;
          }
          .text-bottom {
            width: 100%;
            height: 17px;
            line-height: 17px;
            // // margin-bottom: 20px;
            margin-top: 2.3vh;
            // position: relative;
            // bottom: 0;
            .time {
              font-size: 12px;
              font-family: AlibabaPuHuiTi_2_55_Regular;
              float: left;
              color: #2d2d2d;
              opacity: 0.8;
            }
            .toDetails {
              display: block;
              font-size: 12px;
              float: right;
              margin-right: 6px;
              font-family: AlibabaPuHuiTi_2_75_SemiBold;
              color: #2297ff;
              text-decoration: underline;
            }
          }
          .right-icon {
            float: right;
            margin-top: -25px;
            width: 31px;
            height: 31px;
            background-image: url("../assets/icon/icon_xiangqing@2x.png");
            background-size: cover;
          }
        }
      }
    }
  }

  .toMore {
    margin: 0 auto;
    width: 98px;
    height: 34px;
    font-size: 16px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0);
    border-radius: 2px;
    opacity: 0.94;
    border: 1px solid rgba(255, 255, 255, 0.94);
    margin-top: 3.6vh;
    box-sizing: border-box;
    // aspect-ratio: 2.88;
  }
}
// 合作企业
.enterprise {
  background: url("../assets/imgs/bg_hezuoqiye@2x.png") no-repeat;
  background-size: cover;
  height: 100vh;
  .qy-title {
    margin: 0 auto;
    margin-top: 11.5vh;
    margin-bottom: 2.3vh;
    width: 115px;
    height: 40px;
    line-height: 40px;
  }
  .qy-swiper {
    margin: 0 auto;
    // margin-left: auto;
    // margin-right: auto;
    height: 38.5vh;
    width: 90vw;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    box-sizing: border-box;
    overflow: hidden;
    ::v-deep .el-carousel__indicator--horizontal {
      margin-bottom: 3.1vh;
    }
    ::v-deep .el-carousel__indicator--horizontal .el-carousel__button {
      width: 10px;
      height: 10px;
      // background: rgba(255, 255, 255, 0.45);
      // border-radius: 50%;
      opacity: 0.45;
    }
    ::v-deep
      .el-carousel__indicator--horizontal.is-active
      .el-carousel__button {
      // width: 10px;
      // height: 10px;
      background: #ffffff;
      // border-radius: 10px;
      opacity: 1;
    }
    // 分页器
    // ::v-deep .swiper-pagination {
    //   height: 20px;
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    //   .swiper-pagination-bullet {
    //     background-color: rgba(255, 255, 255, 0.45);
    //     width: 10px;
    //     height: 10px;
    //     margin-right: 5px;
    //     margin-left: 0;
    //   }
    //   .swiper-pagination-bullet-active {
    //     background: #ffffff;
    //   }
    // }

    .qy-imgs {
      width: 100%;
      height: 27.6vh;
      margin-top: 3.1vh;
      box-sizing: border-box;
      .grid-content {
        width: 28vw;
        height: 8vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        margin-bottom: 1.9vh;
        border-radius: 3px;
        overflow: hidden;
      }
      img {
        // width: 100%;
        // height: 51px;
        max-height: 80%;
        max-width: 80%;
      }
    }
  }
  ::v-deep .el-carousel__container {
    height: 38.5vh;
  }
  ::v-deep .el-carousel__indicator--horizontal {
    // margin-bottom: 20px;
    margin-top: 3.1vh;
    padding: 0;
    // margin-left: 5px;
  }
  // 导航栏菜单
  ::v-deep .el-menu-vertical-demo {
    width: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    .el-submenu {
      text-align: left;
      letter-spacing: 0.58px;
      .el-submenu__title {
        border-bottom: 1px solid rgba(111, 111, 111, 0.5);
        line-height: 44px;
        height: 44px;
        span {
          font-size: 14px;
          font-family: AlibabaPuHuiTi_2_55_Regular !important;
        }
        i {
          font-size: 16px;
          color: #ffffff;
          opacity: 0.7;
        }
      }

      .el-menu--inline {
        background-color: rgba(120, 120, 120, 0.1);
        .el-menu-item {
          border-bottom: 1px solid rgba(111, 111, 111, 0.5);
          color: #ffffff;
          text-align: left;
          padding-left: 20px !important;
          line-height: 44px;
          height: 44px;
          font-size: 14px;
        }
        .is-active {
          background-color: rgba(120, 120, 120, 0.2);
        }
      }
    }
  }
}
// 关于平台
.about {
  background: url("../assets/imgs/bg_guanyupingtai@2x.png") no-repeat;
  background-size: cover;
  height: 100vh;
  .about-top {
    width: 86.9vw;
    height: 40px;
    margin-left: 33px;
    margin-top: 11.5vh;
    // background-color: #fff;
    .about-title {
      width: 115px;
      height: 40px;
      line-height: 40px;
      font-size: 28px;
      float: left;
    }
    .more-icon {
      width: 15px;
      height: 15px;
      float: right;
      margin-right: 16px;
      margin-top: 12px;
    }
  }
  .title-bg {
    width: 71px;
    height: 19px;
    margin-top: -19px;
    margin-left: 20px;
    background: #ffffff;
    opacity: 0.23;
    bottom: 0;
    float: left;
  }
  .about-content {
    margin-top: 5.3vh;
    .content-list {
      width: 100vw;
      height: 17.3vh;
      margin-bottom: 2vh;
      .list-left {
        font-size: 36px;
        margin-left: 4.3vw;
        letter-spacing: 1px;
        text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
        float: left;
        margin-top: 5.3vh;
        .num {
          font-family: AlibabaPuHuiTi_2_105_Heavy;
          font-size: 34px;
          width: 60px;
          height: 50px;
          text-align: center;
          display: inline-block;
          letter-spacing: 1px;
          // background-color: rgb(176, 209, 255);
          // margin-right: 9px;
        }
        span {
          font-size: 16px;
          text-shadow: none;
          font-family: AlibabaPuHuiTi_2_65_Medium;
        }
      }
      .list-right {
        width: 72vw;
        height: 17.3vh;
        background: rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(2px);
        float: right;
        padding-left: 25px;
        box-sizing: border-box;
        .right-title {
          position: absolute;
          margin-top: 2.2vh;
        }
        .right-content {
          margin-top: 7.2vh;
          text-align: left;
          width: 58vw;
          height: 51px;
          font-size: 12px;
          font-family: AlibabaPuHuiTi_2_55_Regular;
          line-height: 17px;
          opacity: 0.8;
        }
      }
    }
  }
}

// 取消走马灯箭头
::v-deep .el-carousel__arrow {
  display: none;
}
</style>
