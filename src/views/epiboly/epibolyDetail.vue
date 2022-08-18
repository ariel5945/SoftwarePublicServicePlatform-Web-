<template>
  <main>
    <div class="body-con">
      <div class="left-con">
        <div class="list-con">
          <h4>{{dataDet.title}}</h4>
          <h5>{{dataDet.name}}</h5>
          <div class="item-class">
            <div>
              <h6>项目标签：</h6>
              <span> {{ dataDet.epibolyTag }} </span>
            </div>
            <div>
              <h6>项目类型：</h6>
              <span>{{ dataDet.epibolyType }}</span>
            </div>
            <div>
              <h6>项目周期：</h6>
              <span v-if="dataDet.status == 1">招募中</span>
              <span v-if="dataDet.status == 3">已完成</span>
              <span v-if="dataDet.status == 4">已过期</span>
              <!--<span>{{ dataDet.epibolyCycle }}</span>-->
            </div>
          </div>
          <div v-html="dataDet.content"></div>
          <div class="bm-btn" v-if="roleId===37" @click="baomin()">项目合作</div>
        </div>
      </div>


      <!--<div class="right-con">-->
      <!--  &lt;!&ndash;<div class="user-con">&ndash;&gt;-->
      <!--  &lt;!&ndash;  <img :src="userData.userImgUrl">&ndash;&gt;-->
      <!--  &lt;!&ndash;  <div v-if="roleId===37" class="fb-btn">查看已报名项目</div>&ndash;&gt;-->
      <!--  &lt;!&ndash;</div>&ndash;&gt;-->

      <!--  &lt;!&ndash; 工作指南 &ndash;&gt;-->
      <!--  <div class="guide">-->
      <!--    <h5>外包工作指南</h5>-->
      <!--    <div-->
      <!--        style="-->
      <!--          height: 280px;-->
      <!--          margin-left: 54px;-->
      <!--          color: rgb(202, 214, 231);-->
      <!--        "-->
      <!--    >-->
      <!--      <el-steps direction="vertical">-->
      <!--        <el-step title="注册并认证身份"></el-step>-->
      <!--        <el-step title="报名参加项目"></el-step>-->
      <!--        <el-step title="确认合作需求方"></el-step>-->
      <!--        <el-step title="项目阶段划分并启动"></el-step>-->
      <!--        <el-step title="阶段交付收款"></el-step>-->
      <!--      </el-steps>-->
      <!--    </div>-->
      <!--  </div>-->

      <!--</div>-->
    </div>

  </main>
</template>

<script>
import HTTP from "./../../server/http"

export default {
  name: "epibolyDetail",
  data() {
    return {
      detailId: 0,

      roleId: 36,
      classList: [],
      epibolyTag: null,
      epibolyType: null,
      epibolyCycle: null,
      dataDet: {},
    }
  },
  methods: {

    getClass() {
      let url = "portal/software_epiboly/getListQuery";
      let data = {};
      HTTP.get(url, data, res => {
        this.classList = res.data;
        // console.log(res)
      }, false);
    },

    getOne() {
      let url = "/portal/software_epiboly/getFormDetails";
      let data = {
        id: this.detailId,
      };
      HTTP.get(url, data, res => {
        if (res.code === '0') {
          this.dataDet = res.data.entity;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },


    baomin(){
      let url = "/api/software_epiboly/insertEpibolyApply";
      let data = {
        epibolyId: this.detailId
      };
      HTTP.postForm(url,data,res=>{
        if(res.code == 0){
          this.$message.success("报名成功");
          // this.$router.push("/userCenter/publishEpiboly")
        }
        this.$router.push({
          path: "/userCenter/publishEpiboly",
          query: {
            publishType: 1,
          }
        })

      },false)

    }
  },
  created() {
    this.detailId = this.$route.query.detailId;
    this.getClass()
    if (JSON.parse(localStorage.getItem("user_role"))) {
      this.roleId = JSON.parse(localStorage.getItem("user_role")).roleId;
    }
    this.getOne()
    //
  }
}
</script>

<style scoped lang="scss">
main {
  padding-top: 1.5rem;
}

.body-con {
  width: 96%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.left-con {
  width: 100%;
}

.right-con {
  width: 25%;
}

.user-con {
  padding: 40px 56px;
  margin-bottom: 30px;
  width: 100%;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.14);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
}

.class-con {
  padding: 40px 56px;
  margin-bottom: 30px;
  width: 100%;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.14);

  div {
    margin-bottom: 20px;
    display: flex;

    h5 {
      color: #939393;
      margin-right: 20px;
      height: 24px;
      line-height: 24px;
    }

    span {
      padding: 0 20px;
      height: 24px;
      line-height: 24px;
      cursor: pointer;
      border-radius: 4px;
    }

    span.act-on {
      background-color: rgba(50, 145, 248, 1);
      color: #ffffff;
    }
  }
}

.list-con {
  padding: 40px 56px 20px;
  width: 100%;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.14);
  h4 {
    height: 26px;
    line-height: 26px;
    font-size: 22px;
    font-weight: normal;
    margin-bottom: 10px;
  }
  h5 {
    height: 26px;
    line-height: 26px;
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 10px;
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

.item-class {
  display: flex;
  margin-bottom: 10px;

  div {
    display: flex;
    margin-right: 20px;
    height: 24px;
    line-height: 24px;
  }

  h6 {
    color: #9D9D9D;
    font-weight: normal;
  }
}

/* 工作指南 */
.guide {
  margin-top: 60px;
  width: 360px;
  height: 370px;
  background-color: #FFFFFF;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
}

.guide h5 {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 26px 0;
  text-align: left;
  margin-left: 56px;
  width: 140px;
  height: 29px;
  color: rgba(16, 16, 16, 100);
  font-size: 20px;
}

.wb-brn {
  width: 100px;

  span {
    font-size: 20px;
    color: #3291F8;
    display: block;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  div {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    background-color: rgb(50, 145, 248);;
    color: #FFFFFF;
    cursor: pointer;
    text-align: center;
  }
}

.bm-btn{
  width: 200px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: rgb(50, 145, 248);;
  color: #FFFFFF;
  cursor: pointer;
  text-align: center;
  margin: 20px auto 0;
}

</style>


