<template>
  <main>
    <div class="tip-con">
      请您认真阅读 <router-link to="/help">《洛阳软件公共服务平台帮助中心》</router-link> , 了解作为开发者如何规范地在平台上参与项目，参与下列考试
    </div>
    <section class="body-con">
      <el-row :gutter="40">
        <el-col :lg="6" class="hidden-md-and-down">
          <div class="content_image">
            <div class="image-con">
              <img v-if="userImgUrl" :src="userImgUrl" alt="">
              <img v-else src="./../../assets/image/login_icon_kaifazhe.png" alt="">
            </div>
            <div>
              <img style="width: 20px;" src="@/assets/image/icon/icon_2.png" alt=""/>
            </div>
            <div>
              <p class="userName">{{ center.userName }}</p>
              <!--<p class="userName">{{ center.userName }}</p>-->
            </div>
            <div v-show="isshow1">
              <p class="timeshuo" style="font-size: .2rem">考试结果</p>
            </div>
            <div class="jieguo-con" v-show="isshow1">
              <p>您一共做对：<span>{{ duiNum }}</span>道题</p>
              <p>您一共做错：<span>{{ cuoNum }}</span>道题</p>
              <p>总分：<span>{{ zonFen }}</span></p>
            </div>
            <div v-show="!isshow1"><p class="timeshuo">考试时间</p></div>
            <div v-show="!isshow1">
              <p class="time">{{ getTime() }}</p>
            </div>
          </div>
        </el-col>
        <el-col :lg="18" :md="24">
          <div class="exam-con">
            <div class="di_top">
              <div class="di_name">
                <p v-show="examomea">
                  说明：测试中所指的“开发者”包括产品经理、项目顾问、UI
                  设计师、软件工程师、测试工程师。“开发者”是一个统称。
                </p>
              </div>
              <div v-if="appListPd.length>0">
                <h4>判断</h4>
                <div class="di_foor" v-for="(item,index) in appListPd" :key="index">
                  <p class="question-title wrong"><em>{{ index + 1 }}.</em>{{ item.questions }}</p>
                  <ul class="question-options enable-answer" v-if="!seeAwer">
                    <li :class="{'act-class': item.userSet===1}"
                        @click="answerTykPd(index,1)">对</li>
                    <li :class="{'act-class': item.userSet===2}"
                        @click="answerTykPd(index,2)">错</li>
                  </ul>
                  <ul class="question-options enable-answer" v-else>
                    <li :class="{'act-class-c': item.userSet===1 && item.answer==2,'act-class-no': item.answer==1}"
                        @click="answerTykPd(index,1)">对</li>
                    <li :class="{'act-class-c': item.userSet===2 && item.answer==1,'act-class-no': item.answer==2}"
                        @click="answerTykPd(index,2)">错</li>
                  </ul>
                </div>
              </div>
              <div v-if="appListSext.length>0">
                <h4>单选</h4>
                <div class="di_foor" v-for="(item,index) in appListSext" :key="index">
                  <p class="question-title wrong"><em>{{ index + 1 }}.</em>{{ item.questions }}</p>
                  <ul class="question-options enable-answer" v-if="!seeAwer">
                    <li :class="{'act-class': item.userSet==itemChild.sort}"
                        @click="answerTykSect(index,itemChild.sort)"
                        v-for="(itemChild,index1) in item.answerList" :key="'item'+index1">{{ itemChild.options }}
                    </li>
                  </ul>
                  <ul class="question-options enable-answer" v-else>
                    <li :class="{'act-class-c': item.userSet!=itemChild.answer&& item.userSet==itemChild.sort,'act-class-no': itemChild.sort==item.answer}"
                        @click="answerTykSect(index,itemChild.sort)"
                        v-for="(itemChild,index1) in item.answerList" :key="'item'+index1">{{ itemChild.options }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="beginomfs">
              <div v-show="!isshow1" @click="open">交卷</div>
            </div>
          </div>
        </el-col>
      </el-row>

    </section>

  </main>
</template>
<script>

import HTTP from "@/server/http";
export default {
  data() {
    return {
      examId: 0,
      isshow1: true,
      seeAwer: false,

      status: 0,
      time: "",
      //三种状态的判断
      appListPd: [],
      appListSext: [],
      userImgUrl: "",
      userName: "",
      center: "",
      examomea: true,
      zonFen: 0,
      jigeFen: 0,

      duiNum: 0,
      cuoNum: 0,

    };
  },

  methods: {
    examomeBtn(id) {
      let url = "/api/train/registration";
      let data = {
        id: id,
      };
      HTTP.get(url, data, () => {
        this.seeAwer = false;
        this.examomeList(id);
      }, false)
    },
    getExamomeList() {
      let url = "/api/train/randomTraining";
      let data = {
        varId: this.examId,
      };
      HTTP.get(url, data, res => {
        if (res.code == 0) {
          this.examomeBtn(res.data.id);
        }

      }, false)
    },
    examomeList(id) {
      let url = "/api/train/exam";
      let data = {
        trainingId: id,
      };
      HTTP.get(url, data, res => {
        if (res.code == 0) {
          this.isshow1 = false;
          this.appListPd = res.data.judgeList
          this.appListSext = res.data.singleList
          this.time = res.data.examTime * 60;
          this.jigeFen = res.data.passscore;
          this.countdown();
        }
      }, false)
    },

    answerTykPd(item, param) {
      this.appListPd[item].userSet = param;
      this.$set(this.appListPd, item, this.appListPd[item])
    },
    answerTykSect(item, param) {
      this.appListSext[item].userSet = param;
      this.$set(this.appListSext, item, this.appListSext[item])
    },

    //个人中心
    listas() {
      let url = "/api/user/getRegisterUserByLogin";
      let data = {};
      HTTP.get(url, data, res => {
        if (res.code == 0) {
          this.center = res.data;
          this.userImgUrl = res.data.userImgUrl;
          this.userName = res.data.userName;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },

    getTime(){
      let h = parseInt(this.time/60/60);
      let m = parseInt((this.time-(h*60*60))/60);
      let s = parseInt(this.time-(h*60*60)-(m*60));
      if(h<10){
        h=`0${h}`
      }
      if(m<10){
        m=`0${m}`
      }
      if(s<10){
        s=`0${s}`
      }
      return `${h}:${m}:${s}`
    },

    countdown() {
      let times = setTimeout(() => {
        this.time--
        if (this.time > 0) {
          this.countdown()
        } else {
          this.$message.warning("考试结束");
          this.appListPd.forEach(item=>{
            if(item.answer == item.userSet){
              this.zonFen += item.fraction;
              this.duiNum += 1;
            }
          })
          this.appListSext.forEach(item=>{
            if(item.answer == item.userSet){
              this.zonFen += item.fraction;
              this.duiNum += 1;
            }
          })
          this.cuoNum = (this.appListPd.length+this.appListSext.length)-this.duiNum;
          this.seeAwer = true;
          let url = "/api/train//submitExam";
          let data = {
            trainingId: this.examId,
            count: this.zonFen,
            passscore: this.jigeFen,
          };
          HTTP.get(url, data, () => {
            // console.log(res);
          }, false)

          if (action === "confirm") {
            this.isshow1 = true;
          }
          this.$message({
            type: "success",
            message: "交卷成功!",
          });
          clearTimeout(times);
        }
      }, 1000)
    },
    open() {
      this.$confirm("是否确认交卷?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
        type: "warning",
      }).then((action) => {
        this.appListPd.forEach(item=>{
          if(item.answer == item.userSet){
            this.zonFen += item.fraction;
            this.duiNum += 1;
          }
        })
        this.appListSext.forEach(item=>{
          if(item.answer == item.userSet){
            this.zonFen += item.fraction;
            this.duiNum += 1;
          }
        })
        this.cuoNum = (this.appListPd.length+this.appListSext.length)-this.duiNum;
        this.seeAwer = true;
        let url = "/api/train//submitExam";
        let data = {
          trainingId: this.examId,
          count: this.zonFen,
          passscore: this.jigeFen,
        };
        HTTP.get(url, data, () => {
          // console.log(res);
        }, false)

        if (action === "confirm") {
          this.isshow1 = true;
        }
        this.$message({
          type: "success",
          message: "交卷成功!",
        });
      }).catch(() => {
        // 点击取消后
        this.$message({
          type: "info",
          message: "已取消交卷",
        });
      });
    },
  },
  created() {
    this.examId = this.$route.query.examId;
    this.listas();
    this.getExamomeList();
  }
};
</script>
<style scoped lang="scss">
main{
  margin-top: 1.5rem;
}
.tip-con{
  width: 98%;
  max-width: 1200px;
  margin: 0 auto 40px;
  background-color: #FFFFFF;
  padding: 20px 60px;
  border-radius: 10px;
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 14%);
  text-align: center;
  color: #939393;

  a{
    color: #3291F8;
  }
}
.body-con{
  width: 96%;
  max-width: 1200px;
  margin: 0 auto;
}

.content_image{
  background-color: #FFFFFF;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.14);
  padding: .3rem .4rem;
}
.exam-con{
  background-color: #FFFFFF;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.14);
  padding: .3rem .4rem;
  min-height: 600px;
}

.image-con {
  width: 100%;
  height: 60px;
  margin-bottom: 20px;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}

.time {
  font-size: 40px;
  width: 100%;
  height: 58px;
  line-height: 58px;
  border-right: none;
  color: rgba(50, 145, 248, 100);
}

.userName {
  margin-top: 20px;
  color: rgba(83, 83, 83, 100);
  font-size: 20px;
}

.timeshuo {
  margin-top: 50px;
  height: 58px;
  color: rgba(50, 145, 248, 100);
}

.content_const {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
}

.content_top {
  text-align: left;
  margin-left: 10px;
  line-height: 20px;
}

.content_none p {
  margin-left: 60px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px;
  text-align: left;
}

.content_none span {
  margin-left: 150px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px;
  text-align: left;
}

.content_kont_ints {
  color: rgba(50, 145, 248, 1);
  font-size: 14px;
  text-align: left;
  margin-left: 20px;
}

.content_navc {
  text-align: left;
  margin-left: 60px;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
}

.di_name p {
  text-align: left;
  line-height: 53px;
  margin: 0;
  color: rgba(147, 147, 147, 1);
  font-size: 16px;
}

.di_foor {
  margin-top: 55px;
  text-align: left;
}

.question-options li {
  font-size: 13px;
  color: grey;
  line-height: 32px;
  background: #F5F5F5;
  padding: 8px 20px;
  border: 1px solid #e8e8e8;
  border-top: 1px inset rgba(232, 232, 232, .16);
  border-radius: 3px;
  margin-bottom: 7px;
  //box-shadow: 0 1px 0 0 #f1e8e8, inset 0 2px 0 0 #fff;
  cursor: pointer;
  -webkit-transition: all .5s cubic-bezier(0, 1.06, .92, .92);
  transition: all .5s cubic-bezier(0, 1.06, .92, .92);
}

.question-options .act-class {
  background-color: #4289DB;
  color: #FFFFFF;
}

.question-options .act-class-c {
  background-color: #E1304A;
  color: #FFFFFF;
}
.question-options .act-class-no {
  background-color: #64C37C !important;
  color: #FFFFFF;
}

.question-title {
  font-size: 13px;
  margin-bottom: 14px;
  color: #474b48;
  font-weight: 700;
}

.beginomfs {
  width: 400px;
  height: 100px;
  margin: auto;

  div {
    width: 160px;
    height: 54px;
    border-radius: 10px;
    background-color: rgba(50, 145, 248, 100);
    color: rgba(255, 255, 255, 100);
    font-size: 14px;
    text-align: center;
    line-height: 54px;
    margin-left: 100px;
    margin-top: 116px;
  }
}

.jieguo-con{
  p{
    height: .3rem;
    line-height: .3rem;
    font-size: .18rem;

    span{
      display: inline-block;
      width: .3rem;
    }
  }
}

</style>



