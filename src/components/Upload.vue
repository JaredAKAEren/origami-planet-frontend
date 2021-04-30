<template>
    <div class="upload mt-n4 grey lighten-4">
        <!-- <div> -->
        <v-card flat tile width="100%" color="grey darken-3 pt-7">
            <v-row v-if="showUpImages" class="mx-4 mt-4" justify="center">
                <v-col
                    cols="3"
                    sm="3"
                    md="2"
                    lg="2"
                    xl="2"
                    v-for="(image, index) in images"
                    :key="index"
                >
                    <v-hover v-slot:default="{ hover }">
                        <v-card rounded="lg">
                            <v-img class="rounded-lg" :src="image"></v-img>
                            <v-overlay
                                absolute
                                :value="hover"
                                opacity="0.3"
                                color="red"
                            >
                                <v-btn icon @click="removeImage(index)">
                                    <v-icon large
                                        >mdi-close-circle-outline
                                    </v-icon>
                                </v-btn>
                            </v-overlay>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-spacer></v-spacer>
                <v-file-input
                    dark
                    label="上传图片"
                    v-model="imageFile"
                    prepend-icon="mdi-image-area"
                    @change="uploadFile"
                ></v-file-input>
                <v-spacer></v-spacer>
            </v-row>
        </v-card>
        <!-- </div> -->
        <v-container>
            <v-col>
                <v-row no-gutters class="mt-4">
                    <v-card flat width="100%">
                        <v-row no-gutters class="ml-3 py-1">
                            <v-text-field
                                v-model="title"
                                type="text"
                                placeholder="标题"
                                solo
                                flat
                                hide-details
                                maxlength="32"
                            >
                                <template v-slot:append>
                                    <span
                                        class="grey--text text-lighten-3 caption"
                                        >{{ title.length }}/32
                                    </span>
                                </template>
                            </v-text-field>
                        </v-row>
                        <v-divider class="grey lighten-3"></v-divider>
                        <v-row no-gutters class="ml-3">
                            <v-textarea
                                v-model="content"
                                solo
                                flat
                                counter="3000"
                                maxlength="3000"
                                placeholder="内容"
                            ></v-textarea>
                        </v-row>
                    </v-card>
                </v-row>
                <v-row no-gutters class="mt-3">
                    <v-card flat width="100%">
                        <v-row no-gutters class="ml-3 py-1" align="center">
                            <template v-if="showTags">
                                <v-chip
                                    v-for="(tag, index) in tags"
                                    :key="index"
                                    class="ml-2"
                                    close
                                    @click:close="deleteTag(index)"
                                >
                                    {{ tag }}
                                </v-chip>
                            </template>
                            <v-text-field
                                v-model="tag"
                                placeholder="标签"
                                solo
                                flat
                                hide-details
                                @change="setTag"
                            >
                            </v-text-field>
                        </v-row>
                    </v-card>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn
                        depressed
                        large
                        min-width="190px"
                        class="white--text text-body-1 font-weight-bold blue lighten-2"
                        @click="upload"
                    >
                        投稿
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-row>
            </v-col>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showUpImages: false,

            showTags: false,

            tag: '',

            tags: [],

            images: [],

            imageFile: null,

            title: '',

            content: ''
        }
    },

    methods: {
        upload() {
            if (confirm('是否要投稿?')) {
                this.content = this.content.replace(/\n/g, '<br/>')
                this.content = this.content.replace(/ /g, '&nbsp')
                this.$axios
                    .post('/folder', {
                        folder: {
                            id: 0,
                            folderTitle: this.title,
                            folderContent: this.content,
                            folderCover: this.images[0],
                            folderState: 0,
                            folderDate: null,
                            folderUserId: this.$store.state.user.id
                        },
                        tags: this.tags,
                        images: this.images
                    })
                    .then((response) => {
                        if (response && response.data.code === 200) {
                            console.log(response.data.result)
                            this.$router.replace('/index')
                        }
                    })
            }
        },

        // 上传图片
        uploadFile() {
            // this.uploading = true
            var _this = this
            var formData = new FormData()
            if (this.imageFile) {
                formData.append('file', this.imageFile)
                this.$axios
                    .post('/covers', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((response) => {
                        if (response && response.data.code === 200) {
                            _this.images.push(response.data.result)
                            // _this.uploading = false
                            _this.imageFile = null
                            _this.showUpImages = true
                            // _this.upImgSnackbarState = 'success'
                            // _this.upImgSnackbarMessage = '封面上传成功'
                            // _this.upImgSnackbar = true
                        }
                    })
                    // eslint-disable-next-line no-unused-vars
                    .catch((failResponse) => {})
            }
        },

        removeImage(index) {
            this.images.splice(index, 1)
        },

        setTag() {
            this.tags.push(this.tag)
            this.tag = ''
            this.showTags = true
            // console.log(this.tags)
        },

        deleteTag(index) {
            this.tags.splice(index, 1)
            // console.log(this.tags)
        }
    }
}
</script>

<style>
.upload {
    height: 100%;
}
</style>