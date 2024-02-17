<template>
  <v-app-bar color="teal-darken-4" scroll-behavior="elevate">
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img
    ></template>
    <v-img
      src="https://deepspace.store/cdn/shop/files/4000_x_1000_._4000_x_650_._200x.png?v=1704179173"
      height="25"
    ></v-img>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style></style>
