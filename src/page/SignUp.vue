<script setup lang="ts">
import { ref, computed } from "vue";

const form = ref({ email: "", password: "", passwordConfirm: "" });

const isValid = computed(() => {
    return (
        form.value.email.includes("@") &&
        form.value.password.length > 6 &&
        form.value.password === form.value.passwordConfirm
    );
});
</script>
<template>
    <input v-model="form.email" type="email" placeholder="edit me" />
    <input v-model="form.password" type="password" placeholder="edit me" />
    <input
        v-model="form.passwordConfirm"
        type="password"
        placeholder="edit me"
    />
    <p>{{ form.email }} / {{ form.password }}</p>
    <p v-if="isValid">C'est valide !</p>
    <p>{{ isValid }}</p>
</template>
