<template>
  <v-form ref="userForm">
    <v-text-field
      label="Nome"
      v-model="user.name"
      required
      :error-messages="nameError"
    ></v-text-field>
    <v-text-field label="Email" v-model="user.email"></v-text-field>
    <v-text-field label="Telefone" v-model="user.phone"></v-text-field>
    <v-btn @click="submitUserForm">Ir para Endereço de Entrega</v-btn>
  </v-form>
</template>

<script>
import { ref } from "vue";

export default {
  name: "UserForm",
  setup() {
    const user = ref({
      name: "",
      email: "",
      phone: "",
    });
    const nameError = ref("");

    const submitUserForm = () => {
      if (!user.value.name) {
        nameError.value = "Name is required";
        return;
      }
      nameError.value = ""; // Clear the error message if the name is valid
      // Handle user form submission
      console.log("User form submitted:", user.value);
    };
    return { user, submitUserForm, nameError };
  },
};
</script>

<style></style>
