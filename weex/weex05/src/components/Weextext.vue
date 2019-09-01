<!-- 帖子主界面-->

<template>
  <div class="wx-demo" :style="wxdemoStyle">
    <div class="demo"> <!-- 帖子容器的头部-->
          <wxc-minibar title=""
                       background-color="#009ff0"
                       text-color="#FFFFFF"
                       :use-default-return="false"
                       :left-button="leftButton"
                       @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                       right-text="关注作者"></wxc-minibar>
    </div>
    <div :style="middle">
    <scroller class="scroller" ><!-- 中间主体-->
      <div class="wrapper">
          <div class="type-container">
            <wxc-rich-text class="special-rich"
                          :config-list="configTitleString"></wxc-rich-text>
          </div>
          <div class='biaoqian'>
            <wxc-rich-text class="special-rich"
                          :config-list="configList"
                          @wxcRichTextLinkClick="wxcRichTextLinkClick"></wxc-rich-text>
          </div>
          <div class='line'></div>
          <div class='mainbodydiv'>
            <text class='mainbodytext'>{{postinfo.txt}}</text>
          </div>
      </div>
    </scroller>
    </div>
    <div class="footer">
      <textbottom :postComment="postComment" :weextext="this"></textbottom>
    </div>
  </div>

</template>

<style scoped>
  .demo{
    height:100;
  }
  .wx-demo {
    position: absolute;
    left: 0;
    right: 0;
    background-color: #fafafa;
  }
  .scroller {
    flex:1;
  }
  .wrapper {
    padding-bottom: 30px;
    padding-top: 10px;
  }
  .type-container {
    margin-bottom: 20px;
    margin-top: 20px;
    align-items: center;
    width: 750px;
  }
  .special-rich {
    margin-top: 14px;
  }
  .biaoqian{
    margin-bottom: 20px;
    margin-top: 20px;
    margin-left:80px;
    margin-right:80px;
  }
  .line{
    height:2px;
    left:0;
    right:0;
    background-color: blue;
  }
  .mainbodydiv{
    padding-top:10px;
    padding-left:20px;
    padding-right:15px;
    padding-bottom:30px;
    margin-bottom: 20px;
    align-items: center;
  }
  .mainbodytext{
    font-size:35px;
  }
  .footer{
    height:100;
    left:0;
    right:0;
  }


