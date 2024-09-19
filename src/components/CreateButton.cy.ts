// @ts-nocheck
/// <reference types="cypress" />
import { useAuthStore } from "../store";
import CreateButton from "./CreateButton.vue";

describe("<CreateButton />", () => {
    it("renders", () => {
        const store = useAuthStore();
        store.setUser({
            _id: "1",
            name: "randomuser",
            email: "",
        });
        cy.mountWithPinia(CreateButton);
    });
});
