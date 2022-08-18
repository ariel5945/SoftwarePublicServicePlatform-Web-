<template>
  <main>
    <el-backtop></el-backtop>
    <BannerCon class="new-bg">
      <template v-slot:bannerTitle>更多新闻</template>
      <template v-slot:bannerText>NEWS</template>
    </BannerCon>
    <div class="news-con">
      <div v-for="(item, index) in newsList" :key="index" class="new-item-con" :class="{'new-item-act': index===actItem}">
        <div class="new-one-con">
          <div class="news-time">
            <h3>{{getDetaData(item.createTimeStr)}}</h3>
            <p>{{getTimeData(item.createTimeStr)}}</p>
          </div>
          <div class="news-contetn" @click="actItem = index">
            <h4>{{ item.title }}</h4>
            <p>{{ item.newsIntro }}</p>
            <div>
              <p><span>发布者：</span>{{item.createName}}</p>
              <p><span>发布时间：</span>{{item.releaseTimeStr}}</p>
            </div>
          </div>

          <div class="new-two-con">
            <div class="news-img">
              <img :src="item.coverImg" alt="">
            </div>
            <div class="new-two-text">
              <div>
                <h4>{{ item.title }}</h4>
                <p>{{ item.newsIntro }}</p>
              </div>

              <div class="detail-btn" @click="gonewdetail(item.id)">
                点击查看
              </div>
            </div>

          </div>
        </div>


      </div>
    </div>

    <!--<el-button-->
    <!--    type="primary"-->
    <!--    class="news_btn"-->
    <!--    @click="gonewdetail(item.id)"-->
    <!--&gt;查看</el-button-->
    <!--&gt;-->
  </main>
</template>
<script>
import HTTP from "../../server/http";
import BannerCon from "@/components/bannerCon";
export default {
  components: {
    BannerCon,
  },
  data() {
    return {
      newsList: [
        {title: "",newsIntro: ""},
      ],
      actItem: 0,
    };
  },
  mounted() {
    this.indexnews();
  },

  methods: {
    getDetaData(time){
      if(time){
        return time.substr(8,2);
      }
    },
    getTimeData(time){
      if(time){
        return `${time.substr(0,4)}.${time.substr(5,2)}`;
      }
    },

    gonewdetail(id) {
      this.$router.push({
        path: "/newsdetail",
        query: { tpId: id },
      });
    },
    indexnews() {
      let url = "/portal/api/index/getIndexMessageList?pageNum=1";
      let data = {};
      HTTP.get(url,data,(res) => {
          if (Number(res.code) === 0) {
            this.newsList = res.data.headMsgList;
          }
        },
        false
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.new-bg{
  background-image: url('./../../assets/image/news-bg.png');
}

.news-con {
  background-color: #FFFFFF;
  //line-height: 20px;
  text-align: left;
  margin-bottom: -40px;
}

.new-item-act{

}

.new-one-con {
  max-width: 1200px;
  width: 96%;
  margin: 0 auto;
  padding: .2rem .24rem .16rem;
  border-bottom: 1px solid #F1F3F6;
  display: flex;
  cursor: pointer;
  justify-content: space-between;

  .news-time{
    width: 1.2rem;
    height: 1.2rem;
    background-color: #FFFFFF;
    padding: .14rem;
    box-sizing: border-box;
    border-radius: 8px;

    h3{
      font-size: .44rem;
      margin-bottom: .08rem;
    }
    p{
      font-weight: bold;
      line-height: .2rem;
      overflow: hidden;

    }

  }

  .news-contetn{
    width: calc(100% - 1.5rem);

    h4 {
      font-size: 20px;
      color: #333333;
      margin-bottom: .18rem;
    }
    >p {
      line-height: .2rem;
      height: .4rem;
      font-size: 14px;
      color: #636363;
      margin-bottom: .23rem;
    }
    >div{
      display: flex;

      p{
        margin-right: .16rem;
        color: #636363;
        opacity: .6;
      }
    }
  }
}

.new-two-con{
  width: calc(100% - 1.2rem);
  padding: 0 .24rem .16rem;
  border-bottom: 1px solid #F1F3F6;
  display: none;
  cursor: pointer;
  justify-content: space-between;

  .news-img{
    width: 3.74rem;
    border-radius: .06rem;
    overflow: hidden;
    max-height: 3.74rem;
  }
  .new-two-text{
    width: calc(100% - 4.1rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h4{
      font-size: .32rem;
      line-height: .36rem;
      height: .72rem;
      overflow: hidden;
      font-weight: normal;
      margin-bottom: .2rem;
      display: -webkit-box;
      /*设置子元素排列方式*/
      -webkit-box-orient: vertical;
      /*设置显示的行数，多出的部分会显示为...*/
      -webkit-line-clamp: 2;
    }

    p{
      font-size: .16rem;
      line-height: .24rem;
      height: .72rem;
      overflow: hidden;
    }

  }

}

.new-item-act{
  padding: .77rem 0;
  background-image: url("./../../assets/image/new-one-bg.png");
  background-size: 100% 100%;

  .new-two-con{
    display: flex;
  }

  .news-contetn{
    display: none;
  }

  .news-time{
    h3{
      background: linear-gradient(0deg, #3BBFFD 0%, #0E5EAB 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p{
      color: #62A5D5;
    }
  }

  .new-one-con{
    border: none;
  }
}

.detail-btn{
  background: linear-gradient(0deg, #3BBFFD 0%, #0E5EAB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 1.2rem;
  height: .42rem;
  line-height: .42rem;
  text-align: center;
  font-size: .16rem;
  border: 1px solid #1F74C4;
  //border-radius: .04rem;
}




</style>
