import { shallowMount } from "@vue/test-utils";
import PaymentForm from "@/components/PaymentForm.vue";
import { createStore } from "vuex";
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({ paymentOptions: ["Credit Card", "Debit Card"] }),
  })
);
describe("PaymentForm.vue", () => {
  let wrapper;
  let mockStore;

  beforeEach(() => {
    mockStore = createStore({
      state: {
        addressFormValid: true,
        orderCode: "OFFER-CODE",
      },
    });
    wrapper = shallowMount(PaymentForm, {
      global: {
        plugins: [mockStore],
      },
      data() {
        return {
          userCpf: "",
          cpfError: "",
        };
      },
    });
  });

  it("validates a valid CPF", () => {
    const validCpf = "12345678909";
    wrapper.setData({ userCpf: validCpf });
    wrapper.vm.checkUserCpf();
    expect(wrapper.vm.cpfError).toBe("");
  });

  it("invalidates a CPF with more than 11 digits", () => {
    const bigCpf = "123456789040";
    wrapper.setData({ userCpf: bigCpf });
    wrapper.vm.checkUserCpf();
    expect(wrapper.vm.cpfError).toBe("CPF Inválido");
  });

  it("invalidates a CPF with less than 11 digits", () => {
    const shortCpf = "1234567890";
    wrapper.setData({ userCpf: shortCpf });
    wrapper.vm.checkUserCpf();
    expect(wrapper.vm.cpfError).toBe("CPF Inválido");
  });

  it("invalidates a CPF with all zeros", () => {
    const zeroCpf = "00000000000";
    wrapper.setData({ userCpf: zeroCpf });
    wrapper.vm.checkUserCpf();
    expect(wrapper.vm.cpfError).toBe("CPF Inválido");
  });
});
