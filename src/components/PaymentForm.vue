<template>
  <v-card class="mt-10 mb-10">
    <v-card-title>Formas de pagamento</v-card-title>
    <v-card-item>
      <v-form ref="paymentForm" :disabled="isDisabled">
        <v-text-field label="CPF" v-model="userCpf"></v-text-field>

        <v-radio-group
          v-model="selectedPaymentOption"
          label="Defina um meio de pagamento"
        >
          <v-radio
            v-for="(paymentOption, index) in paymentOptions"
            :key="index"
            :label="paymentOption"
            :value="paymentOption"
          ></v-radio>
        </v-radio-group>
        <div v-if="selectedPaymentOption === 'Cartão de Crédito'">
          <v-text-field
            label="Número do Cartão"
            v-model="creditCardNumber"
          ></v-text-field>
          <v-text-field
            label="Código de Segurança"
            v-model="creditCardSecurityCode"
          ></v-text-field>
          <v-text-field
            label="Data de Validade"
            v-model="creditCardExpiryDate"
          ></v-text-field>
        </div>
        <div v-else-if="selectedPaymentOption === 'Pix'">
          <div v-if="isLoading">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
          <v-img v-else src="/qr-code.png" :height="300" alt="QR Code"></v-img>
        </div>
        <div v-else-if="selectedPaymentOption === 'Boleto Bancário'">
          <div v-if="isLoading">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
          <v-img v-else src="/boleto.png" :height="200" alt="Boleto"></v-img>
        </div>
        <v-card-actions>
          <v-btn @click="submitUserForm">Finalizar Pedido</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-item>
  </v-card>
</template>

<script>
import { offers } from "../mocks/handlers";

export default {
  name: "PaymentForm",
  data() {
    return {
      paymentOptions: offers[0].paymentOptions,
      selectedPaymentOption: null,
      creditCardNumber: "",
      creditCardSecurityCode: "",
      creditCardExpiryDate: "",
      isLoading: false,
    };
  },
  watch: {
    selectedPaymentOption(newVal) {
      if (newVal === "Pix" || newVal === "Boleto Bancário") {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
      }
    },
  },
  methods: {
    submitUserForm() {
      // Implement the form submission logic here
      // You can access the credit card details using this.creditCardNumber, this.creditCardSecurityCode, and this.creditCardExpiryDate
    },
  },
  computed: {
    isDisabled() {
      return !this.$store.state.addressFormValid;
    },
  },
};
</script>

<style></style>
