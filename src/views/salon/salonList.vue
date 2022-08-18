<template>
  <!-- 技术沙龙 -->
  <main>
    <!-- 返回顶部按钮 -->
    <el-backtop></el-backtop>
    <!-- 搜索栏 -->
    <section class="banner-con">
      <div>
        <h3 class="banner-title">技术沙龙</h3>
        <div style="display: flex;">
          <div class="search-con">
            <div>
              <el-icon class="el-icon-search"></el-icon>
            </div>
            <input type="text" v-model="title" placeholder="搜索您需要的内容">
            <span @click="salonList()">搜索</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 内容 -->
    <div class="body-con">
      <div class="class-list">
        <div
            v-for="(item,index) in typeList"
            :key="'nav'+index"
            @click="salonClass(item.id)"
            :class="{'class-act': item.id == classId}"
        >{{ item.valueName }}</div>
      </div>
      <div style="min-height: 600px;width: 100%;">
        <div class="contentItem" v-for="(item,index) in salongdata" :key="'sl'+index">
          <div class="item-con">
            <div class="img">
              <img :src="item.iconUrl"/>
            </div>
            <div class="centrer-con">
              <h4>
                {{ item.title }}
                <el-tag style="margin-left: 20px" type="warning" size="mini">规模: {{item.scale}}</el-tag>
                <el-tag style="margin-left: 20px" type="success" size="mini">举办方: {{item.firmName}}</el-tag>
              </h4>
              <span class="p3">{{ item.description }}</span>
              <p class="p2">
                <span>联系人: {{ item.username }}</span><span>联系电话: {{ item.phone }}</span><span>举办时间: {{ getStar(item.startTime) }}</span>
              </p>
            </div>
            <div class="btn">
              <el-button class="blue" v-if="item.progress==1" @click="Gosharon(item.id)">
                去报名
              </el-button>
              <el-button class="plder" v-if="item.progress==2" @click="Gosharon(item.id)">
                进行中
              </el-button>
              <el-button class="green" v-if="item.progress==3" @click="Gosharon(item.id)">
                已完成
              </el-button>
            </div>
          </div>

        </div>
      </div>
      <div class="page">
        <div class="page-hub">
          <el-pagination
              @current-change="handleCurrentChange"
              :page-count="pageNum"
              :page-size="5"
              layout="prev, pager, next"
              :total="total"
          >
          </el-pagination>
        </div>
      </div>

    </div>
  </main>

</template>
<script>
import HTTP from "./../../server/http"

export default {
  name: "salonList",
  components: {},
  data() {
    return {
      roleId: 36,
      typeList: [
        {valueName: "全部活动",id: null},
        {valueName: "即将举行",id: 1},
        {valueName: "已完成",id: 3},
      ],
      classId: null,
      salongdata: [],
      pageNum: 1,
      total: 0, //总数据
      title: "",
    };
  },
  created() {
    this.salonList();
    if (JSON.parse(localStorage.getItem("user_role"))) {
      this.roleId = JSON.parse(localStorage.getItem("user_role")).roleId;
    }
  },
  methods: {
    getStar(time){
      if(time){
        if(Number(time.split(" ")[1].substr(0,2))>9){
          return `${time.split(" ")[0]} 下午 14:00`
        } else {
          return `${time.split(" ")[0]} 上午 8:00`
        }

      }
    },

    // 传参
    Gosharon(id, createUser) {
      this.$router.push({
        path: "/salonDetial",
        query: {tpId: id, comlist: createUser},
      });
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.salonList()
    },
    salonClass(id){
      this.classId = id;
      this.salonList();
    },

    // 技术沙龙分类
    salonList() {
      let url = "/portal/salon/find";
      let data = {
        pageNum: this.pageNum,
        title: this.title,
        progress: this.classId,
      }
      HTTP.get(url, data, res => {
        console.log(res);
        this.salongdata = res.data.list;
        this.total = res.data.count * 5;
      }, false)
    },

  },
};
</script>

