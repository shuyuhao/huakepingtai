<!-- 用户界面-->

<template>
    <div class="user">

        <div class="buttom" @click="getAll()"></div>
        <div class="buttom" @click="jump2()"></div>
        <div class="buttom" @click="jump3()"></div>
        <div class="buttom" @click="getItem()"></div>
        <div class="buttom" @click="removeItem()"></div>
        <div class="buttom" @click="removeItem2()"></div>
        
        <list>
            <cell v-for="item in list">
                <text>{{item}}</text>
            </cell>
            <!-- <cell v-for="item in list">
                <text>{{item['0'].username}}</text>
            </cell> -->
        </list>
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
</style>

<script>

import VueEvent from '@/js/vueevent.js'
const stream = weex.requireModule('stream');
const modal = weex.requireModule('modal');
const storage = weex.requireModule('storage');

    export default {
        data(){
            return{
                list:[],
            }
        },
        created(){
            // let url = 'http://10.12.87.72:8989';
            // this.getNews(url,res=>{ 
            //     this.list=res.data
            // })
        },
        methods:{
            getNews(url,callback){
                return stream.fetch({
                    method:'GET',
                    type:'json',
                    url:url,
                },callback)
            },
            jump (event) {
                this.$router.push('/register');
                VueEvent.$emit('toNews','hide');
            },
            jump2 (event) {
                storage.getItem(JSON.stringify('user9106866220'), event => {
                    //console.log('get value:', event.data)
                    this.list =  JSON.parse(event.data)
                })  
            },
            jump3 (event){
                storage.getItem('userinfo', event => {
                    //console.log('get value:', event.data)
                    this.list =  JSON.parse(event.data)
                })  
            },
            getItem () {
                storage.getItem('localChatInfo', event => {
                    //console.log('get value:', event.data)
                    this.list =  JSON.parse(event.data)
                })  
            }, 
            removeItem () {
                storage.removeItem(JSON.stringify('touser9106866220'), event => {})
            },
            removeItem2 () { 
                storage.removeItem(JSON.stringify('user9106866220'), event => {});
                storage.removeItem(JSON.stringify('user2706004418'), event => {});
                storage.removeItem(JSON.stringify('user9377587390'), event => {});
            },
            getAll(){
                storage.getAllKeys(event => {
                    // modal.toast({ message: event.result })
                    if (event.result === 'success') {
                        modal.alert({
                            message: event.data,
                            okTitle: '确认'
                        }, function () {
                            console.log('alert callback')
                        })
                    }
                })
                
            },
            
        }
    }
</script>