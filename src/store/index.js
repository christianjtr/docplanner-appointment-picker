import Vue from 'vue';
import Vuex from 'vuex';
import Appointment from './modules/appointment';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    Appointment,
  },
});

export default store;
