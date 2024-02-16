<template>
  <MainForm />
</template>

<script>
import { defineComponent } from "vue";

import MainForm from "../components/MainForm.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    MainForm,
  },
});
</script>
