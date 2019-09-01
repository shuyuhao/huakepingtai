

<template>
  <div class='list' :style="listStyles">
    <list>
       <refresh class="refresh" @refresh="onrefresh()"  :display="showrefresh">
        <text class="textRefresh">refresh...</text>
       </refresh>
       <cell v-for="item in postsinfo">
        <div class="panel" @click="jump(item.postid)">
          <text class="textListtitle">{{item.title}}</text>
          <text class="textListcontent">{{item.txt}}</text>
        </div>
       </cell>
       <loading class="loading" @loading="onloading" :display="showLoading">
        <text class="loadingText" >loading...</text>
       </loading>
    </list> 
    <div class="wrapper">
    <wxc-overlay
      :show="show"
      opacity="0"
      ></wxc-overlay>
    </div>
  </div>
</template>
<script>

import { WxcOverlay } from 'weex-ui';
import VueEvent from '@/js/vueevent.js'
import Config from '@/weex_ui/Config.js'
import {IP} from '@/weex_ui/urlconfig.js';

const storage = weex.requireModule('storage');
const stream = weex.requireModule('stream') || {};
const modal = weex.requireModule("modal");
var navigator = weex.requireModule('navigator')

export default {

  data() {
    return {
      lists: [],
      showLoading: "hide",
      showrefresh: "hide",
      show: false,
      localpostsinfo:[],
      postsinfo:[],
      userinfo:[],
      newsList:[],
      listStyles:{
        height: 800,
      },
    };
  },
  components: { WxcOverlay },
  props:['page'],
  created() {
    this.newsList=[];
    for (let i = 0; i < 8; i++) {
          var a = i+1;
          this.newsList.push({title:'news'+a,content:'这是正文简介'+a});
        }
    //modal.toast({ message: "数据请求成功", duration: 1 });
    this.listStyles={height:weex.config.env.deviceHeight / weex.config.env.deviceWidth*750-Config.tabStyles.height-100-50}
    this.getText("000");

    VueEvent.$on('foundposts',(data)=>{
          this.getItem();
    })
  },

  methods: {
    onloading(event) {
      
      modal.toast({ message: "loadmore", duration: 2 });
      this.showLoading = "show";
      this.show= true;
      this.getText("111"); 
    },
    onrefresh(event) {
      modal.toast({ message: "refresh", duration: 2 });
      this.showrefresh = "show";
      this.show= true;
      this.getText("000");
    },
    jump (id,event) {
        let value = {"id":id,"where":"loaclpostsinfo"}; 
        this.$router.push(this.page+JSON.stringify(value));
        VueEvent.$emit('toNews','hide');
    },
    toParams(obj) {
        var param = "";
        for(const name in obj) {
            if(typeof obj[name] != 'function') {
                param += '&' + name + '=' + encodeURIComponent(obj[name])
            }
        }
        return param.substring(1);
    },
    getItem () {
        // storage.getItem('userinfo', event => {
        //     this.user =  JSON.parse(event.data);
        //     // modal.alert({
        //     //         message: this.user,
        //     //         okTitle: '确认'
        //     //     }, function () {
        //     //         console.log('alert callback')
        //     //     });
        // });

        storage.getItem('loaclpostsinfo', event => {
            this.postsinfo  =  JSON.parse(event.data);
            // modal.alert({
            //         message: this.localpostsinfo,
            //         okTitle: '确认'
            //     }, function () {
            //         console.log('alert callback')
            //     });
        });
    },
    getAll(){
        storage.getAllKeys(event => {
          if (event.result === 'success') {
            let list=[];
            list=event.data;
            for(let i=0;i<list.length;i++){
              if (event.data[i]=='userinfo') {
                return;
              }
            }
            this.$router.push('/login');
            VueEvent.$emit('toNews','hide');
            
          }
        })
    },
    getText(somekey){//用以区分申请类型，刷新还是加载，首页，还是资讯页面。
        stream.fetch({
          method: 'GET',
          url: IP + '/posts',
          type:'json'
        }, (ret)=> {
          if(!ret.ok){
            modal.toast({
              message: 'Network Error!请检查网络',
              duration: 3
            });
            this.showrefresh = "hide";
            this.showLoading = "hide"; 
            this.show= false;

          }else{

            if(somekey=="000"){
              this.postsinfo = ret.data;
            }else if(somekey=="111"){
              for (let index = 0; index < ret.data.length; index++) {
                this.postsinfo.push(ret.data[index]);       
              }
            }
            

            // modal.alert({
            //         message: this.postsinfo,
            //         okTitle: '确认'
            //     }, function () {
            //         console.log('alert callback')
            //     });
            this.showrefresh = "hide";
            this.showLoading = "hide"; 
            this.show= false;

            storage.setItem('loaclpostsinfo', JSON.stringify(this.postsinfo), event => {
            })

          }
        });
    },
  },

};
</script>
<style scoped>
.panel {
  width: 720px;
  height: 200px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 2px;
  margin-bottom: 2px;
  flex-direction: column;
  justify-content: center;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(176, 176, 176);
  background-color: rgba(240,240,240, 0.5);
}
.textListtitle {
  font-size: 50px;
  lines:1;
  text-align: center;
  color: #3d3d3d;
}
.textListcontent {
  font-size: 35px;
  lines:2;
  text-align: center;
  color: #3d3d3d;
}
.loadingText {
  font-size: 35px;
  text-align: center;
}
.textRefresh {
  font-size: 35px;
  text-align: center;
}
</style>
