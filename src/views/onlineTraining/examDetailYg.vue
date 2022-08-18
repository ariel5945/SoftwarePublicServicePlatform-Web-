<template>
  <div class="examsPageDet">
    <div class="content_top">
      <div class="content_childer">
        <p>
          请您认真阅读<span>《洛阳软件公共服务平台帮助中心》</span>,
          了解作为开发者如何规范地在平台上参与项目，然后完成以下测试问
        </p>
      </div>
      <div class="content_list">
        <div class="content_listhoer">
          <div class="content_image">
            <div class="image">
              <img :src="userImgUrl" alt="">
              <!--<el-avatar :size="100" :src=""></el-avatar>-->
            </div>
            <div class="content_ioco">
              <p><img src="@/assets/image/icon/icon_2.png" alt=""/></p>
            </div>
            <div>
              <p class="userName">{{ center.userName }}</p>
              <p class="userName">{{ center.userName }}</p>
            </div>
            <div v-show="isshow1" @click="examomeBtn" class="open-btn">开始答题</div>
            <div v-show="!isshow1"><p class="timeshuo">考试时间</p></div>
            <div v-show="!isshow1">
              <p class="time">{{ getTime() }}</p>
            </div>
          </div>
          <!--<div class="content_kont">-->
          <!--  <div class="content_const">-->
          <!--    <p>试题列表</p>-->
          <!--    <p class="content_kont_ints">查看更多</p>-->
          <!--  </div>-->
          <!--  <div v-for="(item, index) in listome" :key="index">-->
          <!--    <div>-->
          <!--      <h4 class="content_navc">-->
          <!--        {{ item.title }}-->
          <!--      </h4>-->
          <!--      <div class="content_none">-->
          <!--        <p>-->
          <!--          {{-->
          <!--            item.var-->
          <!--          }}<span>{{-->
          <!--            item.createTime | date("yyyy-MM-dd")-->
          <!--          }}</span>-->
          <!--        </p>-->
          <!--      </div>-->
          <!--    </div>-->
          <!--  </div>-->
          <!--</div>-->
        </div>
        <div>
          <div class="di">
            <div class="di_top">
              <div class="di_name">
                <p v-show="examomea">
                  说明：测试中所指的“开发者”包括产品经理、项目顾问、UI
                  设计师、软件工程师、测试工程师。“开发者”是一个统称。
                </p>
                <p v-show="examtwo">
                  <span v-if="status>=2">恭喜您，只答错了两个问题，通过了考试，请查看正确答案</span>
                  <span v-else class="examtwo_span">很抱歉，您有{{ 7 }}个问题回答错误，未通过考试，请查看正确答案，然后重新答</span>
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
              <!--<div v-show="isshow1" @click="examome">开始答题</div>-->
              <div v-show="!isshow1" @click="open">交卷</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
      dialogFormVisible: "false",
      listome: [],
      userImgUrl: "",
      userName: "",
      center: "",
      examomea: true,
      examtwo: false,
      examone: false,
      dialogVisible: false, // 弹框的出现与否

      zonFen: 0,
      jigeFen: 0
    };
  },

  methods: {
    examomeBtn() {
      let url = "/api/train/registration";
      let data = {
        id: this.examId,
      };
      HTTP.get(url, data, res => {
        console.log(res);
        this.seeAwer = false;
        this.examomeList()
      }, false)
    },
    examomeList() {
      let url = "/api/train/exam";
      let data = {
        trainingId: this.examId,
      };
      HTTP.get(url, data, res => {
        // console.log(res);
        if (res.code == 0) {
          this.isshow1 = false;
          this.appListPd = res.data.judgeList
          this.appListSext = res.data.singleList
          // this.appList.push()
          this.time = res.data.examTime * 60;
          this.jigeFen = res.data.passscore;
          this.countdown();
          // console.log(res.data)
        }

      }, false)
    },

    answerTykPd(item, param) {
      this.appListPd[item].userSet = param;
      this.$set(this.appListPd, item, this.appListPd[item])
      // console.log(this.appListPd[item]);
    },
    answerTykSect(item, param) {
      this.appListSext[item].userSet = param;
      this.$set(this.appListSext, item, this.appListSext[item])
      // console.log(this.appListSext[item]);
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
          clearTimeout(times);
        }
      }, 1000)
    },
    open() {
      this.$confirm("即将结束答题, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((action) => {
        // eleUI的确定结束回调函数方法
        // appListPd: [],
        //     appListSext: [],
        this.appListPd.forEach(item=>{
          if(item.answer == item.userSet){
            this.zonFen += item.fraction;
          }
        })
        this.appListSext.forEach(item=>{
          if(item.answer == item.userSet){
            this.zonFen += item.fraction;
          }
        })

        // console.log(this.zonFen)
        this.seeAwer = true;
        let url = "/api/train//submitExam";
        let data = {
          trainingId: this.examId,
          count: this.zonFen,
          passscore: this.jigeFen,
        };
        HTTP.get(url, data, res => {
          console.log(res);
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
    this.examomeList();
  }
};
</script>
<style scoped lang="scss">
.examsPageDet {
  width: 1403px;
  margin: 150px auto 0;
}

.content_childer {
  width: 1403px;
  height: 70px;
  border-radius: 10px;
  text-align: center;
  background-color: #FFFFFF;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.14);
  margin: auto;

  p {
    line-height: 70px;

    span {
      color: #3291F8;
      font-size: 16px;
      text-align: left;
      cursor: pointer;
    }
  }
}

.content_list {
  width: 1403px;
  text-align: center;
  justify-content: space-between;
  margin-top: 52px;
  display: flex;

  .di {
    width: 1000px;
    color: rgba(16, 16, 16, 100);
    font-family: SourceHanSansSC-regular;
    background-color: #FFFFFF;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.14);
    margin-bottom: 108px;
  }

  .content_image {
    padding: 20px 6px 30px;
    width: 360px;
    background-color: #FFFFFF;
    border-radius: 10px;
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.14);
  }

  .content_kont {
    width: 360px;
    height: 576px;
    line-height: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.14);
    margin-top: 52px;
    overflow: hidden;
    background-color: #FFFFFF;
  }
}

.image {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin: 12px auto 40px;

  img {
    width: 100%;
    height: 100%;
    overflow: hidden;
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
  font-family: SourceHanSansSC-regular;
}

.content_none span {
  margin-left: 150px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.content_kont_ints {
  color: rgba(50, 145, 248, 100);
  font-size: 14px;
  text-align: left;
  font-family: SourceHanSansSC-regula;
  margin-left: 20px;
}

.content_navc {
  text-align: left;
  margin-left: 60px;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.di_top {
  width: 692px;
  margin: auto;
}

.di_name p {
  text-align: left;
  padding-top: 45px;
  line-height: 53px;
  margin: 0;
  color: rgba(147, 147, 147, 100);
  font-size: 16px;
  text-align: left;
  font-family: SourceHanSansSC-regular
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

.examtwo_span {
  color: red;
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

.open-btn {
  width: 160px;
  height: 54px;
  border-radius: 10px;
  background-color: rgba(50, 145, 248, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
  text-align: center;
  line-height: 54px;
  margin: 60px auto 0;
  cursor: pointer;
}

</style>



