<!-- 用户信息界面-->

<template>
    <div class="user">
        <div class="userinfo">
            <image class='returnimg' style="width:45px;height:56px" :src="leftButton" @click='jumpBack()'></image>
            <div class="userinfo_">
                <div class="img">
                    <image style="width:150px;height:150px" src="local:///touxiang_one"></image>
                </div>
                <text class="username">{{userInfo.username}}</text>   
            </div>
        </div>
        <div>
            <div class="panal"><text class="text">账&nbsp;&nbsp;&nbsp;&nbsp;号:&nbsp;&nbsp;{{userInfo.userid}}</text></div>
            <div class="panal"><text class="text">用户名:&nbsp;&nbsp;{{userInfo.username}}</text></div>
            <div class="panal"><text class="text">密&nbsp;&nbsp;&nbsp;&nbsp;码:&nbsp;&nbsp;{{userInfo.password}}</text></div>
        </div>
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


    .panal{
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
    .text{
        margin-left:25px;
        font-size: 45px;
        color: #3d3d3d;
    }
    .returnimg{
        margin:15px;
    }
</style>

<script>

import VueEvent from '@/js/vueevent.js'
import { CART_ICON, RETURN_ICON } from '../weex_ui/type';
const stream = weex.requireModule('stream');
const modal = weex.requireModule('modal');
const storage = weex.requireModule('storage');

    export default {
        data(){
            return{
                userInfo:[],
                leftButton: RETURN_ICON,
            }
        },
        created(){
            this.userInfo=JSON.parse(this.$route.params.id);
        },
        methods:{
            jumpBack(){
                VueEvent.$emit('toNews','show');
                this.$router.go(-1);
            },
            jump(value,event){
                if(value=="注销"){
                    this.removeItem();
                }
            }
        }
    }
</script>