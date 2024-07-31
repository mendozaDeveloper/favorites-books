import { createWebHistory, createRouter } from "vue-router";

import {useAuthStore} from "../store/auth";

import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import BookListView from "../views/BookListView.vue";
import CreateBookView from "../views/CreateBookView.vue";

const routes = [
    {
        path: '/',
        name: 'list',
        component: BookListView,
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/create',
        name: 'create',
        component: CreateBookView,
        meta: {
            requireAuth: true
        }
    }
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const auth = useAuthStore()
    const isAuth = auth.token

    if(to.meta.requireAuth && isAuth == null){
        next('login')
    }
    else{
        next()
    }
})

export default router
