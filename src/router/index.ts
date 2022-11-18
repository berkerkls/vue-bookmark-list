import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        name: "HomeView",
        path: "/",
        component: () => import("../views/HomeView.vue"),
    },
    {
        name: "NewBookmark",
        path: "/newbookmark",
        component: () => import("../views/NewBookmark.vue")

    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router