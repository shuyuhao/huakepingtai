<template>
  <div class='vuefooter'>
    <div class="button" @click="jump()">
        <text class="buttomText" >buttom1</text>
    </div>
    <div class="button" @click="jump()">
        <text class="buttomText" >buttom2</text>
    </div>
    <div class="button" @click="jump()">
        <text class="buttomText" >buttom3</text>
    </div>
  </div>
</template>

<script>

  const modal = weex.requireModule('modal')

export default {

  name: 'App',
  components: {

  },
  methods:{
    jump(){
      modal.toast({message:"页面跳转",duration: 2});
    }
  },
  created(){
    
  },
  data () {
    return {

    }
  },
}
</script>

<style scoped fixed>
    .vuefooter{
        direction:ltr;
        flex-direction:row;
        height: 100px;
        width: 750px;
    }
    .buttomText{
        font-size: 60px;
        text-align: center;
    }
    .button{
        height: 100px;
        width: 248px;
        margin-left: 1px;
        margin-right: 1px;
        background-color: blue;

    }
</style>