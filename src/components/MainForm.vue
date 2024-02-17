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
        <v-card>
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
              <v-img
                :width="300"
                :height="150"
                :src="item.image"
                alt="Item image"
              />
            </li>
          </ul>
          <p>Total: R$ {{ totalNewPrice }},00</p>
        </v-card>
      </div>
    </div>

    <UserForm :disabled="offerDetails === ''" />

    <AddressForm />

    <PaymentForm />
  </v-container>
</template>

<script>
import UserForm from "./UserForm.vue";
import AddressForm from "./AddressForm.vue";
import PaymentForm from "./PaymentForm.vue";
import axios from "axios";

export default {
  name: "MainForm",
  components: {
    UserForm,
    AddressForm,
    PaymentForm,
  },
  data() {
    return {
      getOffer: "",
      codeError: "",
      showOfferModal: false,
      offerDetails: "",
    };
  },
  computed: {
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
        try {
          const response = await axios.get(`offers/${this.getOffer}`);
          this.offerDetails = response.data;
          this.codeError = ""; // Reset the error message if the offer is found
        } catch (error) {
          this.codeError = "Erro ao buscar oferta";
          this.offerDetails = "";
        }
      }
    },
  },
};
</script>
