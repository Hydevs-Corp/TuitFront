<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/layout/Navbar.vue";
import { useAuthStore } from "./store";
import chaton from "./assets/Chaton.png";

const store = useAuthStore();

store.updateUser();
</script>

<template>
    <Navbar />
    <main>
        <RouterView />
        <img :src="chaton" />
    </main>
</template>

<style scoped>
img {
    width: 128px;
    pointer-events: none;
    /* height: auto; */
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 10;
    /* opacity: 0.5; */
    cursor: grab;
}
</style>
