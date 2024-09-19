<script setup lang="ts">
import Container from "../components/layout/Container.vue";
import { useAuthStore } from "../store";

const authStore = useAuthStore();
</script>

<template>
    <Container class="profile">
        <div class="header">
            <h1>Profil</h1>
            <a href="/api/auth/signout">Se déconnecter</a>
        </div>
        <p><strong>Username:</strong> {{ authStore.authData.name }}</p>
        <p><strong>Email:</strong> {{ authStore.authData.email }}</p>
    </Container>
</template>

<style lang="css" scoped>
.profile {
    padding: 20px;
    size: 12px;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.id {
    color: #666;
}
p {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
</style>
