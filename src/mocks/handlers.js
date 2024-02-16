import { http } from "msw";

const offers = [
  {
    id: "OFFER_CODE",
    name: "Special Offer",
    price: 99.99,
    items: ["Item  1", "Item  2"],
    paymentOptions: ["Credit Card", "PayPal"],
    productImages: ["image1.jpg", "image2.jpg"],
  },
  // ... other offers
];

export const handlers = [
  http.get(
    "https://api.deepspacestore.com/offers/:offerCode",
    (req, res, ctx) => {
      const { offerCode } = req.params;
      const offer = offers.find((offer) => offer.id === offerCode);

      if (offer) {
        return res(ctx.json(offer));
      } else {
        return res(ctx.status(404), ctx.json({ message: "Offer not found" }));
      }
    }
  ),
];

export { offers };
