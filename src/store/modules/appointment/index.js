import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const state = {
  appointment: {
    professional: 'Simeon Molas Ramos',
    date: 'Lunes, 07 de Septiembre de 2020, 09:15',
    facility: 'Hospital Sant Pau, Carrer de Sant Quintí, 89, 08041 Barcelona',
    isConfirmed: false,
  },
  weeklySlots: [],
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
