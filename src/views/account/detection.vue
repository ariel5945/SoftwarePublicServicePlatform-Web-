<template>
  <div class="page-con">
    <div v-if="dataList.length">
      <div class="list-con" v-for="(item,index) in dataList" :key="index">
        <div style="flex: 1">
          <h3>{{ item.title }}</h3>
          <span>{{ item.createDate }}</span>
        </div>
        <div class="right-btn" v-if="item.rate < 1">检测中</div>
        <div class="right-btn-ok" v-else-if="item.rate == 1" @click="getOne(item.id)">下载报告</div>

      </div>
    </div>

    <el-empty v-else description="暂无数据"></el-empty>
  </div>
</template>

<script>
import HTTP from "./../../server/http"

export default {
  name: "detectionView",
  data() {
    return {
      dataList: [],
    }
  },
  created() {
    let url = "/api/datection/select";
    let data = {};
    HTTP.get(url, data, res => {
      console.log(res);
      this.dataList = res.data
    }, false)
  },
  methods:{
    getOne(id){
      window.open("https://admin.lyrjfwpt.cn/portal/datection/exportPdf?id="+id)
    }
  }
}
</script>

<style scoped lang="scss">
.page-con{
  padding: .55rem .3rem;
  min-height: 5rem;
}

.list-con{
  display: flex;
  padding: 30px 14px;
  border-bottom: 1px solid #D6D8DB;

  h3{
    font-size: 18px;
    margin-bottom: 20px;
  }
  p{
    color: #9D9D9D;
  }

}
.right-btn{
  width: 1rem;
  height: .4rem;
  line-height: .4rem;
  border-radius: 4px;
  background-color: rgba(215, 215, 215, 1);
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.right-btn-ok{
  width: 1rem;
  height: .4rem;
  line-height: .4rem;
  border-radius: 4px;
  background-color: #3291F8;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
}

</style>