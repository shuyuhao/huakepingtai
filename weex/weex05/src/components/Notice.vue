<!-- 资讯界面-->
<template>
    <div>
        <Found/>
        <NoticeMiddle class="noticemiddle" :page="page"></NoticeMiddle>
    </div>
</template>

<script>

import Found from "./Found.vue";
import NoticeMiddle from "./list.vue";

export default {
  
  components: {Found,NoticeMiddle },
  methods:{
    
  },
  data () {
    return {
      page:'/noticeweextext/',
    }
  },
}
</script>

<style scoped>
    .noticemiddle{
      height: 1250px;
    }
</style>