import Vue from 'vue'
import VueRouter from "vue-router";
import Home from "@/pages/back/Home";
import Login from "@/pages/back/Login";
import Delivery from "@/pages/back/Delivery";
import Dish from "@/pages/back/Dish/Dish";
import Member from "@/pages/back/Member";
import Order from "@/pages/back/Order";
import addDish from "@/pages/back/Dish/addDish";
import updateDish from "@/pages/back/Dish/updateDish";
import addCategory from "@/pages/back/Dish/addCategory";
import User from "@/pages/front/user/User";
import Userlogin from "@/pages/front/Userlogin";
import Register from "@/pages/front/Register";
import Forgetpassword from "@/pages/front/Forgetpassword";
import userhome from "@/pages/front/user/Userhome";
import Userorder from "@/pages/front/user/Userorder";
import Usermy from "@/pages/front/user/Usermy";
import Dishdetail from "@/pages/front/user/Dishdetail";
import Pay from "@/pages/front/user/Pay";


Vue.use(VueRouter)

const router1=new VueRouter({
    routes:[
        {
          path:'/',
          name:'Index',
            redirect:{name:"Login"}
        },
        {
            path:'/home',
            component:Home,
            redirect:{name: 'member'},
            children:[ //通过children配置子级路由
                {
                  path:'addCategory',
                  component:addCategory
                },
                {
                  path:'addDish',
                  component:addDish
                },
                {
                  path:'updateDish',
                  component:updateDish
                },
                {
                    path:'delivery',
                    component:Delivery
                },
                {
                    path:'dish',
                    component:Dish
                },
                {
                    name:'member',
                    path:'member',
                    component:Member,

                },
                {
                    path:'order',
                    component:Order
                },
            ]
        },
        {
            path:'/user',
            component:User,
            redirect:{name: 'userhome'},
            children:[
                {
                    name:'userhome',
                    path: '/userhome',
                    component: userhome,
                    meta: {active: 0}
                },
                {
                    name: 'userorder',
                    path: '/userorder',
                    component: Userorder,
                    meta: {active: 1}
                },
                {
                    name: 'usermy',
                    path: '/usermy',
                    component: Usermy,
                    meta: {active: 2}
                },
                {
                    path: '/dishdetail',
                    component: Dishdetail
                },
                {
                    path: '/pay',
                    component: Pay
                }
            ]
        },
        {
          path:'/userlogin',
          component:Userlogin
        },
        {
          path:'/register',
          component:Register
        },
        {
            name:'Login',
            path:'/login',
            component:Login
        },
        {
            path:'/forgetpassword',
            component:Forgetpassword
        }
    ]

})

export default router1
