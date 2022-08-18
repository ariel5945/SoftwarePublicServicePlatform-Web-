<template>
  <main>
    <section class="banner-con">
      <div>
        <h3 class="banner-title">平台入驻企业</h3>
        <!--<div style="display: flex;">-->
        <!--  <div class="search-con">-->
        <!--    <div>-->
        <!--      <el-icon class="el-icon-search"></el-icon>-->
        <!--    </div>-->
        <!--    <input type="text" v-model="title" placeholder="搜索您需要的内容">-->
        <!--    <span @click="searchGetList()">搜索</span>-->
        <!--  </div>-->
        <!--</div>-->

      </div>
    </section>

    <section class="page-con">

      <div class="source-list" v-loading="getLoad" element-loading-text="拼命加载中...">
        <div class="list-con" v-if="dataList.length>0">
          <el-row :gutter="20">
            <el-col :md="12" :lg="6" :xs="12" v-for="(item,index) in dataList" :key="'list'+index">
              <div class="item-con hidden-md-and-down" @click="jumpDetail(item.loginAccountId)">
                <div>
                  <img :src="item.companyLogo">
                </div>

                <h4>{{ item.companyName }}</h4>
              </div>
              <div class="item-con hidden-sm-and-up">
                <div>
                  <img :src="item.companyLogo">
                </div>
                <h4>{{ item.companyName }}</h4>
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
            :total="total">
        </el-pagination>
      </div>

    </section>

  </main>
</template>

<script>
import HTTP from "@/server/http";

export default {
  name: "companyView",
  data() {
    return {

      fileList: [],
      imgList: [],
      rules: {},

      title: "",
      classId: null,
      pageNum: 1,
      pageSize: 12,
      typeList: [],
      dataList: [],
      getLoad: true,
      total: 0,
    }
  },
  created() {

    this.getList();
    // this.getUserOne();
  },
  methods: {
    jumpDetail(id) {
      this.$router.push({
        path: "/companyDetail",
        query: {
          id: id,
        }
      })
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList()
    },
    searchGetList() {
      this.classId = null;
      this.getList()
    },
    changeGetList(classId) {
      this.classId = classId;
      this.getList()
    },
    getList() {
      this.getLoad = true;
      let url = "/portal/companyInfo/loadCompanyList";
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        // applyName: this.title,
      }
      HTTP.get(url, data, res => {
        if (Number(res.code) === 0) {
          this.dataList = res.data;
          this.total = res.count;
          this.getLoad = false;
        }
        // console.log(res)
      }, false);
    },
  }
}
</script>

<style scoped lang="scss">
.banner-con {
  background-image: url("./../../assets/image/qiye-bg.png");
  background-size: cover;
  background-position: center;
  height: 5rem;
  padding-top: 1.2rem;
  width: 100%;
  margin-bottom: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-title {
  color: #ffffff;
  font-size: .42rem;
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

.page-con {
  min-height: 400px;
  width: 96%;
  max-width: 1600px;
  margin: 0 auto;
  border-radius: 10px;
  padding: 44px 54px;
}

.class-list {
  display: flex;
  margin-bottom: 40px;

  div {
    font-size: 16px;
    color: #333333;
    margin-right: 30px;
    cursor: pointer;
    transition: all .3s;
    font-weight: bold;
  }

  div:hover {
    color: #3291F8;
  }

  div.class-act {
    color: #3291F8;
  }
}

.source-list {
  min-height: 400px;
  width: 100%;
}

.list-con {
  box-sizing: border-box;
}

.item-con {
  margin-bottom: 20px;
  background-color: #ffffff;
  cursor: pointer;
  overflow: hidden;
  border-radius: 4px;
  transition: all .3s;
  border-bottom: 1px solid #EDEDED;

  >div{
    width: 100%;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    max-width: 80%;
    max-height: 80%;
    object-fit: cover;
    margin-bottom: 6px;
  }

  h4 {
    line-height: 24px;
    font-size: 16px;
    color: #535353;
    height: 54px;
    padding: 4px 10px;
    /*将对象作为弹性伸缩盒子模型显示*/
    display: -webkit-box;
    /*设置子元素排列方式*/
    -webkit-box-orient: vertical;
    /*设置显示的行数，多出的部分会显示为...*/
    -webkit-line-clamp: 2;

    ///*文本不会换行*/
    //white-space: nowrap;
    ///*当文本溢出包含元素时，以省略号表示超出的文本*/
    //text-overflow: ellipsis;
  }

  p {
    display: flex;
    padding: 6px 10px 10px;
    justify-content: space-between;
    color: #939393;
    font-size: 12px;
  }

}

.item-con:hover {
  box-shadow: 1px 1px 20px 3px rgba(0, 0, 0, .14);
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
  background-color: rgba(0, 0, 0, .1);
  transition: all .3s;
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

@media screen and (max-width: 1200px){
  main{
    padding-top: 40px;
  }
  .banner-con{
    height: 200px;
    padding: 0;
    justify-content: center;
    margin-bottom: 0;

    >div{
      width: auto;
    }
  }
  .page-con{
    padding: 20px .34rem .4rem;
  }

  .banner-title{
    font-size: 24px;
  }
  .search-con{
    height: 44px;
    line-height: 44px;
    border-radius: 4px;
    >div{
      width: 44px;
      height: 44px;
    }
    >input{
      width: 160px;
    }
    >span{
      width: 80px;
      height: 44px;
      line-height: 44px;
    }
  }

  .item-con{
    div{
      height: 100px;
    }

  }
}


</style>
