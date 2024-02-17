import AddressForm from './AddressForm.vue'

describe('<AddressForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AddressForm)
  })
})