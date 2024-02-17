<template>
  <div class="payment-confirmed">
    <h1>Payment Confirmed</h1>
    <pre>{{ requestBody }}</pre>
  </div>
</template>

<script>
export default {
  name: "PaymentConfirmed",
  data() {
    return {
      requestBody: null,
    };
  },
  created() {
    this.fetchRequestBody();
  },
  methods: {
    async fetchRequestBody() {
      try {
        const offerCode = this.$store.state.orderCode; // Replace with the actual offer code
        const response = await fetch(`/offers/${offerCode}/create_order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            /* your request body here */
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.requestBody = data.content;
      } catch (error) {
        console.error("Failed to fetch request body:", error);
      }
    },
  },
};
</script>
