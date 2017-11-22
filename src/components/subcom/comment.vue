<template>
  <div class="temp">
      <!-- 1.实现评论数据提交的静态结构 -->
    <div class="postcomment">
        <h3>发表评论</h3>
        <p class="p"></p>
        <textarea placeholder="请输入评论内容" v-model="postcontent"></textarea>
        <mt-button type="primary" size="large" @click="postcomment">发表</mt-button>
    </div>
    <!-- 2.实现获取评论数据列表 -->
    <div class="list">
        <h3>评论列表</h3>
        <p class="p"></p>
        <div v-for="(item,index) in list">
            <div class="title">
                <span>第{{index + 1}}楼:</span>
                <span>用户：{{item.user_name}}</span>
                <span>发表时间：{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
            </div>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell" v-text="item.content"></li>
            </ul>
        </div>
    </div>
    <!-- 3.实现获取更多按钮 -->
    <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
  </div>
</template>
<script>
import common from '../kits/common.js'
import { Button } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  data(){
      return{
          pageindex:1,
          postcontent:'',
          list:[]
      }
  },
  props:['id'],//接收父组件的id值
  created(){
      //获取当前资讯的评论数据列表
      this.getcommentlist(this.pageindex);
  },
  methods:{
     //1.评论数据的提交
     postcomment(){
         //排除评论不能为 空
         if(this.postcontent.trim().length<=0){
             Toast("请输入内容")
             return;
         }
         var url=common.apidomain+'/api/postcomment/'+this.id;
         //获取用户评论数据 通过 content  格式提交到请求报文体中
         this.$http.post(url,{content:this.postcontent},{emulateJSON:true}).then(function(res){
             Toast(res.body.message);
        //实现将最新评论数据加载在最前面 concat连接两个数组 合并为一个新的数组
        this.list=[{
            "user_name":"匿名用户",
            "add_time":new Date(),
            "content":this.postcontent
        }].cancat(this.list)
             this.postcontent='';
         })
     },
     getcommentlist(pageindex){
         pageindex =pageindex || 1;
         var url=common.apidomain+'/api/getcomments/'+this.id+'?pageindex='+pageindex;
         this.$http.get(url).then(function(res){
            if(res.body.status != 0 ){
                Toast(res.body.message);
                return;
            }
            //将message数组中的数据赋值给this.list
            this.list = this.list.concat(res.body.message);
        });
     },
     getmore(){
        //  1.0 实现this.pageindex值的增加1
        this.pageindex++;
         //获取当前资讯数据评论信息列表
         this.getcommentlist(this.pageindex);
     }
  }
}
</script>
<style scoped>
/* 1.0 实现提交评论样式 */
.postcomment{
	padding: 5px;
}
	 .p{
		height: 1px;
		width: 100%;
		border-bottom: 1px solid rgba(0,0,0,0.3);
	}
.list{
	padding: 5px;
}
.title{
	padding: 5px;
	color: #6d6d72;
	font-size: 15px;
	background-color: rgba(0,0,0,0.1);
}
</style>
