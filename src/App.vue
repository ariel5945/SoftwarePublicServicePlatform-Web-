<template>
  <div id="app">
    <!--公共头部-->
    <comHead :isLogin="isLogin" :homeHead="homeHead" @nologin="nologin"></comHead>
    <div>
      <keep-alive include="development">
        <router-view @userLogin="userLogin" @headBg="headBg" @nologin="nologin" />
      </keep-alive>

      <comQR v-show="$route.meta.hideQR !== true"></comQR>
    </div>
    <!--公共底部-->
    <comFoot v-show="$route.meta.hideFoot !== true"></comFoot>
  </div>
</template>
<script>
import comHead from "@/components/comHead";
import comFoot from "@/components/comFoot";
import comQR from "@/components/comQR.vue"
export default {
  name: "App",
  components:{
    comHead,
    comFoot,
    comQR
  },
  data(){
    return{
      isLogin: false,
      homeHead: false,
    }
  },
  methods:{
    userLogin(){
      this.isLogin = true;
    },
    headBg(data){
      this.homeHead = data;
    },
    nologin(){
      this.isLogin = false;
    }
  },
  mounted() {
    this.isLogin = localStorage.getItem("user_login");
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #F0F2F5;
}

</style>
