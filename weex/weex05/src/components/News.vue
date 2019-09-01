<!-- 消息界面-->

<template>
    <div>
        <div class="demo">
          <wxc-minibar title="消息中心"
                       background-color="#009ff0"
                       @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                       leftButton=""
                       :right-button="rightButton"></wxc-minibar>
        </div>
        <list>
            <cell v-for="item in localChatInfo">
                <div class="panel" @click="jump(item[0])">
                    <text class="textListtitle">{{item[0].username}}</text>
                </div>
            </cell>
        </list>
    </div>
</template>

<style scoped>
    .newstext{
      font-size:50px;
    }
    .buttom{
      height: 50px;
    }
    .demo {
      width: 750px;
      height: 100px;
      align-items: flex-start;
    }
    .panel {
      width: 750px;
      height: 125px;
      margin-top: 1px;
      margin-bottom: 1px;
      flex-direction: column;
      justify-content: center;
      border-width: 1px;
      border-style: solid;
      border-color: rgb(176, 176, 176);
      background-color: rgba(240,240,240, 0.5);
    }
    .textListtitle {
      margin-left:25px;
      font-size: 45px;
      color: #3d3d3d;
    }
</style>

<script>

  import { WxcMinibar } from 'weex-ui';
  import { CART_ICON, RETURN_ICON } from '../weex_ui/type';
  import VueEvent from '@/js/vueevent.js'
  import {IP} from '@/weex_ui/urlconfig.js';
  const stream = weex.requireModule('stream');
  const modal = weex.requireModule('modal');
  const storage = weex.requireModule('storage');

  export default {

    data: () => ({
      rightButton: CART_ICON,
      leftButton: RETURN_ICON,
      localChatInfo:[],
      userInfo:[],
      chatInfo:[],
    }),
    components:{ WxcMinibar},
    created () {  
      
      this.getchatinfo();

      // storage.getAllKeys(event => {
      //     // modal.toast({ message: event.result })
      //     if (event.result === 'success') {
      //       for (let index = 0; index < event.data.length; index++) {
      //         storage.removeItem(event.data[index], event => {})
      //       }
              
      //     }
      // })

    },
    methods: {
      minibarLeftButtonClick () {
      },
      minibarRightButtonClick () {
        VueEvent.$emit('toNews','hide');
        this.$router.push('/puttext');
      },
      // jump (event) {
      //   this.$router.push('/chat');
      //   VueEvent.$emit('toNews','hide');
      // },
      jump(id,event){
        this.$router.push('/chat/'+JSON.stringify({id:id.userid,name:id.username}));
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
        storage.getAllKeys(event => {
          let akey= 0;
          for (let index = 0; index < event.data.length; index++) {
            if (event.data[index]==(this.userInfo.userid+'localChatInfo')) {
                    // modal.alert({
                    //   message: "1001",
                    //   okTitle: '确认'
                    // }, function () {});
              akey=1;
              storage.getItem(this.userInfo.userid+'localChatInfo',e=>{
                let list=[];
                list=JSON.parse(e.data)

                          // modal.alert({
                          //   message: "200",
                          //   okTitle: '确认'
                          // }, function () {});
                for (let index_2 = 0; index_2 < this.chatInfo.length; index_2++) {
                  let bkey= 0;
                  // modal.alert({
                  //           message: this.chatInfo.length,
                  //           okTitle: '确认'
                  //         }, function () {});
                  // modal.alert({
                  //           message: this.chatInfo,
                  //           okTitle: '确认'
                  //         }, function () {});
                  for (let index_3 = 0; index_3 < list.length; index_3++) {
                          // modal.alert({
                          //   message: "300",
                          //   okTitle: '确认'
                          // }, function () {});
                    if (this.chatInfo[0][index_2].userid==list[index_3][0].userid) {
                      bkey=1;
                      // modal.alert({
                      //       message: this.chatInfo[index_2][0].userid+'qqqq',
                      //       okTitle: '确认'
                      //     }, function () {});
                      // modal.alert({
                      //       message: list[index_3][0].userid+'wwwww',
                      //       okTitle: '确认'
                      //     }, function () {});
                    }
                  }
                  if (bkey==0) {
                    list.push(this.chatInfo[index_2]);
                    storage.setItem(this.userInfo.userid+'localChatInfo', JSON.stringify(list),()=>{
                      storage.getItem(this.userInfo.userid+'localChatInfo', event_2 => { 
                          this.localChatInfo=JSON.parse(event_2.data)
                          // modal.alert({
                          //   message: "1000",
                          //   okTitle: '确认'
                          // }, function () {});
                      });
                    });
                  }
                }
              })
              
            }
            
          }

          if (akey==0) {
            let list = [];
            for (let index = 0; index < this.chatInfo.length; index++) {
               list.push(this.chatInfo[index])
            }
 
            // modal.alert({
            //         message: list+'444444',
            //         okTitle: '确认'
            //       }, function () {});

            storage.setItem(this.userInfo.userid+'localChatInfo', JSON.stringify(list),()=>{
              storage.getItem(this.userInfo.userid+'localChatInfo', event_2 => { 
                this.localChatInfo=JSON.parse(event_2.data);
  
              });
            });
          }


        });
        
        
      },
      getchatinfo(){
        storage.getItem('userinfo', event => { 
                    //console.log('get value:', event.data)
          this.userInfo =  JSON.parse(event.data);
          
          this.getNews();

          setTimeout(() => {
            this.getItem();
          }, 5000); 

          storage.getItem(this.userInfo.userid+'localChatInfo', event_2 => { 
                            this.localChatInfo=JSON.parse(event_2.data)
                            // modal.alert({
                            //   message: this.localChatInfo,
                            //   okTitle: '确认'
                            // }, function () {});                            
          });
        });
      },

      setchatinfo(list){
       // storage.setItem('chatlocalinfo', JSON.stringify(list[0].userid), event => {})
        let key = JSON.stringify('user'+this.userInfo.userid+list[0].userid);
        storage.getAllKeys(event => {
          if (event.result === 'success') {
            let list_two=[];
            let akey=0;//用于判断for循环中if条件是否成立，不成立怎for循环结束为0
            
            for(let i=0;i<event.data.length;i++){
              
              if (event.data[i]==key) {
                akey=1;
                storage.getItem(key, e => {
                  list_two=JSON.parse(e.data);
                  for (let index = 0; index < list.length; index++) {
                    list_two.push(list[index]);
                  } 
                  this.chatInfo.push(list_two);
                  // modal.alert({
                  //   message: '这里读取了本地记录',
                  //   okTitle: '确认'
                  // }, function () {
                  // });
                  storage.setItem(JSON.stringify('user'+this.userInfo.userid+list_two[0].userid), JSON.stringify(list_two), event => {})

                });
              }
            }
            if (akey==0) {
              this.chatInfo.push(list);
              list_two=list
              storage.setItem(JSON.stringify('user'+this.userInfo.userid+list_two[0].userid), JSON.stringify(list_two), event => {})
              // modal.alert({
              //       message: '这里是新的记录',
              //       okTitle: '确认'
              // }, function () {
              // });
            };
             
          }
        })
      },
      getNews(){
        stream.fetch({
          method: 'POST',
          url: IP + '/chat',
          body: this.toParams({
            userid: this.userInfo.userid,
            password: this.userInfo.password,
          }),  
          type:'json'
        }, (ret)=> {
          if(!ret.ok){
            //this.getchatinfo();
          }else{
            //this.chatInfo=ret.data;
            let list=[];
            for (let index = 0; index < ret.data.length; index++) {
              if(index==0){
                list.push(ret.data[index])
              }else if(ret.data[index].userid==ret.data[index-1].userid){
                list.push(ret.data[index])
              }else if(ret.data[index].userid!=ret.data[index-1].userid){
                //this.chatInfo.push(list);
                this.setchatinfo(list)
                list=[];
                list.push(ret.data[index])
              }
              if(ret.data.length==1){
                //this.chatInfo.push(list); 
                this.setchatinfo(list)
              }else if(index==ret.data.length-1){//&&(ret.data[index].userid==ret.data[index-1].userid)
                this.setchatinfo(list)
                //this.chatInfo.push(list);
              }
            }

            
            //storage.setItem('chatinfo', JSON.stringify(this.chatInfo), event => {})
          }
        });
      },
    },
  };
</script>