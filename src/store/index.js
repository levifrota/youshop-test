import { createStore } from "vuex";

export default createStore({
  state: {
    userFormValid: false,
    addressFormValid: false,
    userData: null,
    paymentData: null,
    addressData: null,
    orderStatus: null,
  },
  getters: {},
  mutations: {
    setUserFormValid(state, isValid) {
      state.userFormValid = isValid;
    },
    setAddressFormValid(state, isValid) {
      state.addressFormValid = isValid;
    },
    setUserData(state, userData) {
      state.userData = userData;
    },
    setAddressData(state, addressData) {
      state.addressData = addressData;
    },
    setOrderStatus(state, orderStatus) {
      state.orderStatus = orderStatus;
    },
  },
  actions: {},
  modules: {},
});
