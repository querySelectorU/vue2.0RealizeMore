<template>
  <div class="temp">
      <ul class="mui-table-view">
				<li v-for="item in list" :key="item.id" class="mui-table-view-cell mui-media">
					<router-link v-bind="{to:'/news/newsinfo/' + item.id}">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis'></p>
                            <div class="ft">
                                <span>发表时间:{{item.add_time | datefmt('YYYY-MM-DD hh:mm:ss')}}</span>
                                <span>点击数:{{item.click}}</span>
                            </div>
						</div>
					</router-link>
				</li>
			</ul>
  </div>
</template>
<script>
import common from '../kits/common.js';
import {Toast} from 'mint-ui';
export default {
  data(){
      return{
          list:[]
      }
  },
  created(){
      this.getnewslist();
  },
  methods:{
      getnewslist(){
          var url=common.apidomain+'/api/getnewslist';
          this.$http.get(url).then(function(res){
              var data=res.body;
              if(data.status!=0){
                  Toast(data.message);
                  return;
              }
              this.list=data.message;
          })
      }
  }
}
</script>
<style scoped>
.mui-table-view img{
        height:60px;
        width:60px;
    }

    .mui-table-view .mui-media-object{
        max-width: 60px;
        line-height: 60px;
    }

    .ft{
        margin-top: 1.5em;
        font-size: 13px;
        color:#0094ff;
    }

    .ft .click{
        margin-left: 20px;
    }
</style>


