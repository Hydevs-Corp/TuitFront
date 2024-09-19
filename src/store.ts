import { defineStore } from "pinia";
import { user } from "./types/post";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        authData: {
            _id: "",
            name: "",
            email: "",
            image: "",
            emailVerified: false,
        } as user,
    }),
    getters: {
        connected(): boolean {
            return this.authData.email !== "";
        },
        userData(): user {
            return this.authData ?? {};
        },
    },
    actions: {
        async getUser() {
            const response = await fetch("/api/whoami");
            if (response.ok) {
                const userData = (await response.json()) as user;
                console.log(userData);
                this.authData = userData;
            }
        },
        setUser(userData: user) {
            this.authData = userData;
        },
    },
});
