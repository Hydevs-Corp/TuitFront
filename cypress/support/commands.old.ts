// @ ts-nocheck
/// <reference types="cypress" />
// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("login", () => {
    cy.visit("http://localhost/api/auth/signin");
    if (
        Cypress.env("MAGIC_USER_LOGIN") === undefined ||
        Cypress.env("MAGIC_USER_PASSWORD") === undefined
    )
        throw new Error(
            "MAGIC_USER_LOGIN and MAGIC_USER_PASSWORD must be set in cypress.env.json"
        );

    cy.get("#input-username-for-credentials-provider").type(
        Cypress.env("MAGIC_USER_LOGIN")
    );
    cy.get("#input-password-for-credentials-provider").type(
        Cypress.env("MAGIC_USER_PASSWORD")
    );
    cy.get("#submitButton").click();
});

Cypress.Commands.add("logout", () => {
    cy.visit("http://localhost/api/auth/signout");
    cy.get("#submitButton").click();
});

Cypress.Commands.add("createPost", (title, body) => {
    cy.visit("http://localhost/post/create");

    cy.get("#title").type(title);
    cy.get("#body").type(body);

    cy.get("button[type=submit]").click();

    const post = cy.get(".post").contains(title);

    post.should("exist");
});

Cypress.Commands.add("deletePost", (title) => {
    cy.visit("http://localhost/");

    const post = cy.get(".post").contains(title);

    post.should("exist");

    post.click();

    cy.get("#delete").click();
    cy.get(".postsContainer").contains(title).should("not.exist");
});

export {};

declare global {
    namespace Cypress {
        interface Chainable {
            login(): Chainable<void>;
            logout(): Chainable<void>;
            createPost(title: string, body: string): Chainable<void>;
            deletePost(title: string): Chainable<void>;
        }
    }
}

// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
