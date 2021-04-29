<template>
    <div>
        <v-container class="mt-5">
            <v-row no-gutters justify="center">
                <v-col cols="12" sm="12" md="12" lg="12" xl="9">
                    <v-row no-gutters>
                        <v-card
                            flat
                            width="100%"
                            min-height="180px"
                            class="mb-3"
                        >
                            <v-card-text class="text-h4">
                                头像 昵称 等等个人信息
                            </v-card-text>
                            <v-btn icon @click="editInformation">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </v-card>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12" sm="9" md="9" lg="9" xl="9">
                            <v-tabs fixed-tabs>
                                <v-tab
                                    v-for="tab in tabs"
                                    :key="tab.id"
                                    :to="tab.route"
                                    >{{ tab.lable }}</v-tab
                                >
                            </v-tabs>
                            <router-view></router-view>
                        </v-col>
                        <v-col cols="12" sm="3" md="3" lg="3" xl="3">
                            <v-card flat class="ml-3">
                                <v-card-text class="text-h5">
                                    功能
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>

        <v-dialog v-model="editProfileForm" max-width="500">
            <v-card>
                <v-card-title class="pb-4">
                    <span>编辑个人资料</span>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        class="red--text"
                        @click="editProfileForm = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pb-0">
                    <v-container>
                        <v-row no-gutters>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="nickName"
                                    placeholder="昵称"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-radio-group v-model="radios" row>
                                    <v-radio label="男" value="male"></v-radio>
                                    <v-radio
                                        label="女"
                                        value="female"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="12">
                                <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="date"
                                            label="选择出生年月日"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="date"
                                        no-title
                                        scrollable
                                        locale="zh-cn"
                                        :first-day-of-week="0"
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="menu = false"
                                            >取消
                                        </v-btn>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.menu.save(date)"
                                            >确定
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="mr-5 mb-3"
                        color="blue lighten-1"
                        dark
                        depressed
                        height="30"
                        rounded
                        @click="saveProfile"
                        >保存
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            articles: [],
            username: '',
            editProfileForm: false,

            profileIdInDB: null,
            nickName: null,
            radios: 'male',
            date: new Date().toISOString().substr(0, 10),

            profile: {},

            menu: false,

            tabs: [
                {
                    id: 1,
                    lable: '文章',
                    route: '/mypage/' + this.$route.params.id + '/articles'
                },
                {
                    id: 2,
                    lable: '动态',
                    route: '/mypage/' + this.$route.params.id + '/about'
                }
            ]
        }
    },
    // mounted() {
    //     // this.handleCurrentChange()
    // },
    methods: {
        // handleCurrentChange() {
        //     var _this = this
        //     this.$axios.get('/user/article/' + this.username).then((resp) => {
        //         if (resp && resp.status === 200) {
        //             _this.articles = resp.data.result
        //         }
        //     })
        // },
        // editArticle(article) {
        //     this.$router.push({
        //         name: 'articleEditor',
        //         params: {
        //             article: article
        //         }
        //     })
        // },
        editInformation() {
            this.editProfileForm = true
        },

        saveProfile() {
            var _this = this
            this.$axios
                .post('/user/profile', {
                    id: 0,
                    profileNickname: this.nickName,
                    profileGender: this.radios,
                    profileBirthday: this.date,
                    profileUserId: this.$route.params.id,
                    profileDate: null
                })
                .then((response) => {
                    if (response && response.data.code === 200) {
                        _this.profileIdInDB = response.data.result
                        console.log(_this.profileIdInDB)
                    }
                })
        }
    }
}
</script>