<template>
    <nav>
        <!-- 工具栏 -->
        <v-app-bar app clipped-left color="white">
            <!-- 打开导航栏按钮 -->
            <v-app-bar-nav-icon
                class="grey--text px-1"
                @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <!-- 工具栏标题 -->
            <v-toolbar-title class="grey--text pl-4">
                <v-btn text rounded to="/index">
                    <v-icon large class="mr-1 cyan--text text--lighten-1"
                        >mdi-earth
                    </v-icon>
                    <span
                        class="grey--text text--light-1 font-weight-light text-h5"
                        >折纸星球
                    </span>
                </v-btn>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

        <!-- 导航栏 -->
        <v-navigation-drawer
            v-model="drawer"
            app
            stateless
            clipped
            width="200px"
            class="white"
        >
            <!-- 导航栏跳转路由列表 -->
            <v-list>
                <v-list-item
                    v-for="link in links"
                    :key="link.text"
                    :to="link.route"
                >
                    <v-list-item-icon>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            drawer: true,

            // 侧面抽屉路由
            links: [
                { icon: 'mdi-home', text: '主页', route: '/admin/dashboard' },
                { icon: 'mdi-image', text: '动态管理', route: '/admin/folders' },
            ]
        }
    },

    methods: {
        // 转向主页
        toIndex() {
            this.$router.replace('/index')
        }
    }
}
</script>