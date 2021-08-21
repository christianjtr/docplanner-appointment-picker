import moment from 'moment';
import $http from './_api';
import { DATE_FORMAT } from '../configuration/parameters';

const weeklySlots = (data) => {
  const weekDaysWithAvailableSlots = Array.from(new Set(data.map((slot) => moment(slot.Start).format(DATE_FORMAT))));
  return weekDaysWithAvailableSlots.map((weekDayWithAvailableSlot) => ({
    date: weekDayWithAvailableSlot,
    slots: data.filter((slot) => moment(slot.Start).format(DATE_FORMAT) === weekDayWithAvailableSlot),
  }));
}

const scheduleAppointment = async () => {
  try {
    await $http.get('/api/availability/GetWeeklySlots/20200821');
  } catch (error) {
    throw new Error(error || '[Error when scheduling an appointment]');
  }
};

const getWeeklySlotsByFirstDayOfWeek = async (weekDay) => {
  try {
    const { data } = await $http.get(`/api/availability/GetWeeklySlots/${weekDay}`);
    return {
      response: weeklySlots(data),
    };
  } catch (error) {
    throw new Error(error  || '[Error when getting the weekly slots]');
  }
};

export default {
  scheduleAppointment,
  getWeeklySlotsByFirstDayOfWeek,
};
