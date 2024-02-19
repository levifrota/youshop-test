<template>
  <v-container class="d-flex flex-column align-center">
    <div class="d-flex align-start justify-space-around offer-input-details">
      <v-card>
        <v-card-title>Insira seu código</v-card-title>
        <v-card-item>
          <v-form>
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
      <div v-if="offerDetails && offerDetails.items" class="offer-details w-50">
        <OfferDetails
          :offerDetails="offerDetails"
          :totalNewPrice="totalNewPrice"
        />
      </div>
    </div>

    <div class="d-flex flex-column align-center components-container">
      <UserForm />

      <AddressForm />

      <PaymentForm />
    </div>
  </v-container>
</template>

<script>
import UserForm from "./UserForm.vue";
import AddressForm from "./AddressForm.vue";
import PaymentForm from "./PaymentForm.vue";
import OfferDetails from "./OfferDetails.vue";
import { mapState } from "vuex";

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
    // Get offer details' state
    ...mapState({
      offerData: (state) => state.offerDetails,
    }),
    offerDetails() {
      return this.offerData;
    },
    // Sum of the items' prices with discount
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
    // If the offer code is valid, this method will update the getoffer state
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

<style scoped>
.components-container {
  width: 80%;
}
@media (max-width: 900px) {
  .components-container {
    width: 100%;
  }
}
@media (max-width: 580px) {
  .offer-input-details {
    flex-direction: column;
    align-items: center !important;
  }
  .offer-details {
    margin-top: 2rem;
    width: 80% !important;
  }
}
</style>
