<template>
    <div class="mainArea">
        <Navbar></Navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
    name: 'Home',
    components: { Navbar }
}
</script>
<style>
.mainArea {
    height: 100%;
}
</style>
