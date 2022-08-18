<template>
  <main>
    <div class="banner-con">
      <h4>帮助中心</h4>
    </div>
    <div class="body-con">
      <el-row :gutter="30">
        <el-col :span="6" class="title-con">
          <h5>我是需求方</h5>
          <ul>
            <li @click="getContetn(item)" v-for="(item,index) in listData" :key="'list1'+index">{{ item.title }}</li>
          </ul>
          <h5>我是开发者</h5>
          <ul>
            <li @click="getContetn(item)" v-for="(item,index) in listDataKf" :key="'list1'+index">{{ item.title }}</li>
          </ul>
        </el-col>
        <el-col :span="18">
          <div class="content-con">
            <h4>{{ oneTitle }}</h4>
            <div>
              {{ oneContent }}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </main>
</template>

<script>
export default {
  name: "helpView",
  data() {
    return {
      oneTitle: "",
      oneContent: "",

      listData: [
        {
          title: "如何发布外包项目需求？", content: "1.注册认证完成后，您即可发布外包项目需求，在外包项目找到”去发布“按钮。\n" +
              "2.填写项目名称、需求描述等信息，越详细的描述可以给企业公司传递更多项目信息，有利于吸引更多靠谱企业公司报名。您也可以增加需求文档附件。"
        },
        {
          title: "如何报名接单？", content: "在洛阳软件服务平台接单您需要注意完成以下信息的填写：\n" +
              "1.在个人中心，必须完成个人信息、企业认证。\n" +
              "操作报名项目方法：\n" +
              "1.进入外包项目页面，挑选自己企业擅长的领域项目，\n" +
              "2.点击查看外包项目的详情，如确认申请，点击“去报名”进行报名。\n" +
              "3.等待需求方方企业审核，在需求方完成开发方人选确定后，洛阳软件服务平台将会以短信/邮件的方式通知你是否被挑选成为该项目的企业开发者。（注意：每个项目的招募难度和企业需求方确认速度不同，具体报名通过时间视具体项目而定。）\n" +
              "如何查看外包项目：\n" +
              "个人中心-我的外包项目中“我参与的外包项目”进入列表页面，找到需要取消报名的项目，或者查看未通过，待完成，以及已完成的外包项目。"
        },
        {
          title: "“技术沙龙”是什么？",
          content: "“技术沙龙”是洛阳软件公共服务平台针对企业和开发者相互交流，共同定制的服务内容，企业可以通过预约线下活动场地，组织技术沙龙分享会，组织相关主题活动，扩大企业影响力，宣传展示企业优秀的技术成果，开发者可以线上报名参与企业活动，了解当下最新企业动态。增强企业与企业，企业与开发者的线上线下信息与技术交流。"
        },
      ],
      listDataKf: [
        {title: "“在线考试”是什么", content: "“在线考试”是洛阳软件公共服务平台针对开发者技能等级面向开发方进行的一套测试题，考试分数越高、开发者的评价等级就会越高，可信度越高，简历评价也会越高。"},
        {title: "“视频教程”是什么", content: "“视频教程”是洛阳软件公共服务平台面向开发方进行的视频学习教程，开发者可以在平台进行相关技能方向的学习。"},
        {
          title: "“技术沙龙”是什么",
          content: "“技术沙龙”是洛阳软件公共服务平台针对企业和开发者相互交流，共同定制的服务内容，企业可以通过预约线下活动场地，组织技术沙龙分享会，组织相关主题活动，扩大企业影响力，宣传展示企业优秀的技术成果，开发者可以线上报名参与企业活动，了解当下最新企业动态。增强企业与企业，企业与开发者的线上线下信息与技术交流。"
        },
      ],
    }
  },
  methods:{
    getContetn(data){
      this.oneTitle = data.title;
      this.oneContent = data.content;
    }
  },
  created() {
    this.oneTitle = this.listData[0].title;
    this.oneContent = this.listData[0].content;
  }
}
</script>

<style scoped lang="scss">
main {
  margin-bottom: 60px;

  .banner-con {
    background-color: #3291F8;
    height: 2.7rem;
    padding-top: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color: #FFFFFF;
    margin-bottom: .3rem;
  }

  .body-con {
    max-width: 98%;
    margin: 0 auto;
    width: 12rem;
  }

  .title-con {
    h5 {
      font-size: 18px;
      padding-left: 14px;
      border-left: 3px solid #21d376;
      margin-bottom: 8px;
    }

    ul {
      margin-bottom: 20px;
    }

    li {
      line-height: 32px;
      cursor: pointer;
      background: #F7F7F6;
      border-radius: 3px;
      margin-bottom: 6px;
      padding-left: 30px;
      color: #3291F8;
    }
  }

  .content-con {
    background-color: #FFFFFF;
    box-shadow: 1px 1px 20px 3px rgba(0,0,0,.08);
    padding: 60px 40px;
    border-radius: 10px;
    min-height: 5rem;

    h4{
      font-size: 24px;
      font-weight: normal;
      margin-bottom: 30px;
    }
    div{
      line-height: 20px;
    }

  }
}
</style>