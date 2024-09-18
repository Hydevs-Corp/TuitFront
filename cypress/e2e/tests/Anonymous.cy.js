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

    false &&
        it("can't comment a post", () => {
            cy.visit("http://localhost/api/auth/signin");
            cy.get("#input-username-for-credentials-provider").type(
                "thisismagic"
            );
            cy.get("#submitButton").click();

            const randomNumber = Math.floor(Math.random() * 1000);
            const title = "Hello World" + randomNumber;
            const content = "This is the content of my post" + randomNumber;

            cy.get(".createButton").first().click();

            cy.get("#title").type(title);
            cy.get("#body").type(content);

            cy.get("button[type=submit]").click();

            cy.get(".signout").click();
            cy.get("#submitButton").click();

            cy.get(".post").contains(title).click();

            cy.get("#comment").should("not.exist");

            cy.visit("http://localhost/api/auth/signin");
            cy.get("#input-username-for-credentials-provider").type(
                "thisismagic"
            );
            cy.get("#submitButton").click();

            const post = cy.get(".post").contains(title);

            post.should("exist");

            post.click();

            cy.get("#delete").click();
            cy.get(".postsContainer").contains(title).should("not.exist");
        });

    it("can't comment a post", () => {
        cy.visit("http://localhost/api/auth/signin");
        cy.get("#input-username-for-credentials-provider").type("thisismagic");
        cy.get("#submitButton").click();

        const randomNumber = Math.floor(Math.random() * 1000);
        const title = "Hello World" + randomNumber;
        const content = "This is the content of my post" + randomNumber;

        cy.get(".createButton").first().click();

        cy.get("#title").type(title);
        cy.get("#body").type(content);

        cy.get("button[type=submit]").click();

        cy.get(".signout").click();
        cy.get("#submitButton").click();

        cy.get(".post").contains(title).get("#likeButton").click();
        cy.location("pathname").should("eq", "/api/auth/signin");

        cy.visit("http://localhost/api/auth/signin");
        cy.get("#input-username-for-credentials-provider").type("thisismagic");
        cy.get("#submitButton").click();

        const post = cy.get(".post").contains(title);

        post.should("exist");

        post.click();

        cy.get("#delete").click();
        cy.get(".postsContainer").contains(title).should("not.exist");
    });
});
