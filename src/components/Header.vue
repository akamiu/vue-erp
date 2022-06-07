<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">
            <img src="../assets/img/logo2.png" />
            进销存管理系统
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../assets/img/logo.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        <!-- {{ username }} -->
                        <i class="el-icon-setting"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="user">个人中心</el-dropdown-item>
                            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
    setup() {
        const username = localStorage.getItem("ms_username");
        const message = 2;
        const store = useStore();
        const collapse = computed(() => store.state.collapse);
        // 侧边栏折叠
        const collapseChage = () => {
            store.commit("handleCollapse", !collapse.value);
        };

        onMounted(() => {
            if (document.body.clientWidth < 1500) {
                collapseChage();
            }
        });

        // 用户名下拉菜单选择事件
        const router = useRouter();
        const handleCommand = (command) => {
            if (command == "loginout") {
                localStorage.removeItem("ms_username");
                router.push("/login");
            } else if (command == "user") {
                router.push("/user");
            }
        };

        return {
            username,
            message,
            collapse,
            collapseChage,
            handleCommand,
        };
    },
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 62px;
    font-size: 22px;
    color: #fff;
    border-bottom: 1px solid #ccc;
}

.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 62px;
    color: #5c5c5c;
}

.header .logo {
    float: left;
    width: 250px;
    line-height: 62px;
    color: #1890ff;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
}

.logo>img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
}


.header-right {
    float: right;
    padding-right: 30px;
}

.header-user-con {
    display: flex;
    height: 62px;
    align-items: center;
}

.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}


.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}

.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}

.btn-bell .el-icon-bell {
    color: #fff;
}


.user-name {
    margin-left: 5px;
}

.user-avator {
    margin-right: 10px;
}

.user-avator img {
    display: block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

.el-dropdown-link {
    color: black;
    cursor: pointer;
}

.el-dropdown-menu__item {
    text-align: center;
}
</style>
