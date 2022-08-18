<template>
  <main style="min-height: 99vh">
    <div class="fullpage-container hidden-md-and-down">
      <div class="fullpage-wp" v-fullpage="opts" ref="example">
        <div class="page-1 page" v-animate="{ value: 'bounceLeft' }">
          <el-carousel indicator-position="none" :height="bannerHeight + 'px'" :interval="5000">
            <el-carousel-item v-for="(item, index) in bannerList" :key="index">
              <div class="banner-con">
                <img style="width: 100%" :src="item.imageUrl" alt/>
                <div>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.digest }}</p>
                  <div ref="page_1">
                    <router-link class="talentsView-btn hidden-md-and-down" to="/talents">我要找人才</router-link>
                    <router-link class="development-btn" to="/development">我要找项目</router-link>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="page-2 page">
          <img src="./../assets/image/index_5.png" alt="">
          <section class="news-sec">
            <div class="news-con">
              <h3 style="font-size: 22px">新闻动态</h3>
              <button @click="goviews()">查看更多</button>
              <div>
                <div class="news-left" @click="gonewdetail(newsdata.id)">
                  <img :src="newsdata.coverImg" alt/>
                  <div>
                    <h4>{{ newsdata.title }}</h4>
                    <div style="display: flex; align-items: center">
                      <div>
                        <p class="time-year">
                          {{ getTimefun(newsdata.releaseTimeStr, 1) }}
                          <!--{{ newsdata.releaseTimeStr.substring(0, 4) }}-->
                        </p>
                        <p class="time-day">
                          {{ getTimefun(newsdata.releaseTimeStr, 2) }}
                          <!--{{ newsdata.releaseTimeStr.substring(5, 10) }}-->
                        </p>
                      </div>
                      <div class="text-con">
                        {{ newsdata.newsIntro }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="news-right">
                  <div @click="gonewdetail(item.id)"
                       v-for="(item, index) in newsListdata" :key="'new' + index"
                       style="display: flex;align-items: center;">
                    <div>
                      <p class="time-year">
                        <!--{{item.updateTime}}-->
                        {{ getTimefun(item.releaseTimeStr, 1) }}
                        <!--{{ item.updateTime.substring(0, 4) }}-->
                      </p>
                      <p class="time-day">
                        {{ getTimefun(item.releaseTimeStr, 2) }}
                        <!--{{ item.updateTime.substring(5, 10) }}-->
                      </p>
                    </div>
                    <div class="text-con">
                      <h4>
                        {{ item.title }}
                      </h4>
                      <p>
                        {{ item.newsIntro }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="page-3 page" style="width: 100%; height: 100%;background-color: #2c3e50;overflow: hidden">
          <section class="kf-con">
            <!--<div class="type-btn">-->
            <!--  <span :class="{'act-btn': typeAct === 0}" @click="typeAct = 0">外包项目</span>-->
            <!--  <span :class="{'act-btn': typeAct === 1}" @click="typeAct = 1">开发项目</span>-->
            <!--</div>-->

            <h4>软件产品</h4>
            <span>
              平台软件服务平台上架软件 <span style="color: #409EFF">{{ totalNum }}</span> 个，为企业提供多种优质解决方案。
              <router-link to="development">查看更多 ></router-link>
            </span>

            <div style="width: 180%; transform: translateX(-22%)">
              <el-carousel indicator-position="none" type="card" height="5rem" :interval="6000">
                <el-carousel-item v-for="(item, index) in dataList" :key="'pro' + index">
                  <div @click="getDetail(item.id)" class="cak-conlist">
                    <div>
                      <img :src="item.coverImgUrl" alt/>
                      <div>
                        <h4>{{ item.applyName }}</h4>
                        <span>{{ item.applyIntro }}</span>
                      </div>
                    </div>

                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </section>
        </div>
        <div class="page-4 page">
          <section class="more-con">
            <h3>更多服务</h3>
            <div>
              <div class="moreitems" @click="Goonline">
                <img src="./../assets/image/index1.png" alt/>
                <div class="icon">
                  <img src="@/assets/image/icon/rjsxicon.png" alt/>
                  <h6>软件实训</h6>
                  <span>查看详情</span>
                </div>
              </div>
              <div class="moreitems" @click="Gocheck">
                <img src="./../assets/image/index4.png" alt/>
                <div>
                  <img src="@/assets/image/icon/rjkficon.png" alt/>
                  <h6>软件检测</h6>
                  <span>查看详情</span>
                </div>
              </div>
              <div class="moreitems" @click="Gosharon">
                <img src="./../assets/image/index2.png" alt/>
                <div>
                  <img src="@/assets/image/icon/rjwbicon.png" alt/>
                  <h6>技术沙龙</h6>
                  <span>查看详情</span>
                </div>
              </div>
              <div class="moreitems" @click="Goresource">
                <img src="./../assets/image/index3.png" alt/>
                <div>
                  <img src="@/assets/image/icon/rjjcicon.png" alt/>
                  <h6>资源下载</h6>
                  <span>查看详情</span>
                </div>
              </div>

            </div>
          </section>
        </div>

        <div class="page-5 page" style="width: 100%; height: 100%">
          <div style="height: calc(100vh - 244px);background-color: #2d2d2d;padding-top: 1.5rem">
            <div class="page-5-con">
              <el-row :gutter="20">
                <el-col :lg="12" :md="8">
                  <el-carousel arrow="never" indicator-position="none" trigger="click" height="300px">
                    <el-carousel-item style="border-radius: 4px">
                      <img style="height: 300px" src="./../assets/image/cj1.png" alt=""/>
                    </el-carousel-item>
                    <el-carousel-item style="border-radius: 4px">
                      <img style="height: 300px" src="./../assets/image/cj1.png" alt=""/>
                    </el-carousel-item>
                    <el-carousel-item style="border-radius: 4px">
                      <img style="height: 300px" src="./../assets/image/cj1.png" alt=""/>
                    </el-carousel-item>
                  </el-carousel>
                </el-col>
                <el-col :lg="12" :md="16">
                  <div style="" class="page5-text">

                    <div style="">
                      <h2 style="text-align: center;font-size: 20px;color: #FFFFFF;font-weight: normal;margin-bottom: 18px">
                        平台简介
                      </h2>
                      洛阳软件公共服务平台是洛阳市软件行业的公共服务设施，旨在通过交流、共享、合作等方式，实现业务服务在线化，承担服务推介、数据查询、
                      业务协同等线上服务职能。实现培训定向化、开发模块化、检测规范化等行业标准。实现培训中心、交流中心落地，引行业人才汇聚于此交流学习。
                      最终在洛阳软件行业的人才、开发、外包、市场等领域形成服务能力，促进行业协同化、生态化发展，让软件公共服务平台成为促进行业高质量发展的助力工具。
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="index-foot pc-foot">
            <comFoot></comFoot>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden-lg-and-up" style="padding-top: 46px">
      <el-carousel indicator-position="none" :height="bannerHeight + 'px'" :interval="5000">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <div class="banner-con">
            <img style="width: 100%" :src="item.imageUrl" alt/>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.digest }}</p>
              <div>
                <router-link class="talentsView-btn hidden-md-and-down" to="/talents">我要找人才</router-link>
                <router-link class="development-btn" to="/development">我要找项目</router-link>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>

      <div style="padding: 20px;">
        <div class="phone-item-con" v-for="(item,index) in newsListCon" :key="'conView'+index" @click="gonewdetail(newsdata.id)">
          <el-row :gutter="20">
            <el-col :lg="10" :sm="10" :xs="10">
              <div>
                <img style="height: 68px;width: 100%;" :src="item.coverImg" alt="">
              </div>
            </el-col>
            <el-col :lg="14" :sm="14" :xs="14">
              <div class="phone-news-item">
                <h3>{{ item.title }}</h3>
                <p>{{ getTimefun(item.releaseTimeStr, 2) }}</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <section class="kf-con">
        <!--<div class="type-btn">-->
        <!--  <span :class="{'act-btn': typeAct === 0}" @click="typeAct = 0">外包项目</span>-->
        <!--  <span :class="{'act-btn': typeAct === 1}" @click="typeAct = 1">开发项目</span>-->
        <!--</div>-->

        <h4>软件产品</h4>
        <span>
              平台软件服务平台上架软件 <span style="color: #409EFF">{{ totalNum }}</span> 个，为企业提供多种优质解决方案。
              <router-link to="development">查看更多 ></router-link>
            </span>

        <div style="width: 180%; transform: translateX(-22%)">
          <el-carousel indicator-position="none" type="card" height="5rem" :interval="6000">
            <el-carousel-item v-for="(item, index) in dataList" :key="'pro' + index">
              <div @click="getDetail(item.id)" class="cak-conlist">
                <div>
                  <img :src="item.coverImgUrl" alt/>
                  <div>
                    <h4>{{ item.applyName }}</h4>
                    <span>{{ item.applyIntro }}</span>
                  </div>
                </div>

              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </section>

      <div class="phone-js">
        <h2>
          平台简介
        </h2>
        <div>
          <el-row :gutter="20">
            <el-col :lg="12" :md="8" :xs="24">
              <el-carousel arrow="never" indicator-position="none" trigger="click" height="200px">
                <el-carousel-item style="border-radius: 4px">
                  <img style="height: 200px" src="./../assets/image/cj1.png" alt=""/>
                </el-carousel-item>
                <el-carousel-item style="border-radius: 4px">
                  <img style="height: 200px" src="./../assets/image/cj1.png" alt=""/>
                </el-carousel-item>
                <el-carousel-item style="border-radius: 4px">
                  <img style="height: 200px" src="./../assets/image/cj1.png" alt=""/>
                </el-carousel-item>
              </el-carousel>
            </el-col>
            <el-col :lg="12" :md="16" :xs="24">
              <div style="color: #fff;margin-top: 10px;line-height: 18px">
                洛阳软件公共服务平台是洛阳市软件行业的公共服务设施，旨在通过交流、共享、合作等方式，实现业务服务在线化，承担服务推介、数据查询、
                业务协同等线上服务职能。实现培训定向化、开发模块化、检测规范化等行业标准。实现培训中心、交流中心落地，引行业人才汇聚于此交流学习。
                最终在洛阳软件行业的人才、开发、外包、市场等领域形成服务能力，促进行业协同化、生态化发展，让软件公共服务平台成为促进行业高质量发展的助力工具。
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="index-foot">
        <comFoot></comFoot>
      </div>
    </div>
    <!--{{newsListCon}}-->

  </main>
