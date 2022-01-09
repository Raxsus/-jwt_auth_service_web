import {createRouter, createWebHistory} from 'vue-router';
import api from './api/api';
import Home from "./views/Home.vue";
import Details from "./views/Details.vue";
import Users from "./views/Users.vue";

const Login = () => import('./views/Login.vue')


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home, name: 'Home'},
        {path: '/details', component: Details, name: 'Details'},
        {path: '/users', component: Users, name: 'Users'},
        {path: '/login', component: Login, name: 'Login'}
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && to.name !== 'Home' && !api.isAuthorize()) next({ name: 'Login' })
    else next()
})

export default router