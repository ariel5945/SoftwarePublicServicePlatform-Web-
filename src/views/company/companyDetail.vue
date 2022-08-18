<template>
  <main>
    <div class="body-con">
      <el-row :gutter="20">
        <el-col :lg="8">
          <div class="qy-title">
            <h3>{{ detData.companyName }}</h3>
            <p>{{ detData.newsRemark }}</p>
            <!--{{ detData }}-->
          </div>
          <div class="item-con">
            <div class="icon-con"><i class="el-icon-location-information"></i></div>
            <div>
              <h5>企业地址</h5>
              <p>{{ detData.companyAddr }}</p>
            </div>
          </div>
          <div class="item-con">
            <div class="icon-con"><i class="el-icon-phone-outline"></i></div>
            <div>
              <h5>联系电话</h5>
              <p>{{ detData.companyTelphone }}</p>
            </div>
          </div>
          <div class="item-con">
            <div class="icon-con"><i class="el-icon-message"></i></div>
            <div>
              <h5>企业邮箱</h5>
              <p>{{ detData.companyEmail }}</p>
            </div>
          </div>

        </el-col>
        <el-col :lg="2">
          <span style="opacity: 0;">1</span>
        </el-col>
        <el-col :lg="14">
          <div class="about-img">
            <img v-if="detData.companyImg" :src="detData.companyImg" alt="">
            <!--<img src="./../../assets/image/bounitefoot2_bg.png" alt="">-->
          </div>
        </el-col>
      </el-row>
    </div>

  </main>
</template>

<script>
import HTTP from "@/server/http";

export default {
  name: "companyDetail",
  data(){
    return{
      detData: {},
    }
  },
  methods:{

  },
  created() {
    let url = "/portal/companyInfo/getConpanyInfoByAccountId";
    let data = {
      accountId: this.$route.query.id
    };
    HTTP.get(url, data, res => {
      if (Number(res.code) === 0) {
        this.detData = res.data;
      }
    }, false)
  }
}
</script>

<style scoped lang="scss">
main {
  padding: 1.5rem 32px;
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  margin-bottom: -40px;

  .body-con {
    width: 94%;
    max-width: 1200px;
  }
}

.about-img {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("./../../assets/img/company-bg.png");
  background-size: 100% 100%;
  padding: .6rem;
  //padding: 20px;

  img{
    position: relative;
    z-index: 2;
    max-width: 86%;
    max-height: 80vh;
  }
}


.qy-title{
  h3{
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }

  p{
    color: #9b9b9b;
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 20px;
    text-indent: 32px;
  }

}
.item-con{
  display: flex;
  margin-bottom: 20px;

  .icon-con{
    font-size: 40px;
    color: #3291F8;
    position: relative;
    top: 8px;
    margin-right: 20px;
  }

  h5{
    font-size: 16px;
    font-weight: 700;
    color: #9b9b9b;
    text-transform: uppercase;
    margin: 10px 0;
  }
  p{
    font-size: 18px;
    margin-bottom: 0;
    font-weight: 500;
    line-height: 1.3;
    margin-top: 9px;
  }

}


</style>