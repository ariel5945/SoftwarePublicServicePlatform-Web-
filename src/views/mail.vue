<template>
  <div>
    <el-backtop></el-backtop>
    <div class="ouiant">
      <div class="outinstll">
        <div class="outinstll_top">
          <div class="outinstll_topmase"><p>站内信</p></div>
          <div v-for="(item,index) in objlisrt" :key="index" class="andes">
            <p class="andes_one">{{ item.name}}<span ></span></p>
            <p class="andes_two">{{item.name1}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SoftwarepublicserviceplatformWebSupportcenter",
  data() {
    return {
      objlisrt:[
        {
          name:'内容标题',
          name1:'我是内容。我是内容我是内容我是内容.我是内容。我是内容我是内容我是内容.',
          status:1,

        },
        {
          name:'内容标题',
          name1:'我是内容。我是内容我是内容我是内容.我是内容。我是内容我是内容我是内容.',
          status:1,

        },
        {
          name:'内容标题',
          name1:'我是内容。我是内容我是内容我是内容.我是内容。我是内容我是内容我是内容.',
          status:2,

        },
        {
          name:'内容标题',
          name1:'我是内容。我是内容我是内容我是内容.我是内容。我是内容我是内容我是内容.',
          status:2,

        }
      ]

    }
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.outinstll_top{
  width: 1200px;
  height: 801px;
  line-height: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.14);
  background-color: #FFFFFF;
  margin:150px auto 0;
  padding: 50px 60px;
}

.container {
  width:100%;
  height:900px;
  margin-right:100000px;
}
.ouiant{
  width:100%;
  height:100%;
}
.outinstll{
  margin:auto;

}
.outinstll_topmase p{
  text-align: left;

}
.andes{
  border-bottom:1px solid #ccc;
  padding-top:41px;
  margin:auto;
  padding-bottom: 10px;
  .andes_two{
    line-height:20px;
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
    text-align:left;
    color: #5d5d5d;
  }
  .andes_one{
    text-align:left;
    font-size: 18px;
    color: #333333;
    margin-bottom: 20px;
  }

}
</style>
