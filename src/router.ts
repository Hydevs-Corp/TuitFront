import { createRouter, createWebHistory } from "vue-router";

import HomeView from "./page/HomeView.vue";
import Likes from "./page/Likes.vue";
import LoginView from "./page/Login.vue";
import PostForm from "./page/PostForm.vue";
import Profile from "./page/Profile.vue";
import SignUp from "./page/SignUp.vue";
import SinglePost from "./page/SinglePost.vue";

const routes = [
    { path: "/", component: HomeView },
    { path: "/post/:id", component: SinglePost, props: true },
    { path: "/liked", component: Likes },
    { path: "/login", component: LoginView },
    { path: "/profile", component: Profile },
    { path: "/post/create", component: PostForm },
    { path: "/signup", component: SignUp },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
