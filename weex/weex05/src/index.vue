<!-- 入口vue文件 -->

<template>
  <div>
  <div class="weexfooter">
     <wxc-tab-bar :tab-titles="tabTitles"
               :tab-styles="tabStyles"
               title-type="icon"
               @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <!-- 第一个页面内容-->
    <div class="item-container" :style="contentStyle"><router-view name="homepage"></router-view></div>

    <!-- 第二个页面内容-->
    <div class="item-container" :style="contentStyle"><router-view name="notice"></router-view></div>

    <!-- 第三个页面内容-->
    <div class="item-container" :style="contentStyle"><router-view name="news"></router-view></div>

    <!-- 第四个页面内容-->
    <div class="item-container" :style="contentStyle"><router-view name="user"></router-view></div>
  </wxc-tab-bar>
  </div>
  </div>
</template>

<script>
  import {WxcTabBar,Utils } from 'weex-ui'
  import Config from './weex_ui/Config.js'
  import VueEvent from '@/js/vueevent.js'
  const storage = weex.requireModule('storage');
  const modal = weex.requireModule('modal');

  export default {
    data: () => ({
      tabTitles: Config.tabTitles,
      tabStyles: Config.tabStyles,
      contentStyle:{height:0},

    }),
    components: { WxcTabBar},
    methods: {
      wxcTabBarCurrentTabSelected (e) {
        const index = e.page;
        // console.log(index);
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
    }, 
    created () {
      // 如果页面没有导航栏，可以用下面这个计算高度的方法
      const tabPageHeight = (weex.config.env.deviceHeight / weex.config.env.deviceWidth*750);
      this.contentStyle = { height: (tabPageHeight - this.tabStyles.height) };
      VueEvent.$on('toNews',(data)=>{
        if(data=='show'){
            this.tabStyles = Config.tabStyles;
            this.contentStyle = { height: (tabPageHeight - this.tabStyles.height) };
         }else {
            this.tabStyles = Config.tabStyles_hide;
            this.contentStyle = { height: (tabPageHeight - this.tabStyles.height) };
         }
      })
      this.getAll();
    },
  };
</script>

<style scoped>
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
    align-items: center;
  }
  .text{
    font-size: 50px;
  }
  .weexfooter{
    flex:1;
  }
</style>