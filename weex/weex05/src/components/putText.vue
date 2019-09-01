<!--发帖界面-->

<template>
    <div>
        <div class="demo">
          <wxc-minibar title=""
                       background-color="#009ff0"
                       text-color="#3d3d3d"
                       :use-default-return="false"
                       :left-button="leftButton"
                       @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                       right-text="下一步"></wxc-minibar>
        </div>
        <newtextarea></newtextarea>
    </div>
</template>

<style scoped>
    .newstext{
        font-size:50px;
        right:0;
        left:0;
    }
    .buttom{
        height: 50px;
        background-color: blue;
        right:0;
        left:0;
    }
</style>

<script>

import { WxcMinibar } from 'weex-ui';
const modal = weex.requireModule('modal');
import { setTitle } from '../weex_ui/set-nav';
import { CART_ICON, RETURN_ICON } from '../weex_ui/type';
import VueEvent from '@/js/vueevent.js'
import Textarea from './Textarea.vue'

  export default {

    data: () => ({
      rightButton: CART_ICON,
      leftButton: RETURN_ICON,
    }),

    components:{'newtextarea':Textarea,WxcMinibar},

    methods: {
      minibarLeftButtonClick () {
        VueEvent.$emit('puttextsave');
        VueEvent.$emit('toNews','show');
        this.$router.go(-1);
      },
      minibarRightButtonClick () {
        VueEvent.$emit('puttextsave');
        this.$router.push('/puttextnext');
      },
    }
  };
</script>