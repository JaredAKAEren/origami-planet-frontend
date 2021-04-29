<template>
    <v-main class="fill-height grey lighten-2">
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card>
                        <v-card-title class="primary white--text">
                            登录
                        </v-card-title>
                        <v-card-text class="py-4 pb-0">
                            <v-form>
                                <v-text-field
                                    v-model="loginForm.username"
                                    label="用户名"
                                    type="text"
                                    prepend-icon="mdi-account"
                                    hide-details="auto"
                                    clearable
                                    :rules="ruleUsername"
                                    :error-messages="errorMessage"
                                ></v-text-field>
                                <v-text-field
                                    v-model="loginForm.password"
                                    label="密码"
                                    prepend-icon="mdi-lock"
                                    hide-details="auto"
                                    clearable
                                    :type="showPassword ? 'text' : 'password'"
                                    :rules="rulePassword"
                                    :error-messages="errorMessage"
                                    :append-icon="
                                        showPassword ? 'mdi-eye' : 'mdi-eye-off'
                                    "
                                    @click:append="showPassword = !showPassword"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions class="pa-4 pt-2">
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                :disabled="!checkEmpty"
                                @click="login"
                                >登录
                            </v-btn>
                            <v-btn color="primary" @click="toRegister">
                                注册
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
export default {
    data() {
        return {
            // 密码可见？
            showPassword: false,
            // 用户名 密码框value
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            // 后端错误信息
            errorMessage: '',
            // 用户名 密码框check规则
            ruleUsername: [(value) => !!value || '用户名不能为空'],
            rulePassword: [(value) => !!value || '密码不能为空']
        }
    },

    // 侦听
    computed: {
        // 登录Button：检查输入框是否都不为空
        checkEmpty() {
            return this.loginForm.username && this.loginForm.password
        }
    },

    methods: {
        // 登录验证
        login() {
            this.errorMessage = ''
            var _this = this
            this.$axios
                .post('/login', {
                    username: this.loginForm.username,
                    password: this.loginForm.password
                })
                .then((response) => {
                    if (response.data.code === 200) {
                        _this.$store.commit('login', response.data.result)
                        var path = this.$route.query.redirect
                        this.$router.replace({
                            path:
                                path === '/' || path === undefined
                                    ? '/index'
                                    : path
                        })
                    } else {
                        _this.errorMessage = response.data.message
                    }
                })
                // eslint-disable-next-line no-unused-vars
                .catch((failResponse) => {})
        },

        // 跳转注册
        toRegister() {
            this.$router.replace('/register')
        }
    }
}
</script>
