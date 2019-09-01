<!-- 用户界面-->

<template>
    <div class="user">
        <div class="userinfo">
            <div class="img">
                <image style="width:150px;height:150px" src="local:///touxiang_one"></image>
            </div>
            <text class="username">{{userInfo_.username}}</text> 
        </div>
        <list>
            <cell class="list" v-for="item in list">
                <text class="text" @click="jump(item)">{{item}}</text>
            </cell>
        </list>
        <!-- <div class="buttom" @click="jump3()"></div> -->
    </div>
</template>

<style scoped>
    .newstext{
        font-size:50px;
    }
    .user{
        width: 750px;
    }
    .buttom{
        width: 300px;
        height: 100px;
        margin-top: 20px;
        background-color: blue;
    }
    .userinfo{
        width: 750px;
        height:350px;
        align-items: center;
        background-color:#f9f9f9
    }
    .img{
        height: 150px;
        width: 150px;
        margin-top: 85px;
        border-style: solid;
        border-radius: 75px;
    }
    .list{
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
    .username{
        margin-top:10px;
        font-size: 45px;
        color: #3d3d3d;
    }
    .text{
        margin-left:25px;
        font-size: 45px;
        color: #3d3d3d;
    }
</style>

<script>

import VueEvent from '@/js/vueevent.js'
const stream = weex.requireModule('stream');
const modal = weex.requireModule('modal');
const storage = weex.requireModule('storage');

    export default {
        data(){
            return{
                list:["个人主页","用户信息","收藏","关注","注销",],
                userInfo:'',
                userInfo_:[],
            }
        },
        created(){
            this.getItem();
        },
        methods:{
            jump3(){
                this.$router.push('/test');
            },
            removeItem () {
                storage.removeItem('userinfo', event => {
                    //console.log('delete value:', event.data)
                    //this.state = 'deleted'
                    this.list=[];
                    this.$router.push('/login');
                    VueEvent.$emit('toNews','hide');
                })
            },
            jump(value,event){
                if(value=="注销"){
                    this.removeItem();
                }else if(value=='用户信息'){
                    this.$router.push('/userinfo/'+this.userInfo);
                    VueEvent.$emit('toNews','hide');
                }else if(value=='个人主页'){
                    this.$router.push('/userhome/'+this.userInfo);
                    VueEvent.$emit('toNews','hide');
                }else if(value=='收藏'){
                    this.$router.push('/usercollection/'+this.userInfo);
                    VueEvent.$emit('toNews','hide');
                }else if(value=='关注'){
                    this.$router.push('/userfollow/'+this.userInfo);
                    VueEvent.$emit('toNews','hide'); 
                }
            },
            getItem () {
                storage.getItem('userinfo', event => {
                    //console.log('get value:', event.data)
                    this.userInfo = event.data
                    this.userInfo_ = JSON.parse(this.userInfo) 
                })
            },
        }
    }
</script>