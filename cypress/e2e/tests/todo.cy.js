/// <reference types="cypress" />

describe("check if app work", () => {
    beforeEach(() => {
        cy.visit("http://localhost/");
    });

    it("basic test", () => {
        const content = "Hello World";
        cy.get(".postsContainer").get(".post").first().click();
        cy.get("input").type(content);

        cy.get("button").click();

        cy.get(".comment-list")
            .get(".comment-body")
            .last()
            .should("have.text", content);
    });
});
