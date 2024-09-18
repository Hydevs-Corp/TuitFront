<script setup lang="ts">
import { ref } from "vue";
import { post } from "../types/post";
import { useAuthStore } from "../store";
import Container from "../components/layout/Container.vue";
import { useRouter } from "vue-router";
import send from "../assets/send.png";

const props = defineProps<{
    data?: post;
}>();

const form = ref<
    Omit<post, "userId" | "_id" | "comments" | "createdAt" | "likes">
>({
    body: props.data?.body || "",
    title: props.data?.body || "",
});

const store = useAuthStore();

const router = useRouter();

const onSubmit = async () => {
    if (form.value.body.trim() === "" || form.value.title.trim() === "") {
        return;
    }
    const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...form.value,
            userId: store.userData._id,
            comments: [],
            likes: [],
        }),
    });
    if (response.ok) {
        form.value = { body: "", title: "" };
        router.push("/");
    }
};
</script>
<template>
    <Container>
        <h1>{{ props.data ? "Modifier" : "Créer" }} un post</h1>
        <form @submit.prevent="onSubmit">
            <label for="title">Titre</label>
            <input
                placeholder="Quel est le nom de mon œuvre"
                v-model="form.title"
            />
            <label for="body">Message</label>
            <textarea
                v-model="form.body"
                placeholder="Quel est ton message au monde"
            ></textarea>
            <button
                type="submit"
                :disabled="form.body.trim() === '' || form.title.trim() === ''"
            >
                Envoyer
                <img :src="send" />
            </button>
        </form>
    </Container>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
    margin: 10px auto;
    width: 100%;
}
input,
textarea {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    resize: vertical;
    background-color: transparent;
    backdrop-filter: blur(5px);
}
textarea {
    min-height: 100px;
}
input:is(:focus, :focus-visible),
textarea:is(:focus, :focus-visible) {
    outline: none;
}

button {
    padding: 10px 15px;
    border: none;
    background-color: var(--purple);
    margin: 0 auto;
    color: black;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: end;
    gap: 10px;
    color: white;
    font-weight: bold;
    font-size: 1.5em;
}
button:hover {
    cursor: pointer;
}
button:disabled,
button[disabled] {
    /* background-color: var(--pink-pastel);
     */
    cursor: not-allowed;
    opacity: 0.5;
}

button img {
    width: 1.5em;
    height: 1.5em;
}
</style>
