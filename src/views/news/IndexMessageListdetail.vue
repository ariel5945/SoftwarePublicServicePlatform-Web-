<template>
  <main>
    <el-backtop></el-backtop>
    <div class="ouiant">
      <div class="outinstll">
        <div class="outinstll_top">
          <div class="outinstll_topmase">
            <p>{{ dataParm.title }}</p>
          </div>
          <div class="dise-con">
            <div style="display: flex;">
              <span>发布者：</span>
              <h4 v-if="dataParm.source">{{dataParm.source}}</h4>
              <h4 v-else>佚名</h4>
            </div>
            <span>
              <span>发布时间：</span>{{dataParm.releaseTimeStr}}
            </span>
          </div>
          <div class="andes" v-html="dataParm.content"></div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import HTTP from "../../server/http";
export default {
  data() {
    return {
      dataParm: {},
    };
  },

  created() {},
  mounted() {
    this.id = this.$route.query.tpId;
    this.newsdetail();
  },

  methods: {
    newsdetail() {
      let url = "/portal/api/index/getIndexMessageDetail";
      let data = {
        mesId: this.id,
      };
      HTTP.get(
        url,
        data,
        (res) => {
          if (Number(res.code) == 0) {
            this.dataParm = res.data;
          }
        },
        false
      );
    },
  },
};
</script>

<style lang="scss" scoped>
main{
  padding-top: 1.5rem;
}

.outinstll_top {
  width: 96%;
  max-width: 960px;
  height: auto;
  line-height: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 1px 1px 20px 3px rgba(0, 0, 0, 0.14);
  background-color: #ffffff;
  margin: 0 auto;
  padding: 50px 60px;
}

.ouiant {
  width: 100%;
  height: 100%;
}
.outinstll {
  min-height: 600px;
  margin: auto;
}

.outinstll_topmase p {
  line-height: 40px;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 20px;
}
.andes {
  margin: auto;
  padding-bottom: 10px;
  text-align: left;
}
.dise-con{
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  margin-bottom: 10px;

  span{
    color: #333;
    span{
      color: #9B9B9B;
    }
  }

}

</style>
