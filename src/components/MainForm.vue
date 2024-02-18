<template>
  <v-container>
    <div class="d-flex align-start justify-space-around">
      <v-card class="w-25">
        <v-card-title>Insira seu código</v-card-title>
        <v-card-item>
          <v-form ref="offerForm">
            <v-text-field
              label="Digite o código"
              v-model="getOffer"
              :error-messages="codeError"
              required
            ></v-text-field>
            <v-card-actions class="d-flex justify-center">
              <v-btn @click="submitOfferForm">Ativar Código</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-item>
      </v-card>
      <div v-if="offerDetails && offerDetails.items" class="w-50">
        <OfferDetails
          :offerDetails="offerDetails"
          :totalNewPrice="totalNewPrice"
        />
      </div>
    </div>

    <UserForm />

    <AddressForm />

    <PaymentForm />
  </v-container>
</template>

<script>
import UserForm from "./UserForm.vue";
import AddressForm from "./AddressForm.vue";
import PaymentForm from "./PaymentForm.vue";
import OfferDetails from "./OfferDetails.vue";

export default {
  name: "MainForm",
  components: {
    UserForm,
    AddressForm,
    PaymentForm,
    OfferDetails,
  },
  data() {
    return {
      getOffer: "",
      codeError: "",
      showOfferModal: false,
    };
  },
  computed: {
    offerDetails() {
      return this.$store.state.offerDetails;
    },
    totalNewPrice() {
      if (this.offerDetails && this.offerDetails.items) {
        return this.offerDetails.items.reduce(
          (total, item) => total + item.newPrice,
          0
        );
      }
      return 0;
    },
  },
  methods: {
    async submitOfferForm() {
      if (this.getOffer) {
        this.$store.commit("setOrderCode", this.getOffer);
        try {
          const response = await fetch(`offers/${this.getOffer}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          this.$store.commit("setOfferDetails", data);
          this.codeError = ""; // Reset the error message if the offer is found
        } catch (error) {
          this.codeError = "Erro ao buscar oferta";
          this.$store.commit("clearOfferDetails");
        }
      }
    },
  },
};
</script>