</template>
<script>
import HTTP from "@/server/http";
import comFoot from "@/components/comFoot";
import "animate.css";

export default {
  components: {comFoot},
  name: "HomeView",
  data() {
    let that = this;
    return {
      id: "",
      typeList: [{title: ""}],
      opts: {
        css3: true,
        start: 0,
        dir: "v",
        navigation: true,
        scrollingSpeed: 4500,
        afterChange: function (currentSlideEl, currenIndex) {
          currentSlideEl.classList.add(`page`);
          if (currenIndex % 2 > 0) {
            that.$emit("headBg", true);
          } else {
            that.$emit("headBg", false);
          }
        },
      },
      screenWidth: 0,
      screenHeight: 0,
      typeAct: 0,
      bannerHeight: "",
      bannerList: [],
      dataList: [],
      totalNum: 0,
      newsListdata: [],
      newsListCon: [],
      newsdata: {title: "", updateTime: "",},
      newImgUrl: "",

      arr: [],
    };
  },
  methods: {
    getTimefun(time, type) {
      if (time) {
        if (type === 1) {
          return time.substring(0, 4);
        } else {
          return time.substring(5, 10)
        }

      }
    },

    Goonline() {
      this.$router.push("/onlineTraining");
    },
    Gosharon() {
      this.$router.push("/salon");
    },
    Goresource() {
      this.$router.push("/resource");
    },
    Gocheck() {
      this.$router.push("/detection");
    },

    indexnews() {
      let url = "/portal/api/index/getIndexMessageList";
      let data = {
        pageNum: 1,
      };
      HTTP.get(url, data, (res) => {
        if (Number(res.code) === 0) {
          this.newsdata = res.data.headMsgList[0];
          this.newsListCon = JSON.parse(JSON.stringify(res.data.headMsgList));
          if (res.data.headMsgList.length > 1) {
            this.newsListdata = res.data.headMsgList.splice(1, 4);
          }
        }
      }, false);
    },

    setSize: function () {
      // 通过屏幕宽度(图片宽度)计算高度
      if (this.screenWidth < 900) {
        this.bannerHeight = 220;
      } else {
        this.bannerHeight = (950 / 1920) * this.screenWidth;
      }
    },

    gonewdetail(id) {
      this.$router.push({
        path: "/newsdetail",
        query: {tpId: id},
      });
    },

    goviews() {
      this.$router.push({
        path: "/news",
      });
    },
    getDetail(id) {
      this.$router.push({
        path: "/developmentDetail",
        query: {
          id: id,
        },
      });
    },

    getList() {
      this.getLoad = true;
      let url = "/portal/api/index/getApplylist";
      let data = {
        pageNum: 1,
        pageSize: 10,
        industryType: "",
        applyName: "",
      };
      HTTP.get(url, data, (res) => {
        if (Number(res.code) === 0) {
          this.dataList = res.data;
          this.totalNum = res.total;
        }
      }, false);
    },
    getBanner() {
      this.getLoad = true;
      let url = "/portal/api/index/getSlideshowList";
      let data = {
        pageNum: 1,
        industryType: "",
        applyName: "",
      };
      HTTP.get(url, data, (res) => {
        if (Number(res.code) === 0) {
          this.bannerList = res.rows;
        }
        // console.log(res);
      }, false);
    },

    getImgFun(name) {
      let url = "/portal/common/fileNameToUrl";
      let data = {
        name: name
      }
      HTTP.get(url, data, res => {
        this.newImgUrl = res.url
      }, false)
    }
  },
  mounted() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.setSize();
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      this.setSize();
    };
  },
  created() {
    this.indexnews();
    this.getList();
    this.getBanner();
    let url = "/api/source/getSourceType";
    let data = {};
    HTTP.get(url, data, (res) => {
      if (Number(res.code) === 0) {
        this.typeList = res.data.slice(0, 2);
      }
    }, false);
  },
};
</script>

