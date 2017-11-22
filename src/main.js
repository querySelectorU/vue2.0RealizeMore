// 1.0 导入vue核心包
import Vue from 'vue';
// 2.0 导入App.vue的vue对象
import App from './App.vue';

// 3.0 将 vue-route 集成到这个项目中来
import VueRouter from 'vue-router';
// 3.0.1 将 vueRoute 对象绑定到vue对象上
Vue.use(VueRouter);
// 3.0.2 导入路由规则对应的组件对象
import home from './components/home.vue';
import shopcar from './components/shopcar/car.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
// 3.0.3 定义路由规则
var router1 = new VueRouter({
	linkActiveClass:'mui-active',
	routes : [
		{path:'/',redirect:'/home'},//redirect替换功能 将首页打开时的锚点 / 替换成 /home
		{path : '/home', component: home},
		{path: '/shopcar', component: shopcar},
		{path:'/news/newslist',component:newslist},
		{path:'/news/newsinfo/:id',component:newsinfo}
	]
})

// 4.0 使用mint-ui
import mintUi from 'mint-ui';
import 'mint-ui/lib/style.min.css'
// 4.1 将 mint-ui 对象绑定到vue对象上
Vue.use(mintUi);

// 5.0 使用mui
import '../statics/mui/css/mui.css'
//6.导入公共背景的样式
import '../statics/css/site.css'
//7.导入vue-resource的包
import vueResource from 'vue-resource'
//8.导入momentjs的包和日期格式化全局过滤注册
import moment from 'moment';
Vue.filter('datefmt',function(input,fmtstrng){
	return moment(input).format(fmtstrng)
})
Vue.use(vueResource)
// 3.0 利用Vue对象进行解析渲染
new Vue({
	el:'#app',
	router: router1,
	render:c=>c(App)
});