<style lang="scss" scoped>
.banner-con {
  background-image: url("./../../assets/image/bg_kaifaxiangmu.png");
  background-size: cover;
  background-position: center;
  height: 434px;
  padding-top: 120px;
  width: 100%;
  margin-bottom: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-title {
  color: #ffffff;
  font-size: 26px;
  margin-bottom: 20px;
}

.search-con {
  display: flex;
  height: 55px;
  line-height: 55px;
  background-color: rgba(255, 255, 255, .58);
  overflow: hidden;
  border-radius: 10px;
  font-size: 14px;

  div {
    width: 55px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    width: 105px;
    background-color: #3291F8;
    text-align: center;
    line-height: 55px;
    -o-user-select: none;
    /// 火狐 firefox /
    -moz-user-select: none;
    ///webkit浏览器/
    -webkit-user-select: none;
    /// IE10 + /
    -ms-user-select: none;
    ///早期的浏览器/
    -khtml-user-select: none;
    user-select: none;
    cursor: pointer;
    color: #ffffff;
    position: relative;
  }

  input {
    width: 30vw;
  }

  span:after {
    position: absolute;
    z-index: 1;
    background-color: rgba(0, 0, 0, .1);
    transition: all .3s;
    width: 100%;
    height: 100%;
    content: "";
    top: 0;
    left: 0;
    right: 0;

  }

  span:hover:after {
    background-color: rgba(0, 0, 0, 0);
  }
}

.class-list {
  display: flex;
  margin-bottom: 40px;

  div {
    font-size: 16px;
    color: #333333;
    margin-right: 30px;

    cursor: pointer;
    transition: all 0.3s;
    font-weight: bold;
  }

  div:hover {
    color: #3291F8;
  }

  div.class-act {
    color: #3291F8;
  }
}


.banner-con {
  background-image: url("./../../assets/image/bg_jishushalong.png");
  background-size: cover;
  background-position: center;
  height: 434px;
  padding-top: 120px;
  width: 100%;
  margin-bottom: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-title {
  color: #ffffff;
  font-size: 26px;
  margin-bottom: 20px;
}


.info {
  background-color: #d7d7d7 !important;
}

.blue {
  background-color: #3291F8 !important;
}

.green {
  background-color: #52cc6f !important;
}
.plder{
  background-color: #9F8888 !important;
}


.subbtn {
  margin: 0 auto;
  width: 160px;
  height: 54px;
  border-radius: 10px;
  background-color: rgba(50, 145, 248, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
  text-align: center;
  padding: 0 30px;
}

.body-con {
  min-height: 400px;
  width: 96%;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 10px;
  padding: 44px 54px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #FFFFFF;
}

.body-con .role-page {
  width: 100%;
}

.border {
  margin: 20px 20px;
  padding: 20px 0;
}
.contentItem {
  width: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  padding-bottom: 40px;
}

.centrer-con {
  margin: 0 30px;
  width: calc(100% - 300px);
}

.item-con {
  display: flex;
  width: 100%;
  align-items: center;
}


.img{
  width: 180px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
}

.img img {
  width: 180px;
  height: 100px;
}

.contentItem .btn button {
  width: 120px;
  height: 46px;
  border-radius: 4px;
  background-color: rgba(50, 145, 248, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
  margin-right: 30px;
}

.centrer-con h4 {
  color: rgba(11, 11, 11, 1);
  font-size: 20px;
  margin-top: 10px;
}
//

.content {
  width: 100%;
  // background: url("") no-repeat;
  background-size: 100% 100%;
  position: relative;
  min-width: 1200px;
  display: flex;
  align-items: center;
}

.centrer-con .p3 {
  color: #333;
  height: 43px;
  margin: 16px 0 6px;
  font-size: 14px;
  display: block;
  overflow: hidden;
  line-height: 22px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.centrer-con .p2 {
  color: rgba(157, 157, 157, 1);
  font-size: 14px;
  display: flex;
  span{
    margin-right: 10px;
    padding-right: 10px;
    position: relative;
    height: 20px;
    display: block;
  }
  span:after{
    position: absolute;
    width: 1px;
    height: 10px;
    background-color: #9B9B9B;
    content: "";
    right: 0;
    top: 2px;
  }
  span:last-child:after{
    background-color: transparent;
  }
}


.page {
  display: flex;
  justify-content: center;
}

</style>
