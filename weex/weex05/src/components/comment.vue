<!-- 评论 -->

<template>
    <div class="user">
        <div class="demo"> <!-- 帖子容器的头部-->
          <wxc-minibar title="评论"
                       background-color="#009ff0"
                       text-color="#FFFFFF"
                       :use-default-return="false"
                       :left-button="leftButton"
                       @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                       right-text=""></wxc-minibar>
        </div>
        <list>
            <cell v-for="item in list">
                <div class="panel">
                    <text class="usertext">{{item.username}} :</text>
                    <text class="textListcontent">{{item.txt}}</text>
                    <text class="datetext">{{item.commentdate}}</text>
                </div>
            </cell>
        </list>
    </div>
</template>

<style scoped>
    .user{
        width: 750px;
        height: 1170px;
    }
    .demo{
        height:100;
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
    .usertext {
        position: absolute;
        top: 10;
        left: 20;
        font-size: 35px;
        color: #3f48cc;
    }
    .textListcontent {
        position: absolute;
        font-size: 38px;
        lines:2;
        left: 30;
        right: 30;
        color: #3d3d3d;
    }
    .datetext {
        position: absolute;
        bottom: 10;
        right: 20;
        font-size: 30px;
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
const picker = weex.requireModule('picker');

    export default {
        data(){
            return{
                list:[],
                lists: ['A', 'B', 'C', 'D', 'E'],
                someInfo:{},
                rightButton: CART_ICON,
                leftButton: RETURN_ICON,
            }
        },
        components: {WxcMinibar},
        created(){
            this.someInfo=JSON.parse(this.$route.params.id);
            this.getText();
            //VueEvent.$emit('toNews','hide');
        },
        methods:{
            wxcRichTextLinkClick (e) {
                console.log(e);
            },
            minibarLeftButtonClick () {
                //VueEvent.$emit('toNews','show');
                this.$router.go(-1);
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
                    url: IP + '/comment',
                    body: this.toParams({
                        userid: this.someInfo.userid,
                        password:this.someInfo.password,
                        //txt:txt,
                        postid: this.someInfo.postid,
                    }),  
                    type:'json'
                }, (ret)=> {
                    if(!ret.ok){
                    }else{
                        this.list = ret.data;
                        //this.list_2 = ret.data;
                        // modal.alert({ 
                        //     message: this.list, 
                        //     okTitle: '确认'
                        // },  ()=> {});

                    }
                });
            },
        }
    }
</script>