<template>
    <v-container>
        <v-text-field
            v-model="article.articleTitle"
            label="请输入标题"
            single-line
            outlined
            solo
            flat
        ></v-text-field>
        <mavon-editor
            v-model="article.articleContentMd"
            ref="md"
            fontSize="16px"
            style="min-height: 800px"
            class="changePos"
            @save="saveArticles"
            @imgAdd="$imgAdd"
        >
            <!-- 保存按钮 -->
            <button
                type="button"
                class="op-icon"
                slot="left-toolbar-after"
                :title="`摘要/封面`"
                @click.stop="AbsImgDialog = true"
            >
                <v-icon class="iconSize pb-1">mdi-file-document-outline</v-icon>
            </button>
        </mavon-editor>

        <!-- 添加摘要/封面 -->
        <v-dialog v-model="AbsImgDialog" max-width="500">
            <v-card>
                <v-card-title class="pa-0">
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        class="red--text text--lighten-2"
                        @click.stop="AbsImgDialog = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-title class="pt-0"> 摘要 </v-card-title>
                <v-divider class="mb-4 mx-5"></v-divider>

                <v-textarea
                    v-model="article.articleAbstract"
                    class="px-5"
                    outlined
                    auto-grow
                    clearable
                    counter="100"
                ></v-textarea>

                <v-card-title class="pt-0"> 封面 </v-card-title>
                <v-divider class="mb-4 mx-5"></v-divider>

                <v-container class="pb-0">
                    <v-row no-gutters align="center" class="px-2">
                        <v-file-input
                            v-model="cover"
                            label="点击上传封面"
                            class="pr-2"
                            single-line
                            show-size
                            accept="image/*"
                            prepend-icon="mdi-image-area"
                            :disabled="uploading"
                            :loading="uploading"
                        ></v-file-input>
                        <v-btn
                            class="blue-grey white--text"
                            depressed
                            :disabled="!checkEmpty"
                            @click="uploadFile"
                        >
                            <span>上传</span>
                            <v-icon class="pl-1">mdi-cloud-upload </v-icon>
                        </v-btn>
                    </v-row>
                </v-container>

                <v-snackbar
                    v-model="upImgSnackbar"
                    bottom
                    timeout="2500"
                    :color="upImgSnackbarState"
                    >{{ upImgSnackbarMessage }}
                </v-snackbar>

                <v-card-actions class="py-5 px-5">
                    <v-btn
                        class="primary"
                        depressed
                        block
                        @click="AbsImgDialog = false"
                    >
                        保存
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- 保存、发布文章提示框 -->
        <v-snackbar
            v-model="saveSnackbar"
            timeout="2500"
            centered
            :color="saveSnackbarState"
            >{{ saveSnackbarMessage }}
        </v-snackbar>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            // 上传摘要/封面对话框
            AbsImgDialog: false,
            // 图片上传中？
            uploading: false,
            // 上传图片 响应状态消息条
            upImgSnackbar: false,
            // 图片上传状态（消息条文本）
            upImgSnackbarMessage: '',
            // 图片上传状态（消息条颜色）
            upImgSnackbarState: 'success',
            // 上传文件input的内容（封面图片）
            cover: null,
            // 上传后图片的url
            url: '',

            // 文章
            article: {},
            // 文章保存后 数据库中的id(默认0，即第一次保存。让数据库自动设置id)
            articleIdInDB: 0,
            // 保存文章 响应状态消息条
            saveSnackbar: false,
            saveSnackbarMessage: '',
            saveSnackbarState: 'success'
        }
    },
    computed: {
        // 上传封面input是否为空？
        checkEmpty() {
            return this.cover == null ? false : true
        }
    },
    mounted() {
        // 编辑的时候好像要用到
        if (this.$route.params.article) {
            this.article = this.$route.params.article
            this.articleIdInDB = this.article.id
            this.url = this.article.articleCover
        }
    },
    methods: {
        // 重写上传图片方法
        $imgAdd(pos, $file) {
            var formdata = new FormData()
            formdata.append('file', $file)
            this.$axios
                .post('/covers', formdata, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                .then((response) => {
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    // $vm.$img2Url 详情见本页末尾
                    this.$refs.md.$img2Url(pos, response.data.result)
                })
        },

        // 上传图片
        uploadFile() {
            this.uploading = true
            var _this = this
            var formData = new FormData()
            formData.append('file', this.cover)
            this.$axios
                .post('/covers', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    if (response && response.data.code === 200) {
                        _this.url = response.data.result
                        _this.uploading = false
                        _this.cover = null
                        _this.upImgSnackbarState = 'success'
                        _this.upImgSnackbarMessage = '封面上传成功'
                        _this.upImgSnackbar = true
                        // setTimeout(() => (_this.alertSuccess = false), 2000)
                    }
                })
                // eslint-disable-next-line no-unused-vars
                .catch((failResponse) => {})
        },

        // 保存文章
        saveArticles(value, render) {
            if (!(this.article.articleTitle && render)) {
                this.saveSnackbarMessage = '文章标题内容不能为空'
                this.saveSnackbarState = 'error'
                this.saveSnackbar = true
            } else {
                var _this = this
                this.$axios
                    .post('/article', {
                        id: this.articleIdInDB,
                        articleTitle: this.article.articleTitle,
                        articleContentMd: value,
                        articleContentHtml: render,
                        articleAbstract: this.article.articleAbstract,
                        articleCover: this.url,
                        articleDate: this.article.articleDate,
                        articleState: 0,
                        articleUserId: this.$store.state.user.id,
                        articleUserName: this.$store.state.user.username
                    })
                    .then((response) => {
                        if (response && response.data.code === 200) {
                            _this.articleIdInDB = response.data.result
                            _this.saveSnackbarMessage = '保存成功'
                            _this.saveSnackbarState = 'success'
                            _this.saveSnackbar = true
                        }
                    })
            }
        }
    }
}
</script>

<style>
.v-note-wrapper.changePos {
    position: inherit;
}
.v-icon.iconSize {
    font-size: 17px;
}
</style>