<template>
 <div class="temp">
     <!--1. 新闻列表样式 -->
     <div class="title">
         <h4 v-text="info.title"></h4>
         <p>{{info.add_time | datefmt('YYYY-MM-DD')}}</p>
     </div>
     <div class="content" v-html="info.content">

     </div>
<!-- 2.评论列表样式 -->
        <!-- comment里边的id需要绑定 :id = "id" -->
     <comment :id="id"></comment>
 </div>
</template>
<script>
import comment from '../subcom/comment.vue';
import common from '../kits/common.js';
import { Toast } from 'mint-ui';
export default {
    // 给info组件里边添加新的组件 评论列表组件
    components:{
        comment:comment
    },
  data(){
      return{
          id:0,
        info:{}
      }
  },
  created(){
      //获取每个详情页的id值
      this.id=this.$route.params.id;
      this.getinfo()
  },
  methods:{
      getinfo(){
          var url=common.apidomain+'/api/getnew/'+this.id;
          this.$http.get(url).then(function(res){
                var body=res.body;
                //body.status判断 而不是this.body
                if(body.status!=0){
                    Toast(body.message)
                    return;
                }
               this.info=body.message[0];
          })
      }
  }
}
</script>
<style scoped>
    .title h4{
        color: #0094ff;
    }
    .title p{
        color:rgba(0,0,0,0.5);
    }

    .title,.content{
        padding: 5px;
    }
</style>
