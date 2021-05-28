import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";


const Login = () => import("../views/Login/Login.vue");
// const Init = () => import("../views/Init/Init.vue");
// const Location = () => import("../views/Location/Location.vue");
// const UserInfo = () => import("../views/UserInfo/UserInfo.vue");
// const PersonInfo = () => import("../views/PersonInfo/PersonInfo.vue");
// const MessageContent = () => import("../views/MessageContent/MessageContent.vue");
// const PhysicalSign = () => import("../views/PhysicalSign/PhysicalSign.vue");
// const Analysis = () => import("../views/Analysis/Analysis.vue");
// const Fake = () => import("../views/Fake/Fake.vue");
// const Warning = () => import("../views/Warning/Warning.vue");

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: { title: 'Login', requiresAuth: true }
    },
    {
        path: '/Init',
        redirect: "/Init/Location",
        meta: { title: 'Main', requiresAuth: true }
    },
    // {
    //     path: '/UserInfo',
    //     component: UserInfo,
    //     meta: { title: 'UserInfo', requiresAuth: true }
    // },
    // {
    //     path: '/MessageContent',
    //     component: MessageContent,
    //     meta: { title: 'MessageContent', requiresAuth: true }
    // },
    // {
    //     path: '/PhysicalSign',
    //     component: PhysicalSign,
    //     meta: { title: 'PhysicalSign', requiresAuth: true }
    // },
    // {
    //     path: '/Init',
    //     name: 'Init',
    //     component: Init,
    //     meta: { title: 'Init', requiresAuth: true },
    //     children: [
    //         {
    //             path: '/Init/Location',
    //             name: 'Location',
    //             component: Location,
    //             meta: { title: 'Location', requiresAuth: true }

    //         },
    //         {
    //             path: '/Init/PersonInfo',
    //             component: PersonInfo,
    //             meta: { title: 'PersonInfo', requiresAuth: true }
    //         },
    //         {
    //             path: '/Init/Analysis',
    //             name: 'Analysis',
    //             component: Analysis,
    //             meta: { title: 'Analysis', requiresAuth: true }

    //         },
    //         {
    //             path: '/Init/Fake',
    //             name: 'Fake',
    //             component: Fake,
    //             meta: { title: 'Fake', requiresAuth: true }

    //         },
    //         {
    //             path: '/Init/Warning',
    //             name: 'Warning',
    //             component: Warning,
    //             meta: { title: 'Warning', requiresAuth: true }

    //         },
    //     ]
    // }
];

const router = new VueRouter({
    routes
});

//导航守卫
// router.beforeEach((to, from, next) => {
//     // 不在登录页面
//     if (to.path !== '/') {
//         // 存在sessionStorage就可以进行访问，否则就回到登录页面，防止不登录就可以访问
//         if (sessionStorage.getItem("token")) {
//             next();
//         } else {
//             next('/');
//         }
//     } else {
//         next();
//     }
// })
// 在跳转之后页面显示设置
router.afterEach(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});


export default router;
