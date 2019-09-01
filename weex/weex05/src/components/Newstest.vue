<!-- 消息界面-->

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
            <cell v-for="item in followUserInfo">
                <div class="panel" @click="jump(item)">
                    <text class="textListtitle">{{item.username}}</text>
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
        width: 750px;
        height: 125px;
        margin-top: 1px;
        margin-bottom: 1px;
        flex-direction: column;
        justify-content: center;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(176, 176, 176);
        background-color: rgba(240,240,240, 0.5);
    }
    .textListtitle {
        margin-left:25px;
        font-size: 45px;
        color: #3d3d3d;
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
                followUserInfo:[],
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
                this.$router.push('/userhome/'+JSON.stringify(id));
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
                    url: IP + '/getfollow',
                    body: this.toParams({
                        userid: this.userInfo.userid,
                    }),  
                    type:'json'
                }, (ret)=> {
                    if(!ret.ok){
                    }else{
                        this.followUserInfo=ret.data;
                        modal.alert({
                            message: this.followUserInfo,
                            okTitle: '确认'
                        }, function () {
                            console.log('alert callback')
                        });
                        // storage.setItem('usercollectioninfo', JSON.stringify(this.postInfo), event => {})
                    }
                });
            },
        }
    }
</script>