<template>
    <v-main class="fill-height grey lighten-2">
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card>
                        <v-card-title class="primary white--text">
                            <p>注册</p>
                            <v-spacer></v-spacer>
                            <v-btn text class="white--text" @click="toLoginAny"
                                >返回登录
                            </v-btn>
                        </v-card-title>
                        <v-card-text class="py-4 pb-0">
                            <v-form>
                                <v-text-field
                                    v-model="RegisterForm.username"
                                    label="请输入用户名"
                                    type="text"
                                    hide-details="auto"
                                    prepend-icon="mdi-account"
                                    counter="10"
                                    clearable
                                    :rules="ruleUsername"
                                ></v-text-field>
                                <v-text-field
                                    v-model="RegisterForm.password"
                                    label="请输入密码"
                                    prepend-icon="mdi-lock"
                                    hide-details="auto"
                                    counter="16"
                                    clearable
                                    :type="showPassword ? 'text' : 'password'"
                                    :rules="rulePassword"
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
                                @click="register"
                                >注册
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <!-- 注册状态对话框 -->
        <v-dialog v-model="dialog" max-width="250">
            <v-card>
                <v-card-title class="primary white--text">
                    {{ dialogMessage }}
                </v-card-title>
                <v-card-actions class="mt-3">
                    <v-btn text class="primary--text" @click="toLogin">
                        确定
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text class="grey--text" @click="dialog = false">
                        取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-main>
</template>

<script>
export default {
    data() {
        return {
            // 显示密码明文
            showPassword: false,
            dialogMessage: '',
            dialog: false,
            RegisterForm: {
                username: '',
                password: ''
            },
            // 登录Button：检查输入框是否都不为空
            ruleUsername: [(value) => !!value || '用户名不能为空'],
            rulePassword: [(value) => !!value || '密码不能为空']
        }
    },

    computed: {
        checkEmpty() {
            return this.RegisterForm.username && this.RegisterForm.password
        }
    },

    methods: {
        register() {
            var _this = this
            this.$axios
                .post('/register', {
                    id: 0,
                    username: this.RegisterForm.username,
                    password: this.RegisterForm.password
                })
                .then((resp) => {
                    if (resp.data.code === 200) {
                        _this.dialogMessage = resp.data.message
                        _this.dialog = true
                    } else {
                        _this.dialogMessage = resp.data.message
                        _this.dialog = true
                    }
                })
                // eslint-disable-next-line no-unused-vars
                .catch((failResponse) => {})
        },

        // 注册相应对话框confirm '注册成功'?转登录页:关闭对话框
        toLogin() {
            if (this.dialogMessage === '成功') {
                this.$router.replace('/login')
            } else {
                this.dialog = false
            }
        },

        // 无条件跳转登录页
        toLoginAny() {
            this.$router.replace('/login')
        }
    }
}
</script>