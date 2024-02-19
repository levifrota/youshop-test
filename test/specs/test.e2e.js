/* eslint-disable no-undef */
const { expect, browser, $ } = require("@wdio/globals");
require("@testing-library/vue");

describe("MainForm Component", () => {
  it("should allow submitting a valid offer code", () => {
    // Navigate to the page where MainForm component is rendered
    browser.url("http://192.168.1.179:8080/");

    // Locate the text field for the offer code
    const offerCodeInput = $("aria/Digite o código");
    browser.debug();
    // Enter a valid offer code
    offerCodeInput.setValue("OFFER_CODE");

    // Click the submit button
    $("button=Ativar Código").click();

    // Check if the offer details are displayed
    const offerDetails = $(
      "aria/Fone de Ouvido Bluetooth Sem Fio QCY T17 com Microfone Intra-auricular (Preto)"
    );
    expect(offerDetails).toBeDisplayed();
  });

  it("should display an error message for an invalid offer code", () => {
    // Navigate to the page where MainForm component is rendered
    browser.url("http://192.168.1.179:8080/");

    // Locate the text field for the offer code
    const offerCodeInput = $("aria/Digite o código");

    // Enter an invalid offer code
    offerCodeInput.setValue("INVALID_OFFER_CODE");

    // Click the submit button
    $("button=Ativar Código").click();

    // Check if the error message is displayed and contains the expected text
    const errorMessageText = $("aria/Erro ao buscar oferta").getText();
    expect(errorMessageText).toBeDisplayed();
  });
});

describe("UserForm Component", () => {
  it("should allow submitting the form with valid data", () => {
    // Navigate to the page where UserForm component is rendered
    browser.url("http://192.168.1.179:8080/");

    // Locate the text fields for the user's name and phone
    const nameInput = $("aria/Nome");
    const phoneInput = $("aria/Telefone");

    // Enter valid data into the text fields
    nameInput.setValue("Teste");
    phoneInput.setValue("1234567890");

    // Click the submit button
    const submitButton = $("button=Ir para Endereço de Entrega");
    submitButton.click();

    // Check if the form submission was successful
    const addressField = $("aria/Endereço");
    expect(addressField).toBeEnabled();
  });

  it("should display an error message for invalid data", () => {
    browser.url("http://192.168.1.179:8080/");

    // Locate the text fields for the user's name and phone
    const nameInput = $("aria/Nome");
    const phoneInput = $("aria/Telefone");

    // Enter invalid data into the text fields
    nameInput.setValue(""); // Empty name
    phoneInput.setValue(""); // Empty phone number

    // Click the submit button
    const submitButton = $("button=Ir para Endereço de Entrega");
    submitButton.click();

    // Check if the error messages are displayed for the invalid data
    const nameError = $("aria/Campo obrigatório");
    const phoneError = $("aria/Campo obrigatório");
    expect(nameError).toBeDisplayed();
    expect(phoneError).toBeDisplayed();
  });
});

