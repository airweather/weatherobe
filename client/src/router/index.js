import { createRouter, createWebHistory } from 'vue-router'
import DailyLook from '../views/DailyLook.vue'
import Info from '../views/InfoView.vue'
import Write from '../views/WriteView.vue'
import Main from '../views/MainView.vue'
import Mypage from '../views/MypageView.vue'
import MyWardrobe from '../views/WardrobeView.vue'
import Search from '../views/SearchView.vue'
import Login from '../views/LoginView.vue'
import signUp from '../views/SignupView.vue'
import InfoEdit from '../views/InfoEditView.vue'
import SearchResult from '../views/SearchResult.vue'

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: Main
  },
  {
    path: '/dailylook',
    name: 'DailyLook',
    component: DailyLook
  },
  {
    path: '/info',
    name: 'Info',
    component: Info
  },
  {
    path: '/write',
    name: 'Write',
    component: Write
  },
  {
    path: '/mypage',
    name: 'Mypage',
    component: Mypage
  },
  {
    path: '/wardrobe',
    name: 'MyWardrobe',
    component: MyWardrobe
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signUp',
    component: signUp
  },
  {
    path: '/edit',
    name: 'InfoEdit',
    component: InfoEdit
  },
  {
    path: '/result',
    name: 'SearchResult',
    component: SearchResult
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
