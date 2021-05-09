<template>
    <v-app>
        <v-main>
            <!-- <v-conrainer class="grey lighten-4"> -->
            <router-view v-if="isRouterAlive"></router-view>
            <!-- </v-conrainer> -->
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',

    components: {
        // Navbar
    },
    provide() {
        return {
            reload: this.reload
        }
    },

    data() {
        return {
            isRouterAlive: true
        }
        //
    },

    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(() => {
                this.isRouterAlive = true
            })
        }
    }
}
</script>
