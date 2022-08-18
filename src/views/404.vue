<template>
  <div class="bgpic">
    <div class="container">
      <img src="./../assets/image/404.png" alt="" />
      <span class="title">{{msg}}</span>
    </div>
  </div>
</template>
<script>
export default {


	data() {
		return {
			msg:'页面出错啦！请返回或者刷新页面！'
		};
	},

	mounted() {
		
	},

	methods: {
		
	},
};
</script>
<style>
.bgpic {
  width: 100%;
  padding-top: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 280px;
  height: 280px;
}
.container .title {
  width: 256px;
  height: 24px;
  color: rgba(46, 75, 128, 100);
  font-size: 16px;
  text-align: left;
}
.bgpic img {
  width: 100%;
  height: 100%;
}
</style>