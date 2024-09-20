<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import heart from "../assets/heart.png";
import heartFilled from "../assets/heart_filled.png";
import comment from "../assets/comment.png";
import { useAuthStore } from "../store";
import type { post, user } from "../types/post";
import { getTimeDifference } from "../scripts/getTimeDifference";
const props = defineProps<{
    post: post;
}>();

const author = ref<user>();
const post = ref<post>(props.post);

const store = useAuthStore();
const router = useRouter();

const fetchAuthor = async () => {
    try {
        const response = await fetch("/api/user/" + props.post.userId);
        const data = await response.json();
        author.value = data;
    } catch (error) {
        console.error("Error fetching author:", error);
    }
};

fetchAuthor();

const isLiked = ref<boolean>(post.value.likes?.includes(store.authData.email));

const toggleLike = async (e: MouseEvent) => {
    e.stopPropagation();
    try {
        const response = await fetch(
            "/api/posts/" + post.value._id + "/togglelike",
            {
                method: "POST",
            }
        );
        const data = await response.json();
        isLiked.value = data.liked;
        if (data.liked) {
            post.value.likes.push(store.authData.email);
        } else {
            post.value.likes = post.value.likes.filter(
                (email) => email !== store.authData.email
            );
        }
    } catch (error) {
        console.error("Error toggling like:", error);
    }
};

const goToSignUp = (e: MouseEvent) => {
    e.stopPropagation();
    router.push("/api/auth/signin");
};
</script>
<template>
    <div @click="router.push('/post/' + post._id)" class="post">
        <div class="postHeader">
            <div class="author">
                <img class="img" :src="author?.image" />
                <p>{{ author?.name }}</p>
            </div>
            <div class="timestamp">
                {{ getTimeDifference(post.createdAt) }}
            </div>
        </div>
        <p class="title">{{ post.title }}</p>
        <p class="body">{{ post.body }}</p>
        <div class="buttons">
            <div class="like-wrapper">
                <div class="like"><img :src="comment" alt="like" /></div>
                <p>{{ post.comments.length }}</p>
            </div>
            <div class="like-wrapper">
                <p>{{ post.likes.length }}</p>
                <button
                    :class="`${isLiked ? 'liked' : ''} like`"
                    @click="toggleLike"
                    id="likeButton"
                    v-if="store.connected"
                >
                    <img :src="heart" alt="like" v-if="!isLiked" />
                    <img :src="heartFilled" alt="like" v-if="isLiked" />
                </button>
                <button
                    class="like"
                    @click="goToSignUp"
                    id="likeButton"
                    v-if="!store.connected"
                >
                    <img :src="heart" alt="like" />
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.post {
    padding: 15px;
    border: 2px dashed #cccccc50;
    border-top: none;
    backdrop-filter: blur(4px);
}
.post:hover {
    background-color: #9991;
    cursor: pointer;
}
.buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.goto {
    display: flex;
    width: fit-content;
    justify-content: start;
    align-items: center;
    color: white;
    text-decoration: none;
    background-color: red;
    padding: 5px 12px;
    border-radius: 3px;
}
.like-wrapper {
    display: flex;
    gap: 5px;
    align-items: center;
}
.like {
    border: none;
    padding: 0px;
    margin: 0px;
    color: white;
    background-color: transparent;
    width: 32px;
    height: 32px;
}
.buttons img {
    width: 100%;
    height: 100%;
}
/* .buttons img {
    width: 100%;
    height: 100%;
} */
/* .like >  */
.liked {
    background-color: transparent;
    /* color: red; */
}
.title {
    font-size: 1.3rem;
    margin: 0;
    font-weight: bold;
    word-break: break-all;
}
.body {
    font-size: 1rem;
    margin: 0;
    width: 100%;
    word-break: break-all;
}
.postHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.author {
    display: flex;
    align-items: center;
    gap: 10px;
}
.timestamp {
    font-size: 0.8rem;
    color: #666;
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
button {
    background: none;
    border: none;
    cursor: pointer;
}
</style>
