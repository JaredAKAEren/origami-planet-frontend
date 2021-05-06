<template>
    <div class="index">
        <v-container class="px-0">
            <v-row justify="center">
                <v-col cols="12" sm="12" md="12" lg="12" xl="9" class="px-0">
                    <!-- 教程部分 100%行 -->
                    <v-row no-gutters class="py-12">
                        <v-row no-gutters class="mb-n2">
                            <v-subheader inset class="text-h6 font-weight-bold">
                                最新教程
                            </v-subheader>
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                class="mr-13 grey--text font-weight-light"
                                >查看更多</v-btn
                            >
                        </v-row>
                        <v-slide-group show-arrows>
                            <v-slide-item v-for="n in 12" :key="n">
                                <v-hover v-slot:default="{ hover }">
                                    <v-card
                                        flat
                                        width="200px"
                                        class="ma-2 grey lighten-5"
                                        rounded="lg"
                                    >
                                        <v-responsive :aspect-ratio="3 / 2">
                                            <v-card-title>
                                                教程{{ n }}
                                            </v-card-title>
                                        </v-responsive>
                                        <v-overlay
                                            absolute
                                            :value="hover"
                                            opacity="0.16"
                                        ></v-overlay>
                                    </v-card>
                                </v-hover>
                            </v-slide-item>
                        </v-slide-group>
                    </v-row>

                    <v-row no-gutters class="py-12 mt-0">
                        <v-row no-gutters class="mb-n2">
                            <v-subheader inset class="text-h6 font-weight-bold">
                                最新动态
                            </v-subheader>
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                class="mr-13 grey--text font-weight-light"
                                >查看更多</v-btn
                            >
                        </v-row>
                        <v-slide-group show-arrows>
                            <v-slide-item
                                v-for="(folder, index) in folders"
                                :key="index"
                            >
                                <!-- 图片分享 列左 -->
                                <v-card
                                    flat
                                    width="200px"
                                    class="ma-2"
                                    rounded="lg"
                                >
                                    <router-link
                                        class="article-link"
                                        :to="'folder/' + folder.folder.id"
                                    >
                                        <v-hover v-slot:default="{ hover }">
                                            <v-img
                                                aspect-ratio="1"
                                                class="rounded-lg"
                                                :src="
                                                    folder.folder.folderCover
                                                "
                                            >
                                                <v-overlay
                                                    absolute
                                                    :value="hover"
                                                    opacity="0.16"
                                                    color="#FFFFFF"
                                                ></v-overlay>
                                            </v-img>
                                        </v-hover>
                                    </router-link>
                                    <v-col class="pa-0">
                                        <v-row no-gutters class="pt-2 pl-1">
                                            <span
                                                class="text-body-1 font-weight-bold"
                                            >
                                                {{
                                                    folder.folder.folderTitle
                                                }}
                                            </span>
                                        </v-row>
                                        <v-row no-gutters class="pt-1">
                                            <v-col cols="auto" class="pa-0">
                                                <v-avatar
                                                    color="grey"
                                                    size="22"
                                                ></v-avatar>
                                            </v-col>
                                            <v-col class="pa-0 pl-1">
                                                <span
                                                    class="grey--text lighten-3 font-weight-light text-body-2"
                                                >
                                                    {{folder.profile.profileNickname}}
                                                </span>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-card>
                            </v-slide-item>
                        </v-slide-group>
                    </v-row>

                    <v-row no-gutters class="py-12 mt-0">
                        <v-row no-gutters class="mb-n2">
                            <v-subheader inset class="text-h6 font-weight-bold">
                                最新文章
                            </v-subheader>
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                class="mr-13 grey--text font-weight-light"
                                >查看更多</v-btn
                            >
                        </v-row>
                        <v-slide-group show-arrows>
                            <v-slide-item
                                v-for="article in articles"
                                :key="article.id"
                            >
                                <v-card
                                    width="375"
                                    flat
                                    class="ma-2 grey lighten-4"
                                    rounded="xl"
                                >
                                    <router-link
                                        class="article-link"
                                        :to="{
                                            path: 'index/article',
                                            query: { id: article.id }
                                        }"
                                    >
                                        <v-card-title class="pb-0 pl-5 pt-5">
                                            <v-tooltip bottom open-delay="500">
                                                <template
                                                    v-slot:activator="{
                                                        on,
                                                        attrs
                                                    }"
                                                >
                                                    <div
                                                        class="pa-0 col-12 text-truncate text-justify text-h6 font-weight-light"
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    >
                                                        {{
                                                            article.articleTitle
                                                        }}
                                                    </div>
                                                </template>
                                                <span>
                                                    {{ article.articleTitle }}
                                                </span>
                                            </v-tooltip>
                                        </v-card-title>
                                    </router-link>

                                    <v-card-subtitle>
                                        <v-row no-gutters class="ml-3">
                                            <div class="pr-1">
                                                {{ article.articleUserName }}
                                            </div>
                                            <div>
                                                {{ article.articleDate }}
                                            </div>
                                        </v-row>
                                    </v-card-subtitle>

                                    <v-row no-gutters class="mt-4">
                                        <v-spacer></v-spacer>
                                        <router-link
                                            :to="{
                                                path: 'index/article',
                                                query: { id: article.id }
                                            }"
                                        >
                                            <v-hover v-slot:default="{ hover }">
                                                <v-img
                                                    :src="article.articleCover"
                                                    width="170px"
                                                    aspect-ratio="1"
                                                    class="rounded-lg elevation-3 mb-1"
                                                >
                                                    <v-overlay
                                                        absolute
                                                        :value="hover"
                                                        opacity="0.16"
                                                        color="#FFFFFF"
                                                    ></v-overlay>
                                                </v-img>
                                            </v-hover>
                                        </router-link>
                                        <v-spacer></v-spacer>
                                    </v-row>
                                </v-card>
                            </v-slide-item>
                        </v-slide-group>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <back2Top></back2Top>
    </div>
</template>

<script>
import back2Top from '../components/Button2Top'

export default {
    // 回到顶部Button
    components: { back2Top },
    data() {
        return {
            // 文章列表
            articles: [],
            folders: [],
            // 文章数（后端）
            // totalArticles: 0,
            // 当前页
            currentPage: 1,
            // 页大小
            pageSize: 10
            // 页数
            // totalPages: 0
        }
    },
    mounted() {
        // 向后端请求第一页数据并渲染
        this.handleCurrentChange()
        this.getLastestFolders()
    },
    methods: {
        // 向后端请求当前页文章
        handleCurrentChange() {
            var _this = this
            this.$axios
                .get('/article/' + this.currentPage + '/' + this.pageSize)
                .then((response) => {
                    if (response && response.data.code === 200) {
                        _this.articles = response.data.result.content
                        // _this.totalArticles = response.data.result.totalElements
                        // _this.totalPages = response.data.result.totalPages
                    }
                })
        },

        getLastestFolders() {
            var _this = this
            this.$axios
                .get('/folder/' + this.currentPage + '/' + this.pageSize)
                .then((response) => {
                    if (response && response.data.code === 200) {
                        _this.folders = response.data.result.content
                    }
                })
        }
    }
}
</script>

<style>
.article-link {
    text-decoration: none;
    color: #000000 !important;
}

/* .article-link:hover {
    border-bottom: thin;
} */
</style>