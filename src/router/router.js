import Main from "@/pages/Main.vue";
import {createRouter, createWebHistory} from "vue-router";
import ConfCreation from "@/pages/ConfCreation.vue";

const routes = [
    {
        path: '/',
        component: Main
        
    },
    {
        path: '/create-call',
        component: ConfCreation,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
    })

export default router;