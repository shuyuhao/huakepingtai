<!-- 用户主页-->

<template>
    <div class="user">
        <div class="userinfo">
            <image class='returnimg' style="width:45px;height:56px" :src="leftButton" @click='jumpBack()'></image>
            <text class="userchat" @click="jump2()">私聊</text> 
            <div class="userinfo_">
                <div class="img">
                    <image style="width:150px;height:150px" src="local:///touxiang_one"></image>
                </div>
                <text class="username">{{userInfo.username}}</text>   
            </div>
        </div>
        <list>
            <cell v-for="item in postInfo">
                <div class="panel" @click="jump(item.postid)">
                    <text class="textListtitle">{{item.title}}</text>
                    <text class="textListcontent">{{item.txt}}</text>
                </div>
            </cell>
        </list>
    </div>
</template>

<style scoped>
    .user{
        width: 750px;
    }

    .userinfo{
        width: 750px;
        height:350px;
        background-color:#f9f9f9;
    }

    .userinfo_{
        width: 750px;
        height:250px;
        align-items: center;
        background-color:#f9f9f9;
    }

    .img{
        height: 150px;
        width: 150px;
        margin-top: 19px;
        border-style: solid;
        border-radius: 75px;
    }

    .username{
        margin-top:10px;
        font-size: 45px;
        color: #3d3d3d;
    }

    .panel {
        width: 720px;
        height: 200px;
        margin-left: 15px;
        margin-right: 15px;
        margin-top: 2px;
        margin-bottom: 2px;
        flex-direction: column;
        justify-content: center;
        border-width: 2px;
        border-style: solid;
        border-color: rgb(176, 176, 176);
        background-color: rgba(240,240,240, 0.5);
    }
    .textListtitle {
        font-size: 50px;
        lines:1;
        text-align: center;
        color: #418883;
    }
    .textListcontent {
        font-size: 35px;
        lines:2;
        text-align: center;
        color: #418883;
    }
    .returnimg{
        margin:15px;
    }
    .userchat{
        position: absolute;
        top: 20;
        right: 25;
        font-size: 35px;
        color: #3d3d3d;
    }
</style>

<script>

import VueEvent from '@/js/vueevent.js'
import {IP} from '@/weex_ui/urlconfig.js';
import { CART_ICON, RETURN_ICON } from '../weex_ui/type';
const stream = weex.requireModule('stream');
const modal = weex.requireModule('modal');
const storage = weex.requireModule('storage');

    export default {
        data(){
            return{
                userInfo:[],
                postInfo:[],
                leftButton: RETURN_ICON,
                //jumpUrl:'/userweextext/',
            }
        },
        created(){
            this.userInfo=JSON.parse(this.$route.params.id);
            
            this.getText();
            
            VueEvent.$emit('toNews','hide');
        },
        methods:{
            jumpBack(){
                VueEvent.$emit('toNews','show');
                this.$router.go(-1);
            },
            jump(id,event){
                let value = {"id":id,"where":"userpostsinfo"};
                this.$router.push('/userweextext/'+JSON.stringify(value));
            },
            jump2(id,event){
                this.$router.push('/userchat/'+JSON.stringify({id:this.userInfo.userid,name:this.userInfo.username}));
                VueEvent.$emit('toNews','hide');
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
            getText(){//用以区分申请类型，刷新还是加载，首页，还是资讯页面。
                stream.fetch({
                    method: 'POST',
                    url: IP + '/getuserposts',
                    body: this.toParams({
                        userid: this.userInfo.userid,
                    }),  
                    type:'json'
                }, (ret)=> {
                    if(!ret.ok){
                    }else{
                        this.postInfo=ret.data;
                        // modal.alert({
                        //     message: this.postInfo,
                        //     okTitle: '确认'
                        // }, function () {
                        //     console.log('alert callback')
                        // });
                        storage.setItem('userpostsinfo', JSON.stringify(this.postInfo), event => {})
                    }
                });
            },
        }
    }
</script>