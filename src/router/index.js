import { createRouter, createWebHistory } from 'vue-router';

import Inventory from '../public/pages/inventory.component.vue';

const routes = [
    {
        path: '/',
        component: Inventory,
    },
    {
        path: '/sensors',
        component: () => import('../public/pages/sensors.component.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;