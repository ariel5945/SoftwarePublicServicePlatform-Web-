<template>
  <div>
    <div class="tab-con">
      <span :class="{'active': tabType === 0}" @click="getList(0)">我发布的外包</span>
      <span :class="{'active': tabType === 1}" @click="getList(1)">我参与的外包</span>
    </div>
    <div v-if="dataList.length>0" v-loading="openLoad" style="min-height: 3rem">
      <div class="list-con" v-for="(item,index) in dataList" :key="index">
        <!---->
        <img class="left-img" v-if="item.coverImgUrl && tabType===0" :src="item.coverImgUrl" alt="">
        <img class="left-img" v-else-if="item.cover_img_url && tabType===1" :src="item.cover_img_url" alt="">
        <div class="left-img" v-else>
          <img src="./../../assets/image/nodata.png" alt="">
        </div>
        <div class="div-conter">
          <h3>
            {{ item.title }}
          </h3>
          <p class="intro-p" v-if="tabType===0">
            <el-tag style="margin-left: 20px" size="mini">{{ getClassName(item.epibolyTag, 1) }}</el-tag>
            <el-tag style="margin-left: 20px" type="warning" size="mini">{{ getClassName(item.epibolyType, 2) }}</el-tag>
            <el-tag style="margin-left: 20px" type="success" size="mini">{{ getClassName(item.epibolyCycle, 3) }}</el-tag>
          </p>
          <p class="intro-p" v-if="tabType===1">
            <el-tag style="margin-left: 20px" size="mini">{{ getClassName(item.epiboly_tag, 1) }}</el-tag>
            <el-tag style="margin-left: 20px" type="warning" size="mini">{{ getClassName(item.epiboly_type, 2) }}</el-tag>
            <el-tag style="margin-left: 20px" type="success" size="mini">{{ getClassName(item.epiboly_cycle, 3) }}</el-tag>
          </p>
          <span v-if="tabType===0" style="color: #9D9D9D;"><i class="el-icon-time"></i> {{ getTime(item.createTime) }}</span>
          <span v-else style="color: #9D9D9D;"><i class="el-icon-time"></i> {{ getTime(item.epibolyTime) }}</span>
        </div>
        <div class="btn-list">
          <div class="right-btn" v-if="item.status == 0">待审核</div>
          <div class="right-btn-w" v-else-if="item.status == 1" @click="getRenList(item.id)">查看申请</div>
          <div class="right-btn-wc" v-else-if="item.status == 2">已完成</div>
          <div class="right-btn-text" @click="jumpBtn(item.epibolyId)">查看详情</div>
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
        title="申请列表"
        :lock-scroll="false"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <div class="sqren-list" v-for="(item,index) in applyinfouserList" :key="index">
        <!--<img :src="item.coverImgUrl" alt="">-->
        <div>
          <h3>{{item.name }}</h3>
          <span>申请时间: {{ getTime(item.epibolyTime) }}</span>
        </div>

        <div class="right-btn-ok" v-if="item.status == 0" @click="hezuoBtn(item.id)">确认合作</div>
        <div class="right-btn-w" v-if="item.status == 1">已合作</div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import HTTP from "@/server/http";

