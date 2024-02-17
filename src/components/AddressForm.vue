<template>
  <v-card>
    <v-card-title>Endereço de Entrega</v-card-title>
    <v-card-item>
      <v-form :disabled="isDisabled">
        <v-text-field
          label="CEP"
          v-model="address.cep"
          :error-messages="cepError"
          @input="fetchAddressDetails"
        ></v-text-field>
        <v-text-field
          label="Rua"
          v-model="address.street"
          readonly
        ></v-text-field>
        <v-text-field
          label="Bairro"
          v-model="address.neighborhood"
          readonly
        ></v-text-field>
        <v-text-field
          label="Cidade"
          v-model="address.city"
          readonly
        ></v-text-field>
        <v-text-field
          label="Estado"
          v-model="address.state"
          readonly
        ></v-text-field>
        <v-text-field
          label="Número"
          v-model="address.houseNumber"
        ></v-text-field>
        <v-card-actions>
          <v-btn @click="submitAddressForm">Ir para Pagamento</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-item>
  </v-card>
</template>

<script>
export default {
  name: "AddressForm",
  data() {
    return {
      address: {
        cep: "",
        street: "",
        neighborhood: "",
        city: "",
        state: "",
        houseNumber: "",
      },
      cepError: "",
    };
  },
  methods: {
    submitAddressForm() {
      // Handle address form submission
      console.log("Address form submitted:", this.address);
      if (this.address) {
        this.$store.commit("setAddressFormValid", true);
        this.$store.commit("setAddressData", this.address);
      } else {
        this.$store.commit("setAddressFormValid", false);
      }
    },
    fetchAddressDetails() {
      const cep = this.address.cep.replace(/\D/g, ""); // Remove non-numeric characters
      if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then((response) => response.json())
          .then((data) => {
            if (data.erro) {
              this.cepError = "CEP não encontrado";
              this.address.street = "";
              this.address.neighborhood = "";
              this.address.city = "";
              this.address.state = "";
            } else {
              this.cepError = "";
              this.address.street = data.logradouro;
              this.address.neighborhood = data.bairro;
              this.address.city = data.localidade;
              this.address.state = data.uf;
            }
          })
          .catch((error) => {
            this.cepError = "Algo deu errado.";
            console.error("Error fetching address details:", error);
          });
      } else {
        this.cepError = "O número do CEP deve conter  8 dígitos";
      }
    },
  },
  computed: {
    isDisabled() {
      return !this.$store.state.userFormValid;
    },
  },
};
</script>

<style></style>
