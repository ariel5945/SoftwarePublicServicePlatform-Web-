<template>
  <main>
    <section class="banner-con hidden-md-and-down">
      <h3>基础开源解决方案</h3>
      <p>为您的企业提供相关行业基础应用源码服务，助力业务快速发展</p>
      <!--<img src="./../../assets/image/biaoti@2x.png" alt="">-->
    </section>
    <section class="page-con">
      <div class="source-list" v-loading="getLoad" element-loading-text="拼命加载中...">
        <div class="list-con" v-if="sourceList.length>0">
          <el-row :gutter="20">
            <!--<div class="event">-->
            <!--  <h3>数字应用共享解决方案</h3>-->
            <!--  <p>我们为您的企业提供相关行业基础应用一站式解决方案，助力业务快速发展</p>-->
            <!--</div>-->
            <el-col :md="24" :lg="12" v-for="(item,index) in sourceList" :key="'list'+index">
              <div class="item-con" :class="{'first-item': index===0}" @click="godetail(item.id)">
                <img class="hover-img" :src="item.img1" alt="">
                <div>
                  <h4>{{ item.title1 }}</h4>
                  <div>
                    <span class="item-title">致力解决：</span>
                    <span>{{ item.title3 }}，{{ item.title4 }}</span>
                    <span>
                      {{ item.title5 }}，{{ item.title6 }}
                    </span>
                  </div>

                  <div class="bottom-con">
                    了解更多
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-empty v-else description="暂无数据"></el-empty>
      </div>
      <div class="pagination-con">
        <el-pagination
            background
            @current-change="handleCurrentChange"
            :hide-on-single-page="true"
            :page-size="pageSize"
            :page-count="pageNum"
            layout="prev, pager, next"
            :total="total"
        ></el-pagination>
      </div>
    </section>
  </main>
</template>

<script>
import HTTP from "./../../server/http";

export default {
  name: "resourceDetail",
  data() {
    return {
      title: "",
      classId: null,
      pageNum: 1,
      pageSize: 10,
      typeList: [],
      sourceList: [],
      getLoad: true,
      total: 0,
    };
  },
  created() {
    if (this.$route.params.typeId) {
      this.classId = this.$route.params.typeId;
    }
    this.getClass();
  },
  methods: {
    godetail(id) {
      this.$router.push({
        path: "/boutiqueDetail",
        query:{
          detailId: id
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    searchGetList() {
      this.classId = null;
      this.getList();
    },
    changeGetList(classId) {
      this.classId = classId;
      this.getList();
    },
    getList() {
      this.getLoad = true;
      // this.sourceList = [];
      let url = "/api/applyinfogood/listApi";
      let data = {
        title1: this.title,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      };
      HTTP.get(url, data, (res) => {
        if (Number(res.code) === 0) {
          this.sourceList = res.rows;
          this.total = res.total;
          this.getLoad = false;
        }
      }, false);
    },
    getClass() {
      let url = "/api/source/getSourceType";
      let data = {};
      HTTP.get(url, data, (res) => {
        if (Number(res.code) === 0) {
          this.typeList = res.data;
          this.getList();
        }
      }, false);
    },
  },
};
</script>

<style scoped lang="scss">
.banner-con {
  background-image: url("@/assets/image/bounitedetailindex.png");
  background-size: 100% 100%;
  background-position: center;
  height: 5rem;
  width: 100%;
  margin-bottom: .52rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  flex-direction: column;

  h3{
    color: #fff;
    font-size: .42rem;
    margin-bottom: .24rem;
    text-shadow: 2px 2px 15px #706d6d;
  }
  p{
    font-size: .16rem;
    color: #FFFFFF;
  }

  img{
    width: 4.4rem;
  }

}

.item-con {
  width: 100%;
  background-size: 100% 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: .3rem .54rem .4rem;

  >div{
    width: calc(100% - 3.8rem);
    height: 2.3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }


  img{
    width: 3.6rem;
    height: 2.3rem;
  }

}


.bottom-con {
  text-align: center;
  padding: .15rem .22rem;
  border: 2px solid #1A3792;
  color: #1A3792;
  border-radius: 2px;
}

.banner-title {
  color: #ffffff;
  font-size: 26px;
  margin-bottom: 20px;
}

.event {
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;

  h3{
    font-weight: bold;
    margin-bottom: 30px;
  }
}

.event p {
  font-size: 20px;
  font-weight: 400;
}

.page-con {
  min-height: 400px;
  width: 92%;
  max-width: 1740px;
  margin: 0 auto 1.2rem;
}



.source-list {
  width: 100%;

  .list-con {
    box-sizing: border-box;
  }

  .item-con {
    //margin-bottom: 20px;
    background-color: #ffffff;
    cursor: pointer;
    overflow: hidden;
    border-radius: 4px;
    transition: all 0.3s;
    border-bottom: 1px solid #ededed;
    border-right: 1px solid #ededed;

    h4 {
      font-size: .20rem;
      // background-color: #ededed;
      /*将对象作为弹性伸缩盒子模型显示*/
      display: -webkit-box;
      /*设置子元素排列方式*/
      -webkit-box-orient: vertical;
      /*设置显示的行数，多出的部分会显示为...*/
      -webkit-line-clamp: 2;
      position: relative;
      color: #333;
      margin-bottom: .1rem;
      padding-bottom: .3rem;
    }
    h4:after{
      position: absolute;
      content: "";
      bottom: 0;
      left: 0;
      width: .6rem;
      height: .03rem;
      background: linear-gradient(90deg, #3BBFFD, #0E5EAB);
    }
    .item-title{
      background: linear-gradient(90deg, #3BBFFD 0%, #0E5EAB 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: .16rem;
      margin-bottom: .1rem;
    }

    span {
      color: #939393;
      font-size: 14px;
      display: block;
      height: 24px;
    }

  }

  .item-con:hover {
    box-shadow: 1px 1px 20px 3px rgba(0, 0, 0, 0.14);
  }

  //分页
  .pagination-con {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .add-btn {
    width: 160px;
    height: 54px;
    line-height: 54px;
    border-radius: 10px;
    background-color: rgba(50, 145, 248, 1);
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    margin-left: 20px;
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
    position: relative;
  }

  .add-btn:after {
    position: absolute;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    width: 100%;
    height: 100%;
    content: "";
    top: 0;
    left: 0;
    right: 0;
  }

  .add-btn:hover:after {
    background-color: rgba(0, 0, 0, 0);
  }
}


@media screen and (max-width: 1200px) {
  main{
    padding-top: 70px;
  }
  .banner-con{
    height: 140px;
    margin-bottom: 20px;
  }

  .event{
    font-size: 20px;
    margin-bottom: 20px;

    p{

      font-size: 14px;
    }
  }

  .item-con{
    height: 140px;
  }
  .item-con.first-item{
    height: 280px;
  }
}

</style>
