import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home-view',
        component: () => import('../views/HomeView.vue'),
        meta: {
            title: 'Home',
            isView: true,
        }
    },
    {
        path: '/forms',
        name: 'forms-view',
        component: () => import('../views/FormView.vue'),
        meta: {
            title: 'Jogo de Formas',
            isView: true,
        }
    },
    {
        path: '/sounds',
        name: 'sounds-view',
        component: () => import('../views/SoundView.vue'),
        meta: {
            title: 'Jogo de Sons',
            isView: true,
        }
    },
    {
        path: '/numbers',
        name: 'numbers-view',
        component: () => import('../views/NumberView.vue'),
        meta: {
            title: 'Jogo de Números',
            isView: true,
        }
    },
    {
        path: '/forms/game/:numberForms/:size/:discover/:timeLimit',
        name: 'form-game',
        component: () => import('../views/games/FormGame.vue'),
        meta: {
            isView: false,
        },
        props: true
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;