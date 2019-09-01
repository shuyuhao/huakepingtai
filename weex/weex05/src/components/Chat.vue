
<template>
    <div>
        <div class="demo"> <!-- 聊天容器的头部-->
          <wxc-minibar :title="name"
                       background-color="#009ff0"
                       text-color="#FFFFFF"
                       :use-default-return="false"
                       :left-button="leftButton"
                       @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                       right-text="更多"></wxc-minibar>
        </div>
        <list class="chatlist" :style="middleStyle"><!-- 聊天容器的中间消息部分-->
            <cell v-for="item in list">
                <div class='newsright' v-if='item.userid!==touserid'>
                    <div class="touxiang">
                        <image style="width:70px;height:70px" src="local:///touxiang_one"></image>
                    </div>
                    <div class="textdiv"><text class="newstext">{{item.txt}}</text></div>
                </div>
                <div class='newsleft' v-if='item.userid==touserid'>
                    <div class="touxiang">
                        <image style="width:70px;height:70px" src="local:///touxiang_two"></image>
                    </div>
                    <div class="textdiv"><text class="newstext">{{item.txt}}</text></div>      
                </div>
            </cell>
        </list>
        <div class="footer"><!-- 聊天容器的底部input框部分-->
            <div>
                <input test-id="input-obj" ref="range" class="input" upriseOffset="30" type="text" placeholder="input placeholder" @input="eventInput" @change="onChange" @focus="onFocus" @blur="onBlur" @keyboard="onKeyBoard"></input>
            </div>
            <text class="buttom" @click="fasong()">{{"发送"}}</text>
        </div>
    </div>
</template>

<script>

import {WxcMinibar} from 'weex-ui';
import { CART_ICON, RETURN_ICON } from '../weex_ui/type';
import VueEvent from '@/js/vueevent.js'
import {IP} from '@/weex_ui/urlconfig.js';

