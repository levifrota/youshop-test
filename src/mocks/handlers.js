import { http, HttpResponse } from "msw";

const offers = [
  {
    id: "OFFER_CODE",
    name: "Oferta Especial",
    items: [
      {
        name: "Fone de Ouvido Bluetooth Sem Fio QCY T17 com Microfone Intra-auricular (Preto)",
        oldPrice: 109,
        newPrice: 98,
        image:
          "https://m.media-amazon.com/images/I/51TBSJF4B5L._AC_SL1326_.jpg",
      },
      {
        name: "Teclado ABNT2 de membrana com fio, design retrô e teclas silenciosas e confortáveis, Cabos & Plugs (A)",
        oldPrice: 132,
        newPrice: 119,
        image:
          "https://m.media-amazon.com/images/I/513uhGvfDwL._AC_SL1200_.jpg",
      },
    ],
    paymentOptions: ["Cartão de Crédito", "Pix", "Boleto Bancário"],
  },
];

export const handlers = [
  http.get("/offers/:offerCode", ({ params }) => {
    const { offerCode } = params;
    const offer = offers.find((offer) => offer.id === offerCode);
    return offer
      ? HttpResponse.json(offer)
      : HttpResponse(null, { status: 401 });
  }),

  http.post("/offers/:offerCode/create_order", ({ params }) => {
    const { offerCode } = params;
    const offer = offers.find((offer) => offer.id === offerCode);

    if (offer) {
      // Mock the response data
      return Response.json({
        orderId: "12345",
        status: "created",
        message: "Order created successfully",
      });
    }
  }),
];

export { offers };
