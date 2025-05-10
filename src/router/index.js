import { createRouter, createWebHistory } from 'vue-router';

import Home from '../public/pages/dashboard.component.vue';

const routes = [
    {
      path: '/',
      component: Home,
    },
    {
        path: '/inventory',
        component: () => import('../public/pages/inventory.component.vue'),
    },
    {
        path: '/sensors',
        component: () => import('../public/pages/sensors.component.vue'),
    },
    {
        path: '/statistics',
        component: () => import('../public/pages/statistics.component.vue'),
    },
    {
      path: '/alerts',
        component: () => import('../public/pages/alerts.components.vue')
    },
    {
        path: '/reports',
        component: () => import('../public/pages/reports.component.vue'),
    },
    {
        path: '/subscriptions',
        component: () => import('../public/pages/subscriptions.component.vue'),
    },
    {
        path: '/profile',
        component: () => import('../public/pages/profile.component.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;