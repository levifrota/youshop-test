<template>
  <v-card class="mt-10 mb-10">
    <v-card-title>Insira seus dados</v-card-title>
    <v-card-item>
      <v-form ref="userForm">
        <v-text-field
          label="Nome"
          v-model="user.name"
          required
          :error-messages="nameError"
        ></v-text-field>
        <v-text-field label="Email" v-model="user.email"></v-text-field>
        <v-text-field label="Telefone" v-model="user.phone"></v-text-field>
        <v-card-actions>
          <v-btn @click="submitUserForm">Ir para Endereço de Entrega</v-btn>
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
    };
  },
  methods: {
    submitUserForm() {
      if (!this.user.name) {
        this.nameError = "Campo obrigatório";
        this.$store.commit("setUserFormValid", false);
        return;
      }
      this.nameError = ""; // Clear the error message if the name is valid
      // Handle user form submission
      this.$store.commit("setUserFormValid", true);
      this.$store.commit("setUserData", this.user);
    },
  },
};
</script>

<style></style>
