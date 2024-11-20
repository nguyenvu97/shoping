// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import Login from "@/components/views/Login/Login.vue";
import HomePage from "@/components/views/HomePage/HomePage.vue";
import Product_Details from "@/components/views/Product/Product_List.vue";
import Product_List from "@/components/views/Product/Product_List.vue";


const routes = [
    //Public
    { path: '/', name: 'home', component: HomePage },
    { path: '/products', name: 'products', component: Product_List },
    { path: '/products/:id', name: 'product', component: Product_Details },

    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: (to, from, next) => {
            const token = localStorage.getItem("token");
            if (token !== null && token !== undefined) {
                next({ name: 'home' });
            } else {
                next();
            }
        },
    },
    //private
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
