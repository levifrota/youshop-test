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
            <p>26090.54834 30320.515635 74000.000005 8 96360000002000</p>
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
    };
  },
  created() {
    this.fetchPaymentOptions();
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
    "$store.state.orderCode": {
      handler() {
        this.fetchPaymentOptions();
      },
      immediate: true, // This will call fetchPaymentOptions immediately when the component is created
    },
  },
  methods: {
    fetchPaymentOptions() {
      const offer = this.$store.state.orderCode;
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
    generateUniqueId() {
      return "#" + Math.random().toString(36).substring(2, 7);
    },
    submitPaymentForm() {
      // Gather all the necessary data
      this.uniqueId = this.generateUniqueId();
      console.log("id", this.uniqueId);
      const clientData = this.$store.state.userData;
      const addressData = this.$store.state.addressData;
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
        this.cpfError === "" &&
        this.userCpf !== "" &&
        this.selectedPaymentOption !== null
      ) {
        // Make the POST request
        fetch(`/offers/${offer}/create_order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client: clientData,
            address: addressData,
            payment: paymentData,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            this.$router.push({ name: "order-placed" });
            this.$store.commit("setPaymentData", paymentData);
          })
          .catch((error) => {
            console.error("Error submitting payment form:", error);
            // Handle the error appropriately, e.g., show an error message to the user
          });
      } else {
        this.userCpf === ""
          ? (this.cpfError = "CPF é obrigatório")
          : (this.cpfError = "");
        this.selectedPaymentOption === null
          ? (this.radioError = "Escolha um meio de pagamento")
          : (this.radioError = "");
      }
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
