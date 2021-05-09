import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import About from '../views/About.vue'
import Register from '../views/Register.vue'
import ArticleEditor from "../components/ArticleEditor"
import ArticleDetails from "../components/ArticleDetails"
import MyPage from "../components/MyPage"
import MyArticles from '../views/MyArticles.vue'
import Upload from '../components/Upload.vue'
import FolderDetails from '../components/FolderDetails.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/login',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: Index,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/index/article',
        name: 'ArticleDetails',
        component: ArticleDetails,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/articleEditor',
        name: 'ArticleEditor',
        component: ArticleEditor,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/upload',
        name: 'Upload',
        component: Upload,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/folders',
        name: 'Folder',
        component: ()=>import('../components/AllFolders'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/articles',
        name: 'Article',
        component: ()=>import('../components/AllArticles'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/folder/:fid',
        name: 'FolderDetails',
        component: FolderDetails,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/mypage/:id',
        name: 'MyPage',
        component: MyPage,
        meta: {
          requireAuth: true
        },
        children: [
          {
            path: '/mypage/:id/about',
            name: 'About',
            component: About,
            meta: {
              requireAuth: true
            }
          },
          {
            path: '/mypage/:id/articles',
            name: 'MyArticles',
            component: MyArticles,
            meta: {
              requireAuth: true
            }
          },
          {
            path: '/mypage/:id/folders',
            name: 'MyFolders',
            component: ()=>import('../views/MyFolder'),
            meta: {
              requireAuth: true
            }
          }
        ]
      },
      {
        path: '/diagram/:did',
        name: 'DiagramDetails',
        component: ()=>import('../components/DiagramDetails'),
        meta: {
          requireAuth: true
        },
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/Admin'),
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: () => import('../views/admin/Index'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/admin/folders',
        name: 'AdminFolders',
        component: () => import('../views/admin/FolderManagement'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/admin/articles',
        name: 'AdminArticles',
        component: () => import('../views/admin/ArticleManagement'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/admin/diagram/management',
        name: 'AdminDiagram',
        component: () => import('../views/admin/DiagramManagement'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/admin/diagram/upload',
        name: 'AdminDiagramUpload',
        component: () => import('../views/admin/DiagramUpload'),
        meta: {
          requireAuth: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
