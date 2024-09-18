<script setup lang="ts">
import Container from "../components/layout/Container.vue";
import { useAuthStore } from "../store";

const authStore = useAuthStore();
// authStore.logout;

console.log("coucou");
</script>

<template>
    <Container class="profile">
        <div class="header">
            <h1>Profile</h1>
            <a href="/api/auth/signout">Logout</a>
        </div>
        <pre>{{ JSON.stringify(authStore.userData, null, 4) }}</pre>
        <p>
            <span class="id">
                <strong>ID:</strong> {{ authStore.userData._id }}
            </span>
            <span>
                <strong>Username:</strong> {{ authStore.userData.name }}
            </span>
            <span>
                <strong>Email:</strong> {{ authStore.userData.email }}
            </span>
        </p>
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
    background-color: red;
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
