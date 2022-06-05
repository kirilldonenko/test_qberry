import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import(/* webpackChunkName: "HomeView" */ "../views/HomeView"),
    },
    {
        path: "/episode/:id",
        name: "episode",
        component: () => import(/* webpackChunkName: "EpisodeView" */ "../views/EpisodeView"),
    },
    {
        path: "/character/:name",
        name: "character",
        component: () => import(/* webpackChunkName: "CharacterView" */ "../views/CharacterView"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
