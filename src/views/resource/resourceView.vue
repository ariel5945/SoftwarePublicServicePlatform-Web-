<template>
  <main>
    <h2>面向开发者提供<br>优质的IT资源下载服务</h2>
    <div class="btn-list">
      <div v-for="(item,index) in typeList"
           :key="index"
           @click="jumpDetail(item.valueName)"
           :class="{'odd-btn':index%2!==0}" >
        <span>{{item.valueDescription}}</span>
      </div>

    </div>
  </main>
</template>

<script>
import HTTP from "./../../server/http";
export default {
  name: "resourceView",
  data(){
    return{
      typeList: [
        {title: ""},
      ],
    }
  },
  created() {
    let url = "/api/source/getSourceType";
    let data = {};
    HTTP.get(url,data,res=>{
      if(Number(res.code) === 0){
        this.typeList = res.data;
      }
    },false)
  },
  methods:{
    jumpDetail(typeId){
      this.$router.push({
        name: "resourceDetail",
        params: {
          typeId: typeId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
main{
  background-image: url("./../../assets/image/bg_ziyuanxiazai@2x.png");
  background-size: cover;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100.1vh;
  top: 0;
  left: 0;
  right: 0;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h2{
    font-size: 54px;
    text-align: center;
    color: #ffffff;
    line-height: 60px;
    font-weight: 100;
    margin-bottom: 90px;
  }

  .btn-list{
    display: flex;

    div{
      margin: 0 20px;
      width: 158px;
      padding: 0 10px;
      border-radius: 5px;
      font-size: 14px;
      color: #3291F8;
      background-color: #ffffff;
      height: 54px;
      line-height: 54px;
      text-align: center;
      overflow: hidden;
      cursor: pointer;
      position: relative;

    }
    .odd-btn{
      color: #ffffff;
      background: linear-gradient(90deg, #3BBFFD 0%, #0E5EAB 100%);
    }

    div:after{
      position: absolute;
      z-index: 1;
      background-color: rgba(0,0,0,.2);
      transition: all .3s;
      width: 100%;
      height: 100%;
      content: "";
      top: 0;
      left: 0;
      right: 0;
    }
    div:hover:after{
      background-color: rgba(0,0,0,0);
    }
  }

}
main:after{
  position: fixed;
  content: "";
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.2);
}
</style>
