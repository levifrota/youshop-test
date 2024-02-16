<template>
  <v-container>
    <v-form ref="offerForm">
      <v-text-field
        label="Offer Code"
        v-model="getOffer"
        :error-messages="codeError"
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
          <ul>
            <li v-for="(item, index) in offerDetails.items" :key="index">
              <p>{{ item.name }}</p>
              <p>
                De:
                <span class="text-decoration-line-through"
                  >R$ {{ item.oldPrice }},00</span
                >
              </p>
              <p>Por: R$ {{ item.newPrice }},00</p>
              <V-img :width="300" :src="item.image" alt="Item image" />
            </li>
          </ul>
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
import { ref, watch } from "vue";
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
    const codeError = ref("");
    const showOfferModal = ref(false);
    const offerDetails = ref(null);

    const submitOfferForm = () => {
      const offer = offers.find((offer) => offer.id === getOffer.value);
      if (offer) {
        offerDetails.value = offer;
        showOfferModal.value = true;
      } else {
        codeError.value = "Código não encontrado";
      }
    };

    watch(getOffer, (newValue) => {
      if (newValue) {
        const offer = offers.find((offer) => offer.id === newValue);
        if (offer) {
          codeError.value = ""; // Reset the error message if the offer is found
        }
      }
    });

    return {
      codeError,
      getOffer,
      showOfferModal,
      offerDetails,
      submitOfferForm,
    };
  },
};
</script>