describe("AddressForm Component", () => {
  it("should auto-fill address fields when a valid zip code is entered", () => {
    browser.url("http://192.168.1.179:8080/");

    // Locate the zip code text field
    const zipCodeInput = $("aria/CEP");

    // Enter a valid zip code
    zipCodeInput.setValue("62020390");

    // Wait for the address details to be fetched and filled
    browser.pause(3000);

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

  it("should display an error message for an invalid zip code", () => {
    browser.url("http://192.168.1.179:8080/");

    // Locate the zip code text field
    const zipCodeInput = $("aria/CEP");

    // Enter an invalid zip code
    zipCodeInput.setValue("12345678");

    // Wait for the error message to be displayed
    browser.pause(3000);

    // Check if the error message is displayed
    const errorMessage = $("aria/Digite um CEP válido");
    expect(errorMessage).toBeDisplayed();
    expect(errorMessage).toHaveText("CEP não encontrado");
  });
});

describe("PaymentForm Component", () => {
  it("should allow submitting the form with valid data", () => {
    // Navigate to the page where PaymentForm component is rendered
    browser.url("http://192.168.1.179:8080/");

    // Locate the CPF text field and enter a valid CPF
    const cpfInput = $("aria/CPF");
    cpfInput.setValue("12345678901");

    // Select a payment option
    const paymentOption = $("aria/Cartão de Crédito");
    paymentOption.click();

    // If the payment option requires additional fields, fill them out
    // For example, if selecting "Cartão de Crédito":
    const creditCardNameInput = $("aria/Nome no Cartão");
    creditCardNameInput.setValue("Teste");
    const creditCardNumberInput = $("aria/Número do Cartão");
    creditCardNumberInput.setValue("1234  5678  9012  3456");
    const creditCardSecurityCodeInput = $("aria/Código de Segurança");
    creditCardSecurityCodeInput.setValue("123");
    const creditCardExpiryDateInput = $("aria/Data de Validade");
    creditCardExpiryDateInput.setValue("12/2025");

    // Click the submit button
    const submitButton = $("button=Finalizar Pedido");
    submitButton.click();

    // Check if the form submission was successful
    const successMessage = $("div.success-message"); // Replace with the actual selector for the success message
    expect(successMessage).toBeDisplayed();
  });

  it("should display an error message for an invalid CPF", () => {
    // Navigate to the page where PaymentForm component is rendered
    browser.url("http://192.168.1.179:8080/");

    // Locate the CPF text field and enter an invalid CPF
    const cpfInput = $("aria/CPF");
    cpfInput.setValue("00000000000");

    // Select a payment option
    const paymentOption = $("aria/Cartão de Crédito");
    paymentOption.click();

    // Click the submit button
    const submitButton = $("button=Finalizar Pedido");
    submitButton.click();

    // Check if the error message for the invalid CPF is displayed
    const cpfErrorMessage = $("aria/CPF ~ .v-messages__message");
    expect(cpfErrorMessage).toBeDisplayed();
    expect(cpfErrorMessage).toHaveText("CPF Inválido");
  });

  it("should display PIX code", () => {
    // Navigate to the page where PaymentForm component is rendered
    browser.url("http://192.168.1.179:8080/");

    // Select a different payment option
    const otherPaymentOption = $("aria/Pix");
    otherPaymentOption.click();

    // Check if the additional fields for the selected payment option are displayed
    const pixFields = $("aria/Pix");
    expect(pixFields).toBeDisplayed();

    // Click the submit button
    const submitButton = $("button=Finalizar Pedido");
    submitButton.click();

    // Check if the form submission was successful
    const successMessage = $("div.success-message");
    expect(successMessage).toBeDisplayed();
  });

  it("should display bar code", () => {
    // Navigate to the page where PaymentForm component is rendered
    browser.url("http://192.168.1.179:8080/");

    // Select a different payment option
    const otherPaymentOption = $("aria/Boleto Bancário");
    otherPaymentOption.click();

    // Check if the additional fields for the selected payment option are displayed
    const billFields = $("aria/Boleto Bancário");
    expect(billFields).toBeDisplayed();

    // Click the submit button
    const submitButton = $("button=Finalizar Pedido");
    submitButton.click();

    // Check if the form submission was successful
    const successMessage = $("div.success-message"); // Replace with the actual selector for the success message
    expect(successMessage).toBeDisplayed();
  });

  it("should redirect to '/compra-confirmada' after clicking the submit button", async () => {
    // Navigate to the page where PaymentForm component is rendered
    browser.url("http://192.168.1.179:8080/");

    // Locate the CPF text field and enter a valid CPF
    const cpfInput = $("aria/CPF");
    cpfInput.setValue("12345678901");

    // Select a payment option
    const paymentOption = $("aria/Cartão de Crédito");
    paymentOption.click();

    // Click the submit button
    const submitButton = $("button=Finalizar Pedido");
    submitButton.click();
    console.log("url-browser", browser.getUrl());
    // Check if the user is redirected to the '/compra-confirmada' page
    await browser.waitUntil(
      async () => {
        const url = await browser.getUrl();
        return url.includes("/compra-confirmada");
      },
      {
        timeout: 5000,
        timeoutMsg:
          "Expected to be redirected to '/compra-confirmada' within  5 seconds",
      }
    );

    // Verify that the current URL includes '/compra-confirmada'
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain(
      "http://192.168.1.179:8080/#/compra-confirmada"
    );
  });
});
