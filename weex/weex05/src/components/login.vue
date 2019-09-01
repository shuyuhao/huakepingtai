<!-- 登录页面-->


<template>
  <div class='login'>
    <text class="title">账&nbsp;&nbsp;&nbsp;&nbsp;号：</text>
    <div>
      <input class="input" type="text"  @input="onIdInput"></input>
    </div>
    <text class="title">密&nbsp;&nbsp;&nbsp;&nbsp;码：</text>
    <div>
      <input class="input" type="text"  @input="onPasswordInput"></input>
    </div>
    <div class="buttom">
      <div class="panel"><text class="text" @click="login()">登录</text></div>
    </div>
    <div class="buttom">
      <div class="panel"><text class="text" @click="Jump()">注册</text></div>
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
      userid:'',
      password:'',

    },
    methods : {

      onIdInput: function(e) {
        this.userid = e.value
      },
      onPasswordInput: function(e) {
        this.password = e.value
      },
      Jump(){
        this.$router.push('/register');
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
      login(){
      // console.log()

        // modal.toast({
        //             message: 'ananana',
        //             duration: 0.3
        //         });

        if (!this.userid || !this.password) {
            modal.toast({
                message: '账号或者密码不能为空',
                duration: 1
            });
            return;
        }

        var _this = this;
        //var _url = IP+':8989/register';
        stream.fetch({
            method: 'POST',
            url: IP+'/login',
            body: _this.toParams({ 
                userid: _this.userid,
                password: _this.password+'',
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
                    message: ret.data['0'],
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
    margin-bottom:0px
  }
  .login{
    width:750px;
  }
</style>