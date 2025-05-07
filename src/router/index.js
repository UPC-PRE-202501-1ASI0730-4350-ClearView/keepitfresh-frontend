import {createRouter, createWebHistory} from "vue-router";

const inventoryComponent = () => import('../public/pages/inventory.component.vue')
const routes = [
    { path: '/inventory', name: 'inventory', component: inventoryComponent, meta:{title: 'Inventory'} },
];

const router = createRouter({
    history: createWebHistory(import.meta.BASE_URL),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    let baseTitle = 'ACME Learning Center';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;