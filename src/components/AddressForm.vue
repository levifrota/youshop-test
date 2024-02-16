<template>
  <v-form ref="addressForm">
    <v-text-field
      label="CEP"
      v-model="address.cep"
      :error-messages="cepError"
      @input="fetchAddressDetails"
    ></v-text-field>
    <v-text-field
      v-if="!cepError"
      label="Rua"
      v-model="address.street"
      readonly
    ></v-text-field>
    <v-text-field
      v-if="!cepError"
      label="Bairro"
      v-model="address.neighborhood"
      readonly
    ></v-text-field>
    <v-text-field
      v-if="!cepError"
      label="Cidade"
      v-model="address.city"
      readonly
    ></v-text-field>
    <v-text-field
      v-if="!cepError"
      label="Estado"
      v-model="address.state"
      readonly
    ></v-text-field>
    <v-text-field
      v-if="!cepError"
      label="Número"
      v-model="houseNumber"
    ></v-text-field>
    <v-btn @click="submitAddressForm">Ir para Pagamento</v-btn>
  </v-form>
</template>

<script>
import { ref } from "vue";

export default {
  name: "AddressForm",
  setup() {
    const address = ref({
      cep: "",
      street: "",
      neighborhood: "",
      city: "",
      state: "",
    });

    const cepError = ref("");

    const submitAddressForm = () => {
      // Handle address form submission
      console.log("Address form submitted:", address.value);
    };

    const fetchAddressDetails = async () => {
      const cep = address.value.cep.replace(/\D/g, ""); // Remove non-numeric characters
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();
          if (data.erro) {
            cepError.value = "CEP not found";
            address.value.street = "";
            address.value.neighborhood = "";
            address.value.city = "";
            address.value.state = "";
          } else {
            cepError.value = "";
            address.value.street = data.logradouro;
            address.value.neighborhood = data.bairro;
            address.value.city = data.localidade;
            address.value.state = data.uf;
          }
        } catch (error) {
          cepError.value = "Error fetching address details";
          console.error("Error fetching address details:", error);
        }
      } else {
        cepError.value = "O número do CEP deve conter 8 dígitos";
      }
    };

    return {
      address,
      cepError,
      submitAddressForm,
      fetchAddressDetails,
    };
  },
};
</script>

<style></style>
