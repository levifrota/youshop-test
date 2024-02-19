import { shallowMount } from "@vue/test-utils";
import MainForm from "@/components/MainForm.vue";
import { createStore } from "vuex";

describe("MainForm.vue", () => {
  let store;

  beforeEach(() => {
    store = createStore({
      state: {
        orderCode: "",
        offerDetails: null,
      },
      mutations: {
        setOrderCode(state, code) {
          state.orderCode = code;
        },
        setOfferDetails(state, details) {
          state.offerDetails = details;
        },
        clearOfferDetails(state) {
          state.offerDetails = null;
        },
      },
      actions: {
        setOrderCode: jest.fn(),
        setOfferDetails: jest.fn(),
        clearOfferDetails: jest.fn(),
      },
    });
  });

  it("renders the form", () => {
    const wrapper = shallowMount(MainForm, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.find("v-form").exists()).toBe(true);
  });

  it("submits the form with an offer code", () => {
    const wrapper = shallowMount(MainForm, {
      global: {
        plugins: [store],
      },
    });
    const input = wrapper.find("v-text-field");
    input.setValue("OFFER_CODE");
    wrapper.find("v-btn").trigger("click");
    expect(store.actions.setOrderCode).toHaveBeenCalledWith(
      expect.any(Object),
      "OFFER_CODE"
    );
    expect(store.actions.setOfferDetails).toHaveBeenCalled();
  });

  // Add more test cases as needed
});
