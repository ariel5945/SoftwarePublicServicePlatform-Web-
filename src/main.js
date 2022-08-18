import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import "./assets/css/style.css"
import 'element-ui/lib/theme-chalk/display.css';
Vue.use(ElementUI)
Vue.config.productionTip = false;
// 整屏滚动
import 'animate.css'
import 'fullpage-vue/src/fullpage.css'
import VueFullpage from 'fullpage-vue'
Vue.use(VueFullpage)
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./assets/js/rem"


NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});
router.beforeEach((to, from, next) => {
  NProgress.start(); // 显示进度条
  next();
});

router.afterEach(() => {
  NProgress.done(); // 完成进度条
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
