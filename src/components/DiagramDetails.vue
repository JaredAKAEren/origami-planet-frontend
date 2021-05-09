<template>
    <div class="diagram grey lighten-4">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" sm="12" md="12" lg="11" xl="7">
                    <!-- 图解图片 -->
                    <v-row no-gutters>
                        <v-col cols="7" sm="7" md="7" lg="7" xl="7">
                            <v-card class="rounded-l-lg">
                                <v-img
                                    class="rounded-l-lg"
                                    :src="nowDiagram"
                                    max-height="900"
                                    contain
                                >
                                    <v-container class="fill-height">
                                        <v-row no-gutters align="center">
                                            <v-btn @click="preDiagram()" icon>
                                                <v-icon large
                                                    >mdi-arrow-left-circle-outline
                                                </v-icon>
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                            <v-btn @click="nextDiagram()" icon>
                                                <v-icon large
                                                    >mdi-arrow-right-circle-outline
                                                </v-icon>
                                            </v-btn>
                                        </v-row>
                                    </v-container>
                                </v-img>
                            </v-card>
                        </v-col>

                        <v-col
                            cols="4"
                            sm="4"
                            md="4"
                            lg="4"
                            xl="4"
                            offset="100"
                        >
                            <v-card height="100%" class="ml-2 rounded-r-lg">
                                <v-row
                                    no-gutters
                                    align="center"
                                    justify="center"
                                >
                                    <v-col cols="auto">
                                        <v-card-title
                                            class="font-weight-bold text-h6"
                                        >
                                            {{
                                                diagramData.diagram.diagramTitle
                                            }}
                                        </v-card-title>
                                    </v-col>
                                </v-row>

                                <v-divider></v-divider>

                                <v-row>
                                    <v-card-text class="ma-4">
                                        <span
                                            v-html="
                                                diagramData.diagram
                                                    .diagramContent
                                            "
                                            class="text-justify"
                                        >
                                        </span>
                                    </v-card-text>
                                </v-row>
                                <v-divider></v-divider>

                                <v-row
                                    no-gutters
                                    class="my-2 grey--text"
                                    justify="center"
                                    v-if="
                                        commentList.length == 0 ? true : false
                                    "
                                >
                                    <span>没有评论~</span>
                                </v-row>

                                <v-virtual-scroll
                                    :items="commentList"
                                    :item-height="70"
                                    height="700"
                                    bench="5"
                                    class="grey lighten-5"
                                >
                                    <template v-slot="{ item }">
                                        <v-list-item>
                                            <v-list-item-avatar>
                                                <v-avatar size="38">
                                                    <v-img
                                                        :src="
                                                            item.profile
                                                                .profileAvatar
                                                        "
                                                    ></v-img>
                                                </v-avatar>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title class="mb-2"
                                                    ><span>
                                                        {{
                                                            item.profile
                                                                .profileNickname
                                                        }}
                                                    </span>
                                                </v-list-item-title>
                                                <v-list-item-subtitle>
                                                    {{
                                                        item.comment.commentText
                                                    }}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                            <v-list-item-action>
                                                <v-btn
                                                    v-if="
                                                        item.profile
                                                            .profileUserId ===
                                                        currentUser
                                                    "
                                                    text
                                                    class="red--text"
                                                    @click="
                                                        deleteComment(
                                                            item.comment.id
                                                        )
                                                    "
                                                    >删除
                                                </v-btn>
                                            </v-list-item-action>
                                        </v-list-item>
                                    </template>
                                </v-virtual-scroll>
                                <v-footer
                                    absolute
                                    class="pa-0 ma-0"
                                    color="white"
                                >
                                    <!-- <v-col cols="12" class="pa-0">
                                        <v-divider></v-divider>
                                    </v-col> -->
                                    <v-col cols="12" class="pt-1 px-2">
                                        <v-row no-gutters align="center">
                                            <v-text-field
                                                v-model="diagramComment"
                                                solo
                                                flat
                                                hide-details=""
                                                placeholder="添加评论..."
                                            ></v-text-field>
                                            <v-btn
                                                text
                                                class="blue--text text-subtitle-1 font-weight-medium"
                                                @click="postComment"
                                                >发布
                                            </v-btn>
                                        </v-row>
                                    </v-col>
                                </v-footer>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            diagramData: {
                username: null,
                profile: {},
                diagram: {},
                tag: [],
                image: []
            },

            commentList: [],

            diagramComment: '',

            nowDiagram: '',
            index: 0,

            daigramID: null,

            currentUser: null
        }
    },

    mounted() {
        this.daigramID = this.$route.params.did
        this.currentUser = this.$store.state.user.id
        // console.log(this.$route.params.fid)
        this.getOneDiagram(this.daigramID)
    },

    methods: {
        getOneDiagram(id) {
            var _this = this
            this.$axios.get('/diagram/' + id).then((response) => {
                if (response && response.data.code === 200) {
                    _this.diagramData = response.data.result
                    _this.nowDiagram = response.data.result.image[0].imageUrl
                    _this.getComments(response.data.result.image[0].id)
                }
            })
        },
        // showNowConment() {}
        preDiagram() {
            if (this.index == 0) {
                this.index = this.diagramData.image.length - 1
            } else {
                this.index -= 1
            }
            this.getComments(this.diagramData.image[this.index].id)
            this.nowDiagram = this.diagramData.image[this.index].imageUrl
        },

        nextDiagram() {
            if (this.index == this.diagramData.image.length - 1) {
                this.index = 0
            } else {
                this.index += 1
            }
            this.getComments(this.diagramData.image[this.index].id)
            this.nowDiagram = this.diagramData.image[this.index].imageUrl
        },

        postComment() {
            var _this = this
            this.$axios
                .post('/comment', {
                    id: 0,
                    commentText: this.diagramComment,
                    userId: this.$store.state.user.id,
                    articleId: 0,
                    diagramImageId: this.diagramData.image[this.index].id,
                    commentDate: null
                })
                .then((response) => {
                    if (response && response.data.code === 200) {
                        _this.diagramComment = ''
                        _this.getComments(
                            _this.diagramData.image[this.index].id
                        )
                    }
                })
        },

        getComments(id) {
            this.$axios.get('/comment/image/' + id).then((response) => {
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
                    this.getComments(this.diagramData.image[this.index].id)
                } else {
                    console.log(response.data.message)
                }
            })
        }
    }
}
</script>

<style>
.diagram {
    height: 100%;
}
</style>