const stream = weex.requireModule('stream');
const modal = weex.requireModule('modal');
const storage = weex.requireModule('storage');

    export default {
        components: {WxcMinibar},
        data() {
            return {
                rightButton: CART_ICON,
                leftButton: RETURN_ICON,
                userInfo:[],
                middleStyle:{},
                name:'',
                news:'',
                touserid:'',
                list:[]
            };
        },
        created() {
            this.touserid = JSON.parse(this.$route.params.id).id;
            this.name = JSON.parse(this.$route.params.id).name;
            this.getuserinfo();
            
            //this.middleStyle={height:(weex.config.env.deviceHeight / weex.config.env.deviceWidth*750)-240}
            setTimeout(() => {
                this.getNews();
                this.getOwnNews();
            }, 1000);
            
        },
        methods: {
            minibarLeftButtonClick () {
                VueEvent.$emit('toNews','show');
                this.$router.go(-1);
            },
            minibarRightButtonClick () {
                //this.$router.push('/three');
            },
            eventInput:function (e) {
            },
            onChange:function(e){
                this.news=e.value;
            },  
            onFocus:function (e) { 
            }, 
            onBlur:function (e) {
            },
            onKeyBoard: function(e) {
            },
            fasong(){
                this.postComment(this.news);
            },
            getuserinfo(){
                storage.getItem('userinfo', event => { 
                            //console.log('get value:', event.data)
                this.userInfo =  JSON.parse(event.data)
                //this.getNews();
                });
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
            getNews(){
                storage.getItem(JSON.stringify('user'+this.userInfo.userid+this.touserid),(e)=>{
                    let _list = [];
                    _list = JSON.parse(e.data);
                    for (let index = 0; index < _list.length; index++) {
                        this.list.push(_list[index]);
                    }

                    this.newsSort();





                });
            },

            getOwnNews(){
                storage.getItem(JSON.stringify('touser'+this.userInfo.userid+this.touserid),(e)=>{
                    let _list = [];
                    _list = JSON.parse(e.data);
                    for (let index = 0; index < _list.length; index++) {
                        this.list.push(_list[index]);
                    }

                    this.newsSort();


                });
            },

            newsSort(){
                let _list = this.list;
                let value ={};
                for (let index = 0; index < _list.length-1; index++) {
                    for (let index_2 = 0; index_2 < _list.length-1-index; index_2++) {
                        if(_list[index_2].chatid>_list[index_2+1].chatid){
                            value = _list[index_2];
                            _list[index_2] = _list[index_2+1];
                            _list[index_2+1] = value;
                        }
                    }
                }
                this.list= _list;
            },


            setchatinfo(chatid,txt){
                let key = JSON.stringify('touser'+this.userInfo.userid+this.touserid);
                storage.getAllKeys(event => {
                if (event.result === 'success') {
                    let list_two=[];
                    let akey=0;//用于判断for循环中if条件是否成立，不成立怎for循环结束为0
                    
                    for(let i=0;i<event.data.length;i++){
                    
                    if (event.data[i]==key) {
                        akey=1;
                        storage.getItem(key, e => {
                            list_two=JSON.parse(e.data);
                            list_two.push({'chatid':chatid,'txt':txt,'userid':this.userInfo.userid,'touserid':this.touserid})
                            //this.chatInfo.push({'chatid':chatid,'txt':txt,'userid':this.userInfo.userid,'touserid':this.touserid});
                            storage.setItem(key, JSON.stringify(list_two), event => {
                                this.list=[];
                                this.getOwnNews();
                                this.getNews();
                            })

                        });
                    }
                    }
                    if (akey==0) {
                    //this.chatInfo.push({'chatid':chatid,'txt':txt,'userid':this.userInfo.userid,'touserid':this.touserid});
                    list_two.push({'chatid':chatid,'txt':txt,'userid':this.userInfo.userid,'touserid':this.touserid});
                    storage.setItem(key, JSON.stringify(list_two), event => {
                        this.list=[];
                        this.getOwnNews();
                        this.getNews();
                    })
                        
                    };
                    
                }
                })
            },



            postComment(txt){

                if (!txt) {
                    modal.toast({
                        message: '消息不能为空',
                        duration: 1
                    });
                    return;
                };

                // modal.toast({
                //         message: '11111',
                //         duration: 1
                //     });

                stream.fetch({
                    method: 'POST',
                    url: IP+'/postchat',
                    body: this.toParams({
                        userid: this.userInfo.userid,
                        password: this.userInfo.password,
                        touserid:this.touserid,
                        txt:txt,
                    }),
                    type: 'json'
                }, (ret)=> {
                    if(!ret.ok) {
                        modal.toast({
                            message: 'Request faild!',
                            duration: 0.3
                        });
                    } else { 
                        this.setchatinfo(ret.data.chatid,ret.data.txt);

                    }
                })
            },
        },

        
    }
</script>

<style scoped>
    .newsleft{
        flex-direction:row;
        direction:ltr;
        padding-top:10px;
        padding-bottom:10px;
        margin-bottom:50px;
    }
    .newsright{
        flex-direction:row;
        direction:rtl;
        padding-top:10px;
        padding-bottom:10px;
        margin-bottom:50px;
    }
    .touxiang{
        height:70;
        width:70;
        background-color:blue;
        margin-left:10px;
        margin-right:10px;
    }
    .chatlist{
        width:750px;
        height: 1000px;
    }
    .newstext{
        font-size:30px;
        line-height:50px;
        text-align:left;
        max-width: 350px;
    }
    .textdiv{
        padding:10px;
        border-style:solid;
        border-width:2px;
        border-color:#000000;
        border-radius:10px;
    }
    .input{
        width: 570px;
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
        background-color:#fafafa;
        flex-direction:row;
        direction:ltr;
    }
    .buttom{
        height:70px;
        width:120px;
        margin:15px;
        padding:15px;
        border-radius: 10px;
        background-color:rgba(81, 81, 81, 0.3);
        color:#3d3d3d;
        font-size:35px;
        text-align:center;
    }
</style>
