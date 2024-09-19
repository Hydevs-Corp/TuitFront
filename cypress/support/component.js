// @ts-nocheck
// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from "cypress/vue";
import { createPinia, setActivePinia } from "pinia";

Cypress.Commands.add("mount", mount);
let pinia;

beforeEach(() => {
    pinia = createPinia();

    setActivePinia(pinia);
});

function mountWithPinia(Comp, options) {
    return mount(Comp, {
        ...options,
        global: {
            ...options?.global,
            plugins: [...(options?.global?.plugins ?? []), pinia],
        },
    });
}

Cypress.Commands.add("mountWithPinia", mountWithPinia);
// Example use:
// cy.mount(MyComponent)
