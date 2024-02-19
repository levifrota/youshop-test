<template>
  <v-card class="mt-10 mb-10 user-form">
    <v-card-title>Insira seus dados</v-card-title>
    <v-card-item>
      <v-form ref="userForm" :disabled="isDisabled">
        <v-text-field
          label="Nome"
          v-model="user.name"
          required
          :error-messages="nameError"
        ></v-text-field>
        <v-text-field label="Email" v-model="user.email"></v-text-field>
        <v-text-field
          label="Telefone"
          v-model="user.phone"
          required
          :error-messages="phoneError"
          @input="checkUserPhone"
        ></v-text-field>
        <v-card-actions>
          <v-btn @click="submitUserForm" :disabled="isDisabled"
            >Ir para Endereço de Entrega</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card-item>
  </v-card>
</template>

<script>
export default {
  name: "UserForm",
  data() {
    return {
      user: {
        name: "",
        email: "",
        phone: "",
      },
      nameError: "",
      phoneError: "",
    };
  },
  methods: {
    checkUserPhone(userPhone) {
      const phoneRegex = /^\d+$/; // Regular expression to match only digits
      if (userPhone === "" || !phoneRegex.test(this.user.phone)) {
        return false;
      } else {
        return true;
      }
    },
    // Checks the user name and phone, then update the state
    submitUserForm() {
      if (!this.user.name || !this.checkUserPhone(this.user.phone)) {
        this.user.name
          ? (this.nameError = "")
          : (this.nameError = "Campo obrigatório");
        this.user.phone
          ? (this.phoneError = "Insira um número válido")
          : (this.phoneError = "Campo obrigatório");
        this.$store.commit("setUserFormValid", false);
        return;
      }
      this.nameError = ""; // Clear the error message if the name is valid
      this.phoneError = ""; // Clear the error message if the phone is valid
      // Handle user form submission
      this.$store.commit("setUserFormValid", true);
      this.$store.commit("setUserData", this.user);
    },
  },
  // Form is enabled if offerDetails is valid
  computed: {
    isDisabled() {
      return !this.$store.state.offerDetails;
    },
  },
};
</script>

<style scoped>
.user-form {
  width: 60%;
}
</style>
