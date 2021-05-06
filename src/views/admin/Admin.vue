<template>
    <div class="mainArea">
        <Navbar></Navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from '../../components/admin/AdminNavbar'

export default {
    name: 'admin',
    components: { Navbar }
}
</script>
<style>
.mainArea {
    height: 100%;
}
</style>