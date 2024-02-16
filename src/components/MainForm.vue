<template>
  <v-container>
    <v-form ref="offerForm">
      <v-text-field
        label="Offer Code"
        v-model="getOffer"
        required
      ></v-text-field>
      <v-btn @click="submitOfferForm">Submit Offer Code</v-btn>
    </v-form>
    <v-dialog v-model="showOfferModal" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ offerDetails.name }}</span>
        </v-card-title>
        <v-card-text>
          <p>Price: {{ offerDetails.price }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showOfferModal = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <UserForm />
    <AddressForm />
  </v-container>
</template>

<script>
import UserForm from "./UserForm.vue";
import AddressForm from "./AddressForm.vue";
import { ref } from "vue";
import { offers } from "../mocks/handlers";

export default {
  name: "MainForm",
  components: {
    UserForm,
    AddressForm,
  },
  data() {},
  setup() {
    const getOffer = ref("");
    const showOfferModal = ref(false);
    const offerDetails = ref(null);

    const submitOfferForm = () => {
      console.log(offers);
      const offer = offers.find((offer) => offer.id === getOffer.value);
      if (offer) {
        offerDetails.value = offer;
        showOfferModal.value = true;
      } else {
        console.error("Offer not found");
      }
    };

    return {
      getOffer,
      showOfferModal,
      offerDetails,
      submitOfferForm,
    };
  },
};
</script>
