<template>
  <v-card-item>
    <div class="d-flex flex-row-reverse align-center">
      <div class="item-info">
        <p>{{ item.name }}</p>
        <p>
          De:
          <span class="text-decoration-line-through">
            R$ {{ item.oldPrice.toString().replace(".", ",") }}
          </span>
        </p>
        <p>Por: R$ {{ item.newPrice.toString().replace(".", ",") }}</p>
      </div>
      <v-img
        :width="100"
        :height="50"
        :src="item.image"
        alt="Item image"
        class="mr-3"
      />
    </div>
    <v-divider :thickness="2"></v-divider>
  </v-card-item>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
