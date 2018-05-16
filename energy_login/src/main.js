// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'

Vue.prototype.$ajax = axios;

Vue.config.productionTip = false

axios.interceptors.request.use(function (config) {    // 这里的config包含每次请求的内容
    config.withCredentials = true;
	config.baseURL = "http://39.107.108.30"
    return config;
}, function (err) {
    return Promise.reject(err);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
