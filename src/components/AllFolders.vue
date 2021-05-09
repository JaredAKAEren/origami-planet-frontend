<template>
    <div>
        <v-container>
            <v-row justify="center">
                <v-col cols="12" sm="9" md="9" lg="12" xl="8">
                    <v-row no-gutters>
                        <v-subheader class="text-h6 font-weight-bold">
                            全部动态
                        </v-subheader>
                    </v-row>
                    <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="3"
                            lg="2"
                            xl="2"
                            v-for="(folder, index) in folders"
                            :key="index"
                        >
                            <v-card flat rounded="lg">
                                <router-link
                                    class="article-link"
                                    :to="'folder/' + folder.folder.id"
                                >
                                    <v-hover v-slot:default="{ hover }">
                                        <v-img
                                            aspect-ratio="1"
                                            class="rounded-lg"
                                            :src="folder.folder.folderCover"
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
                                            {{ folder.folder.folderTitle }}
                                        </span>
                                    </v-row>
                                    <v-row no-gutters class="pt-1">
                                        <v-col cols="auto" class="pa-0">
                                            <v-avatar size="22">
                                                <v-img
                                                    :src="
                                                        folder.profile
                                                            .profileAvatar
                                                    "
                                                ></v-img>
                                            </v-avatar>
                                        </v-col>
                                        <v-col class="pa-0 pl-1">
                                            <span
                                                class="grey--text lighten-3 font-weight-light text-body-2"
                                            >
                                                {{
                                                    folder.profile
                                                        .profileNickname
                                                }}
                                            </span>
                                        </v-col>
                                    </v-row>
                                </v-col>
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
            folders: [],
            // 当前页
            currentPage: 1,
            totalPages: null,
            // 页大小
            pageSize: 18
        }
    },
    mounted() {
        this.getLastestFolders()
    },

    methods: {
        getLastestFolders() {
            var _this = this
            this.$axios
                .get('/folder/' + this.currentPage + '/' + this.pageSize + '/1')
                .then((response) => {
                    if (response && response.data.code === 200) {
                        _this.folders = response.data.result.content
                        _this.totalPages = response.data.result.totalPages
                    }
                })
        }
    }
}
</script>

<style>
</style>