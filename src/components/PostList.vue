<script setup lang="ts">
import { ref } from "vue";
import Post from "./Post.vue";
import { post } from "../types/post";
import Container from "./layout/Container.vue";
import CreateButton from "./CreateButton.vue";
import { useAuthStore } from "../store";

const posts = ref<post[]>([]);
const skip = ref<number>(0);
const total = ref<number>(0);

const store = useAuthStore();

const fetchNext = async () => {
    try {
        const response = await fetch("/api/posts?limit=10&skip=" + skip.value);
        const data = await response.json();
        posts.value = [...posts.value, ...data?.posts];
        total.value = data.total;
        skip.value += 1;
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};
fetchNext();
</script>

<template>
    <Container>
        <div class="fixed-container">
            <h1>Les derniers posts</h1>
            <div class="postsContainer">
                <Post v-for="post of posts" :key="post._id" :post="post" />
                <button
                    class="see-more"
                    v-if="total > posts.length"
                    @click="fetchNext"
                >
                    Voir plus
                </button>
            </div>
            <CreateButton v-if="!!store.authData._id" />
        </div>
    </Container>
</template>

<style scoped>
h1 {
    text-align: center;
}
.fixed-container {
    position: relative;
}
.postsContainer {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 5px;

    border-top: 2px dashed #cccccc50;
}
.see-more {
    margin-top: 10px;
    padding: 10px;
    border: none;
    background-color: #f1f1f1;
    margin: 0 auto;
    color: black;
    border-radius: 3px;
}
</style>
