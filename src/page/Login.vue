<script setup lang="ts">
import { ref } from "vue";
const email = ref("");
const password = ref("");
</script>
<template>
    <input v-model="email" type="email" placeholder="edit me" />
    <input v-model="password" type="password" placeholder="edit me" />
    <p>{{ email }} / {{ password }}</p>
</template>
