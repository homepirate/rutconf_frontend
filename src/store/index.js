import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    displayName: "",
    // globalArray: [], // TEST
  },
  mutations: {
    setDisplayName(state, value) {
      state.displayName = value;
    },
    // addToGlobalArray(state, item) {
    //   state.globalArray.push(item); // Добавление элемента в глобальный массив
    // },
    // removeFromGlobalArray(state, index) {
    //   state.globalArray.splice(index, 1); // Удаление элемента из глобального массива
    // }
  },
});
