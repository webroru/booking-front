import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/routing/routes';

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});
