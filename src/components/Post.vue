<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import heart from "../assets/heart.png";
import heartFilled from "../assets/heart_filled.png";
import comment from "../assets/comment.png";
import { useAuthStore } from "../store";
import type { post, user } from "../types/post";
const props = defineProps<{
    post: post;
}>();

const author = ref<user>();
const post = ref<post>(props.post);

const store = useAuthStore();

fetch("/api/user/" + props.post.userId)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        author.value = data;
    });

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
};
const formatTime = (date: string | number = Date.now()) => {
    return {
        hours: new Date(date).getHours(),
        minutes: new Date(date).getMinutes(),
    };
};
const isMoreThan = (_date: string) => {
    return {
        day: new Date().getDate() !== new Date(_date).getDate(),
        hour: new Date().getHours() !== new Date(_date).getHours(),
    };
};
const formatDateTime = (date: string) => {
    if (isMoreThan(date).day) return `${formatDate(date)}`;
    if (isMoreThan(date).hour)
        return `${formatTime().hours - formatTime(date).hours}h`;
    return `${formatTime().minutes - formatTime(date).minutes}min`;
};

const isLiked = ref<boolean>(post.value.likes?.includes(store.userData.email));

const toggleLike = (e: MouseEvent) => {
    e.stopPropagation();
    fetch("/api/posts/" + post.value._id + "/togglelike", {
        method: "POST",
    })
        .then((response) => response.json())
        .then((data) => {
            isLiked.value = data.liked;
            if (data.liked) post.value.likes.push(store.userData.email);
            else {
                post.value.likes = post.value.likes.filter(
                    (email) => email !== store.userData.email
                );
            }
        });
};

const router = useRouter();

const isConnected = () => !!store.userData._id;

console.log("liurhbf;eg", author);
</script>
<template>
    <div @click="router.push('/post/' + post._id)" class="post">
        <div class="postHeader">
            <div class="author">
                <img class="img" :src="author?.image" />
                <p>{{ author?.name }}</p>
            </div>
            <div class="timestamp">
                {{ formatDateTime(post.createdAt) }}
                <!-- {{ new Date(post.createdAt).toLocaleTimeString() }} -->
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
                    v-if="isConnected()"
                >
                    >
                    <img :src="heart" alt="like" v-if="!isLiked" />
                    <img :src="heartFilled" alt="like" v-if="isLiked" />
                </button>
                <RouterLink
                    id="likeButton"
                    to="/api/auth/signin"
                    v-if="!isConnected()"
                >
                    <img :src="heart" alt="like" />
                </RouterLink>
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