<style scoped lang="scss">
main {
  //background-image: url('/src/assets/image/index_5.png');
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}

.page-2 {

  > img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }
}

.page-2:after {
  background-color: rgba(255, 255, 255, .8);
  position: absolute;
  content: "";
  z-index: 2;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}


.index-foot footer {
  margin-top: 0;
  padding-top: 0;
  padding-bottom: 10px;
}

.fullpage-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}


.cak-conlist {
  display: flex;
  justify-content: center;
  height: 100%;
  //position: relative;

  > div {
    width: 60%;
    height: 100%;
    position: relative;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    border-radius: 6px;
  }

  > div > div {
    position: absolute;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    bottom: 0;
    padding: 20px 30px;
    transform: translateY(60px);
    transition: all .3s;

    h4 {
      font-size: 20px;
      color: #fff;
      margin-bottom: 10px;
      height: 50px;
      line-height: 50px;
    }

    span {
      color: #fff;
      line-height: 20px;
      height: 39px;
      display: block;
      overflow: hidden;
      display: -webkit-box;
      /*设置子元素排列方式*/
      -webkit-box-orient: vertical;
      /*设置显示的行数，多出的部分会显示为...*/
      -webkit-line-clamp: 2;
      text-indent: 32px;
    }
  }

  > div:hover {
    div {
      transform: translateY(0);
    }
  }

}

