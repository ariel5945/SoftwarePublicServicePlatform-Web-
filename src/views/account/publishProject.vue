<template>
  <div>
    <div class="tab-con">
      <span :class="{'active': tabType === 0}" @click="getList(0)">我发布的项目</span>
      <span :class="{'active': tabType === 1}" @click="getList(1)">我参与的项目</span>
    </div>
    <div v-if="dataList.length>0" v-loading="openLoad" style="min-height: 3rem">
      <div class="list-con" v-for="(item,index) in dataList" :key="index">
        <img class="left-img" v-if="item.coverImgUrl" :src="item.coverImgUrl" alt="">
        <div class="left-img" v-else>
          <img src="./../../assets/image/nodata.png" alt="">
        </div>
        <div class="div-conter">
          <h3>
            {{ item.applyName }}
            <el-tag style="margin-left: 20px" type="warning" size="mini">{{item.industryType}}</el-tag>
          </h3>
          <p class="intro-p">{{ item.applyIntro }}</p>
          <span style="color: #9D9D9D;"><i class="el-icon-time"></i> {{ item.releaseTime.split("T")[0] }}</span>
        </div>
        <div class="btn-list">
          <div class="right-btn" v-if="item.status === 0">待审核</div>
          <div class="right-btn-w" v-else-if="item.status === 1" @click="getRenList(item.id)">查看申请</div>
          <div class="right-btn-text" @click="jumpBtn(item.id)">查看详情</div>
        </div>

      </div>
    </div>
    <el-empty v-else description="暂无数据"></el-empty>

    <div class="page-con">
      <el-pagination
          background
          :page-size="pageSize"
          :page-count="pageNum"
          @current-change="handleIndex"
          layout="prev, pager, next"
          :total="total">
      </el-pagination>
    </div>
    <el-dialog
        title="提示"
        :lock-scroll="false"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <div class="list-con" v-for="(item,index) in applyinfouserList" :key="index">
        <!--<img :src="item.coverImgUrl" alt="">-->
        <div style="flex: 1">
          <h3>{{ item.applyUserCompany }}</h3>
          <span>{{ item.applyTime }}</span>
        </div>
        <div class="right-btn-ok" @click="hezuoBtn(item.id)">通过</div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import HTTP from "@/server/http";

export default {
  name: "publishProject",
  data() {
    return {
      tabType: 0,

      dataList: [],
      applyinfouserList: [],
      dialogVisible: false,
      openLoad: true,

      total: 0,
      pageSize: 10,
      pageNum: 1,
    }
  },
  methods: {
    // 跳转详情
    jumpBtn(item){
      this.$router.push({
        path: "/developmentDetail",
        query: {
          id: item,
        }
      })
      // developmentDetail?id=112
    },

    // 合作按钮 ?id=12
    hezuoBtn(id){
      let url = "/api/applyinfouser/edit";
      let data = {
        id: id,
        status: 2,
      };
      HTTP.postForm(url, data, res => {
        this.dialogVisible = false;
        if(res.code == 0){
          this.$message.success("操作成功");
          this.getUserList();
        } else {
          this.$message.error(res.msg);
        }
      }, false)
    },

    handleClose(){
      this.dialogVisible =false;
    },
    handleIndex(val){
      this.openLoad = true;
      this.pageNum = val;
      if(this.tabType===0){
        this.getUserList();
      } else {
        this.getUserAlp();
      }
    },

    getList(type) {
      this.tabType = Number(type);
      this.pageNum = 1;
      this.openLoad = true;
      if(type===0){
        this.getUserList();
      } else {
        this.getUserAlp();
      }
    },
    // 我参与的项目
    getUserAlp() {
      let url = "/api/applyinfouser/getApplylistByInfoUser";
      let data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      };
      HTTP.get(url, data, res => {
        let clearTime = setTimeout(()=>{
          this.openLoad = false;
          clearTimeout(clearTime)
        },500)
        if (res.code === '0') {
          this.dataList = res.data;
          this.total = res.total;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },

    // 我发布的项目
    getUserList() {
      let url = "/api/apply/getApplylistByUser";
      let data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      };
      HTTP.get(url, data, res => {
        let clearTime = setTimeout(()=>{
          this.openLoad = false;
          clearTimeout(clearTime)
        },500)
        if (res.code === '0') {
          this.dataList = res.data;
          this.total = res.total;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },

    getRenList(id){
      this.dialogVisible =true;
      let url = "/api/applyinfouser/list";
      let data = {
        applyInfoId: id,
        pageSize: 5,
        pageNum: 1,
      };
      HTTP.get(url, data, res => {
        if (res.code == '0') {
          this.applyinfouserList = res.rows;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)

    },

  },
  created() {
    let publishType = 0;
    if(this.$route.query.publishType){
      publishType = this.$route.query.publishType;
    }
    this.getList(publishType);
  }
}
</script>

<style scoped lang="scss">
.tab-con {
  display: flex;
  justify-content: center;
  position: relative;
  height: 30px;
  line-height: 30px;
  margin-bottom: 30px;

  span {
    font-size: 18px;
    padding: 0 30px;
    cursor: pointer;
    color: #9D9D9D;
  }

  span.active {
    color: #3291F8;
  }
}

.tab-con:after {
  position: absolute;
  content: "";
  width: 1px;
  height: 14px;
  top: 8px;
  right: 50%;
  background-color: #9D9D9D;
}

.list-con{
  display: flex;
  width: 100%;
  padding: 14px 14px;
  border-bottom: 1px solid #D6D8DB;
  align-items: center;
  justify-content: space-between;
  .div-conter{
    width: calc(100% - 280px);
  }
  .left-img {
    width: 120px;
    height: 75px;
    margin-right: 14px;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eff0f1;

    img {
      height: 40px;
    }
  }

  h3{
    font-size: 18px;
    font-weight: normal;
    height: 32px;
    display: flex;
    align-items: center;
  }
  p{
    color: #9D9D9D;
    height: 28px;
    line-height: 28px;
  }

}
.right-btn{
  width: 80px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  background-color: rgba(215, 215, 215, 1);
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 10px;
}
.right-btn-ok{
  width: 80px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  background-color: #64C37C;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  margin-bottom: 10px;
}
.right-btn-w{
  width: 80px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  background-color: #FCCA00;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
}

.right-btn-text{
  width: 80px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}

.intro-p{
  width: 100%;
  overflow: hidden;
  ///*文本不会换行*/
  white-space: nowrap;
  ///*当文本溢出包含元素时，以省略号表示超出的文本*/
  text-overflow: ellipsis;
}

.page-con{
  padding-top: 30px;
  display: flex;
  justify-content: center;
}

.btn-list{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>