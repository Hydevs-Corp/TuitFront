<script setup lang="ts">
import { RouterLink } from "vue-router";
import write from "../assets/edit.png";

import { useAuthStore } from "../store";
const store = useAuthStore();
</script>

<template>
    <RouterLink class="createButton" to="/post/create" v-if="store.connected">
        <img :src="write" />
    </RouterLink>
</template>

<style>
.createButton {
    position: sticky;
    bottom: 20px;
    right: 20px;
    margin-left: auto;
    background-color: var(--blue);
    border-radius: 100%;
    padding: 8px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-decoration: none;
    margin-right: 20px;
    z-index: 10000;
}

.createButton img {
    width: 100%;
    height: 100%;
}

.createButton:hover {
    background-color: var(--blue-pastel);
    cursor: pointer;
}
</style>
