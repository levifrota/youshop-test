<template>
  <v-card>
    <CardItem
      v-for="(item, index) in offerDetails.items"
      :key="index"
      :item="item"
    />
    <v-card-item>
      Total:
      <span> R$ {{ totalNewPrice.toString().replace(".", ",") }} </span>
    </v-card-item>
  </v-card>
</template>

<script>
import CardItem from "./CardItem.vue";

export default {
  name: "OfferDetails",
  components: {
    CardItem,
  },
  props: {
    offerDetails: {
      type: Object,
      required: true,
    },
    totalNewPrice: {
      type: Number,
      required: true,
    },
  },
};
</script>
