
<!-- 注册页面-->


<template>
  <div class='register'>
    <text class="title">用户名：</text>
    <div>
      <input class="input" type="text"  @input="onUserInput"></input>
    </div>
    <text class="title">密&nbsp;&nbsp;&nbsp;&nbsp;码：</text>
    <div>
      <input class="input" type="text"  @input="onPasswordInput"></input>
    </div>
    <text class="title">密&nbsp;&nbsp;&nbsp;&nbsp;码：</text>
    <div>
      <input class="input" type="text"  @input="onOtherInput"></input>
    </div>
    <div class="buttom">
      <div class="panel"><text class="text" @click="register()">注册</text></div>
    </div>
  </div>
</template>
<script>

import {IP} from '@/weex_ui/urlconfig.js';
import VueEvent from '@/js/vueevent.js'
const storage = weex.requireModule('storage');
const stream = weex.requireModule('stream') || {};
const modal = weex.requireModule('modal');


  module.exports = {
    data : {
      username:'',
      password:'',
      otherpassword:'',

    },
    methods : {

      onUserInput: function(e) {
        this.username = e.value
      },
      onPasswordInput: function(e) {
        this.password = e.value
      },
      onOtherInput: function(e) {
        this.otherpassword = e.value
      },
      toParams(obj) {
        var param = "";
        for(const name in obj) {
            if(typeof obj[name] != 'function') {
                param += '&' + name + '=' + encodeURIComponent(obj[name])
            }
        }
        return param.substring(1);
      },
      register(){
      // console.log()

        if (!this.username || !this.password || !this.otherpassword) {
            modal.toast({
                message: '称呼或者密码不能为空',
                duration: 1
            });
            return;
        }

        if (this.password != this.otherpassword) {
            modal.toast({
                message: '两次输入的密码不一致',
                duration: 1
            });
            return;
        }

        var _this = this;
        //var _url = IP+':8989/register';
        stream.fetch({
            method: 'POST',
            url: IP+'/register',
            body: _this.toParams({
                username: _this.username,
                password: _this.password,
            }),
            type: 'json'
        }, function(ret) {
            if(!ret.ok) {
                modal.toast({
                    message: 'Request faild!',
                    duration: 0.3
                });
            } else { 

                storage.setItem('userinfo', JSON.stringify({
                    userid: ret.data['0'].userid,
                    username: ret.data['0'].username,
                    password: ret.data['0'].password,
                }), event => {
                    VueEvent.$emit('toNews','show');
                    _this.$router.go(-1); 
                })
                modal.alert({
                  message: ret.data.password,
                  okTitle: '确认'
                }, function () {
                  console.log('alert callback')
                })
            }
        })
     }
      
    }
  }
</script>

<style scoped>
  .title {
      font-size:35px;
      margin-left:15px;
      margin-top:15px;
      margin-bottom:15px
  }
  .input{
    width: 650px;
    height:100px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    border-radius:5px;
    placeholder-color: #41B883;
    margin-left: 50px;
    padding-left: 20px;
    font-size: 30px;
  }
  .panel {
    height: 100px;
    width:350px;
    flex-direction: column;
    justify-content: center;
    border-width: 2px;
    border-style: solid;
    border-radius:10px;
    border-color: rgb(221, 221, 221);
    background-color: rgba(233, 233, 233, 0.5);
    padding: 10px;
    padding-top: 20px;
  }
  .text{
    text-align:center;
    font-size:40px;
  }
  .buttom{
    width:750px;
    flex-direction: column;
    justify-content: center;
    margin-left:200px;
    margin-top:50px; 
    margin-bottom:30px
  }
  .register{
    width:750px;
  }
</style>