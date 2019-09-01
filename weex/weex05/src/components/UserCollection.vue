<!-- 收藏页面 -->

<template>
    <div class="user">
        <div class="demo"> <!-- 帖子容器的头部-->
          <wxc-minibar title="收藏"
                       background-color="#009ff0"
                       text-color="#FFFFFF"
                       :use-default-return="false"
                       :left-button="leftButton"
                       @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                       right-text=""></wxc-minibar>
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
    .demo{
        height:100;
    }

    .userinfo{
        width: 750px;
        height:350px;
        background-color:#ffffff
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
</style>

<script>

import VueEvent from '@/js/vueevent.js'
import {IP} from '@/weex_ui/urlconfig.js';
import { WxcMinibar} from 'weex-ui';
import { CART_ICON, RETURN_ICON } from '../weex_ui/type';
const stream = weex.requireModule('stream');
const modal = weex.requireModule('modal');
const storage = weex.requireModule('storage');

    export default {
        data(){
            return{
                userInfo:[],
                postInfo:[],
                rightButton: CART_ICON,
                leftButton: RETURN_ICON,
            }
        },
        components: {WxcMinibar},
        created(){
            this.userInfo=JSON.parse(this.$route.params.id);
            this.getText();
            VueEvent.$emit('toNews','hide');
        },
        methods:{
            wxcRichTextLinkClick (e) {
                console.log(e);
            },
            minibarLeftButtonClick () {
                VueEvent.$emit('toNews','show');
                this.$router.go(-1);
            },
            jump(id,event){
                let value = {"id":id,"where":"usercollectioninfo"};
                this.$router.push('/userweextext/'+JSON.stringify(value));
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
                    url: IP + '/getcollectionposts',
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
                        storage.setItem('usercollectioninfo', JSON.stringify(this.postInfo), event => {})
                    }
                });
            },
        }
    }
</script>