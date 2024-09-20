<script setup lang="ts">
import { ref } from "vue";
import Container from "../components/layout/Container.vue";
import type { post } from "../types/post";
import { useAuthStore } from "../store";
import { useRouter } from "vue-router";
import Comment from "../components/Comment.vue";
const { id } = defineProps<{ id: string }>();

const post = ref<Partial<post>>({
    comments: [],
});
const comment = ref<string>("");
const store = useAuthStore();
const router = useRouter();
const isConnected = () => !!store.authData._id;

const fetchPost = async () => {
    try {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();
        post.value = data;
    } catch (error) {
        router.push("/");
    }
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
            author: store.authData._id ?? "anonymous",
        }),
    });
    if (response.ok) {
        comment.value = "";
        const newPost = await response.json();
        post.value = newPost;
    }
};

const deletePost = async () => {
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
        <div class="post-details">
            <div>
                <h1>{{ post.title }}</h1>
                <p>{{ post.body }}</p>
            </div>
        </div>
        <button
            class="button-delete"
            id="delete"
            v-if="store.authData._id === post.userId"
            @click="deletePost"
        >
            Supprimer le post
        </button>
        <div>
            <h2>Commentaires</h2>
            <form
                class="new-comment"
                @submit.prevent="pushComment"
                v-if="isConnected()"
            >
                <input
                    id="comment"
                    class="add-comment"
                    required
                    minlength="5"
                    v-model="comment"
                />
                <button id="submit-comment" class="button-send">Envoyer</button>
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
h1 {
    word-break: break-all;
}
p {
    word-break: break-all;
    text-align: justify;
}
form {
    margin: 10px auto;
}
form.new-comment {
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}
.add-comment {
    max-width: 400px;
    min-width: 300px;
    border: 1px solid #ccc;
}
.post-details {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.button-delete {
    height: 20%;
    color: #ffffff;
    background-color: var(--blue);
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
}
.button-send {
    height: 20%;
    color: #ffffff;
    background-color: var(--blue);
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    border: none;
}
</style>
