<template>
  <v-container class="d-flex align-center flex-column">
    <div class="d-flex align-center order-confirmed">
      <h1 class="pr-5">Pedido Confirmado!</h1>
      <v-img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png"
        width="70"
      ></v-img>
    </div>
    <v-card class="mb-7">
      <v-card-title>Detalhes do pedido:</v-card-title>
      <div class="order-details">
        <v-card-item>
          <div class="order-code d-flex align-center">
            <h3>Código:&nbsp;</h3>
            <p>{{ paymentData.id }}</p>
          </div>

          <h3>Usuário:</h3>
          <div>
            <p><b>Nome:</b> {{ userData.name }}</p>
            <p v-if="userData.email !== ''">
              <b>Email:</b> {{ userData.email }}
            </p>
            <p v-if="userData.phone !== ''">
              <b>Telefone:</b> {{ userData.phone }}
            </p>
          </div>
        </v-card-item>
        <v-card-item>
          <h3>Endereço:</h3>
          <div>
            <p><b>CEP:</b> {{ addressData.zipCode }}</p>
            <p><b>Rua:</b> {{ addressData.street }}</p>
            <p><b>Cidade:</b> {{ addressData.city }}</p>
            <p><b>Bairro:</b> {{ addressData.neighborhood }}</p>
            <p><b>Cidade:</b> {{ addressData.city }}</p>
            <p><b>Estado:</b> {{ addressData.state }}</p>
            <p v-if="addressData.houseNumber !== ''">
              <b>Número:</b> {{ addressData.houseNumber }}
            </p>
          </div>
        </v-card-item>
        <v-card-item>
          <h3>Pagamento:</h3>
          <div>
            <p><b>Método:</b> {{ paymentData.paymentOption }}</p>
          </div>
        </v-card-item>
      </div>
    </v-card>
    <OfferDetails :offerDetails="offerDetails" :totalNewPrice="totalNewPrice" />
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
    // Calls the state variables
    ...mapState({
      userData: (state) => state.userData,
      paymentData: (state) => state.paymentData,
      addressData: (state) => state.addressData,
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
};
</script>

<style scoped>
.order-details {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
@media (max-width: 880px) {
  .order-confirmed {
    flex-direction: column-reverse;
  }
  .order-confirmed h1 {
    text-align: center;
    padding: 0 !important;
  }
}
</style>
