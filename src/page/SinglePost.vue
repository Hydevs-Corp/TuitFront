<script setup lang="ts">
import { ref } from "vue";
import Container from "../components/layout/Container.vue";
import type { post } from "../types/post";
import { useAuthStore } from "../store";
import { useRouter } from "vue-router";
import Comment from "../components/Comment.vue";
// import { useAuthStore } from "../../store";
// const store = useAuthStore();
const { id } = defineProps<{ id: string }>();

const post = ref<Partial<post>>({
    comments: [],
});
const comment = ref<string>("");
const store = useAuthStore();
const router = useRouter();
const isConnected = () => !!store.userData._id;

const fetchPost = async () => {
    const response = await fetch(`/api/posts/${id}`);
    const data = await response.json();
    post.value = data;
};

fetchPost();

const pushComment = async () => {
    if (!comment.value) return;
    if (comment.value.trim().length < 5) return;
    const response = await fetch(`/api/posts/${id}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            body: comment.value,
            author: store.userData._id ?? "anonymous",
        }),
    });
    if (response.ok) {
        comment.value = "";
        const newPost = await response.json();
        console.log(newPost);
        post.value = newPost;
    }
};

const deletePost = async () => {
    console.log(`/api/posts/${id}`);
    const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        router.push("/");
    }
};
</script>

<template>
    <Container>
        <div>
            <h1>{{ post.title }}</h1>
            <p>{{ post.body }}</p>
            <button
                id="delete"
                v-if="store.userData._id === post.userId"
                @click="deletePost"
            >
                Supprimer le post
            </button>
        </div>
        <div>
            <h2>Commentaires</h2>
            <form
                class="new-comment"
                @submit.prevent="pushComment"
                v-if="isConnected()"
            >
                <input id="comment" required minlength="5" v-model="comment" />
                <button id="submit-comment">Envoyer</button>
            </form>
            <div v-if="post?.comments?.length ?? 0 > 0" class="comment-list">
                <Comment
                    v-for="(comment, id) in post.comments"
                    :key="id"
                    :comment="comment"
                />
            </div>
            <p class="nothing" v-if="post?.comments?.length === 0">
                Pas de commentaires :(
            </p>
        </div>
    </Container>
</template>

<style scoped>
.comment-list {
    border-top: 2px dashed #cccccc50;
    margin: 10px 0;
}
.nothing {
    text-align: center;
}
p {
    word-break: break-all;
}
form.new-comment {
    display: flex;
    gap: 5px;
}
</style>
