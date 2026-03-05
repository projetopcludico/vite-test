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
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;