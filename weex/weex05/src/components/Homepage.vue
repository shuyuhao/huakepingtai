<!-- 首页文件-->

<template>
    <div>
        <homepageheader/>
        <homepagemiddle :page="page"></homepagemiddle>
    </div>
</template>

<script>

  import Middle from './list.vue';
  import Header from "./Homepage_header.vue";
  import VueEvent from '@/js/vueevent.js'
  const storage = weex.requireModule('storage');


  export default {
    data() {
      return {
        page :'/homeweextext/'
      };
    },
    components: {'homepagemiddle':Middle,'homepageheader':Header},
    created (){
    },

    methods: {
    },
  };
</script>

<style scoped>
</style>

