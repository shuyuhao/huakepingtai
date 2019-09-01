

<template>
  <div class="container" :style="{ height: height }">
    <div class="demo">
      <text class="text">配置颜色</text>
      <wxc-minibar title="标题"
                   background-color="#009ff0"
                   text-color="#FFFFFF"
                   right-text="更多"
                   @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                   @wxcMinibarRightButtonClicked="minibarRightButtonClick"></wxc-minibar>
    </div>
  </div>
</template>

<script>
  import { WxcMinibar } from 'weex-ui';
  import VueEvent from '@/js/vueevent.js'
  const modal = weex.requireModule('modal');

  export default {
    components: { WxcMinibar },
    methods: {
      minibarLeftButtonClick () {
      },
      minibarRightButtonClick () {
        VueEvent.$emit('rightbuttom');
      }
    }
  };
</script>