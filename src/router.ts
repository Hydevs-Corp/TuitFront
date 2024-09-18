import { createRouter, createWebHistory } from "vue-router";

import HomeView from "./page/HomeView.vue";
import Likes from "./page/Likes.vue";
import LoginView from "./page/Login.vue";
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
    { path: "/login", component: LoginView, meta: { isProtected: false } },
    { path: "/profile", component: Profile, meta: { isProtected: true } },
    { path: "/post/create", component: PostForm, meta: { isProtected: true } },
    // { path: "/signup", component: SignUp },
];
// const protectedRoutes = ["/liked", "/profile", "/post/create", "/post/:id"];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    console.log(to, from, next);
    console.log(to.meta.isProtected);
    // console.log(localStorage);
    // return true;
    // get cookie named : authjs.csrf-token
    // console.log("cookies");
    let auth = await fetch("/api/whoami");
    console.log(auth);

    if (to.meta.isProtected && auth.status !== 200 && to.path !== "/") {
        next("/");
    } else {
        next();
    }
});
