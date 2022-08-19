<template>
  <div class="main-body">
    <main @mousedown="mouseDownCon()" @mouseup="mouseUpCon()">
      <div :style="'transform: translateY(-' + pageNum*100 + 'vh)'">
        <!--平台首页-->
        <section class="page-num-1 page-con">
          <el-carousel trigger="click" height="100vh" :interval="5000" arrow="never">
            <el-carousel-item v-for="(item,index) in bannerList" :key="'banner'+ index">
              <!--<div class="banner-item">-->
              <!--  &lt;!&ndash;<img src="./../assets/image/banner-title.png">&ndash;&gt;-->
              <!--  &lt;!&ndash;<h3>{{ item.title }}</h3>&ndash;&gt;-->
              <!--  &lt;!&ndash;<p>{{ item.digest }}</p>&ndash;&gt;-->
              <!--  &lt;!&ndash;<img :src="item.image">&ndash;&gt;-->
              <!--  &lt;!&ndash;{{ bannerList }}&ndash;&gt;-->
              <!--</div>-->
              <div class="banner-item" :style="'background-image: url(' + item.image + ')'">
                <h3>{{ item.title }}</h3>
                <p>{{ item.digest }}</p>
                <!--<img :src="item.image">-->
                <!--{{ bannerList }}-->
              </div>
            </el-carousel-item>
          </el-carousel>

        </section>
        <!--关于平台-->
        <section class="page-num-2 page-con">
          <div class="about-title">
            <h3>关于平台</h3>
          </div>
          <div style="width: 55%">
            <div class="about-list">
              <h4>入驻企业</h4>
              <div class="about-item">
                <div class="about-left">
                  <div>
                    <span :class="{'smell-font':(cpmpanyNum).toString().length>2}">{{ cpmpanyNum }}</span>
                    <!--<span>{{ cpmpanyNum }}</span>-->
                    <sub>家</sub>
                  </div>

                </div>
                <p>
                  吸引了市域市外多家优秀科技企业入驻，享受产品展示、资源共享、交流合作等优质服务。
                </p>
              </div>
            </div>

            <div class="about-list">
              <h4>技术沙龙</h4>
              <div class="about-item">
                <div class="about-left">
                  <div>
                    <span :class="{'smell-font':(salonNum).toString().length>2}">{{ salonNum }}</span>
                    <!--<span>{{ salonNum }}</span>-->
                    <sub>次</sub>
                  </div>

                </div>
                <p>
                  举办前沿技术分享活动，召开学术分享研讨会议，提供开放发布会展厅。
                </p>
              </div>
            </div>

            <div class="about-list">
              <h4>软件产品</h4>
              <div class="about-item">
                <div class="about-left">
                  <div>
                    <span v-if="projectNum<1000">{{projectNum}}</span>
                    <!--<span v-else-if="projectNum>999">{{Math.floor(projectNum / 100) / 10}}k</span>-->
                    <!--<span :class="{'smell-font':(projectNum).toString().length>2}" v-if="projectNum<100">{{-->
                    <!--    projectNum-->
                    <!--  }}</span>-->
                    <!--<span :class="{'smell-font':(Math.floor(projectNum/10)/100).toString().length>2}"-->
                    <!--      v-else-if="projectNum<1000">{{ Math.floor(projectNum / 10) / 10 }}</span>-->
                    <!--<span :class="{'smell-font':(Math.floor(projectNum/100)/100).toString().length>2}"-->
                    <!--      v-else-if="projectNum<10000">{{ Math.floor(projectNum / 100) / 10 }}</span>-->
                    <!--<span :class="{'smell-font':(Math.floor(projectNum/100)/100).toString().length>2}"-->
                    <!--      v-else>{{ Math.floor(projectNum / 100) / 100 }}</span>-->
                    <!--&lt;!&ndash;<span :class="{'smell-font':(projectNum).toString().length>2}">{{ projectNum }}</span>&ndash;&gt;-->
                    <!--<sub v-if="projectNum<1000">个</sub>-->
                    <!--<sub v-else-if="projectNum<1000">个</sub>-->
                    <!--<sub v-else-if="projectNum>999">个</sub>-->
                    <sub>个</sub>
                  </div>

                </div>
                <p>
                  涵盖多款数字化产品应用于企业，建设多领域数据平台服务于行业。
                </p>
              </div>
            </div>

            <div class="about-list">
              <h4>注册用户</h4>
              <div class="about-item">
                <div class="about-left">
                  <div>
                    <span v-if="usersNum<9999">{{ usersNum }}</span>
                    <!--<span v-if="usersNum>999">{{ Math.floor(usersNum / 100) / 10 }}k</span>-->
                    <span v-else-if="usersNum>9999">{{ Math.floor(usersNum / 1000) / 10 }}w</span>
                    <sub>人</sub>
                    <!--<sub v-else-if="usersNum<1000">百</sub>-->
                    <!--<sub v-else-if="usersNum>=1000">个</sub>-->
                    <!--<sub v-else-if="usersNum>9999">个</sub>-->
                  </div>

                </div>
                <p>
                  汇聚科技领先企业，吸纳行业尖端人才。
                </p>
              </div>
            </div>

          </div>
        </section>
        <!--快捷入口-->
        <section class="page-num-3 page-con" ref="pageThree">
          <div @mouseover="bgSwitch(0)">
            <router-link to="/boutique" class="obj-kf">
              <img src="./../assets/image/ruanjiankaifa@2x.png" alt="">
              <h4>软件开发</h4>
              <h6>Software Development</h6>
              <div class="page3-jump">
                <div>
                  <h5>{{ applyInfoGoodNumber }} <span>+</span></h5>
                  <p>基础开源项目</p>
                </div>

              </div>
              <span>点击查看</span>
            </router-link>
          </div>
          <div @mouseover="bgSwitch(1)">
            <router-link to="/onlineTraining" class="obj-sx">
              <img src="./../assets/image/ruanjianshixun@2x.png" alt="">
              <h4>软件实训</h4>
              <h6>Software Training</h6>
              <div class="page3-jump">
                <div>
                  <h5>{{ trainingSubjectNumber }}<span>+</span></h5>
                  <p>精品课程</p>
                </div>
                <div>
                  <h5> {{ trainingNumber }} <span>+</span></h5>
                  <p>在线题库</p>
                </div>

              </div>
              <span>点击查看</span>
            </router-link>
          </div>
          <div @mouseover="bgSwitch(2)">
            <router-link to="/development" class="obj-cp">
              <img src="./../assets/image/ruanjianjiance@2x.png" alt="">
              <h4>软件产品</h4>
              <h6>Software Products</h6>
              <div class="page3-jump">
                <div>
                  <h5>{{ applyInfoNumber }} <span>+</span></h5>
                  <p>行业应用产品</p>
                </div>

              </div>
              <span>点击查看</span>
            </router-link>
          </div>
          <div @mouseover="bgSwitch(3)">
            <router-link to="/epiboly" class="obj-waibao" @mouseover="bgSwitch(3)">
              <img src="./../assets/image/ruanjianwaibao@2x.png" alt="">
              <h4>软件外包</h4>
              <h6>Software Outsourcing</h6>
              <div class="page3-jump">
                <div>
                  <h5>{{ softwareNumber }} <span>+</span></h5>
                  <p>外包需求服务</p>
                </div>

              </div>

              <span>点击查看</span>
            </router-link>
          </div>




        </section>
        <!--新闻动态-->
        <section class="page-num-4 page-con">
          <div>
            <div class="about-title">
              <h3>新闻中心</h3>
            </div>
            <div class="more-con">
              <router-link to="/news">查看更多</router-link>
            </div>
            <div class="newsList-con">
              <div>
                <div class="news-item" :class="{'news-text-3': index>2}" v-for="(item,index) in newsListdata" :key="'news'+index" @click="gonewdetail(item.id)">
                  <div class="img-con">
                    <img :src="item.coverImg" alt="">
                  </div>

                  <div class="news-text">
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.newsIntro }}</p>
                    <span>{{ item.createTime.split("T")[0] }}</span>
                    <!--{{item}}-->
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>
        <!--入驻企业-->
        <section class="page-num-5 page-con">
          <!---->
          <div class="company-list">
            <div ref="comConTran">
              <div v-for="(item,index) in companyListData" :key="'com'+ index"
                   :class="{'com-Act': comAct===index}"
                   :style="'transform:translateX(' + getTranLength(index) + 'px)'">
                <img :src="item.companyLogo" alt="">
              </div>
            </div>
            <!---->

          </div>
          <div class="index-footer">
            <comFoot></comFoot>
          </div>
        </section>
      </div>
      <div class="index-right">
        <div :class="{'rigeh-act': pageNum===index}" v-for="(item,index) in rightList" :key="'right'+index"
             @click="pageJump(index)">
          <div class="right-title">{{ item.title }}</div>
          <div class="right-tip"></div>
        </div>
        <!--<div></div>-->
        <!--<div></div>-->
        <!--<div></div>-->
      </div>
    </main>
  </div>

