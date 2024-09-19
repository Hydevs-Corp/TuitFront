// @ts-nocheck
/// <reference types="cypress" />

describe("magic user test the app", () => {
    beforeEach(() => {
        cy.login();
    });

    it("create a post", () => {
        const randomNumber = Math.floor(Math.random() * 1000);
        const title = "Hello World" + randomNumber;
        const body = "This is the content of my post" + randomNumber;
        cy.createPost(title, body);

        const post = cy.get(".post").contains(title);

        post.should("exist");

        cy.deletePost(title);
    });

    it("comment a post", () => {
        const randomNumber = Math.floor(Math.random() * 1000);
        const title = "Hello World" + randomNumber;
        const body = "This is the content of my post" + randomNumber;
        cy.createPost(title, body);

        const post = cy.get(".post").contains(title);
        post.click();

        const comment = "This is a comment" + randomNumber;
        cy.get("#comment").type(comment);
        cy.get("#submit-comment").click();
        cy.get(".comment-list").contains(comment).should("exist");

        cy.get("#delete").click();
        cy.get(".postsContainer").contains(title).should("not.exist");
    });

    it("like a post", () => {
        const randomNumber = Math.floor(Math.random() * 1000);
        const title = "Hello World" + randomNumber;
        const body = "This is the content of my post" + randomNumber;
        cy.createPost(title, body);

        const post = cy.get(".post").contains(title);
        post.should("exist");

        post.get("#likeButton").click();

        cy.get("#likeLink").click();

        const likedPost = cy.get(".post").contains(title);

        likedPost.should("exist");

        cy.deletePost(title);
    });
});
