import { defineStore } from "pinia";
import { user } from "./types/post";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        userData: {
            _id: "",
            name: "",
            email: "",
            image: "",
            emailVerified: false,
        } as user,
    }),
    actions: {
        async updateUser() {
            const response = await fetch("/api/whoami");
            if (response.ok) {
                this.userData = (await response.json()) as user;
            }
        },
    },
});
