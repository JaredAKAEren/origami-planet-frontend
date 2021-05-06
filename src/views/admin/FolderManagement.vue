<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="folders"
            :page.sync="currentPage"
            :items-per-page="pageSize"
            hide-default-footer
            class="mt-3"
        >
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="viewItem(item)">
                    mdi-eye
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
        </v-data-table>
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
            headers: [
                { text: '标题', value: 'folder.folderTitle' },
                { text: '作者', value: 'folder.folderUserId' },
                { text: '时间', value: 'folder.folderDate' },
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

    methods:{
        getOnePageFolders() {
            var _this = this
            this.$axios
                .get('/folder/' + this.currentPage + '/' + this.pageSize)
                .then((response) => {
                    if (response && response.data.code === 200) {
                        _this.folders = response.data.result.content
                        _this.totalPages=response.data.result.totalPages
                    }
                })
        }
    }
}
</script>

<style>
</style>