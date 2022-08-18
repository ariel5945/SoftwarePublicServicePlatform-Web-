<template>
  <main>
    <section class="banner-con">
      <div>
        <h3 class="banner-title">资源下载</h3>
        <div style="display: flex;">
          <div class="search-con">
            <div>
              <el-icon class="el-icon-search"></el-icon>
            </div>
            <input type="text" v-model="title" placeholder="搜索您需要的内容" />
            <span @click="searchGetList()">搜索</span>
          </div>
        </div>
      </div>
    </section>

    <section class="page-con">
      <div class="class-list">
        <div @click="changeGetList(null)" :class="{'class-act': classId === null}">全部</div>
        <div
          v-for="(item,index) in typeList"
          :key="'nav'+index"
          @click="changeGetList(item.valueName)"
          :class="{'class-act': item.valueName === classId}"
        >{{ item.valueDescription }}</div>
      </div>
      <div class="source-list" v-loading="getLoad" element-loading-text="拼命加载中...">
        <div class="list-con" v-if="sourceList.length>0">
          <el-row :gutter="20">
            <el-col :md="12" :lg="6" v-for="(item,index) in sourceList" :key="'list'+index">
              <div class="item-con" @click="downBtn(item.link)">
                <div class="item-img-con">
                  <img v-if="item.sourceImg" :src="item.sourceImg" />
                  <div v-else>
                    <img src="./../../assets/image/nodata.png" />
                  </div>
                  <h4>{{item.title}}</h4>
                </div>


                <h4>{{item.title}}</h4>
                <p>
                  <span>{{item.company}}</span>
                  <!--<span>{{ item.updateTime.split(" ")[0] }}</span>-->
                </p>
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
      pageSize: 12,
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
    downBtn(link){
      this.$confirm('确认下载该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        lockScroll: false,
        type: 'warning'
      }).then(() => {
        location.href = link;
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
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
      let url = "/api/source/getSourceList";
      let data = {
        title: this.title,
        classId: this.classId,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      HTTP.get(
        url,
        data,
        res => {
          if (Number(res.code) === 0) {
            this.sourceList = res.rows;
            this.total = res.total;
            this.getLoad = false;
          }
          // console.log(res)
        },
        false
      );
    },
    getClass() {
      let url = "/api/source/getSourceType";
      let data = {};
      HTTP.get(
        url,
        data,
        res => {
          if (Number(res.code) === 0) {
            this.typeList = res.data;
            this.getList();
          }
        },
        false
      );
    }
  }
};
</script>

<style scoped lang="scss">
.banner-con {
  background-image: url("./../../assets/image/bg_ziyuanxiazai2.png");
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
  background-color: rgba(255, 255, 255, 0.58);
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
    background-color: #3291f8;
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
    background-color: rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
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

.source-list {
  min-height: 5rem;
  width: 100%;

.list-con {
  box-sizing: border-box;


}

.item-con {
  margin-bottom: 20px;
  background-color: #ffffff;
  cursor: pointer;
  overflow: hidden;
  border-radius: 4px;
  transition: all 0.3s;
  border-bottom: 1px solid #ededed;

  .item-img-con{
    width: 100%;
    height: 2.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    h4{
      position: relative;
      z-index: 1;
      width: 80%;
      margin: 0 auto;
      text-align: center;
      color: #FFFFFF;
      text-shadow: 1px 1px 30px 2px rgba(0,0,0,.1);
      font-size: 22px;
      line-height: 26px;
      height: 52px;
    }

    >img {
      width: 100%;
      height: 2.2rem;
      margin-bottom: 6px;
      position: absolute;
      z-index: 0;
    }
    >div{
      width: 100%;
      height: 220px;
      display: flex;
      justify-content: center;
      align-items: center;

      img{
        height: 80px;
      }
    }

  }


  h4 {
    line-height: 24px;
    height: 47px;
    overflow: hidden;
    font-size: 16px;
    color: #535353;
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
  background-color: #3291F8;
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
}}
</style>
