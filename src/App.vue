<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/layout/Navbar.vue";
import { useAuthStore } from "./store";
import chaton from "./assets/Chaton.png";

const store = useAuthStore();

store.getUser();
</script>

<template>
    <Navbar />
    <main>
        <RouterView />
        <div class="cat"><img :src="chaton" /></div>
    </main>
</template>

<style scoped>
.cat {
    height: 100px;
    pointer-events: none;
    position: fixed;
    bottom: 0;
    z-index: 10;
    cursor: grab;
}

.cat img {
    width: 100%;
    height: 100%;
    z-index: 2;
    position: relative;
}

.cat::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 150px;
    height: 100px;
    background: white;
    border-top-right-radius: 100%;
    filter: blur(10px);
    z-index: 0;
}
</style>
