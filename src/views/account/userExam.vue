<template>
  <div>
    <div class="list-con" v-for="(item,index) in dataList" :key="index">
      <!--<img :src="item.coverImgUrl" alt="">-->
      <div style="flex: 1">
        <h3>{{ item.title }}</h3>
        <!--<span>{{ item.applyTime }}</span>-->
      </div>
      <div class="right-btn" @click="jumpBat(item.id)" v-if="item.status == false">未及格</div>
      <div class="right-btn-ok" v-else-if="item.status ==true">已通过</div>
    </div>
  </div>
</template>

<script>
import HTTP from "@/server/http";

export default {
  name: "publishEpiboly",
  data() {
    return {
      dataList: [],
    }
  },
  methods: {
    jumpBat(id){
      this.$router.push({
        path: "/onlineTraining/examDetail",
        query:{
          examId: id,
        }
      })
    },

    getUserList() {
      let url = "/api/train/examInfo";
      let data = {};
      HTTP.get(url, data, res => {
        if (res.code === '0') {
          this.dataList = res.data;
        } else {
          this.$message.warning(res.msg);
        }
      }, false)
    },

  },
  created() {
    this.getUserList();
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
  margin-bottom: 10px;

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
  padding: 14px 14px;
  border-bottom: 1px solid #D6D8DB;
  align-items: center;

  img{
    width: 180px;
    height: 100px;
    margin-right: 14px;
    border-radius: 6px;
  }

  h3{
    font-size: 18px;
    margin-bottom: 20px;
  }
  p{
    color: #9D9D9D;
  }

}
.right-btn{
  width: 120px;
  height: 46px;
  line-height: 46px;
  border-radius: 4px;
  background-color: rgba(215, 215, 215, 1);
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.right-btn-ok{
  width: 120px;
  height: 46px;
  line-height: 46px;
  border-radius: 4px;
  background-color: #64C37C;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
}
.right-btn-w{
  width: 120px;
  height: 46px;
  line-height: 46px;
  border-radius: 4px;
  background-color: #FCCA00;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
}

</style>
