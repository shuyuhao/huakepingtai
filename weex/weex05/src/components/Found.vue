<!-- 搜索栏文件 -->

<template>
    <div class="container">
    <div class="demo">
      <wxc-searchbar ref="wxc-searchbar"
                     default-value='最新资讯'
                     @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"
                     @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                     @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                     @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                     @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                     @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"></wxc-searchbar>
      <text class="value-text">{{value}}</text>
    </div>
    </div>
</template>

<script>

  import { WxcSearchbar } from 'weex-ui'
  export default {
    components: { WxcSearchbar },
    data: () => ({
      value: ''
    }),
    methods: {
      wxcSearchbarInputOnFocus () {
      },
      wxcSearchbarInputOnBlur () {
      },
      wxcSearchbarInputReturned (){
      },
      wxcSearchbarCloseClicked () {
      },
      wxcSearchbarInputOnInput (e) {
        this.value = e.value;
      },
      wxcSearchbarCancelClicked () {
      },
    }
  };
</script>

<style scoped>
    .newstext{
        font-size:50px;
    }
</style>