import AppointmentServices from '@/services/appointmentServices';
import MUTATION_TYPES from './mutation-types';

export default {
  confirmAppointment: () => {
    alert('Must call CONFIRM method... 💪');
  },
  cancelAppointment: () => {
    alert('Must call CANCEL method... 💪');
  },
  scheduleAppointment: async ({ commit }, payload) => {
    console.log(commit);
    await AppointmentServices.scheduleAppointment(payload);
  },
  clearWeeklySlots: ({ commit }) => {
    commit(MUTATION_TYPES.CLEAR_WEEKLY_SLOTS);
  },
  getWeeklySlotsByFirstDayOfWeek: async ({ commit }, payload) => {
      const { response: weeklySlots } = await AppointmentServices.getWeeklySlotsByFirstDayOfWeek(payload);
      commit(MUTATION_TYPES.SET_WEEKLY_SLOTS, { weeklySlots });
  },
};