.banner-con {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    width: 12rem;

    h3 {
      font-size: 40px;
      margin-bottom: 40px;
      //line-height: 28px;
      color: #ffffff;
      font-weight: normal;
    }

    p {
      width: 400px;
      font-size: 20px;
      color: #ffffff;
      line-height: 28px;
      margin-bottom: 57px;
    }

    > div {
      display: flex;

      .talentsView-btn {
        height: 54px;
        line-height: 54px;
        border-radius: 5px;
        color: #3291F8;
        font-size: 14px;
        text-align: center;
        background-color: #ffffff;
        display: block;
        padding: 0 40px;
        margin-right: 35px;
      }

      .development-btn {
        height: 54px;
        line-height: 54px;
        border-radius: 5px;
        color: #ffffff;
        font-size: 14px;
        text-align: center;
        background-color: #3291F8;
        display: block;
        padding: 0 40px;
      }
    }
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}

.notice-con {
  height: 64px;
  line-height: 64px;
  background-color: rgba(221, 228, 249, 1);
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  .notice-detail {
    margin-left: 46px;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    background-color: #3291F8;
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    text-align: center;
    padding: 0 20px;
    cursor: default;
  }
}

.news-sec {
  // background-color: #eff2fb;
  display: flex;
  //padding-top: 1.5rem;
  height: 100vh;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 99;
}

