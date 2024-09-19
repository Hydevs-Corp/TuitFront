// @ts-nocheck
/// <reference types="cypress" />

describe("anonymous user test the app", () => {
    beforeEach(() => {
        cy.visit("http://localhost/");
    });
    it("can't create a post", () => {
        cy.get(".createButton").should("not.exist");

        cy.visit("http://localhost/post/create");

        cy.location("pathname").should("eq", "/");
    });

    it("can't comment a post", () => {
        cy.login();
        const randomNumber = Math.floor(Math.random() * 1000);
        const title = "Hello World" + randomNumber;
        const body = "This is the content of my post" + randomNumber;
        cy.createPost(title, body);
        cy.logout();

        cy.get(".post").contains(title).click();

        cy.get("#comment").should("not.exist");

        cy.login();
        cy.deletePost(title);
        cy.logout();
    });

    it("can't like a post", () => {
        cy.login();
        const randomNumber = Math.floor(Math.random() * 1000);
        const title = "Hello World" + randomNumber;
        const body = "This is the content of my post" + randomNumber;
        cy.createPost(title, body);
        cy.logout();

        cy.get(".post").contains(title).get("#likeButton").click();
        cy.location("pathname").should("eq", "/api/auth/signin");

        cy.login();
        cy.deletePost(title);
        cy.logout();
    });
});
