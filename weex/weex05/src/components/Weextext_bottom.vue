<template>
  <div>
    <div class="footer">
        <div>
            <input test-id="input-obj" ref="range" class="input" type="text" placeholder="" @input="eventInput" @change="onChange" @focus="onFocus" @blur="onBlur" @keyboard="onKeyBoard"></input>
        </div>
        <image class="img"  style="width: 70px; height: 70px;" :src="img_pinglun" @click="jumpPingLun()"></image>
        <image class="img"  style="width: 70px; height: 70px;" :src="img_dianzan" @click="changeDianzan()"></image>
        <image class="img"  style="width: 70px; height: 70px;" :src="img_shoucan" @click="changeShouCang()"></image>
    </div>
  </div>
</template>
<script>

  import { PINGLUN_ICON,DIANZAN_FLASE_ICON,DIANZAN_TRUE_ICON,SHOUCAN_FLASE_ICON,SHOUCAN_TRUE_ICON,RETURN_ICON} from '../weex_ui/type';
  const modal = weex.requireModule('modal');

  module.exports = {
    data: ()=> ({
      state:'',
      keyboard_state: '',
      img_pinglun:PINGLUN_ICON,
      img_dianzan:DIANZAN_FLASE_ICON,
      img_shoucan:SHOUCAN_FLASE_ICON,
    }),
    props:['postComment','weextext'],
    methods : {
      eventInput:function (e) {
        this.state='input: ' + JSON.stringify(e)
      },
      onChange:function(e){
            modal.confirm({
            message: e.value,
            okTitle:"发送",
            cancelTitle:"取消",
            duration: 0.3
        }, (value)=>{
              // modal.alert({
              //       message: value,
              //       okTitle: '确认'
              //   },  ()=> {
              //       console.log('alert callback')
              //   });
            if (value=="发送") {
              this.weextext.postComment(e.value);
              e.value='新的数据';
            }else if(value=="取消"){
              
            } 

        })
      },  
      onFocus:function (e) {
        this.state='focus: '+ JSON.stringify(e) 
      }, 
      onBlur:function (e) {
        this.state='blur: '+ JSON.stringify(e)
      },
      onKeyBoard: function(e) {
        this.keyboard_state = "\n onkeyboard: " + JSON.stringify(e)
      },
      setRange() {
        this.$refs.range.setSelectionRange(1, 4);
      },
      getRange() {
        this.$refs.range.getSelectionRange(params => {
          this.state = `当前文本选区为 ${params.selectionStart} ~ ${params.selectionEnd}`;
          this.keyboard_state = "";
        });
      },
      changeDianzan(){
        if (this.img_dianzan==DIANZAN_FLASE_ICON) {
          this.weextext.postDianzanShoucang("dianzanadd");
          this.img_dianzan=DIANZAN_TRUE_ICON;
        }else{
          this.weextext.postDianzanShoucang("dianzandelect");
          this.img_dianzan=DIANZAN_FLASE_ICON;
        }
      },
      
      changeShouCang(){
        if (this.img_shoucan==SHOUCAN_FLASE_ICON) {
          this.weextext.postDianzanShoucang("shoucanadd");
          this.img_shoucan=SHOUCAN_TRUE_ICON;
        }else{
          this.weextext.postDianzanShoucang("shoucandelect");
          this.img_shoucan=SHOUCAN_FLASE_ICON;
        }
        
      },
      jumpPingLun(){
        this.$router.push('/comment/'+JSON.stringify({"postid":this.weextext.postKey.id,'userid':this.weextext.user.userid,'password':this.weextext.user.password}));
      }
    }
  }
</script>

<style scoped>
  .input{
    width: 420px;
    height:70px;
    border-radius: 10px;
    placeholder-color: #3d3d3d;
    background-color: rgba(81, 81, 81, 0.3);
    margin: 15px;
    margin-left: 30px;
    margin-right:0px;
    padding-left: 20px;
    font-size: 28px;
  }
  .footer{
    height:100px;
    width:750px;
    left:0;
    right:0;
    background-color:#fafafa;
    padding-right:30px;
    flex-direction:row;
    direction:ltr;
  }
  .img{
    margin:15px;
    margin-right:0px;
    margin-left:20px
  }
</style>