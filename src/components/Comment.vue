<script setup lang="ts">
import { ref } from "vue";
import type { comment, user } from "../types/post";

const { comment } = defineProps<{ comment: comment }>();

const author = ref<user>();

const getUser = async () => {
    const response = await fetch(`/api/user/${comment.author}`);
    const data = await response.json();
    author.value = data;
};

getUser();
</script>

<template>
    <div class="comment">
        <div class="author">
            <img class="img" :src="author?.image" />
            <p>{{ author?.name }}</p>
        </div>
        <div class="comment-body">{{ comment.body }}</div>
    </div>
</template>

<style scoped>
.comment {
    border: 2px dashed #cccccc50;
    border-top: none;
    padding: 15px;
}
.author {
    display: flex;
    align-items: center;
    gap: 10px;
}
.author p {
    margin: 0;
}
.img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
}
</style>