</template>

<script>
import HTTP from "@/server/http";
import comFoot from "@/components/comFoot";

export default {
  name: "indexPage",
  components: {
    comFoot,
  },
  data() {
    return {
      softwareNumber: 0,
      trainingSubjectNumber: 0,
      trainingNumber: 0,
      applyInfoNumber: 0,
      applyInfoGoodNumber: 0,

      pageNum: 0,  // 当前页面
      mouseX: 0,

      pageTime: null,
      setTime: null,

      cpmpanyNum: 0,
      salonNum: 0,
      projectNum: 0,
      usersNum: 0,
      numLeng: 0,

      rightList: [
        {title: "服务理念"},
        {title: "关于我们"},
        {title: "智慧应用"},
        {title: "新闻中心"},
        {title: "企业展示"},
      ],
      comAct: 2,
      comActNum: 0,
      setInterTime: "",
      tranLength: "",

      bannerList: [],
      newsListdata: [],
      companyListData: [],
    }
  },
  methods: {
    gonewdetail(id) {
      this.$router.push({
        path: "/newsdetail",
        query: {tpId: id},
      });
    },
    pageJump(index){
      this.pageNum = index;
      if(index === 1){
        this.cpmpanyNum = 0;
        this.salonNum = 0;
        this.projectNum = 0;
        this.usersNum = 0;
        this.numLeng = 0;
        this.getSystemWorkbench();
      }
    },

    // 页面切换延时
    pageTab(type) {
      if (type > 0) {
        if(this.pageNum === 0){
          setTimeout(()=>{
            this.pageNum = 1;
          },200)

        } else if(this.pageNum === 1){
          setTimeout(()=>{
            this.pageNum = 2;
          },200)
        } else if(this.pageNum === 2){
          setTimeout(()=>{
            this.pageNum = 3;
          },200)
        } else if(this.pageNum === 3){
          setTimeout(()=>{
            this.pageNum = 4;
          },200)
        }

        // if(this.pageNum>0){
        //   this.$emit("headBg", true);
        //
        // } else {
        //   this.$emit("headBg", false);
        // }
        if (this.pageNum === 0) {
          this.cpmpanyNum = 0;
          this.salonNum = 0;
          this.projectNum = 0;
          this.usersNum = 0;
          this.numLeng = 0;
          this.getSystemWorkbench();
        }
      } else {
        if(this.pageNum === 4){
          this.pageNum = 3;
        } else if(this.pageNum === 3){
          this.pageNum = 2;
        } else if(this.pageNum === 2){
          this.pageNum = 1;
        } else if(this.pageNum === 1){
          this.pageNum = 0;
        }

        if (this.pageNum === 1) {
          this.cpmpanyNum = 0;
          this.salonNum = 0;
          this.projectNum = 0;
          this.usersNum = 0;
          this.numLeng = 0;
          this.getSystemWorkbench()
        }
      }
    },

    // 页面切换
    mouerWheel(e) {
      let qhPage = e.wheelDelta || e.detail;
      // alert(e)
      // console.log(e)
      if (this.pageTime === null) {
        clearTimeout(this.setTime);
        // alert(qhPage)
        if (qhPage <= -120 || (qhPage>=3 && qhPage<60)) {
          // console.log(qhPage === -120)
          this.pageTab(1);

        } else {
          this.pageTab(0)
        }
        this.pageTime = true;
        this.setTime = setTimeout(() => {
          this.pageTime = null;
        }, 1500)
      }
      // setTimeout
      // let pageLength = document.getElementsByClassName("page-con").length

      // console.log(qhPage)


    },

    // 获取轮播图
    getBanner() {
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
      }, false);
    },
    // 获取统计数据
    getSystemWorkbench() {
      let url = "/portal/api/index/getSystemWorkbench";
      let data = {};
      HTTP.get(url, data, (res) => {
        this.softwareNumber = res.softwareNumber; // 外包
        this.trainingSubjectNumber = res.trainingSubjectNumber; // 课程
        this.trainingNumber = res.trainingNumber;  // 试题
        this.applyInfoNumber = res.applyInfoNumber;
        this.applyInfoGoodNumber = res.applyInfoGoodNumber;

        this.getNumAm(res.companyNumber,res.salonNumber,res.applyInfoNumber,res.registerUserNumber+1000);
      }, false);
    },
    // 获取首页新闻
    getIndexNews() {
      let url = "/portal/api/index/getIndexMessageList";
      let data = {
        pageNum: 1,
        pageSize: 5,
      };
      HTTP.get(url, data, (res) => {
        if (Number(res.code) === 0) {
          this.newsListdata = res.data.newsList;
        }
      }, false);
    },
    getCompanyList() {
      let url = "/portal/companyInfo/loadCompanyList";
      let data = {
        pageNum: 1,
        pageSize: 10,
      }
      HTTP.get(url, data, res => {
        if (Number(res.code) === 0) {
          this.companyListData = res.data;
          this.getComTab();
        }
        // console.log(res)
      }, false);
    },

    // 数字动画
    getNumAm(getNum1 = 74, getNum2 = 37, getNum3 = 124, getNum4 = 41) {
      let num1 = getNum1;
      let num2 = getNum2;
      let num3 = getNum3;
      let num4 = getNum4;
      let leng = 30;
      let timeSet = ""
      if (this.numLeng <= leng) {
        this.numLeng += 1;
        timeSet = setTimeout(() => {
          this.cpmpanyNum += num1 / 30;
          this.salonNum += num2 / 30;
          this.projectNum += num3 / 30;
          this.usersNum += num4 / 30;
          this.cpmpanyNum = Math.floor(this.cpmpanyNum);
          this.salonNum = Math.floor(this.salonNum);
          this.projectNum = Math.floor(this.projectNum);
          this.usersNum = Math.floor(this.usersNum);
          this.getNumAm(num1, num2, num3, num4)
        }, 30)
      } else {
        this.cpmpanyNum = num1;
        this.salonNum = num2;
        this.projectNum = num3;
        this.usersNum = num4;
        clearTimeout(timeSet);
      }


      // cpmpanyNum: 0,
      //     salonNum: 0,
      //     projectNum: 0,
      //     usersNum: 0,

    },

    getComTab() {
      this.tranLength = this.$refs.comConTran.scrollWidth/10;
      this.setInterTime = setInterval(() => {
        if(this.companyListData.length - this.comActNum === 3){
          this.comAct = 0;
        }
        if(this.comActNum<this.companyListData.length-1) {
          this.comActNum += 1;
          this.comAct += 1;
        } else {
          this.comActNum = 0;
        }
      }, 3000)
    },
    getTranLength(num){
      if(this.comActNum>num+1) {
        return (this.companyListData.length - this.comActNum -1) * this.tranLength;
      } else {
        return -(this.comActNum * this.tranLength);
      }

    },

    bgSwitch(type) {
      // console.log(type)
      if (type === 0) {
        this.$refs.pageThree.style.backgroundImage = "url(" + require("./../assets/image/index_3_1.png") + ")";
      } else if (type === 1) {
        this.$refs.pageThree.style.backgroundImage = "url(" + require("./../assets/image/index_3_2.png") + ")";
      } else if (type === 2) {
        this.$refs.pageThree.style.backgroundImage = "url(" + require("./../assets/image/index_3_3.png") + ")";
      } else if (type === 3) {
        this.$refs.pageThree.style.backgroundImage = "url(" + require("./../assets/image/index_3_4.png") + ")";
      }

      // console.log(type)
    },

    mouseDownCon(){
      this.mouseX = window.event.clientX;
    },
    mouseUpCon(){
      if(window.event.clientX-this.mouseX<-10){
        this.pageTab(1);
      } else {
        this.pageTab(0);
      }
    }


  },
  created() {
    if (window.addEventListener) {
      window.addEventListener("mousewheel", this.mouerWheel) || window.addEventListener("DOMMouseScroll", this.mouerWheel)
    }

    this.getBanner();
    this.getSystemWorkbench();
    this.getIndexNews();
    this.getCompanyList();

  }
}
</script>

