<template>
    <v-app>
        <v-main>
            <!-- <v-conrainer class="grey lighten-4"> -->
                <router-view></router-view>
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

    data: () => ({
        //
    })
}
</script>
