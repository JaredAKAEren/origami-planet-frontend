<template>
    <div class="grey lighten-4">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" sm="9" md="9" lg="9" xl="6">
                    <v-card flat class="rounded-t-lg mt-5">
                        <v-col>
                            <v-row>
                                <v-img
                                    v-for="(image, index) in folderData.image"
                                    :key="index"
                                    :src="image.imageUrl"
                                    contain
                                    class="mt-10 px-5"
                                    max-height="500"
                                ></v-img>
                            </v-row>
                            <!-- <v-row class="pt-10">
                                <v-spacer></v-spacer>
                                <v-btn
                                    icon
                                    class="mr-3"
                                    @click="likeButton"
                                    :color="likeIconColor"
                                >
                                    <v-icon size="32">{{ likeIcon }}</v-icon>
                                </v-btn>
                                <v-btn
                                    icon
                                    class="mr-3 text--darken-1"
                                    @click="collectButton"
                                    :color="collectIconColor"
                                >
                                    <v-icon large>{{ collectIcon }}</v-icon>
                                </v-btn>
                            </v-row> -->
                            <v-row class="my-10">
                                <v-col
                                    cols="1"
                                    sm="1"
                                    md="1"
                                    lg="1"
                                    xl="1"
                                ></v-col>
                                <v-col
                                    cols="10"
                                    sm="10"
                                    md="10"
                                    lg="10"
                                    xl="10"
                                >
                                    <v-row no-gutters>
                                        <span
                                            v-if="folderData.folder.folderTitle"
                                            class="font-weight-bold text-h6"
                                        >
                                            {{ folderData.folder.folderTitle }}
                                        </span>
                                    </v-row>
                                    <v-row no-gutters class="mt-3">
                                        <span
                                            v-if="
                                                folderData.folder.folderContent
                                            "
                                            v-html="
                                                folderData.folder.folderContent
                                            "
                                            class="text-justify"
                                        >
                                        </span>
                                    </v-row>
                                    <v-row no-gutters class="my-4">
                                        <v-chip
                                            v-for="(
                                                chip, index
                                            ) in folderData.tag"
                                            :key="index"
                                            class="mr-1"
                                            >{{ chip.tagName }}
                                        </v-chip>
                                    </v-row>
                                    <!-- <v-row></v-row> -->
                                    <v-row no-gutters>
                                        <div
                                            v-if="folderData.folder.folderDate"
                                            class="text-body-2 grey--text text-light-2"
                                        >
                                            {{ folderData.folder.folderDate }}
                                        </div>
                                    </v-row>
                                    <v-divider class="mt-4"></v-divider>

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
                                                                comment.comment
                                                                    .commentText
                                                            }}
                                                        </v-card-text>
                                                        <v-card-text
                                                            class="pt-0"
                                                        >
                                                            {{
                                                                comment.comment
                                                                    .commentDate
                                                            }}
                                                        </v-card-text>
                                                    </v-card>
                                                </v-col>
                                                <v-col
                                                    cols="auto"
                                                    v-if="
                                                        comment.profile
                                                            .profileUserId ===
                                                        currentUser
                                                    "
                                                >
                                                    <v-btn
                                                        text
                                                        class="red--text"
                                                        @click="
                                                            deleteComment(
                                                                comment.comment
                                                                    .id
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
                                <v-col
                                    cols="1"
                                    sm="1"
                                    md="1"
                                    lg="1"
                                    xl="1"
                                ></v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row> </v-row>
                        </v-col>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="3" md="3" lg="3" xl="2" class="mt-10">
                    <v-row align="center">
                        <v-col cols="auto">
                            <v-avatar size="38">
                                <v-img
                                    :src="folderData.profile.profileAvatar"
                                ></v-img>
                            </v-avatar>
                        </v-col>
                        <v-col class="pl-0">
                            <span class="font-weight-bold text-h6">
                                {{ folderData.profile.profileNickname }}
                            </span>
                        </v-col>
                    </v-row>
                    <!-- <v-row class="pl-3" align="center">
                        <v-btn
                            depressed
                            dark
                            rounded
                            height="30"
                            max-width="270"
                            width="100%"
                            class="blue lighten-1"
                        >
                            <v-icon small>mdi-plus</v-icon>
                            <span class="font-weight-bold">加关注</span>
                        </v-btn>
                    </v-row> -->
                </v-col>
            </v-row>
        </v-container>
        <back2Top></back2Top>
    </div>
</template>

<script>
import back2Top from './Button2Top'
export default {
    // 回到顶部Button
    components: { back2Top },
    data() {
        return {
            folderData: {
                folder: {},
                image: [],
                tag: [],
                profile: {}
            },
            folderID: null,

            islike: false,
            likeIcon: 'mdi-heart-outline',
            likeIconColor: null,

            iscollect: false,
            collectIcon: 'mdi-star-outline',
            collectIconColor: null,

            commentList: [],

            commentText: null,

            commentIdInDB: 0,

            currentUser: null
        }
    },

    mounted() {
        this.folderID = this.$route.params.fid
        this.currentUser = this.$store.state.user.id
        // console.log(this.$route.params.fid)
        this.getOneFolder(this.folderID)
    },

    methods: {
        getOneFolder(id) {
            var _this = this
            this.$axios.get('/folder/' + id).then((response) => {
                if (response && response.data.code === 200) {
                    _this.folderData = response.data.result
                    _this.getComments()
                }
            })
        },

        likeButton() {
            this.islike = !this.islike
            if (this.islike) {
                this.likeIcon = 'mdi-heart'
                this.likeIconColor = 'red'
            } else {
                this.likeIcon = 'mdi-heart-outline'
                this.likeIconColor = null
            }
        },

        collectButton() {
            this.iscollect = !this.iscollect
            if (this.iscollect) {
                this.collectIcon = 'mdi-star'
                this.collectIconColor = 'yellow'
            } else {
                this.collectIcon = 'mdi-star-outline'
                this.collectIconColor = null
            }
        },

        postComment() {
            var _this = this
            // console.log(this.commentText)
            this.$axios
                .post('/comment', {
                    id: this.commentIdInDB,
                    commentText: this.commentText,
                    userId: this.$store.state.user.id,
                    folderId: this.folderData.folder.id,
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
            this.$axios
                .get('/comment/folder/' + this.folderData.folder.id)
                .then((response) => {
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