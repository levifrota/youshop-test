import { createStore } from "vuex";

export default createStore({
  state: {
    userFormValid: false,
    addressFormValid: false,
  },
  getters: {},
  mutations: {
    setUserFormValid(state, isValid) {
      console.log(isValid);
      state.userFormValid = isValid;
    },
    setAddressFormValid(state, isValid) {
      state.addressFormValid = isValid;
    },
  },
  actions: {},
  modules: {},
});
