<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#fff"
            text-color="rgba(0,0,0,.85)" active-text-color="#1890ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
    setup() {
        const items = [
            {
                icon: "el-icon-lx-home",
                index: "/dashboard",
                title: "系统首页",
            },
            {
                icon: "el-icon-lx-text",
                index: "1",
                title: "基本信息",
                subs: [
                    {
                        index: "/goods",
                        title: "商品信息",
                    },
                    {
                        index: "/category",
                        title: "商品类别",
                    },
                    {
                        index: "/user",
                        title: "业务员",
                    },
                    {
                        index: "/warehouse",
                        title: "仓库",
                    },
                    {
                        index: "/supplier",
                        title: "供应商",
                    },
                    {
                        index: "/customer",
                        title: "客户",
                    },
                ],
            },
            {
                icon: "el-icon-lx-shop",
                index: "/stock",
                title: "商品库存",
            },
            {
                icon: "el-icon-lx-cart",
                index: "/stockin",
                title: "商品入库",
            },
            {
                icon: "el-icon-lx-punch",
                index: "/stockout",
                title: "销售出库",
            },
            {
                icon: "el-icon-lx-forwardfill",
                index: "/transfer",
                title: "转仓",
            },
            {
                icon: "el-icon-lx-apps",
                index: "/statistic",
                title: "统计",
            },
            {
                icon: "el-icon-lx-emoji",
                index: "/icon",
                title: "自定义图标",
            },
            {
                icon: "el-icon-pie-chart",
                index: "/charts",
                title: "schart图表",
            },
            {
                icon: "el-icon-lx-warn",
                index: "7",
                title: "错误处理",
                subs: [
                    {
                        index: "/permission",
                        title: "权限测试",
                    },
                    {
                        index: "/404",
                        title: "404页面",
                    },
                ],
            },
        ];

        const route = useRoute();

        const onRoutes = computed(() => {
            return route.path;
        });

        const store = useStore();
        const collapse = computed(() => store.state.collapse);

        return {
            items,
            onRoutes,
            collapse,
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 230px;
}

.sidebar>ul {
    height: 100%;
}

/* .el-menu-item:focus,
.el-menu-item:hover {
    /* background-color: rgba(14, 165, 233, .5); */
/* color: blue; */
/* } */
</style>
