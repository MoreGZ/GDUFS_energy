// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueRouter from 'vue-router'

// 引入组件
import vView from "./components/v-view/v-view.vue"

// 配置vue-router
Vue.use(VueRouter);
var routes = [
	{path: '' , redirect:"/dynamic"},
	{path: '/:type/:searchcontent' , component:vView},
	{path: '/:type' , component:vView}
]
var router = new VueRouter({
	routes
});

// 配置axios

Vue.prototype.$ajax = axios;
// Vue.prototype.$ajax.config = {
// 	headers: {
// 		'Content-Type': 'application/x-www-form-urlencoded'
// 	},
// 	withCredentials : true
// }

axios.interceptors.request.use(function (config) {    // 这里的config包含每次请求的内容
    config.withCredentials = true;
    config.baseURL = "http://39.107.108.30"
    return config;
}, function (err) {
    return Promise.reject(err);
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  template: '<App/>',
  components: { App }
})
