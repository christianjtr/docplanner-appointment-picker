import MUTATION_TYPES from './mutation-types';

export default {
  [MUTATION_TYPES.CLEAR_WEEKLY_SLOTS](state) {
    state.weeklySlots = [];
  },
  [MUTATION_TYPES.SET_WEEKLY_SLOTS](state, payload) {
    state.weeklySlots = [...state.weeklySlots, ...payload.weeklySlots];
  },
};