<style scoped lang="scss">
main {
  overflow: hidden;
  height: 99.9vh;

  > div {
    transition: all .6s;
  }
}

.main-body {
  position: relative;
}

.main-body:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 2px;
  //top: 0;
  bottom: -1px;
  left: 0;
  z-index: 999;
  background-color: #202d3a;
}

.index-right {
  position: fixed;
  top: 50%;
  margin-top: -75px;
  //background-color: #2c3e50;
  z-index: 80;
  right: .4rem;

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    height: 30px;
  }

  > div:hover, .rigeh-act {
    .right-tip {
      width: 40px;
      background: linear-gradient(90deg, #3BBFFD, #2B85DB);
    }

    .right-title {
      display: block;
    }
  }

  .right-title {
    background-color: rgba(0, 0, 0, .33);
    border-radius: 4px;
    padding: 2px 4px;
    color: #FFFFFF;
    margin-left: 8px;
    display: none;
  }

  .right-tip {
    width: 10px;
    height: 10px;
    background-color: rgba(0, 0, 0, .33);
    border-radius: 5px;
    margin-left: 8px;
    transition: all .4s;
  }

}

.about-title {
  display: flex;
  width: 100%;
  justify-content: center;

  h3 {
    font-size: .36rem;
    font-weight: 800;
    color: #000000;
    line-height: .66rem;
    background: linear-gradient(90deg, #3BBFFD 0%, #0E5EAB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    padding-bottom: 0;
    margin-bottom: .34rem;
    //border-bottom: 1px solid;
  }

  h3:after {
    position: absolute;
    content: "";
    height: 3px;
    width: 100%;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg, #3BBFFD, #0E5EAB);
  }
}

.more-con {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: .3rem;

  a {
    background: linear-gradient(90deg, #3BBFFD 0%, #0E5EAB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: .16rem;

  }
}


.page-con {
  width: 100%;
  height: 100vh;
}

.page-num-1 {
  .banner-item {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: url("./../assets/image/banner.png");

    img{
      width: 70%;
      max-width: 600px;
    }

    h3 {
      font-size: .44rem;
      font-weight: bold;
      color: #FFFFFF;
      margin-bottom: .34rem;
      text-shadow: 0 6px 7px rgba(0, 0, 0, 0.36);
    }

    p {
      font-size: .16rem;
      font-weight: bold;
      color: #FFFFFF;
      text-shadow: 0 6px 7px rgba(0, 0, 0, 0.36);
    }

    //img {
    //  width: 100%;
    //  height: 100%;
    //
    //}
  }
}

.page-num-2 {
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: .96rem 1.64rem .44rem;
  width: 100%;
  background-image: url("./../assets/image/index-bg-1.png");
  background-size: 100% 100%;

  .about-list {
    margin-bottom: .26rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;

    h4 {
      //padding: 0 74px;
      font-size: .2rem;
      font-weight: 600;
      color: #636363;
      width: 1.6rem;
      text-align: center;
    }

    .about-item {
      padding: .28rem .96rem .28rem .2rem;
      background: #F8F8F8;
      box-shadow: 0 10px 14px 0 rgba(42, 42, 42, 0.1);
      border-radius: 10px;
      width: calc(100% - 1.6rem);

      .about-left {
        border-right: 1px solid #EAEAEA;
        padding-right: .2rem;
        margin-right: .2rem;
        width: 1.84rem;
        float: left;

        > div {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: .72rem;
        }

        span {
          font-size: .38rem;
          font-weight: bold;
          text-align: center;
          color: #333333;
          height: .48rem;
          overflow: hidden;
          line-height: .48rem;
          margin-right: .12rem;
          width: .9rem;
          display: inline-block;
        }

        sub {
          font-size: .16rem;
          color: #636363;
          margin-top: 20px;
        }
      }

      p {
        font-size: .16rem;
        color: #636363;
        line-height: .36rem;
      }

    }
  }

  .about-list:hover {
    h4 {
      color: #1C81C9;
      font-weight: bold;
    }
  }

}

.page-num-3 {
  //background-color: #64C37C;
  display: flex;
  background-image: url("./../assets/image/index_3_1.png");
  background-size: 100% 100%;

  >div{
    width: 25%;
    height: 100%;
    border-right: 2px rgba(255, 255, 255, .3) solid;

    > a {
      width: 100%;
      height: 100%;
      overflow: hidden;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: relative;

      img {
        width: .72rem;
        margin-bottom: .3rem;
      }

      >h4 {
        color: #fff;
        font-size: .36rem;
        margin-bottom: 15px;
        font-weight: normal;
      }

      >h6 {
        color: #fff;
        font-size: .3rem;
        margin-bottom: .5rem;
        font-weight: normal;
      }

      >span{
        border: 2px solid #FFFFFF;
        padding: .12rem .44rem;
        position: absolute;
        bottom: 1.1rem;
        color: #FFFFFF;
        opacity: 0;
      }
      .page3-jump{
        padding: .66rem;
        position: relative;
        align-items: center;
        text-align: center;
        display: none;
        width: 100%;
        justify-content: space-around;

        >div{
          display: flex;
          justify-content: center;
          flex-direction: column;
        }


        h5{
          font-size: .4rem;
          color: #FFFFFF;

          span{
            font-size: .2rem !important;
          }
        }

        p{
          color: #FFFFFF;
          opacity: 0.7;
          margin-top: .22rem;
        }

      }

      .page3-jump:after{
        position: absolute;
        width: 1.2rem;
        left: 50%;
        margin-left: -0.6rem;
        height: 2px;
        background-color: #FFFFFF;
        top: 0;
        content: "";
      }

    }

    > a:hover {
      background-color: #0f2341;

      span{
        opacity: 1;
      }
      .page3-jump{
        display: flex;
      }
    }

    .obj-kf:after {
      //content: "<img src='./../assets/image/ruanjianshixun_highlight@2x.png'>";
      content: "";
      position: absolute;
      width: 2.3rem;
      height: 2.3rem;
      overflow: hidden;
      background-image: url("./../assets/image/ruanjiankaifa_highlight@2x.png");
      background-size: 100% 100%;
      top: 0;
      left: 0;
      opacity: 0;
    }

    .obj-sx:after {
      //content: "<img src='./../assets/image/ruanjianshixun_highlight@2x.png'>";
      content: "";
      position: absolute;
      width: 2.3rem;
      height: 2.3rem;
      overflow: hidden;
      background-image: url("./../assets/image/ruanjianshixun_highlight@2x.png");
      background-size: 100% 100%;
      top: 0;
      left: 0;
      opacity: 0;
    }

    .obj-cp:after {
      //content: "<img src='./../assets/image/ruanjianchanpin_highlight@2x.png'>";
      content: "";
      position: absolute;
      width: 2.3rem;
      height: 2.3rem;
      overflow: hidden;
      background-image: url("./../assets/image/ruanjianjiance_highlight@2x.png");
      background-size: 100% 100%;
      top: 0;
      left: 0;
      opacity: 0;
    }

    .obj-waibao:after {
      //content: "<img src='./../assets/image/ruanjianshixun_highlight@2x.png'>";
      content: "";
      position: absolute;
      width: 2.3rem;
      height: 2.3rem;
      overflow: hidden;
      background-image: url("./../assets/image/ruanjianwaibao_highlight@2x.png");
      background-size: 100% 100%;
      top: 0;
      left: 0;
      opacity: 0;
    }


    > a:hover:after {
      opacity: 1;
    }


  }
  > div:last-child {
    border-right: none;
  }

}

.page-num-4 {
  background-color: #fff;
  padding: 1.2rem 1.7rem 40px;

  > div {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .newsList-con {
    width: 100%;
    //overflow: hidden;

    > div {
      display: flex;
      width: calc(100% / 3 * 5);
      justify-content: space-between;
      margin-bottom: .2rem;

      .news-item {
        width: 29%;
        margin: 0 .14rem;
        overflow: hidden;
        border-radius: 4px;
        background-color: #FFFFFF;
        box-shadow: 1px 1px 16px 3px rgba(0, 0, 0, 0.14);
        cursor: pointer;
        position: relative;
        transition: all .3s;

        .img-con{
          height: 3.2rem;
          width: 100%;
          overflow: hidden;
        }

        img {
          height: 3.2rem;
          object-fit: cover;
          width: 100%;
          margin-bottom: .3rem;
          transition: all .3s;
        }

        .news-text {
          padding: 0 16px .5rem;

          h4 {
            height: .58rem;
            font-size: .2rem;
            font-weight: bold;
            color: #333333;
            line-height: .3rem;
            margin-bottom: .16rem;
            overflow: hidden;
          }

          p {
            height: .7rem;
            font-size: .14rem;
            color: #424242;
            line-height: .24rem;
            overflow: hidden;
            margin-bottom: 20px;
            opacity: .6;
          }

          span {
            padding: 4px 8px;
            border-radius: 4px;
            border: 1px solid rgba(0, 0, 0, .4);
          }

        }
      }

      .news-text-3{
        opacity: 0;
      }

      .news-item:after {
        position: absolute;
        content: "";
        bottom: -1.5rem;
        right: -0.23rem;
        background-image: url("./../assets/image/icon_xinwen@2x.png");
        width: 1.5rem;
        height: 1.5rem;
        background-size: 100% 100%;
        transition: all .4s;
        opacity: 0;
      }

      .news-item:hover:after {
        bottom:-0.23rem;
      }

      .news-item:hover{
        transform: scale(1.05);
      }
    }
  }
}

.page-num-5 {
  background-image: url("./../assets/image/index_4_bg.png");
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-size: 100% 100%;

  .company-list {
    margin: 1.1rem auto 0;
    //padding: 1.1rem 0 0;
    height: 50%;
    overflow: hidden;

    width: 100%;
    max-width: 1600px;


    > div {
      height: 100%;
      width: 200%;
      transition: all .3s;

      div {
        background-color: #FFFFFF;
        float: left;
        height: 1.9rem;
        margin-top: 1.3rem;
        margin-left: .14rem;
        margin-right: .14rem;
        width: calc(10% - 0.28rem);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        transition: all .3s;

        img {
          max-height: 80%;
          max-width: 80%;
        }
      }

      .com-Act {
        height: 2.1rem;
        margin-top: calc(1.2rem);
      }
    }


  }

  .index-footer {
    footer {
      background: transparent;
      margin: 0;
    }
  }
}
</style>