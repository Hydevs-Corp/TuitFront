import { createRouter, createWebHistory } from "vue-router";

import HomeView from "./page/HomeView.vue";
import Likes from "./page/Likes.vue";
import PostForm from "./page/PostForm.vue";
import Profile from "./page/Profile.vue";
// import SignUp from "./page/SignUp.vue";
import SinglePost from "./page/SinglePost.vue";

const routes = [
    { path: "/", component: HomeView, meta: { isProtected: false } },
    {
        path: "/post/:id",
        component: SinglePost,
        props: true,
        meta: { isProtected: false },
    },
    { path: "/liked", component: Likes, meta: { isProtected: true } },
    { path: "/profile", component: Profile, meta: { isProtected: true } },
    { path: "/post/create", component: PostForm, meta: { isProtected: true } },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, _from, next) => {
    let auth = await fetch("/api/whoami");

    if (to.meta.isProtected && auth.status !== 200 && to.path !== "/") {
        next("/");
    } else {
        next();
    }
});
