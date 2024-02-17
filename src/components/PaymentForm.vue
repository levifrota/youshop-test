<template>
  <v-card class="mt-10 mb-10">
    <v-card-title>Formas de pagamento</v-card-title>
    <v-card-item>
      <v-form ref="paymentForm" :disabled="isDisabled">
        <v-text-field
          label="CPF"
          v-model="userCpf"
          :error-messages="cpfError"
          @input="checkUserCpf"
        ></v-text-field>

        <v-radio-group
          v-model="selectedPaymentOption"
          label="Defina um meio de pagamento"
        >
          <v-radio
            v-for="(paymentOption, index) in paymentOptions"
            :key="index"
            :label="paymentOption"
            :value="paymentOption"
            required
          ></v-radio>
        </v-radio-group>
        <div v-if="selectedPaymentOption === 'Cartão de Crédito'">
          <v-text-field
            label="Número do Cartão"
            v-model="creditCardNumber"
            required
          ></v-text-field>
          <v-text-field
            label="Código de Segurança"
            v-model="creditCardSecurityCode"
            required
          ></v-text-field>
          <v-text-field
            label="Data de Validade"
            v-model="creditCardExpiryDate"
            required
          ></v-text-field>
        </div>
        <div v-else-if="selectedPaymentOption === 'Pix'">
          <div v-if="isLoading">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
          <div v-else>
            <h3>Código Copia e Cola</h3>
            <p>
              00020126580014BR.GOV.BCB.PIX01365354d1a3-62a5-4c6b-bf8d-7511acfbdb045204000053039865802BR5925Gideao
              Levi de Oliveira F6009SAO PAULO62140510Eqy8WV1jgS6304F02B
            </p>
            <v-img src="/qr-code.png" :height="300" alt="QR Code"></v-img>
          </div>
        </div>
        <div v-else-if="selectedPaymentOption === 'Boleto Bancário'">
          <div v-if="isLoading">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
          <div v-else>
            <h3>Código do Boleto</h3>
            <p>26090.54834 30320.515635 74000.000005. 8 96360000002000</p>
            <v-img src="/boleto.png" :height="200" alt="Boleto"></v-img>
          </div>
        </div>
        <v-card-actions>
          <v-btn @click="submitPaymentForm">Finalizar Pedido</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-item>
  </v-card>
</template>

<script>
import { offers } from "../mocks/handlers";
import axios from "axios";

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
      userCpf: "",
      cpfError: "",
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
    submitPaymentForm() {
      // Gather all the necessary data
      const clientData = this.$store.state.userData;
      const addressData = this.$store.state.addressData;
      const paymentData = {
        paymentOption: this.selectedPaymentOption,
        creditCardNumber: this.creditCardNumber,
        creditCardSecurityCode: this.creditCardSecurityCode,
        creditCardExpiryDate: this.creditCardExpiryDate,
      };
      const offer = "OFFER_CODE";

      // Make the POST request
      axios
        .post(`/offers/${offer}/create_order`, {
          client: clientData,
          address: addressData,
          payment: paymentData,
        })
        .then((response) => {
          // Handle successful response
          console.log("Order created successfully:", response.data);
          this.$store.commit("setOrderStatus", response.data.status);
        })
        .catch((error) => {
          // Handle error
          console.error("Error creating order:", error);
        });
    },
    checkUserCpf() {
      const cpf = this.userCpf.replace(/\D/g, "");
      if (!(cpf.length === 11) || cpf == "00000000000") {
        this.cpfError = "CPF Inválido";
      } else {
        this.cpfError = "";
      }
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