.news-con > button {
  position: absolute;
  margin: -80px 1200px;
  border: none;
  height: 80px;
  background: linear-gradient(360deg, rgba(255, 255, 255, 0), #fff);
  cursor: pointer;
}

.news-con {
  position: relative;
  width: 96%;
  max-width: 1200px;
  margin: 0 auto;

  > h3 {
    font-size: 36px;
    margin-bottom: 50px;
    color: #101010;
    font-weight: normal;
  }

  > div {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .news-left {
    width: 50%;
    height: 383px;
    float: left;
    position: relative;
    cursor: pointer;

    > div {
      position: absolute;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.6);
      width: 100%;
      height: 120px;
      padding: 15px 35px;
      bottom: 0;
      left: 0;

      h4 {
        color: #ffffff;
        font-size: 16px;
        line-height: 30px;
        ///*文本不会换行*/
        white-space: nowrap;
        /*当文本溢出包含元素时，以省略号表示超出的文本*/
        text-overflow: ellipsis;
      }

      .time-year {
        font-size: 22px;
        color: #ffffff;
        display: block;
        line-height: 30px;
      }

      .time-day {
        font-size: 14px;
        color: #ffffff;
        display: block;
        line-height: 30px;
      }

      .text-con {
        line-height: 24px;
        color: #ffffff;
        margin-left: 24px;
        border-left: 1px #ffffff solid;
        padding-left: 24px;
        overflow: hidden;
        height: 48px;
        /*将对象作为弹性伸缩盒子模型显示*/
        display: -webkit-box;
        /*设置子元素排列方式*/
        -webkit-box-orient: vertical;
        /*设置显示的行数，多出的部分会显示为...*/
        -webkit-line-clamp: 2;
      }
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 0;
      border-radius: 2px;
    }
  }

  .news-right {
    float: right;
    width: 44%;
    border-top: 1px solid #e3e3e3;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    > div {
      border-bottom: 1px solid #e3e3e3;
      padding: 16px 20px;
      cursor: pointer;
      transition: all 0.3s;
    }

    > div:hover {
      background-color: rgba(0, 0, 0, 0.01);
      box-shadow: 1px 1px 12px 3px rgba(0, 0, 0, 0.1);
    }

    .time-year {
      font-size: 22px;
      display: block;
      line-height: 30px;
    }

    .time-day {
      font-size: 14px;
      display: block;
      line-height: 30px;
    }

    .text-con {
      //width: 100%;
      margin-left: 32px;

      h4 {
        font-size: 16px;
        height: 30px;
        width: 400px;
        overflow: hidden;
        line-height: 30px;
        ///*文本不会换行*/
        white-space: nowrap;
        /*当文本溢出包含元素时，以省略号表示超出的文本*/
        text-overflow: ellipsis;
      }

      p {
        line-height: 30px;
        //width: 100%;
        width: 400px;
        overflow: hidden;
        ///*文本不会换行*/
        white-space: nowrap;
        /*当文本溢出包含元素时，以省略号表示超出的文本*/
        text-overflow: ellipsis;
        height: 30px;
      }
    }
  }
}

.type-btn {
  display: flex;
  justify-content: center;
  margin-bottom: 60px;

  span {
    width: 160px;
    height: 70px;
    line-height: 70px;
    background-color: rgba(234, 237, 240, 1);
    text-align: center;
    display: block;
    cursor: pointer;
  }

  span.act-btn {
    color: #ffffff;
    background-color: #3291F8;
  }
}

.page-4 {
  background-color: aliceblue;
}

