<template>
    <div class="myfolders">
        <v-data-table
            :headers="headers"
            :items="articles"
            :page.sync="currentPage"
            :items-per-page="pageSize"
            hide-default-header
            hide-default-footer
            class="mt-3"
        >
            <template v-slot:[`item.folderCover`]="{ item }">
                <router-link
                    :to="{ path: '/folder/' + item.id }"
                >
                    <v-img
                        min-height="50px"
                        min-width="88px"
                        :aspect-ratio="16 / 9"
                        :src="item.folderCover"
                        class="rounded my-3"
                    ></v-img>
                </router-link>
            </template>
            <template v-if="isNowLogin" v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="viewItem(item)">
                    mdi-eye
                </v-icon>
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
        </v-data-table>
        <v-pagination
            v-model="currentPage"
            :length="totalPages"
            class="mt-2"
            @input="getUserArticles"
        ></v-pagination>
        <v-snackbar
            v-model="deleteSnackbar"
            timeout="2500"
            centered
            right
            :color="deleteSnackbarState"
            >{{ deleteMessage }}
        </v-snackbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                { text: '封面', value: 'folderCover' },
                { text: '标题', value: 'folderTitle' },
                { text: '时间', value: 'folderDate' },
                { text: '功能', value: 'actions', sortable: false }
            ],
            articles: [],

            // 文章数（后端）
            totalArticles: 0,
            // 当前页
            currentPage: 1,
            // 页大小
            pageSize: 7,
            // 页数
            totalPages: 0,
            // 当前登录用户Id
            userId: null,

            deleteSnackbar: false,
            deleteSnackbarState: 'success',
            deleteMessage: '',

            isNowLogin: false
        }
    },

    mounted() {
        this.userId = this.$route.params.id
        this.isNowUser()
        // 向后端请求第一页数据并渲染
        this.getUserArticles()
    },

    methods: {
        getUserArticles() {
            var _this = this
            this.$axios
                .get(
                    '/user/folder/' +
                        this.currentPage +
                        '/' +
                        this.pageSize +
                        '/' +
                        this.userId
                )
                .then((response) => {
                    if (response && response.data.code === 200) {
                        _this.articles = response.data.result.content
                        _this.totalArticles = response.data.result.totalElements
                        _this.totalPages = response.data.result.totalPages
                    }
                })
        },

        viewItem(item) {
            this.$router.push({ path: '/folder/' + item.id })
        },

        editItem(item) {
            this.$router.push({
                name: 'Upload',
                params: {
                    folderId: item.id
                }
            })
        },

        deleteItem(item) {
            var _this = this
            this.$axios.get('/folder/delete/' + item.id).then((response) => {
                if (response && response.data.code === 200) {
                    _this.deleteMessage = response.data.result
                    _this.deleteSnackbarState = 'success'
                    _this.deleteSnackbar = true
                    this.getUserArticles()
                } else {
                    _this.deleteMessage = response.data.message
                    _this.deleteSnackbarState = 'error'
                    _this.deleteSnackbar = true
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
