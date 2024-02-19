<template>
  <v-card class="mt-10 mb-10 payment-form">
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
          :error-messages="radioError"
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
            label="Nome no Cartão"
            v-model="creditCardName"
            required
          ></v-text-field>
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
            <div class="copy-code">
              <p>
                00020126580014BR.GOV.BCB.PIX01365354d1a3-62a5-4c6b-bf8d-7511acfbdb045204000053039865802BR5925Gideao
                Levi de Oliveira F6009SAO PAULO62140510Eqy8WV1jgS6304F02B
              </p>
              <v-btn v-clipboard="pixValue">Copiar código</v-btn>
            </div>
            <v-img src="/qr-code.png" :height="300" alt="QR Code"></v-img>
          </div>
        </div>
        <div v-else-if="selectedPaymentOption === 'Boleto Bancário'">
          <div v-if="isLoading">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
          <div v-else>
            <h3>Código do Boleto</h3>
            <div>
              <p>26090.54834 30320.515635 74000.000005 8 96360000002000</p>
              <v-btn v-clipboard="() => billValue">Copiar código</v-btn>
            </div>
            <v-img src="/boleto.png" :height="200" alt="Boleto"></v-img>
          </div>
        </div>
        <v-card-actions>
          <v-btn :disabled="isDisabled" @click="submitPaymentForm"
            >Finalizar Pedido</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card-item>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PaymentForm",
  data() {
    return {
      paymentOptions: [],
      selectedPaymentOption: null,
      creditCardNumber: "",
      creditCardName: "",
      creditCardSecurityCode: "",
      creditCardExpiryDate: "",
      isLoading: false,
      userCpf: "",
      cpfError: "",
      radioError: "",
      uniqueId: "",
      pixValue:
        "00020126580014BR.GOV.BCB.PIX01365354d1a3-62a5-4c6b-bf8d-7511acfbdb045204000053039865802BR5925Gideao Levi de Oliveira F6009SAO PAULO62140510Eqy8WV1jgS6304F02B",
      billValue: "26090.54834 30320.515635 74000.000005 8 96360000002000",
    };
  },
  // Watch changes in radio selection
  watch: {
    selectedPaymentOption(newVal) {
      if (newVal === "Pix" || newVal === "Boleto Bancário") {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    //When the order code is updated, the payment options are displayed
    "$store.state.orderCode": {
      handler() {
        this.fetchPaymentOptions();
      },
      // immediate: true, // This will call fetchPaymentOptions immediately when the component is created
    },
  },
  methods: {
    //Gather all payment options in offer
    fetchPaymentOptions() {
      const offer = this.orderCode;
      fetch(`/offers/${offer}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.paymentOptions = data.paymentOptions;
        })
        .catch((error) => {
          console.error("Error fetching payment options:", error);
        });
    },
    // Generate an order ID
    generateUniqueId() {
      return "#" + Math.random().toString(36).substring(2, 7);
    },
    //Mathod to validate CPF
    validateCpf(cpf) {
      const cleanedCpf = cpf.replace(/\D/g, "");
      if (
        cleanedCpf === "" ||
        !(cleanedCpf.length === 11) ||
        cleanedCpf === "00000000000"
      ) {
        return false;
      }
      return true;
    },
    // Gather all the data from user, address and payment.
    // Then make the validation for user CPF and payment option.
    // After that, the POST request is made.
    submitPaymentForm() {
      // Gather all the necessary data
      this.uniqueId = this.generateUniqueId();
      const paymentData = {
        paymentOption: this.selectedPaymentOption,
        creditCardNumber: this.creditCardNumber,
        creditCardName: this.creditCardName,
        creditCardSecurityCode: this.creditCardSecurityCode,
        creditCardExpiryDate: this.creditCardExpiryDate,
        id: this.uniqueId,
      };
      const offer = this.$store.state.orderCode;
      if (
        this.validateCpf(this.userCpf) &&
        this.selectedPaymentOption !== null
      ) {
        // Make the POST request
        fetch(`/offers/${offer}/create_order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client: this.userData,
            address: this.addressData,
            payment: paymentData,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            // Button redirects to /compra-confirmada page
            this.$router.push({ name: "order-placed" });
            this.$store.commit("setPaymentData", paymentData);
          })
          .catch((error) => {
            console.error("Error submitting payment form:", error);
          });
      } else {
        this.cpfError = "CPF é obrigatório";
        this.selectedPaymentOption === null
          ? (this.radioError = "Escolha um meio de pagamento")
          : (this.radioError = "");
      }
    },
    // Rule for the CPF input
    checkUserCpf() {
      if (!this.validateCpf(this.userCpf)) {
        this.cpfError = "CPF Inválido";
      } else {
        this.cpfError = "";
      }
    },
  },
  computed: {
    // Calls the state variables
    ...mapState({
      userData: (state) => state.userData,
      addressData: (state) => state.addressData,
      orderCode: (state) => state.orderCode,
    }),
    // Enables the form if the address is valid
    isDisabled() {
      return !this.$store.state.addressFormValid;
    },
  },
};
</script>

<style scoped>
.payment-form {
  width: 60%;
}
</style>
