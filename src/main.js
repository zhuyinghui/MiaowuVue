// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
Vue.use(ElementUI);
import Axios from 'axios';
Vue.prototype.axios=Axios;
Vue.prototype.$domain='http://zhuyinghui.shop';



import { getGoods,getClass } from "../static/data/getGoods";
getGoods(data=>Vue.prototype.$GoodsList=data);
getClass(data=>Vue.prototype.$GoodsClass=data);

new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>',
});

