<template>
  <v-container class="d-flex align-center flex-column">
    <div class="d-flex align-center order-confirmed">
      <h1 class="pr-5">Pedido Confirmado!</h1>
      <v-img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png"
        width="70"
      ></v-img>
    </div>
    <v-card class="w-75 mb-7">
      <v-card-title>Detalhes do pedido {{ paymentData.id }}:</v-card-title>
      <div class="order-details flex-sm-column">
        <v-card-item>
          <h3>Usuário:</h3>
          <div>
            <p>Nome: {{ userData.name }}</p>
            <p v-if="userData.email !== ''">Email: {{ userData.email }}</p>
            <p v-if="userData.phone !== ''">Telefone: {{ userData.phone }}</p>
          </div>
        </v-card-item>
        <v-card-item>
          <h3>Endereço:</h3>
          <div>
            <p>CEP: {{ addressData.zipCode }}</p>
            <p>Rua: {{ addressData.street }}</p>
            <p>Cidade: {{ addressData.city }}</p>
            <p>Bairro: {{ addressData.neighborhood }}</p>
            <p>Cidade: {{ addressData.city }}</p>
            <p>Estado: {{ addressData.state }}</p>
            <p v-if="addressData.houseNumber !== ''">
              Número: {{ addressData.houseNumber }}
            </p>
          </div>
        </v-card-item>
        <v-card-item>
          <h3>Pagamento:</h3>
          <div>
            <p>Método: {{ paymentData.paymentOption }}</p>
          </div>
        </v-card-item>
      </div>
    </v-card>
    <v-divider></v-divider>
    <OfferDetails
      :offerDetails="offerDetails"
      :totalNewPrice="totalNewPrice"
      class="w-75"
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import OfferDetails from "./OfferDetails.vue";

export default {
  name: "OrderConfirmed",
  components: {
    OfferDetails,
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
      paymentData: (state) => state.paymentData,
      addressData: (state) => state.addressData,
    }),
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
};
</script>

<style scoped>
.order-details {
  display: flex;
  align-items: flex-start;
}
@media (max-width: 600px) {
  .order-confirmed {
    flex-direction: column-reverse;
  }
  .order-confirmed h1 {
    text-align: center;
    padding: 0 !important;
  }
  .order-details {
    flex-direction: column;
  }
}
</style>