</style>
<script>
  import { WxcRichText, WxcSpecialRichText,WxcMinibar} from 'weex-ui';
  import { CART_ICON, RETURN_ICON } from '../weex_ui/type';
  import VueEvent from '@/js/vueevent.js'
  import {IP} from '@/weex_ui/urlconfig.js';
  import WeexTextBottom from './Weextext_bottom.vue'
  const modal = weex.requireModule('modal');
  const storage = weex.requireModule('storage');
  const stream = weex.requireModule('stream') || {};
  export default {
    components: { WxcRichText, WxcSpecialRichText,WxcMinibar,'textbottom':WeexTextBottom},
    data: () => ({
      postKey:{},
      //postid,
      content:"",
      user:[],
      localpostsinfo:[],
      postinfo:[],
      wxdemoStyle:{},
      middle:{},
      rightButton: CART_ICON,
      leftButton: RETURN_ICON,
      configTitleString: [{
          type: 'text',
          value: '帖子主题',
          theme: 'black',
          style: {
            fontSize: 45,
          }
        }],
      configList: [],
    }),
    created () {
      this.postKey=JSON.parse(this.$route.params.id);
      // modal.alert({
      //               message: this.postKey.id,
      //               okTitle: '确认'
      //           }, function () {
      //               console.log('alert callback')
      //           });
      //this.add(); 
      this.getItem();
      this.wxdemoStyle={height:(weex.config.env.deviceHeight / weex.config.env.deviceWidth*750)+'px'};
      this.middle={height:((weex.config.env.deviceHeight / weex.config.env.deviceWidth*750)-250)+'px'};
    },
    methods: {
      wxcRichTextLinkClick (e) {
        console.log(e);
      },
      minibarLeftButtonClick () {
        VueEvent.$emit('toNews','show');
        this.$router.go(-1);
      },
      minibarRightButtonClick () {
        //关注
        stream.fetch({
            method: 'POST',
            url: IP+'/follow',
            body: this.toParams({
                userid: this.user.userid,
                password: this.user.password,
                followedid:this.postinfo.userid,
            }),
            type: 'json'
        }, (ret)=> {
            if(!ret.ok) {
                modal.toast({
                    message: 'Request faild!',
                    duration: 0.3
                });
            } else { 
              if(ret.data.code=="2000"){
                modal.alert({
                    message: "作者已被关注",
                    okTitle: '确认'
                },  ()=> {});
              }else if(ret.data.code=="2002"){
                modal.alert({ 
                    message: "关注成功", 
                    okTitle: '确认'
                },  ()=> {});
              }
            }
        })
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

      postComment(txt){
        let _txt = txt;

        if (!_txt) {
            modal.toast({
                message: '评论不能为空',
                duration: 1
            });
            return;
        };

        // modal.alert({
        //             message: "postComment运行了",
        //             okTitle: '确认'
        //         },  ()=> {});

        var _this = this;
        stream.fetch({
            method: 'POST',
            url: IP+'/postcomment',
            body: _this.toParams({
                userid: this.user.userid,
                password: this.user.password,
                postid:this.postKey.id,
                txt:_txt,
            }),
            type: 'json'
        }, (ret)=> {
            if(!ret.ok) {
                modal.toast({
                    message: 'Request faild!',
                    duration: 0.3
                });
            } else { 
              txt='想想'
            }
        })
      },

      postDianzanShoucang(akey){

        // modal.alert({
        //             message: akey+"运行了",
        //             okTitle: '确认'
        //         },  ()=> {});

        stream.fetch({
            method: 'POST',
            url: IP+'/postdianzanshoucang',
            body: this.toParams({
                userid: this.user.userid,
                password: this.user.password,
                postid:this.postKey.id,
                akey:akey
            }),
            type: 'json'
        }, (ret)=> {
            if(!ret.ok) {
                modal.toast({
                    message: '网络异常',
                    duration: 0.3
                });
            } else {
              let message;
              if(ret.data.code=="300"){
                message='点赞失败，已对该贴进行过点赞';
              }else if(ret.data.code=="400"){
                message='该贴已被收藏'
              }else if(ret.data.code=="201") {
                message='点赞成功'
              }else if(ret.data.code=="202") {
                message='收藏成功'
              }else if(ret.data.code=="500") {
                message='取消点赞'
              }else if(ret.data.code=="600") {
                message='取消收藏'
              }else if(ret.data.code=="000") {
                message='错误'
              }
              modal.toast({
                    message: message,
                    duration: 0.3
              });

            }
        })
      },


      getItem () {
        storage.getItem('userinfo', event => {
            this.user =  JSON.parse(event.data);
            // modal.alert({
            //         message: this.user,
            //         okTitle: '确认'
            //     },  ()=> {
            //         console.log('alert callback')
            //     });
        });

        storage.getItem(this.postKey.where, event => {
            this.localpostsinfo  =  JSON.parse(event.data);
            // modal.alert({
            //         message: this.localpostsinfo,
            //         okTitle: '确认'
            //     },  ()=> {});
            for (let index = 0; index < this.localpostsinfo.length; index++) {
              if (this.localpostsinfo[index].postid==this.postKey.id) {
                this.postinfo=this.localpostsinfo[index];
                // modal.alert({
                //     message: JSON.parse(this.postinfo.labelid),
                //     okTitle: '确认'
                // },  ()=> {});
                this.configTitleString[0].value=this.postinfo.title;
                
                for (let index = 0; index < JSON.parse(this.postinfo.labelid).length; index++) {
                  this.configList.push({
                    type: 'tag',
                    value: JSON.parse(this.postinfo.labelid)[index].labelname,
                    style: {
                      fontSize: 25,
                      color: '#ffffff',
                      borderColor: '#3a46f7',
                      backgroundColor: 'rgba(58, 70, 247, 0.8)',
                      height: 38
                    }
                  })   
                }
                return;
              }
            }
        });
      },
    }
  };
</script>