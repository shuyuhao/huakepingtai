<template>
  <div class="wrapper">
    <div>
      <textarea class="textarea" :value='titleValue' :style="titleStyle" :rows='TitleRowNum' @input="titleOninput" @change="titleOnchange" @focus="titleOnfocus" @blur="titleOnblur"></textarea>
    </div>
    <div class="line"></div>
    <div>
      <textarea class="textarea" :value='textValue' :style="textStyle" :rows='TextRowNum' @input="textOninput" @change="textOnchange" @focus="textOnfocus" @blur="textOnblur"></textarea>
    </div>
    <!-- <text>{{titleValue}}</text>
    <text>{{textValue}}</text> -->
  </div>
  
</template>

<script>
  import VueEvent from '@/js/vueevent.js';
  const modal = weex.requireModule('modal');
  const storage = weex.requireModule('storage');

  export default {
    
    data: () => ({
      titleStyle:[{
        color: '#707070',
      }],
      textStyle:[{
        color: '#707070',
      }],
      titleValue:'请输入一个主题',
      textValue:'请在此输入正文',
      titleTips:'show',
      textTips:'show',
      TitleRowNum:1,
      TextRowNum:8,
      textInfo:[]
    }),


    created(){
        VueEvent.$on('puttextsave',()=>{
          this.pushItem();
        });
        
    },

    mounted(){
        this.getItem();
    },

    methods: {
      titleOninput (event) {
        console.log('oninput:', event.value)
        modal.toast({
          message: `oninput: ${event.value}`,
          duration: 0.8
        })

        this.titleValue=event.value;
      },
      titleOnchange (event) {
        console.log('onchange:', event.value)
        modal.toast({
          message: `onchange: ${event.value}`,
          duration: 0.8
        })
      },
      titleOnfocus (event) {
        console.log('onfocus:', event.value)
        modal.toast({
          message: `onfocus: ${event.value}`,
          duration: 0.8
        })
        if(this.titleTips=="show"){
          this.titleValue=""
          this.titleTips='hide'
          this.titleStyle={color:"#3d3d3d"}
        }
      },
      titleOnblur (event) {
        console.log('onblur:', event.value)
        modal.toast({
          message: `input blur: ${event.value}`,
          duration: 0.8
        })
        if(this.titleValue==""){
          this.titleValue='请输入一个主题';
          this.titleTips='show';
          this.titleStyle={color:"#707070"}
        }
      },
      textOninput (event) {
        console.log('oninput:', event.value)
        modal.toast({
          message: `oninput: ${event.value}`,
          duration: 0.8
        })
        this.textValue=event.value;
      },
      textOnchange (event) {
        console.log('onchange:', event.value)
        modal.toast({
          message: `onchange: ${event.value}`,
          duration: 0.8
        })
      },
      textOnfocus (event) {
        console.log('onfocus:', event.value)
        modal.toast({
          message: `onfocus: ${event.value}`,
          duration: 0.8
        })

        if(this.textTips=="show"){
          this.textValue="";
          this.textTips='hide';
          this.textStyle={color:"#3d3d3d"}
        }
      },
      textOnblur (event) {
        console.log('onblur:', event.value)
        modal.toast({
          message: `input blur: ${event.value}`,
          duration: 0.8
        })

        if (this.textValue=="") {
          this.textValue='请在此输入正文';
          this.textTips='show';
          this.textStyle={color:"#707070"}
        } 
      },
      pushItem(){
        storage.setItem('textinfo', JSON.stringify({
                    title: this.titleValue,
                    txt: this.textValue,
                }))
      },
      getItem () {
        storage.getItem('textinfo', event => {
          //console.log('get value:', event.data)
          this.textInfo =  JSON.parse(event.data)
          if(this.textInfo!=null){
            this.titleTips='hide';
            this.textTips='hide';
            this.titleStyle={color:"#3d3d3d"};
            this.textStyle={color:"#3d3d3d"};
            this.titleValue=this.textInfo.title;
            this.textValue=this.textInfo.txt;
          };
        });
        

      }
    }
  }
</script>

<style scoped>
    .wrapper{
        width:750px;
    }
    .textarea {
      width:750px;
      padding-top:20px;
      padding-bottom:20px;
      padding-left:40px;
      padding-right:40px;
      font-size:40px;
    }
    .line{
      height:2px;
      left:10;
      right:10;
      background-color: blue;
    }
</style>