<!-- 消息界面-->

<template>
    <div>
        <div class="demo">
          <wxc-minibar title="右侧带icon的导航栏"
                       background-color="#009ff0"
                       @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                       leftButton=""
                       :right-button="rightButton"></wxc-minibar>
        </div>
        <text class="newstext">消息界面</text>
        <div class="chat" @click="jump"></div>
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
      height: 180px;
      align-items: flex-start;
    }
    .chat{
    height:100;
    width:750;
    background-color:blue;
    }
</style>

<script>

  import { WxcMinibar } from 'weex-ui';
  const modal = weex.requireModule('modal');
  import { setTitle } from '../weex_ui/set-nav';
  import { CART_ICON, RETURN_ICON } from '../weex_ui/type';
  import VueEvent from '@/js/vueevent.js'

  export default {

    data: () => ({
      rightButton: CART_ICON,
      leftButton: RETURN_ICON
    }),

    components:{ WxcMinibar},
    methods: {
      minibarLeftButtonClick () {
      },
      minibarRightButtonClick () {
        VueEvent.$emit('toNews','hide');
        this.$router.push('/puttext');
      },
      jump (event) {
        this.$router.push('/chat');
        VueEvent.$emit('toNews','hide');
      },
    },
    created () {
    },
  };
</script>