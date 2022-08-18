<template>
  <main>
    <img v-show="imgNum === 'cyfw'" src="./../assets/ldimg/cyfw.png" alt="">
    <img v-show="imgNum === 'dwfw'" src="./../assets/ldimg/dwfu.png" alt="">
    <img v-show="imgNum === 'hbtk'" src="./../assets/ldimg/hbtk.png" alt="">
    <img v-show="imgNum === 'kqyl'" src="./../assets/ldimg/kqyl.png" alt="">
    <img v-show="imgNum === 'hysj'" src="./../assets/ldimg/hysj.png" alt="">
    <img v-show="imgNum === 'hyxx'" src="./../assets/ldimg/hyxx.png" alt="">
    <img v-show="imgNum === 'llrq'" src="./../assets/ldimg/ylrq.png" alt="">
    <img v-show="imgNum === 'zwsj'" src="./../assets/ldimg/zwsjgx.png" alt="">
    <img v-show="imgNum === 'qynblcgl'" src="./../assets/ldimg/qynbgz.png" alt="">
    <img v-show="imgNum === 'rlzygl'" src="./../assets/ldimg/rlzygl.png" alt="">
    <img v-show="imgNum === 'spyy'" src="./../assets/ldimg/spyy.png" alt="">
    <img v-show="imgNum === 'szsc'" src="./../assets/ldimg/szsc.png" alt="">
    <img v-show="imgNum === 'zwzfpt'" src="./../assets/ldimg/zwzf.png" alt="">
    <img v-show="imgNum === 'zwxvrar'" src="./../assets/ldimg/zwxarvr.png" alt="">
  </main>
</template>

<script>
export default {
  name: "imgPage",
  data(){
    return{
      imgNum: "cyfw",
    }
  },
  mounted() {
    this.imgNum = this.$route.query.img;
    console.log(this.imgNum)
  }
}
</script>

<style scoped>


img{
  margin: 0 auto;
  display: block;
}
</style>