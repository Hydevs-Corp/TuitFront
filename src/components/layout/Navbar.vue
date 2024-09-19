<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAuthStore } from "../../store";
const store = useAuthStore();
import tuit_logo from "../../assets/tuit_logo.png";
</script>

<template>
    <nav>
        <div class="left">
            <img :src="tuit_logo" />
            <div class="routerLink">
                <RouterLink id="homeLink" to="/">Accueil</RouterLink>

                <RouterLink id="likeLink" to="/liked" v-if="store.connected"
                    >Mes posts préférés</RouterLink
                >
            </div>
        </div>
        <div>
            <div v-if="!store.connected" class="unsignedContainer">
                <a href="/api/auth/signin" class="unsigned">Login</a>
            </div>
            <div v-if="store.connected" class="profileContainer">
                <RouterLink to="/profile" class="profile">
                    <img :src="store.authData.image" />
                </RouterLink>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.routerLink {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    gap: 5px;
}
.profileContainer {
    display: flex;
    gap: 10px;
}
.profile {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #fff;
    text-decoration: none;
    flex-direction: row;
    padding: 0;
}
.profile img {
    /* background-color: #fffb; */
    /* padding: 4px; */
    width: 24px;
    height: 24px;
    border-radius: 50%;
}
.unsignedContainer {
    display: flex;
    gap: 10px;
}
.unsigned {
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
    gap: 5px;
    padding: 10px;
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--pink);
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
