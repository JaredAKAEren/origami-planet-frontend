import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import mavonEditor from "mavon-editor"
import 'mavon-editor/dist/css/index.css'
var axios = require('axios')

axios.defaults.baseURL = 'http://localhost:8443/api'
// 使请求带上凭证信息
axios.defaults.withCredentials = true

Vue.prototype.$axios = axios

Vue.config.productionTip = false

// Markdown编辑器
Vue.use(mavonEditor)

// 前端拦截
router.beforeEach((to, from, next) => {
    if (store.state.user && to.path.startsWith('/admin')) {
        axios.get('/isadmin').then((response) => {
            if (response && response.data.code === 200) {
                next()
            } else if (response && response.data.code === 400) {
                next({
                    path: "index"
                })
            } else {
                next()
            }
        })
    }
    if (to.meta.requireAuth) {
        if (store.state.user) {
            axios
                .get('/authentication')
                .then(resp => {
                    if (resp.data) {
                        next()
                    } else {
                        next({
                            path: "login",
                            query: {
                                redirect: to.fullPath
                            }
                        })
                    }
                }).catch((failResp) => {
                    if (failResp) {
                        next({
                            path: "login",
                            query: {
                                redirect: to.fullPath
                            }
                        })
                    }
                })
        } else {
            next({
                path: 'login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
