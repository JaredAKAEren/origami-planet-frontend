<template>
    <v-btn
        v-if="show"
        bottom
        right
        dark
        fab
        fixed
        color="blue darken-2"
        @click="$vuetify.goTo(0, options)"
    >
        <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: 'Button2Top',
    data() {
        return {
            show: false
        }
    },
    computed: {
        options() {
            return {
                duration: 0
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.showButton)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.showButton)
    },
    methods: {
        showButton() {
            this.show = document.documentElement.scrollTop > 300 ? true : false
        }
    }
}
</script>