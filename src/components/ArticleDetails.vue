<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="12" md="9" lg="9" xl="6">
                <v-card class="text-justify">
                    <v-col>
                        <v-row no-gutters>
                            <v-card-title class="text-h4">
                                {{ article.articleTitle }}
                            </v-card-title>
                        </v-row>
                        <v-divider></v-divider>
                        <!-- <v-row no-gutters> -->
                        <div class="markdown-body">
                            <div
                                class="pa-6"
                                v-html="article.articleContentHtml"
                            ></div>
                        </div>
                        <!-- </v-row> -->
                        <v-divider></v-divider>
                        <v-row no-gutters>
                            <v-textarea
                                v-model="commentText"
                                auto-grow
                                outlined
                                dense
                                rows="1"
                                clearable
                                class="px-10 pt-10"
                                label="输入评论..."
                            ></v-textarea>
                        </v-row>
                        <v-row no-gutters>
                            <v-spacer></v-spacer>
                            <v-btn
                                class="mr-10 mt-n4"
                                color="primary"
                                @click="postComment"
                                >评论
                            </v-btn>
                        </v-row>
                        <v-row
                            no-gutters
                            v-for="(comment, index) in commentList"
                            :key="index"
                            class="mt-4 mx-10"
                        >
                            <v-card flat width="100%">
                                <v-row>
                                    <v-col
                                        class="pr-0"
                                        cols="auto"
                                        align-self="center"
                                    >
                                        <v-avatar size="48">
                                            <v-img
                                                :src="
                                                    comment.profile
                                                        .profileAvatar
                                                "
                                            ></v-img>
                                        </v-avatar>
                                    </v-col>
                                    <v-col>
                                        <v-card flat>
                                            <v-card-title
                                                class="text-subtitle-1 pt-0"
                                            >
                                                {{
                                                    comment.profile
                                                        .profileNickname
                                                }}
                                            </v-card-title>
                                            <v-card-text>
                                                {{
                                                    comment.comment.commentText
                                                }}
                                            </v-card-text>
                                            <v-card-text class="pt-0">
                                                {{
                                                    comment.comment.commentDate
                                                }}
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                    <v-col
                                        cols="auto"
                                        v-if="
                                            comment.profile.profileUserId ===
                                            currentUser
                                        "
                                    >
                                        <v-btn
                                            text
                                            class="red--text"
                                            @click="
                                                deleteComment(
                                                    comment.comment.id
                                                )
                                            "
                                            >删除
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-divider inset></v-divider>
                            </v-card>
                        </v-row>
                    </v-col>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            article: [],

            commentList: [],

            commentText: null,

            commentIdInDB: 0,

            currentUser: null
        }
    },
    mounted() {
        this.loadArticle()
        this.currentUser = this.$store.state.user.id
    },
    methods: {
        loadArticle() {
            var _this = this
            this.$axios.get('/article/' + this.$route.query.id).then((resp) => {
                if (resp && resp.status === 200) {
                    _this.article = resp.data.result
                    _this.getComments()
                }
            })
        },

        postComment() {
            var _this = this
            // console.log(this.commentText)
            this.$axios
                .post('/comment', {
                    id: this.commentIdInDB,
                    commentText: this.commentText,
                    userId: this.$store.state.user.id,
                    articleId: this.article.id,
                    commentDate: null
                })
                .then((response) => {
                    if (response && response.data.code === 200) {
                        // console.log(response.data.result)
                        _this.getComments()
                    }
                })
        },

        getComments() {
            this.$axios.get('/comment/' + this.article.id).then((response) => {
                if (response && response.data.code === 200) {
                    // console.log(response.data.result)
                    this.commentList = response.data.result
                }
            })
        },

        deleteComment(id) {
            this.$axios.post('/comment/delete/' + id).then((response) => {
                if (response && response.data.code === 200) {
                    console.log(response.data.result)
                    this.getComments()
                } else {
                    console.log(response.data.message)
                }
            })
        }
    }
}
</script>
<style>
@import '../styles/markdown.css';
</style>