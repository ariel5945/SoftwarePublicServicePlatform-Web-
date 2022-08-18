<template>
  <main>
    <div class="body-con">
      <h2>{{ dataParm.title }}</h2>
      <div class="hd-tip">
          <span>
            活动时间: <span>{{ dataParm.startTime }}</span>
          </span>
        <span>
            规模: <span>{{ dataParm.scale }}</span>
          </span>
        <span>
            联系方式: <span>{{ dataParm.phone }}</span>
          </span>
      </div>
      <div class="tio-con">
        <img src="./../../assets/image/icon/messagelogo.png" alt="">
        <span>请谨慎甄别企业信息，防止诈骗和非法活动</span>
      </div>
      <div class="desc-body">
        {{ dataParm.description }}
      </div>
      <div v-html="dataParm.introduction"></div>
      <div class="jieshu-con" v-if="dataParm.progress == 3">
        <h4>活动现场</h4>
        <div>
          <video v-if="dataParm.videoUrl" :src="dataParm.videoUrl" style="width: 50%" controls></video>
        </div>
        <div class="img-list">
          <img :src="item" v-for="(item,index) in dataParm.commemorateUrl" :key="'img'+index">
        </div>
        <h4>活动总结</h4>
        <div class="sum-con">{{ dataParm.summary }}</div>
        <h4>活动评论 ({{ commentList.length }})</h4>
        <div v-if="commentList.length>0" style="margin-bottom: 40px;">
          <div class="comment-list" v-for="(item,index) in commentList" :key="'com'+index">
            <h5>{{ item.loginName }} <span>{{ item.createTime }}</span></h5>
            <p>
              {{ item.message }}
            </p>
          </div>
        </div>
        <div v-else style="width: 100%;display: flex;justify-content: flex-start;align-items: center;height: 50px;margin-bottom: 30px;">
          暂无评论
        </div>

        <div class="user-add-msg">
          <span>{{ userData.userName }}</span>
          <!--<img v-if="userData.userImgUrl" :src="userData.userImgUrl" alt="">-->
          <!--<img v-else src="./../../assets/image/login_icon_kaifazhe.png" alt="">-->
          <div>
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="textarea">
            </el-input>
            <el-button style="margin-top: 20px;" type="primary" @click="addComment()">评 论</el-button>
          </div>
        </div>
      </div>

      <div style="display: flex;justify-content: center" v-if="dataParm.progress != 3">
        <div class="fb-btn" v-if="isApply == 0" @click="canyuBtn()">去参与</div>
        <div class="fb-btn" v-if="isApply == 1">已报名</div>
      </div>

      <!--<div class="user-con">-->
      <!--  <img :src="userData.userImgUrl">-->
      <!--  <router-link to="/userCenter/inSalon" class="fb-btn">我参与的活动</router-link>-->
      <!--</div>-->
    </div>
  </main>
</template>

<script>
import HTTP from "./../../server/http"

export default {
  name: "salonDetial",
  data() {
    return {
      id: "",
      userData: {},
      isApply: 0,
      roleId: 36,
      dataParm: {},

      textarea: "", // 评论
      commentList: [],
    }
  },
  methods: {
    // 添加评论
    addComment() {
      let url = "/api/comments/addSave";
      let data = {
        salonId: this.id,
        message: this.textarea,
      }
      HTTP.postForm(url, data, res => {
        this.textarea = "";
        if(res.code == 0){
          this.$message.success("评论成功")
          this.getComment()
        } else {
          this.$message.error(res.msg)
        }
      }, false)
    },
    getComment() {
      let url = "/api/comments/list";
      let data = {
        salonId: this.id,
      };
      HTTP.get(url, data, res => {
        // console.log(res);
        this.commentList = res.rows;
      }, false)
    },

    getUserOne() {
      let url = "/api/user/getRegisterUserByLogin";
      let data = {};
      HTTP.get(url, data, res => {
        if (res.code === '0') {
          this.userData = res.data;
          this.roleId = res.role.roleId;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },
    getOne() {
      let url = "/api/salon/salonDetail";
      let data = {
        salonId: this.id,
      };
      HTTP.get(url, data, res => {
        this.dataParm = res.data.result;
        this.isApply = res.data.isApply;
        this.getComment();
      }, false)
    },
    canyuBtn() {
      let url = "/api/salon/apply";
      let data = {
        salonId: this.id,
      };
      HTTP.get(url, data, res => {
        // this.dataParm = res.data.result;
        if (res.code == 0) {
          this.$message.success("报名成功");
          this.$router.push("/userCenter/publishSalon")
        } else {
          this.$message.error(res.msg);
        }
      }, false)
    },
  },
  created() {
    this.id = this.$route.query.tpId;
    this.getUserOne()
    this.getOne();

  }
}
</script>

<style scoped lang="scss">
main {
  padding-top: 1.5rem;
}

.body-con {
  width: 98%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #FFFFFF;
  padding: 60px 80px;
  border-radius: 6px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.14);

  h2 {
    text-align: center;
    font-size: 32px;
    margin-bottom: 40px;
    font-weight: normal;
  }

  .right-con {
    background-color: #FFFFFF;
    padding: 60px 40px;
    border-radius: 6px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.14);
  }
}

.fb-btn {
  width: 160px;
  height: 44px;
  line-height: 44px;
  margin-top: 60px;
  border-radius: 10px;
  background-color: rgba(50, 145, 248, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}

.hd-tip {
  display: flex;
  justify-content: center;

  > span {
    display: block;
    height: 24px;
    line-height: 24px;
    margin-bottom: 30px;
    padding: 0 40px;
    color: #535353;
  }
}

.tio-con {
  display: flex;
  align-items: center;
  height: 30px;
  margin-bottom: 20px;

  img {
    height: 16px;
    margin-right: 10px;
  }

  span {
    line-height: 30px;
    height: 30px;
    color: #FCA500;
  }
}

.jieshu-con {


  h4 {
    font-size: 24px;
    font-weight: normal;
    margin: .6rem 0 .3rem;
  }
}

.user-add-msg {
  display: flex;
  flex-direction: column;

  span {
    margin-right: 20px;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 20px;
  }

  > div {
    flex: 1;
  }

}

.desc-body{
  line-height: 20px;
  margin-bottom: 20px;
}

.comment-list{
  margin-bottom: 30px;
  padding-left: 40px;

  h5{
    margin-bottom: 10px;
    //font-weight: normal;
    font-size: 18px;
    line-height: 20px;

    span{
      font-weight: normal;
      font-size: 14px;
      margin-left: 20px;
    }
  }
}

.img-list{
  display: flex;

  img{
    width: 260px;
    margin-right: 20px;
  }
}

.sum-con{
  text-indent: 31px;
  font-size: 16px;
  line-height: 28px;
}

</style>
