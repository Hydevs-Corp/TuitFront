// @ts-nocheck
/// <reference types="cypress" />
import Comment from "./Comment.vue";

describe("<Comment />", () => {
    it("renders", () => {
        cy.mount(Comment, {
            props: {
                comment: {
                    id: "1",
                    author: "randomuser",
                    body: "Hello, World!",
                },
            },
        });
    });
});
