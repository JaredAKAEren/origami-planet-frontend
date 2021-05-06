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
                <v-btn text rounded @click="toIndex">
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
            <!-- 写文章 -->
            <v-menu offset-y rounded="lg">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        rounded
                        depressed
                        class="grey--text text-lighten-2 mr-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <span>投稿作品</span>
                        <v-icon right class="ml-0">mdi-chevron-down</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        dense
                        v-for="(item, index) in uploadOptions"
                        :key="index"
                        :to="item.route"
                    >
                        <v-list-item-icon class="mr-3">
                            <v-icon dense>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>

            <!-- 登出按钮 -->
            <v-btn text @click.stop="logoutDialog = true">
                <span class="grey--text">登出</span>
                <v-icon right class="red--text text--lighten-2"
                    >mdi-exit-to-app</v-icon
                >
            </v-btn>

            <!-- 登出确认提示框 -->
            <v-dialog v-model="logoutDialog" max-width="250">
                <v-card>
                    <v-card-title class="primary white--text py-3 text-h6"
                        >要登出账号吗?
                    </v-card-title>
                    <v-card-text class="py-6 text-subtitle-1"
                        >这将会返回登录界面
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions class="pa-0">
                        <v-spacer></v-spacer>
                        <v-btn text class="primary--text" @click="logout">
                            确定
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-divider vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            class="grey--text"
                            @click="logoutDialog = false"
                        >
                            取消
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-app-bar>

        <!-- 导航栏 -->
        <v-navigation-drawer
            v-model="drawer"
            temporary
            app
            clipped
            width="200px"
            class="white"
        >
            <!-- 导航栏用户头像 -->
            <v-col class="mt-5">
                <v-row justify="center">
                    <v-avatar size="80">
                        <img src="../assets/avatar-1.png" alt="" />
                    </v-avatar>
                </v-row>
                <v-row justify="center">
                    <p class="white--text subtitle mt-2">{{ userName }}</p>
                </v-row>
            </v-col>

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
            <template v-slot:append>
                <v-row justify="center" no-gutters class="py-2">
                    <v-btn v-if="isAdmin" class="blue lighten-1 white--text" to="/admin/dashboard"
                        >dashboard
                    </v-btn>
                </v-row>
            </template>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isAdmin: false,
            // 登出对话框
            logoutDialog: false,
            // 侧边抽屉（导航栏）
            drawer: false,
            // 当前登录用户的用户名
            userName: '',
            // 侧面抽屉路由
            links: [
                { icon: 'mdi-home', text: '主页', route: '/index' },
                {
                    icon: 'mdi-book-open-outline',
                    text: '写文章',
                    route: '/articleEditor'
                },
                {
                    icon: 'mdi-account',
                    text: '个人主页',
                    route: '/mypage/' + this.$store.state.user.id + '/articles'
                }
            ],

            uploadOptions: [
                {
                    icon: 'mdi-book-open-outline',
                    text: '文章',
                    route: '/articleEditor'
                },
                { icon: 'mdi-image', text: '分享', route: '/upload' }
            ]
        }
    },
    methods: {
        // 登出
        logout() {
            var _this = this
            this.$axios.get('/logout').then((resp) => {
                if (resp.data.code === 200) {
                    this.dialog = false
                    // 前后端状态保持一致
                    _this.$store.commit('logout')
                    _this.$router.replace('/login')
                }
            })
        },

        // 转向Markdown
        toEditArticle() {
            this.$router.replace('/articleEditor')
        },

        // 转向主页
        toIndex() {
            this.$router.replace('/index')
        },

        getIsAdmin() {
            var _this = this
            this.$axios.get('/isadmin').then((response) => {
                if (response && response.data.code === 200) {
                    _this.isAdmin = true
                } else if (response && response.data.code === 400) {
                    _this.isAdmin = false
                } else {
                    _this.isAdmin = false
                }
            })
        }
    },
    created: function () {
        this.userName = this.$store.state.user.username
    },

    mounted() {
        this.getIsAdmin()
    }
}
</script>