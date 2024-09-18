<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAuthStore } from "../../store";
const store = useAuthStore();
const isConnected = () => !!store.userData._id;
// console.log("kijehroivljeirvhu", JSON.stringify(store.userData));
import tuit_logo from "../../assets/tuit_logo.png";
</script>

<template>
    <nav>
        <div class="left">
            <img :src="tuit_logo" />
            <div class="routerLink">
                <RouterLink to="/">Home</RouterLink>
                <!-- <RouterLink to="/post/create">Poster</RouterLink> -->
                <RouterLink to="/liked">Liked</RouterLink>
            </div>
        </div>
        <a href="/api/auth/signin" class="login" v-if="!isConnected()">Login</a>
        <div v-if="isConnected()">
            <RouterLink to="/profile" class="profile">
                <img :src="store.userData.image" />
                <span>{{ store.userData.name || store.userData.email }}</span>
            </RouterLink>
        </div>
    </nav>
</template>

<style scoped>
.routerLink {
    display: flex;
    gap: 5px;
}
.profile {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #fff;
    text-decoration: none;
}
.profile img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.login {
    background-color: #3333;
    padding: 5px 10px;
    border-radius: 5px;
}
.left {
    display: flex;
    align-items: center;
    /* flex-direction: ; */
    gap: 10px;
}
img {
    /* width: 50px; */
    height: 50px;
}
nav {
    padding: 10px;
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto;
    border-radius: 0 0 5px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--pink-pastel);
}
h1 {
    margin: 0;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

li {
    display: inline-block;
    margin-right: 10px;
}

a {
    text-decoration: none;
    padding: 5px 12px;
    background-color: #ffffff20;
    border-radius: 4px;
    color: #fff;
}

a:hover {
    background-color: var(--pink);
}
</style>
