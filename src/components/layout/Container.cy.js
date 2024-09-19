import Container from './Container.vue'

describe('<Container />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Container)
  })
})