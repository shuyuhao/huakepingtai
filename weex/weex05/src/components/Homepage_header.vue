<!-- 首页的头部导航栏-->

<template>
  <div class="container">
    <div class="demo">
      <wxc-minibar title="首页"
                   background-color="#009ff0"
                   text-color="#FFFFFF"
                   leftButton=""
                   right-text="更多"
                   @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                   @wxcMinibarRightButtonClicked="minibarRightButtonClick"></wxc-minibar>
    </div>
    <wxc-popup popup-color="rgb(230, 230, 230)"
               :show="isBottomShow"
               @wxcPopupOverlayClicked="popupOverlayBottomClick"
               pos="top"
               height="400">
        <text  class="err" v-if="textShow">{{message}}</text>

        <list>
          <cell v-for="(item,index) in buttonList">
            <!-- <text>{{index}}{{item}}</text> -->
            <scroller class="demo-content-next" >
              <div v-for="row in item.childList">
                <wxc-button class="buttonsize"
                                :text="row.labelname"
                                :textStyle="textStyle"
                        @wxcButtonClicked="wxcButtonClicked(row.labelid)"></wxc-button>
              </div>
            </scroller>      
          </cell>
        </list>
    </wxc-popup>
  </div>
</template>

<script>
  import { WxcMinibar } from 'weex-ui';
  import { WxcOverlay } from 'weex-ui';
  import VueEvent from '@/js/vueevent.js'
  import { WxcPopup } from 'weex-ui';
  import { WxcButton } from 'weex-ui';
  import {IP} from '@/weex_ui/urlconfig.js';
  const modal = weex.requireModule('modal');
  const storage = weex.requireModule('storage');
  const stream = weex.requireModule('stream') || {};

  export default {
    components: { WxcMinibar ,WxcPopup ,WxcButton},
    data: () => ({
      message:'',
      textShow:false,
      buttonList:[],
      postsinfo:[],
      isBottomShow: false,
      height: 400,
      btnStyle: {
        backgroundColor: '#19be6b'
      },
      textStyle:{
      color: '#000000' ,
      fontSize: '40px'
      },
    }),
    created() {
      
    },
    methods: {
      minibarRightButtonClick () {
        this.getlabel();
        this.openBottomPopup ();
      },
      openBottomPopup () {
        this.isBottomShow = true;
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
      //非状态组件，需要在这里关闭
      popupOverlayBottomClick () {
        this.isBottomShow = false;
      },
      wxcButtonClicked (value,e) {
        // modal.toast({message:value,duration:2});

        stream.fetch({
        method: 'POST',
          url: IP + '/foundposts',
          body: this.toParams({
              labelid: value
          }),  
          type:'json'
        }, (ret)=> {
          if(!ret.ok){
            modal.toast({
              message: 'Network Error!请检查网络',
              duration: 3
            });

          }else{

            this.postsinfo = ret.data;

              //提示list刷新数据

            // modal.alert({
            //         message: this.postsinfo,
            //         okTitle: '确认'
            //     }, function () {
            //         console.log('alert callback')
            //     });
            storage.setItem('loaclpostsinfo', JSON.stringify(this.postsinfo), event => {
              VueEvent.$emit('foundposts','true');
            })

          }
        });

      },
      getlabel(){
        stream.fetch({
          method: 'GET',
          url: IP + '/label',
          type:'json'
        }, (ret)=>{
          if(!ret.ok){
            this.textShow=true;
            this.message='网络故障';
          }else{
            this.textShow=false;
            this.buttonList=[];
            let i = 0;
            for (let index = 0; index < (Math.floor(ret.data.length/3)+1);index++) {
              let childList=[];
              for (let index_2 = 0; index_2 < 3; index_2++) { 
                if (i<ret.data.length) {
                  childList.push(ret.data[i]);
                  i++; 
                }
              };
              this.buttonList.push({"childList":childList});
            };
          }
        });
      },
    }
  };
</script>

<style scoped>
  .buttonsize{
    height:70px;
    width:210px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
    background-color:#cbcbcb;
  }
  .demo-content-next{
    direction:ltr;
    flex-direction:row;
    margin-left: 15px;
    margin-right: 15px;
  }
  .container{
    height:100px;
  }
  .err{
    font-size: 50px;
    text-align: center;
    color: #3d3d3d;
  }
</style>