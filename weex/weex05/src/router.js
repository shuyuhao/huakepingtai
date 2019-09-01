import Router from 'vue-router'

import HomePage from '@/components/HomePage.vue'

import Notice from '@/components/Notice.vue' 

import News from '@/components/News.vue'

import User from '@/components/User.vue'

import Weextext from '@/components/Weextext.vue'

import PutText from '@/components/putText.vue'

import PutTextNext from '@/components/PutTextNext.vue'

import Chat from '@/components/Chat.vue'

import Register from '@/components/register.vue'

import Login from '@/components/login.vue'

import Usertest from '@/components/Usertest.vue'

import UserInfo from '@/components/UserInfo.vue'

import UserHome from '@/components/UserHome.vue'

import UserCollection from '@/components/UserCollection.vue'

import UserFollow from '@/components/UserFollow.vue'

import Test from '@/components/test.vue'

import Comment from '@/components/comment.vue'





Vue.use(Router)

export const router = new Router({

    routes:[
        {
            path:'/one',
            components:{homepage: HomePage,
                        notice: Notice,
                        news: News,
                        user: User
            }
        },
        {
            path:'/homeweextext/:id', 
            components:{homepage:Weextext}
        },
        {
            path:'/noticeweextext/:id', 
            components:{notice: Weextext,}
        },
        {
            path:'/newsweextext/:id', 
            components:{news: Weextext}
        },
        {
            path:'/userweextext/:id', 
            components:{user: Weextext}
        },
        {
            path:'/puttext',
            components:{news: PutText}
        },
        {
            path:'/puttextnext',
            components:{news: PutTextNext}
        },
        {
            path:'/three',
            components:{homepage: Weextext}
        },
        {
            path:'/chat/:id',
            components: {news: Chat}
        },
        {
            path:'/register',
            components: {
                homepage: Register,
                user: Register,
                news: Register,
            }
        },
        {
            path:'/login',
            components: {
                homepage: Login,
                user: Login,
                news: Login,
            }
        },
        {
            path:'/usertest',
            components: {user: Usertest}
        }, 
        {
            path:'/userinfo/:id', 
            components:{user: UserInfo}
        },
        {
            path:'/userhome/:id', 
            components:{user: UserHome}
        },
        {
            path:'/usercollection/:id', 
            components:{user: UserCollection}
        },
        {
            path:'/userfollow/:id', 
            components:{user: UserFollow}
        },
        {
            path:'/homepageuserhome/:id', 
            components:{homepage: UserHome}
        },
        {
            path:'/test', 
            components:{user: Test}
        },
        {
            path:'/comment/:id', 
            components:{//user: Comment,
                        homepage: Comment
            }
        },
        {
            path:'/userchat/:id',
            components: {user: Chat}
        },




    ]

});