.more-con {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  > h3 {
    font-size: 24px;
    color: #101010;
    font-weight: normal;
    width: 100%;
    max-width: 14rem;
    margin: 0 auto 50px;
  }


  > div {
    display: flex;
    width: 100%;
    max-width: 14rem;
    margin: 0 auto;
    cursor: pointer;

    .moreitems {
      position: relative;
      overflow: hidden;
      transition: all 0.3s;
      width: 3.5rem;
      height: 4rem;
      padding: 20px 30px;

      > img {
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        transition: all .3s;
      }

      > div {
        position: relative;
        z-index: 3;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        img {
          margin-bottom: 20px;
        }

        h6 {
          color: #FFFFFF;
          font-size: 20px;
          font-weight: normal;
          margin-bottom: 10px;
        }

        span {
          color: #FFFFFF;
          display: none;
        }
      }
    }

    .moreitems:hover:after {
      position: absolute;
      width: 100%;
      height: 100%;
      content: "";
      left: 0;
      top: 0;
      background-color: rgba(46, 107, 230, 0.55);
      z-index: 9;
    }

    .moreitems:hover > img {
      transform: scale(1.04);
    }

    .moreitems:hover span {
      display: block;
    }


  }
}

.page-3 {
  padding-top: 1rem;
  display: flex;
  align-items: center;

  .kf-con {
    width: 98%;
    max-width: 14rem;
    margin: 0 auto;

    > h4 {
      font-size: 22px;
      text-align: center;
      margin-bottom: 30px;
      color: #FFFFFF;
    }

    > span {
      margin-bottom: 40px;
      display: block;
      text-align: center;
      color: #fff;

      a {
        margin-left: 6px;
        color: #ddd;
      }

      a:hover {
        color: #FFFFFF;
      }
    }

  }
}

.page-5-con {
  display: flex;
  width: 98%;
  max-width: 1200px;
  margin: 0 auto;

  .page5-text {
    display: flex;
    align-items: center;
    height: 300px;

    > div {
      padding-left: 60px;
      font-size: 14px;
      line-height: 24px;
      text-indent: 32px;
      color: #FFFFFF
    }
  }
}

@media screen and (max-width: 1537px) {
  .page-5-con {
    width: 900px;

    .page5-text {
      display: flex;
      align-items: center;
      //height: 192px;

      > div {
        padding-left: 60px;
        font-size: 14px;
        line-height: 24px;
        text-indent: 32px;
        color: #FFFFFF
      }
    }
  }
}


@media screen and (max-width: 1200px) {
  .banner-con {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      width: 80%;

      h3 {
        font-size: 20px;
        margin-bottom: 10px;
        //line-height: 28px;
        color: #ffffff;
        font-weight: bold;
      }

      p {
        width: 100%;
        font-size: 14px;
        color: #ffffff;
        line-height: 28px;
        margin-bottom: 10px;
      }

      > div {
        display: block;

        .talentsView-btn {
          height: 38px;
          line-height: 38px;
          border-radius: 4px;
          color: #3291F8;
          font-size: 14px;
          text-align: center;
          background-color: #ffffff;
          display: block;
          padding: 0 10px;
          margin-bottom: 20px;
          margin-right: 20px;
          float: left;
        }

        .development-btn {
          height: 38px;
          line-height: 38px;
          border-radius: 4px;
          color: #ffffff;
          font-size: 14px;
          text-align: center;
          background-color: #3291F8;
          display: block;
          padding: 0 10px;
          float: left;
        }
      }
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  }




  .kf-con{
    overflow: hidden;

    h4{
      text-align: center;
      font-size: 20px;
      margin-bottom: 10px;
    }

    >span{
      width: 90%;
      display: block;
      line-height: 20px;
      text-align: center;
      margin: 0 auto 10px;
    }


  }



  .phone-js{
    margin-top: 30px;
    padding: 30px 5% 20px;
    background-color: #2D2D2D;

    h2{
      margin-bottom: 16px;
      font-size: 20px;
      text-align: center;
      color: #FFFFFF;
    }
  }

}

.phone-item-con{
  padding: 10px;
  background-color: #FFFFFF;
  border-radius: 4px;
  margin-bottom: 10px;
}

.phone-news-item{
  height: 68px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;

  h3{
    height: 39px;
    line-height: 20px;
    overflow: hidden;
    /*将对象作为弹性伸缩盒子模型显示*/
    display: -webkit-box;
    /*设置子元素排列方式*/
    -webkit-box-orient: vertical;
    /*设置显示的行数，多出的部分会显示为...*/
    -webkit-line-clamp: 2;
  }

  p{
    text-align: right;
  }
}

</style>