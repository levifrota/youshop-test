/* eslint-disable no-undef */
const { expect, browser, $ } = require("@wdio/globals");
const setUrl = "http://192.168.1.110:8080/";
require("@testing-library/vue");

describe("E2E test", () => {
  before(() => {
    // Navigate to the base URL once before all tests
    browser.url(setUrl);
  });

  it("should allow submitting a valid offer code", async () => {
    // Locate the text field for the offer code
    const offerCodeInput = $("aria/Digite o código");

    // Wait for the offer code input to be present in the DOM
    offerCodeInput.waitForExist();
    // Enter a valid offer code
    await offerCodeInput.setValue("OFFER_CODE");

    // Wait for the value to be set before clicking the button
    offerCodeInput.waitForValue("OFFER_CODE");
    browser.pause(3000);

    // Click the submit button
    const goToUser = $("button=Ativar Código");
    goToUser.waitForValue(offerCodeInput.getValue());
    await goToUser.click();
    browser.debug();

    // Check if the offer details are enabled
    const deliverDetails = $("aria/Telefone:");
    deliverDetails.waitForExist;
    expect(deliverDetails).toBeEnabled();
  });

  it("should allow submitting the form with valid data", async () => {
    // Locate the text fields for the user's name and phone
    const nameInput = $("aria/Nome");
    const phoneInput = $("aria/Telefone");

    nameInput.waitForExist;
    phoneInput.waitForExist;

    // Enter valid data into the text fields
    await nameInput.setValue("Teste");
    await phoneInput.setValue("1234567890");

    nameInput.waitForValue("Teste");
    phoneInput.waitForValue("1234567890");

    // Click the submit button
    const submitButton = $("button=Ir para Endereço de Entrega");
    await submitButton.click();

    // Check if the form submission was successful
    const addressField = $("aria/Endereço");
    addressField.waitForExist;
    expect(addressField).toBeEnabled();
  });

  it("should auto-fill address fields when a valid zip code is entered", async () => {
    // Locate the zip code text field
    const zipCodeInput = $("aria/CEP");

    // Enter a valid zip code
    await zipCodeInput.setValue("62020390");

    // Check if the street, neighborhood, city, and state fields are filled
    const streetField = $("aria/Rua");
    const neighborhoodField = $("aria/Bairro");
    const cityField = $("aria/Cidade");
    const stateField = $("aria/Estado");

    expect(streetField).toHaveValue("Rua Antônio Félix Ibiapina");
    expect(neighborhoodField).toHaveValue("Alto do Cristo");
    expect(cityField).toHaveValue("Sobral");
    expect(stateField).toHaveValue("CE");
  });

  it("should submit deliver form and enable payment form", async () => {
    // Click the submit button
    const submitButton = $("button=Ir para Pagamento");
    await submitButton.click();

    // Check if the form submission was successful
    const addressField = $("aria/Endereço");
    addressField.waitForExist;
    expect(addressField).toBeEnabled();
  });

  it("should display PIX code", async () => {
    // Select a different payment option
    const otherPaymentOption = $("aria/Pix");
    await otherPaymentOption.click();

    // Check if the additional fields for the selected payment option are displayed
    const pixFields = $("aria/Código Copia e Cola");
    await expect(pixFields).toBeDisplayed();
  });

  it("should display bar code", async () => {
    // Select a different payment option
    const otherPaymentOption = $("aria/Boleto Bancário");
    otherPaymentOption.click();

    // Check if the additional fields for the selected payment option are displayed
    const billFields = $("aria/Código do Boleto");
    await expect(billFields).toBeDisplayed();
  });

  it("should validate CPF and allow submitting the form with valid credit card data", async () => {
    // Locate the CPF text field and enter a valid CPF
    const cpfInput = $("aria/CPF");

    await cpfInput.setValue("12345678901");
    // Select credit card option
    const paymentOption = $("aria/Cartão de Crédito");
    await paymentOption.click();

    const creditCardNameInput = $("aria/Nome no Cartão");
    await creditCardNameInput.setValue("Teste");
    const creditCardNumberInput = $("aria/Número do Cartão");
    await creditCardNumberInput.setValue("1234  5678  9012  3456");
    const creditCardSecurityCodeInput = $("aria/Código de Segurança");
    await creditCardSecurityCodeInput.setValue("123");
    const creditCardExpiryDateInput = $("aria/Data de Validade");
    await creditCardExpiryDateInput.setValue("12/2025");

    const finishOrder = $("button=Finalizar Pedido");
    await finishOrder.click();

    await browser.pause(3000);
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("/compra-confirmada");
  });

  it("should display confirmation order", async () => {
    const orderDetails = $("aria/Detalhes do pedido:");
    orderDetails.waitForExist;

    const orderItems = $("aria/Itens:");
    orderItems.waitForExist;

    await expect(orderDetails).toBeDisplayed();
    await expect(orderItems).toBeDisplayed();
  });
});
