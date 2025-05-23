import { createRouter, createWebHistory } from 'vue-router';

import Home from '../public/pages/dashboard.component.vue';

const routes = [
    {
      path: '/',
      component: Home,
    },
    {
        path: '/add-product',
        component: () => import('../public/pages/inventory/inventory.component.vue'),
    },
    {
      path: '/product-list',
      component: () => import('../public/pages/inventory/product-list.component.vue'),
    },
    {
        path: '/sensor-view',
        component: () => import('../public/pages/sensors/sensor-view.component.vue'),
    },
    {
        path: '/sensor-assignment',
        component: () => import('../public/pages/sensors/sensor-assignment.component.vue'),
    },
    {
        path: '/sensor-table',
        component: () => import('../public/pages/sensors/sensor-table.component.vue'),
    },
    {
        path: '/sensor-edit',
        component: () => import('../public/pages/sensors/sensor-edit.component.vue'),
    },
    {
        path: '/sensor-status',
        component: () => import('../public/pages/sensors/sensor-status.component.vue'),
    },
    {
        path: '/statistics',
        component: () => import('../public/pages/statistics/statistics.component.vue'),
    },
    {
      path: '/alerts/sensor-alerts',
        component: () => import('../public/pages/alerts/sensor-alerts.components.vue')
    },
    {
      path: '/alerts/inventory-alerts',
      component: () => import('../public/pages/alerts/inventory-alerts.component.vue')
    },
    {
        path: '/subscriptions',
        component: () => import('../public/pages/subscriptions.component.vue'),
    },
    {
        path: '/profile-details',
        component: () => import('../public/pages/profile/profile-details.component.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;