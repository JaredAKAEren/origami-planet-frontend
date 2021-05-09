<template>
    <div>
        <v-card class="ma-3">
            <v-card-title>
                图解教程管理
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="搜索"
                    single-line
                    clearable
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="folders"
                :page.sync="currentPage"
                :items-per-page="pageSize"
                :search="search"
                hide-default-footer
                class="mt-3"
            >
                <template v-slot:[`item.diagram.diagramCover`]="{ item }">
                    <v-img
                        max-width="100"
                        :aspect-ratio="16 / 9"
                        :src="item.diagram.diagramCover"
                        class="rounded my-3"
                    ></v-img>
                </template>

                <template v-slot:[`item.diagram.diagramState`]="{ item }">
                    <v-switch
                        :input-value="
                            item.diagram.diagramState == 0 ? false : true
                        "
                        color="green"
                        inset
                        @change="editState(item.diagram)"
                    ></v-switch>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                    <router-link
                        class="folder-link"
                        :to="{ path: '/diagram/' + item.diagram.id }"
                    >
                        <v-icon small class="mr-2"> mdi-eye </v-icon>
                    </router-link>
                    <v-icon small @click="deleteItem(item.diagram.id)">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>
        <v-pagination
            v-model="currentPage"
            :length="totalPages"
            class="mt-2"
            @input="getOnePageFolders"
        ></v-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            headers: [
                { text: 'ID', value: 'diagram.id' },
                { text: '封面', value: 'diagram.diagramCover' },
                { text: '标题', value: 'diagram.diagramTitle' },
                { text: '作者', value: 'username' },
                { text: '时间', value: 'diagram.diagramDate' },
                { text: '发布状态', value: 'diagram.diagramState' },
                { text: '功能', value: 'actions', sortable: false }
            ],
            folders: [],

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
            deleteMessage: ''
        }
    },

    mounted() {
        // 向后端请求第一页数据并渲染
        this.getOnePageFolders()
    },

    methods: {
        getOnePageFolders() {
            var _this = this
            this.$axios
                .get('/diagram/' + this.currentPage + '/' + this.pageSize)
                .then((response) => {
                    if (response && response.data.code === 200) {
                        _this.folders = response.data.result.content
                        _this.totalPages = response.data.result.totalPages
                    }
                })
        },

        editState(folder) {
            folder.diagramState = folder.diagramState ? 0 : 1
            // console.log(folder.folderState)
            this.$axios.post('/diagram/state', folder).then((response) => {
                if (response && response.data.code === 200) {
                    console.log(response.data.result)
                } else if (response && response.data.code === 400) {
                    console.log(response.data.message)
                }
            })
        },

        deleteItem(id) {
            var _this = this
            this.$axios.get('/diagram/delete/' + id).then((response) => {
                if (response && response.data.code === 200) {
                    console.log(response.data.result)
                    _this.getOnePageFolders()
                } else if (response && response.data.code === 400) {
                    console.log(response.data.message)
                }
            })
        }
    }
}
</script>

<style>
.folder-link {
    text-decoration: none;
}
</style>