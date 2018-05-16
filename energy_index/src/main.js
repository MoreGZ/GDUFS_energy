// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from 'axios'
import baseHome from './components/base-home/base-home.vue'
import baseDynamic from './components/base-dynamic/base-dynamic.vue'
import basePolicy from './components/base-policy/base-policy.vue'
import baseKnowledge from './components/base-knowledge/base-knowledge.vue'
import baseNotice from './components/base-notice/base-notice.vue'
import baseInformation from './components/base-information/base-information.vue'

Vue.use(VueRouter);
Vue.prototype.$ajax = axios;

let routes = [
	{path:"/baseHome",component:baseHome},
	{path:"/Introduction",component:baseInformation},
	{path:"/baseDynamic",component:baseDynamic},
	{path:"/basePolicy",component:basePolicy},
	{path:"/baseKnowledge",redirect:"/baseKnowledge/0"},
	{path:"/baseKnowledge/:knowledgetype",component:baseKnowledge},
	{path:"/baseNotice",component:baseNotice},
	{path:"",redirect:"/baseHome"},
]

var router = new VueRouter({
	routes,
})
Vue.config.productionTip = false
axios.interceptors.request.use(function (config) {    // 这里的config包含每次请求的内容
    config.baseURL = "http://39.107.108.30"
    return config;
}, function (err) {
    return Promise.reject(err);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  template: '<App/>',
  components: { App }
})
