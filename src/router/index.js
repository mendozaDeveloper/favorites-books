import { createWebHistory, createRouter } from "vue-router";

import {useAuthStore} from "../store/auth";

import LoginView from "../views/LoginView.vue";
import BookListView from "../views/BookListView.vue";
import CreateBookView from "../views/CreateBookView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import FavoriteView from "../views/FavoriteView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
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
        path: '/create',
        name: 'create',
        component: CreateBookView,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/favorite',
        name: 'favorite',
        component: FavoriteView,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/favorite/:id/items',
        name: 'favorite-user',
        component: FavoriteView,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/:catchAll(.*)*',
        name: 'notFound',
        component: NotFoundView
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
