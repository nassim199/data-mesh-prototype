import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        children: [
            {
                path: '',
                name: 'landing',
                component: () => import('./pages/LandingDemo.vue')
            },
            {
                path: '/login',
                name: 'login',
                component: () => import('./pages/Login.vue')
            },
            {
                path: '/register',
                name: 'register',
                component: () => import('./pages/Register.vue')
            },
            {
                path: '/config',
                name: 'config',
                component: () => import('./AppConfig.vue')
            },
            {
                path: '/formlayout',
                name: 'formlayout',
                component: () => import('./components/FormLayoutDemo.vue')
            },
            {
                path: '/table',
                name: 'table',
                component: () => import('./components/TableDemo.vue')
            },
            {
                path: '/tree',
                name: 'tree',
                component: () => import('./components/TreeDemo.vue')
            },
            {
                path: '/access',
                name: 'access',
                component: () => import('./pages/Access.vue')
            },
            {
                path: '/notfound',
                name: 'notfound',
                component: () => import('./pages/NotFound.vue')
            },
        ]
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('./pages/Error.vue')
    },
   
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
