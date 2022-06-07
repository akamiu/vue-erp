import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import( /* webpackChunkName: "charts" */ "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓励作者'
                },
                component: () => import( /* webpackChunkName: "donate" */ "../views/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言'
                },
                component: () => import( /* webpackChunkName: "i18n" */ "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import( /* webpackChunkName: "upload" */ "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import( /* webpackChunkName: "icon" */ "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import(/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器'
                },
                component: () => import(/* webpackChunkName: "editor" */ '../views/Editor.vue')
            }, {
                path: '/goods',
                name: 'goods',
                meta: {
                    title: '商品信息'
                },
                component: () => import("../views/base/Goods.vue")
            }, {
                path: '/category',
                name: 'category',
                meta: {
                    title: '商品类别'
                },
                component: () => import("../views/base/GoodsCategory.vue")
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '业务员管理'
                },
                component: () => import("../views/base/User.vue")
            }, {
                path: '/warehouse',
                name: 'warehouse',
                meta: {
                    title: '仓库'
                },
                component: () => import("../views/base/Warehouse.vue")
            }
            , {
                path: '/supplier',
                name: 'supplier',
                meta: {
                    title: '供应商'
                },
                component: () => import("../views/base/Supplier.vue")
            }, {
                path: '/customer',
                name: 'customer',
                meta: {
                    title: '客户'
                },
                component: () => import("../views/base/Customer.vue")
            }, {
                path: '/stock',
                name: 'stock',
                meta: {
                    title: '商品库存'
                },
                component: () => import("../views/base/Stock.vue")
            }, {
                path: '/stockin',
                name: 'stockin',
                meta: {
                    title: '商品入库'
                },
                component: () => import("../views/stock/StockIn.vue")
            }, {
                path: '/stockout',
                name: 'stockout',
                meta: {
                    title: '商品入库'
                },
                component: () => import("../views/stock/StockOut.vue")
            }, {
                path: '/transfer',
                name: 'transfer',
                meta: {
                    title: '转仓'
                },
                component: () => import("../views/stock/Transfer.vue")
            }
            , {
                path: '/statistic',
                name: 'statistic',
                meta: {
                    title: '统计'
                },
                component: () => import("../views/stock/Statistics.vue")
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;