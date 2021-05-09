<template>
    <div>
        <v-container>
            <v-row justify="center">
                <v-col cols="12" sm="9" md="9" lg="12" xl="8">
                    <v-row no-gutters>
                        <v-subheader class="text-h6 font-weight-bold">
                            全部文章
                        </v-subheader>
                    </v-row>
                    <v-row>
                        <v-col
                            cols="12"
                            sm="12"
                            md="6"
                            lg="4"
                            xl="4"
                            v-for="article in articles"
                            :key="article.id"
                        >
                            <v-card
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
                                                v-slot:activator="{ on, attrs }"
                                            >
                                                <div
                                                    class="pa-0 col-12 text-truncate text-justify text-h6 font-weight-light"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                >
                                                    {{ article.articleTitle }}
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
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-pagination
                            v-model="currentPage"
                            :length="totalPages"
                            class="mt-2"
                            @input="getLastestFolders()"
                        ></v-pagination>
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
            articles: [],
            // 当前页
            currentPage: 1,
            totalPages: null,
            // 页大小
            pageSize: 10
        }
    },
    mounted() {
        this.handleCurrentChange()
    },

    methods: {
        // 向后端请求当前页文章
        handleCurrentChange() {
            var _this = this
            this.$axios
                .get(
                    '/article/' + this.currentPage + '/' + this.pageSize + '/1'
                )
                .then((response) => {
                    if (response && response.data.code === 200) {
                        _this.articles = response.data.result.content
                        // _this.totalArticles = response.data.result.totalElements
                        _this.totalPages = response.data.result.totalPages
                    }
                })
        },
    }
}
</script>

<style>
</style>