export default {
  name: "publishEpiboly",
  data() {
    return {
      tabType: 0,

      dataList: [],
      applyinfouserList: [],
      classList: [],
      dialogVisible: false,
      openLoad: true,

      total: 0,
      pageSize: 10,
      pageNum: 1,
    }
  },
  methods: {
    getRenList(id){
      // api/software_epiboly/getApplyListData?epibolyId=
      this.dialogVisible =true;
      let url = "/api/software_epiboly/getApplyListData";
      let data = {
        epibolyId: id
      };
      HTTP.get(url, data, res => {
        if (res.code == '0') {
          this.applyinfouserList = res.data;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },
    // 合作按钮 ?id=12
    hezuoBtn(id){
      let url = "/api/software_epiboly/updateEpibolyApply";
      let data = {
        id: id
      };
      HTTP.get(url, data, res => {
        this.dialogVisible = false;
        if(res.code == 0){
          this.$message.success("操作成功");
          this.getUserList();
        } else {
          this.$message.error(res.msg);
        }
      }, false)
    },

    getTime(time){
      if(time){
        return time.split("T")[0];
      }
    },
    // 跳转详情
    jumpBtn(item) {
      this.$router.push({
        path: "/epibolyDetail",
        query: {
          detailId: item,
        }
      })
      // developmentDetail?id=112
    },

    handleClose() {
      this.dialogVisible = false;
    },
    handleIndex(val) {
      this.openLoad = true;
      this.pageNum = val;
      if (this.tabType === 0) {
        this.getUserList();
      } else {
        this.getUserAlp();
      }
    },
    getClass() {
      let url = "portal/software_epiboly/getListQuery";
      let data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      };
      HTTP.get(url, data, res => {
        this.classList = res.data;
        // console.log(res)
      }, false);
    },

    getClassName(data, type) {
      let name = ""
      if (type === 1) {
        this.classList.epibolyTag.forEach((item) => {
          if (item.valueName === data) {
            name = item.valueDescription
          }
        })
      } else if (type === 2) {
        this.classList.epibolyType.forEach((item) => {
          if (item.valueName === data) {
            name = item.valueDescription
          }
        })
      } else if (type === 3) {
        this.classList.epibolyCycle.forEach((item) => {
          if (item.valueName === data) {
            name = item.valueDescription
          }
        })
      }
      return name
    },

    getList(type) {
      this.tabType = type;
      this.pageNum = 1;
      this.openLoad = true;
      if (type === 0) {
        this.getUserList();
      } else {
        this.getUserAlp();
      }
    },
    getUserAlp() {
      let url = "/api/software_epiboly/getApplyListData";
      let data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      };
      HTTP.get(url, data, res => {
        let clearTime = setTimeout(()=>{
          this.openLoad = false;
          clearTimeout(clearTime)
        },500)
        if (res.code == '0') {
          this.dataList = res.data;
          this.total = res.total;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },
    getUserList() {
      let url = "/api/software_epiboly/getMyListData";
      let data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      };
      HTTP.get(url, data, res => {
        let clearTime = setTimeout(()=>{
          this.openLoad = false;
          clearTimeout(clearTime)
        },500)
        if (res.code == '0') {
          this.dataList = res.data;
          this.total = res.total;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },

  },
  created() {
    this.getClass();
    let publishType = 0;
    if(this.$route.query.publishType){
      publishType = Number(this.$route.query.publishType);
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

.list-con {
  display: flex;
  width: 100%;
  padding: 14px 14px;
  border-bottom: 1px solid #D6D8DB;
  align-items: center;
  justify-content: space-between;

  .div-conter {
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

  h3 {
    font-size: 18px;
    font-weight: normal;
    height: 28px;
    display: flex;
    align-items: center;
  }

  p {

    height: 28px;
    line-height: 28px;
  }

}

.right-btn {
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

.right-btn-ok {
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

.right-btn-w {
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
.right-btn-wc {
  width: 80px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  background-color: #67c23a;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
}

.right-btn-text {
  width: 80px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}

.intro-p {
  width: 100%;
  overflow: hidden;
  margin-bottom: 4px;
  margin-left: -20px;
  ///*文本不会换行*/
  white-space: nowrap;
  ///*当文本溢出包含元素时，以省略号表示超出的文本*/
  text-overflow: ellipsis;
}

.page-con {
  padding-top: 30px;
  display: flex;
  justify-content: center;
}

.btn-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sqren-list{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 16px 0;

  div h3{
    font-size: 16px;
    height: 24px;
    color: #333;
    font-weight: normal;
  }
  span{
    height: 20px;
    color: #9B9B9B;
  }
}

</style>
