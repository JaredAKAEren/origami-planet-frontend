<template>
    <div class="mypage grey lighten-4">
        <v-container class="pt-5">
            <v-row no-gutters justify="center">
                <v-col cols="12" sm="12" md="12" lg="12" xl="9">
                    <v-row no-gutters>
                        <v-card flat width="100%" class="mb-3">
                            <v-row no-gutters align="center" class="py-4 px-6">
                                <v-col cols="auto">
                                    <v-avatar size="100">
                                        <v-img
                                            :src="profile.profileAvatar"
                                        ></v-img>
                                    </v-avatar>
                                </v-col>
                                <v-col cols="auto" class="ml-6">
                                    <span class="font-weight-bold text-h6">
                                        {{ profile.profileNickname }}
                                    </span>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="auto" v-if="isNowLogin">
                                    <v-row no-gutters>
                                        <v-btn icon @click="editInformation">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-btn icon @click="toggleShow">
                                            <v-icon>mdi-account</v-icon>
                                        </v-btn>
                                    </v-row>

                                    <my-upload
                                        field="file"
                                        @crop-success="cropSuccess"
                                        @crop-upload-success="cropUploadSuccess"
                                        @crop-upload-fail="cropUploadFail"
                                        v-model="show"
                                        :width="300"
                                        :height="300"
                                        url="http://localhost:8443/api/covers"
                                        img-format="jpg"
                                        :with-credentials="true"
                                    ></my-upload>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12" sm="12" md="12" lg="12" xl="12">
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
                        <!-- <v-col cols="12" sm="3" md="3" lg="3" xl="3">
                            <v-card flat class="ml-3">
                                <v-card-text class="text-h5">
                                    功能
                                </v-card-text>
                            </v-card>
                        </v-col> -->
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
import myUpload from 'vue-image-crop-upload/upload-2.vue'
export default {
    components: {
        'my-upload': myUpload
    },
    inject: ['reload'],
    data() {
        return {
            show: false,
            avatarUrl: null,

            articles: [],
            username: '',
            userId: null,
            isNowLogin: false,
            editProfileForm: false,

            profileIdInDB: 0,
            nickName: null,
            radios: 'male',
            date: new Date().toISOString().substr(0, 10),

            profile: {
                profileAvatar: ''
            },

            menu: false,

            headers: {
                'Content-Type': 'multipart/form-data'
            },

            tabs: [
                {
                    id: 1,
                    lable: '文章',
                    route: '/mypage/' + this.$route.params.id + '/articles'
                },
                {
                    id: 2,
                    lable: '动态',
                    route: '/mypage/' + this.$route.params.id + '/folders'
                }
            ]
        }
    },
    mounted() {
        this.userId = this.$route.params.id
        this.isNowUser()
        this.getProfile()
    },
    methods: {
        toggleShow() {
            this.show = !this.show
        },

        cropSuccess() {
            console.log('-------- crop success --------')
        },

        cropUploadSuccess(jsonData) {
            console.log('-------- upload success --------')
            // console.log(jsonData)
            this.avatarUrl = jsonData.result
            this.saveProfile()
            // console.log(this.avatarUrl)
        },

        cropUploadFail(status, field) {
            console.log('-------- upload fail --------')
            console.log(status)
            console.log('field: ' + field)
        },

        editInformation() {
            this.editProfileForm = true
        },

        saveProfile() {
            var _this = this
            this.$axios
                .post('/user/profile', {
                    id: this.profileIdInDB,
                    profileAvatar: this.avatarUrl,
                    profileNickname: this.nickName,
                    profileGender: this.radios,
                    profileBirthday: this.date,
                    profileUserId: this.$route.params.id,
                    profileDate: null
                })
                .then((response) => {
                    if (response && response.data.code === 200) {
                        _this.profileIdInDB = response.data.result
                        // _this.getProfile()
                        console.log(_this.profileIdInDB)
                        this.editProfileForm = false
                        this.reload()
                    }
                })
        },

        getProfile() {
            var _this = this
            this.$axios
                .get('/user/profile/' + this.$route.params.id)
                .then((response) => {
                    if (response && response.data.code === 200) {
                        if (response.data.result) {
                            _this.profile = response.data.result
                            _this.profileIdInDB = _this.profile.id
                            _this.nickName = _this.profile.profileNickname
                            _this.radios = _this.profile.profileGender
                            _this.date = _this.profile.profileBirthday
                            _this.avatarUrl = _this.profile.profileAvatar
                        }
                    }
                })
        },

        isNowUser() {
            var _this = this
            this.$axios.get('/who').then((response) => {
                if (response && response.data.code === 200) {
                    if (response.data.result == _this.userId) {
                        _this.isNowLogin = true
                    }
                }
            })
        }
    }
}
</script>

<style>
.mypage {
    height: 100%;
}
</style>