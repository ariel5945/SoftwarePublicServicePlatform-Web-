import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
    // 导航栏主页面
    // {
    //     path: "/",
    //     name: "home",
    //     meta: {
    //         title: "洛阳软件信息技术平台",
    //         isLogin: false, // 登录验证
    //         hideFoot: true, // 底部隐藏
    //         loginOut: false, // 登录后禁止进入
    //         navBg: false,
    //     },
    //     component: () => import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
    // },
    {
        path: "/indexH5",
        name: "indexH5",
        meta: {
            title: "洛阳软件信息技术平台H5",
            isLogin: false, // 登录验证
            hideFoot: true, // 底部隐藏
            hideQR: true,  //二维码图标隐藏
            loginOut: false, // 登录后禁止进入
            navBg: false,
        },
        component: () => import(/* webpackChunkName: "home" */ "../views/indexH5.vue"),
    },
    {
        path: "/",
        name: "index",
        meta: {
            title: "洛阳软件信息技术平台",
            isLogin: false, // 登录验证
            hideFoot: true, // 底部隐藏
            loginOut: false, // 登录后禁止进入
            navBg: false,
        },
        component: () => import(/* webpackChunkName: "home" */ "../views/index.vue"),
    }, {
        path: "/news",
        name: "News",
        meta: {
            title: "新闻动态",
            isLogin: false, // 登录验证
            hideFoot: false, // 底部隐藏
            loginOut: false, // 登录后禁止进入
        },
        component: () => import(/* webpackChunkName: "home" */ "../views/news/IndexMessageList.vue"),
    }, {
        path: "/newsdetail",
        name: "Newsdetail",
        meta: {
            title: "新闻动态detail",
            isLogin: false, // 登录验证
            hideFoot: false, // 底部隐藏
            loginOut: false, // 登录后禁止进入
            navBg: true,
        },
        component: () => import(/* webpackChunkName: "home" */ "../views/news/IndexMessageListdetail.vue"),
    }, {
        path: "/userRole",
        name: "userRole",
        meta: {
            title: "注册身份选择",
            isLogin: false, // 登录验证
            hideFoot: true,
            loginOut: true,
        },
        component: () => import(/* webpackChunkName: "userRole" */ "../views/userCenter/roleView.vue"),
    }, {
        path: "/yanzhengname",
        name: "yanzhengname",
        meta: {
            title: "用户验证",
            isLogin: false, // 用户验证
            hideFoot: true,
            loginOut: true,
        },
        component: () => import(/* webpackChunkName: "yanzhengname" */ "../views/userCenter/yanzhengname.vue"),
    }, {
        path: "/register",
        name: "register",
        meta: {
            title: "用户注册",
            isLogin: false, // 登录验证
            hideFoot: true,
            loginOut: true,
        },
        component: () => import(/* webpackChunkName: "register" */ "../views/userCenter/registerView.vue"),
    }, {
        path: "/forgot",
        name: "forgot",
        meta: {
            title: "忘记密码",
            isLogin: false, // 忘记密码
            hideFoot: true,
            loginOut: true,
        },
        component: () => import(/* webpackChunkName: "register" */ "../views/userCenter/forgotView.vue"),
    }, {
        path: "/login",
        name: "login",
        meta: {
            title: "用户登录",
            isLogin: false, // 登录验证
            hideFoot: true,
            loginOut: true,
        },
        component: () => import(/* webpackChunkName: "login" */ "../views/userCenter/loginView.vue"),
    }, {
        path: "/boutique",
        name: "boutiqueView", // 软件开发
        meta: {
            title: "开发项目",
            isLogin: false,
            hideFoot: false,
            loginOut: false,
        },
        component: () => import(/* webpackChunkName: "boutiqueView" */ "../views/boutique/boutiqueView.vue"),
    }, {
        path: "/boutiqueDetail",
        name: "boutiqueDetail", // 软件开发详情
        meta: {
            title: "软件开发详情",
            isLogin: false,
            hideFoot: false,
            loginOut: false,
        },
        component: () => import(/* webpackChunkName: "boutiqueDetail" */ "../views/boutique/boutiqueDetail.vue"),
    }, {
        path: "/development",
        name: "development", // 开发项目
        meta: {
            title: "开发项目",
            isLogin: false,
            hideFoot: false,
            loginOut: false,
        },
        component: () => import(/* webpackChunkName: "development" */ "../views/development/deveView.vue"),
    }, {
        path: "/developmentDetail",
        name: "developmentDetail", // 项目详情
        meta: {
            title: "项目详情",
            navOpen: "/development",
            isLogin: true,
            hideFoot: false,
            loginOut: false,
            navBg: true,
        },
        component: () => import(/* webpackChunkName: "developmentDetail" */ "../views/development/developmentDetail.vue"),
    }, {
        path: "/companyView",
        name: "companyView", // 入驻企业
        meta: {
            title: "入驻企业",
            isLogin: false,
            hideFoot: false,
            loginOut: false,
        },
        component: () => import(/* webpackChunkName: "developmentDetail" */ "../views/company/companyView.vue"),
    }, {
        path: "/companyDetail",
        name: "companyDetail", // 企业详情
        meta: {
            title: "企业详情",
            isLogin: false,
            hideFoot: false,
            loginOut: false,
            navBg: true,
        },
        component: () => import(/* webpackChunkName: "developmentDetail" */ "../views/company/companyDetail.vue"),
    }, {
        path: "/salon",
        name: "salon", // 技术沙龙入口
        meta: {
            title: "技术沙龙",
            isLogin: false,
            hideFoot: true,
            loginOut: false,
        },
        component: () => import(/* webpackChunkName: "salon" */ "../views/salon/salonView.vue"),
    }, {
        path: "/salonList",
        name: "salonList", // 技术沙龙
        meta: {
            title: "技术沙龙",
            navOpen: "/salon",
            isLogin: false,
            hideFoot: false,
            loginOut: false,
        },
        component: () => import(/* webpackChunkName: "salonList" */ "../views/salon/salonList.vue"),
    }, {
        path: "/salonDetial",
        name: "salonDetial", // 沙龙详情
        meta: {
            title: "沙龙详情",
            navOpen: "/salon",
            navBg: true,
            isLogin: true,
            hideFoot: false,
            loginOut: false,
        },
        component: () => import(/* webpackChunkName: "salonDetial" */ "../views/salon/salonDetial.vue"),
    }, {
        path: "/salonYy",
        name: "salonYy", // 沙龙详情
        meta: {
            title: "活动预约",
            navOpen: "/salon",
            navBg: true,
            isLogin: true,
            hideFoot: false,
            loginOut: false,
        },
        component: () => import(/* webpackChunkName: "salonYy" */ "../views/salon/salonYy.vue"),
    }, {
        path: "/epiboly",
        name: "epiboly", // 外包项目
        meta: {
            title: "外包项目",
            isLogin: false,
            hideFoot: false,
            loginOut: false,
            navBg: true,
        },
        component: () => import(/* webpackChunkName: "epiboly" */ "../views/epiboly/epibolyView.vue"),
    }, {
        path: "/epibolyDetail",
        name: "epibolyDetail", // 外包详情
        meta: {
            title: "外包详情",
            isLogin: true,
            hideFoot: false,
            loginOut: false,
            navBg: true,
            navOpen: "/epiboly"
        },
        component: () => import(/* webpackChunkName: "epibolyDetail" */ "../views/epiboly/epibolyDetail.vue"),
    }, {
        path: "/detection",
        name: "detection", // 项目检测
        meta: {
            title: "项目检测",
            isLogin: false,
            hideFoot: true,
            loginOut: false,
        },
        component: () => import(/* webpackChunkName: "detection" */ "../views/detectionView.vue"),
    }, {
        path: "/detectionList",
        name: "detectionList", // 项目检测
        meta: {
            title: "标准化测试流程",
            isLogin: false,
            loginOut: false,
            navBg: true,
        },
        component: () => import(/* webpackChunkName: "detection" */ "../views/detectionList.vue"),
    }, {
        path: "/detactionDetail",
        name: "detactionDetail", // 项目检测
        meta: {
            title: "项目检测",
            navOpen: "/detection",
            isLogin: false,
            hideFoot: false,
            loginOut: false,
            navBg: true,
        },
        component: () => import(/* webpackChunkName: "detectionDetail" */ "../views/detactionDetail.vue"),
    }, {
        path: "/resource",
        name: "resource", // 资源下载
        meta: {
            title: "资源下载",
            isLogin: false,
            hideFoot: true,
            loginOut: false,
        },
        component: () => import(/* webpackChunkName: "resource" */ "../views/resource/resourceView.vue"),
    }, {
        path: "/resourceDetail",
        name: "resourceDetail", // 下载列表页
        meta: {
            title: "资源下载",
            isLogin: false,
            hideFoot: false,
            loginOut: false,
            navOpen: "/resource",
        },
        component: () => import( /* webpackChunkName: "resourceDetail" */ "../views/resource/resourceDetail.vue"),
    }, {
        path: "/talents",
        name: "talents", // 人才中心
        meta: {
            title: "人才中心",
            isLogin: false,
            hideFoot: false,
            loginOut: false,
            navBg: false,
        },
        component: () => import(/* webpackChunkName: "talents" */ "../views/talentsView.vue"),
    }, {
        path: "/talentsDetail",
        name: "talentsDetail", // 人才中心
        meta: {
            title: "简历详情",
            isLogin: false,
            hideFoot: false,
            loginOut: false,
            navBg: true,
        },
        component: () => import(/* webpackChunkName: "talentsDetail" */ "../views/talentsDetail.vue"),
    }, {
        path: "/mail",
        name: "mail", // 站内信
        meta: {
            title: "站内信",
            isLogin: false,
            hideFoot: false,
            loginOut: false,
            navBg: true,
        },
        component: () => import(/* webpackChunkName: "mail" */ "../views/mail.vue"),
    },
    {
        path: "/onlineTraining",
        component: () => import(/* webpackChunkName: "onlineTraining" */ "../views/onlineTraining/onlineRouter.vue"),
        children: [
            {
                path: "/",
                name: "onlineTraining", // 线上培训
                meta: {
                    title: "线上培训",
                    isLogin: false,
                    hideFoot: true,
                    loginOut: false,
                },
                component: () => import(/* webpackChunkName: "video" */ "../views/onlineTraining/onlineIndex.vue"),
            }, {
                path: "video",
                name: "video", // 视频教程
                meta: {
                    title: "视频教程",
                    isLogin: false,
                    navOpen: "/onlineTraining",
                    hideFoot: false,
                    loginOut: false,
                },
                component: () => import(/* webpackChunkName: "video" */ "../views/onlineTraining/videoView.vue"),
            }, {
                path: "videoDetail",
                name: "videoDetail", // 视频详情
                meta: {
                    title: "视频详情",
                    navOpen: "/onlineTraining",
                    navBg: true,
                    islogin: false,
                    hideFoot: false,
                    loginOut: false,
                },
                component: () => import(/* webpackChunkName: "videoDetail" */ "../views/onlineTraining/videoDetail.vue"),
            }, {
                path: "exam",
                name: "exam", // 在线考试
                meta: {
                    title: "在线考试",
                    navOpen: "/onlineTraining",
                    islogin: false,
                    hideFoot: false,
                    loginOut: false,
                    navBg: true,
                },
                component: () => import(/* webpackChunkName: "exam" */ "../views/onlineTraining/examView.vue"),
            }, {
                path: "examList",
                name: "examList", // 考试分类
                meta: {
                    title: "考试分类",
                    navOpen: "/onlineTraining",
                    islogin: false,
                    hideFoot: false,
                    loginOut: false,
                    navBg: true,
                },
                component: () => import(/* webpackChunkName: "exam" */ "../views/onlineTraining/examList.vue"),
            }, {
                path: "examDetail",
                name: "examDetail", // 在线考试
                meta: {
                    title: "试卷详情",
                    navOpen: "/onlineTraining",
                    islogin: true,
                    hideFoot: false,
                    loginOut: false,
                    navBg: true,
                },
                component: () => import(/* webpackChunkName: "examDetail" */ "../views/onlineTraining/examDetail.vue"),
            },
        ],
    },
    {
        path: "/userCenter",
        component: () => import(/* webpackChunkName: "userCenter" */ "../views/userCenter/userView.vue"),
        children: [
            {
                path: "/",
                name: "userCenter", // 账户信息
                meta: {
                    title: "账户信息",
                    isLogin: false,
                    hideFoot: false,
                    loginOut: false,
                    navBg: true,
                },
                component: () => import(/* webpackChunkName: "userAccount" */ "../views/account/userAccount.vue"),
            }, {
                path: "publishProject",
                name: "publishProject", // 我发布的项目
                meta: {
                    title: "我发布的项目",
                    isLogin: true,
                    hideFoot: false,
                    loginOut: false,
                    navBg: true,
                },
                component: () => import(/* webpackChunkName: "publishProject" */ "../views/account/publishProject.vue"),
            }, {
                path: "inProject",
                name: "inProject", // 我参与的项目
                meta: {
                    title: "我参与的项目",
                    isLogin: true,
                    hideFoot: false,
                    loginOut: false,
                    navBg: true,
                },
                component: () => import(/* webpackChunkName: "inProject" */ "../views/account/inProject.vue"),
            }, {
                path: "publishEpiboly",
                name: "publishEpiboly", // 我发布的外包
                meta: {
                    title: "我发布的外包",
                    isLogin: true,
                    hideFoot: false,
                    loginOut: false,
                    navBg: true,
                },
                component: () => import(/* webpackChunkName: "publishEpiboly" */ "../views/account/publishEpiboly.vue"),
            }, {
                path: "inEpiboly",
                name: "inEpiboly", // 我参与的外包
                meta: {
                    title: "我参与的外包",
                    isLogin: true,
                    hideFoot: false,
                    loginOut: false,
                    navBg: true,
                },
                component: () => import(/* webpackChunkName: "inEpiboly" */ "../views/account/inEpiboly.vue"),
            }, {
                path: "detection",
                name: "detection", // 我的项目检测
                meta: {
                    title: "我的项目检测",
                    isLogin: true,
                    hideFoot: false,
                    loginOut: false,
                    navBg: true,
                },
                component: () => import(/* webpackChunkName: "detection" */ "../views/account/detection.vue"),
            }, {
                path: "publishSalon",
                name: "publishSalon", // 我发布的活动
                meta: {
                    title: "我发布的活动",
                    isLogin: true,
                    hideFoot: false,
                    loginOut: false,
                    navBg: true,
                },
                component: () => import(/* webpackChunkName: "publishSalon" */ "../views/account/publishSalon.vue"),
            }, {
                path: "inSalon",
                name: "inSalon", // 我参与的活动
                meta: {
                    title: "我参与的活动",
                    isLogin: true,
                    hideFoot: false,
                    loginOut: false,
                    navBg: true,
                },
                component: () => import(/* webpackChunkName: "inSalon" */ "../views/account/inSalon.vue"),
            }, {
                path: "password",
                name: "password", // 修改密码
                meta: {
                    title: "修改密码",
                    isLogin: true,
                    hideFoot: false,
                    loginOut: false,
                    navBg: true,
                },
                component: () => import(/* webpackChunkName: "password" */ "../views/account/password.vue"),
            }, {
                path: "userResume",
                name: "userCenter", // 我的简历
                meta: {
                    title: "我的简历",
                    isLogin: true,
                    hideFoot: false,
                    loginOut: false,
                    navBg: true,
                },
                component: () => import(/* webpackChunkName: "userResume" */ "../views/account/userResume.vue"),
            }, {
                path: "userExam",
                name: "userExam", // 考试信息
                meta: {
                    title: "考试信息",
                    isLogin: true,
                    hideFoot: false,
                    loginOut: false,
                    navBg: true,
                },
                component: () => import(/* webpackChunkName: "userExam" */ "../views/account/userExam.vue"),
            }, {
                path: "yuangongView",
                name: "yuangongView", // 企业员工
                meta: {
                    title: "企业员工",
                    isLogin: true,
                    hideFoot: false,
                    loginOut: false,
                    navBg: true,
                },
                component: () => import(/* webpackChunkName: "userExam" */ "../views/account/yuangong.vue"),
            },
        ],
    }, {
        path: "/privacy",
        name: "privacy", // 隐私协议
        meta: {
            title: "隐私协议",
            isLogin: false,
            hideFoot: false,
            loginOut: false,
            navBg: true,
        },
        component: () => import(/* webpackChunkName: "userExam" */ "../views/privacyView.vue"),
    }, {
        path: "/serviceAgreement",
        name: "serviceAgreement", // 服务协议
        meta: {
            title: "服务协议",
            isLogin: false,
            hideFoot: false,
            loginOut: false,
            navBg: true,
        },
        component: () => import(/* webpackChunkName: "userExam" */ "../views/serviceAgreement.vue"),
    }, {
        path: "/registrationProtocol",
        name: "registrationProtocol", // 注册协议
        meta: {
            title: "注册协议",
            isLogin: false,
            hideFoot: false,
            loginOut: false,
            navBg: true,
        },
        component: () => import(/* webpackChunkName: "registrationProtocol" */ "../views/registrationProtocol.vue"),
    }, {
        path: "/aboutView",
        // aboutView
        name: "aboutView",
        meta: {
            title: "平台介绍",
            isLogin: false,
            navBg: true,
        },
        component: () => import("@/views/aboutView.vue"),
    }, {
        path: "/help",
        // develop
        name: "help",
        meta: {
            title: "帮助中心",
            isLogin: false,
            navBg: true,
        },
        component: () => import("@/views/help.vue"),
    }, {
        path: "/imgPage",
        // develop
        name: "imgPage",
        meta: {
            title: "宣传页",
            isLogin: false,
            navBg: true,
            hideFoot: true,
            hideHead: true,
        },
        component: () => import("@/views/imgPage.vue"),
    }, {
        path: "*",
        // develop
        name: "页面未找到",
        meta: {
            title: "404",
            isLogin: false,
        },
        component: () => import("@/views/404.vue"),
    },
]

const router = new VueRouter({
    routes,
})
router.beforeEach((to, from, next) => {
    // 如果去往login界面，则直接运行
    document.documentElement.scrollTop = 0
    // document.d.scrollTop = 0;

    if (to.path === "/login") return next() // 如果访问的是登录页则直接放行，否则需要强制登录
    // 获取token
    const tokenStr = localStorage.getItem("user_login")
    if (tokenStr || !to.meta.isLogin) {
        next()
    } else {
        // setTimeout(() => {
        //     // console.clear()
        // }, 100);
        next("/login")
    }
    next()
    // 如果获取的不是token，则强制登录，否则放行
})

export default router
