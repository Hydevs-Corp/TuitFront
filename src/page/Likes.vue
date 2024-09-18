<script setup lang="ts">
import { ref } from "vue";
import Post from "../components/Post.vue";
import { post } from "../types/post";
import Container from "../components/layout/Container.vue";
import heart from "../assets/heart_filled.png";

const posts = ref<post[]>([]);
const skip = ref<number>(0);
const total = ref<number>(0);

const fetchNext = () => {
    fetch("/api/liked?limit=10&skip=" + skip.value)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(posts.value);
            posts.value = [...posts.value, ...data?.posts];
            total.value = data.total;
        });
    skip.value += 1;
};

fetchNext();
</script>

<template>
    <Container>
        <h1>Mes posts préférés <img :src="heart" /></h1>
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
    </Container>
</template>

<style scoped>
h1 {
    text-align: center;
}
h1 img {
    width: 30px;
    height: 30px;
    transition: 1s transform;
}
h1:hover img {
    transform: rotate(360deg);
}
.postsContainer {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-bottom: 5px;
    justify-content: center;

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
