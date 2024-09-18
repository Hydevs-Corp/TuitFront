/// <reference types="cypress" />

describe("magic user test the app", () => {
    beforeEach(() => {
        cy.visit("http://localhost/api/auth/signin");
        cy.get("#input-username-for-credentials-provider").type("thisismagic");
        cy.get("#submitButton").click();
    });

    it("create a post", () => {
        const randomNumber = Math.floor(Math.random() * 1000);
        const title = "Hello World" + randomNumber;
        const content = "This is the content of my post" + randomNumber;

        cy.get(".createButton").first().click();

        cy.get("#title").type(title);
        cy.get("#body").type(content);

        cy.get("button[type=submit]").click();

        const post = cy.get(".post").contains(title);

        post.should("exist");

        post.click();

        cy.get("#delete").click();
        cy.get(".postsContainer").contains(title).should("not.exist");
    });

    it("create a post and comment it", () => {
        const randomNumber = Math.floor(Math.random() * 1000);
        const title = "Hello World" + randomNumber;
        const content = "This is the content of my post" + randomNumber;

        cy.get(".createButton").first().click();

        cy.get("#title").type(title);
        cy.get("#body").type(content);

        cy.get("button[type=submit]").click();

        const post = cy.get(".post").contains(title);

        post.should("exist");

        post.click();

        const comment = "This is a comment" + randomNumber;

        cy.get("#comment").type(comment);

        cy.get("#submit-comment").click();

        cy.get(".comment-list").contains(comment).should("exist");

        cy.get("#delete").click();
        cy.get(".postsContainer").contains(title).should("not.exist");
    });

    it("create a post and like it", () => {
        const randomNumber = Math.floor(Math.random() * 1000);
        const title = "Hello World" + randomNumber;
        const content = "This is the content of my post" + randomNumber;

        cy.get(".createButton").first().click();

        cy.get("#title").type(title);
        cy.get("#body").type(content);

        cy.get("button[type=submit]").click();

        const post = cy.get(".post").contains(title);

        post.should("exist");

        post.get("#likeButton").click();

        cy.get("#likeLink").click();

        const likedPost = cy.get(".post").contains(title);

        likedPost.should("exist");
        likedPost.click();

        cy.get("#delete").click();
        cy.get(".postsContainer").contains(title).should("not.exist");
    });
});
