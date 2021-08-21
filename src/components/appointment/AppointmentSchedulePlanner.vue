<template>
  <div>
    <h1 class="title has-text-left">{{ $t("APPOINTMENT.PLANNER.TITLE") }}</h1>
    <h2 class="subtitle is-4 has-text-left">{{ $t("APPOINTMENT.PLANNER.SUBTITLE") }}</h2>
    <div class="box calendar">
      <div class="calendar__top mb-4">
        <button
          class="button calendar__nav-button"
          :title="$t('APPOINTMENT.BUTTON.PREV')"
          name="prev-button"
          id="prev-button"
          :disabled="!allowPrevNavigation"
          :class="{ 'calendar__nav-button--disabled': !allowPrevNavigation }"
          @click="calendarNavigation({ orientation: 'PREV' })"
        >
          <figure class="image is-32x32">
            <img src="@/assets/prev.png" alt="previous-icon" />
          </figure>
        </button>
        <h3 class="subtitle is-4 is-marginless has-text-weight-semibold">
          {{ dateInterval.start | formattedDate }} - {{ dateInterval.end | formattedDate }}
        </h3>
        <button
          class="button calendar__nav-button"
          :title="$t('APPOINTMENT.BUTTON.NEXT')"
          name="next-button"
          id="next-button"
          @click="calendarNavigation({ orientation: 'NEXT' })"
        >
          <figure class="image is-32x32">
            <img src="@/assets/next.png" alt="next-icon" />
          </figure>
        </button>
      </div>
      <div>
        <div class="columns" v-if="dateRange">
          <div class="column" v-for="(date, $index) in dateRange" :key="$index">
            <div class="mb-5">
              <span class="is-capitalized has-text-weight-semibold">
                {{ date | formattedDate("dddd") }}
              </span>
              <br />
              <span>{{ date | formattedDate("DD MMM") }}</span>
            </div>
            <template v-if="dailySlots.length > 0">
              <div
                class="has-background-info-light has-text-weight-medium has-text-link mb-2"
                v-for="(slot, $index) in availableSlotsByDate(date)"
                :key="$index"
              >
                <a
                  v-if="slot.isShown"
                  :title="$t('APPOINTMENT.PLANNER.SELECT_SLOT')"
                  @click="selectSlot(slot.Start)"
                  :id="`slot_${$index}_${$moment(date).format(DATE_FORMAT)}`"
                  :name="`slot_${$index}_${$moment(date).format(DATE_FORMAT)}`"
                >
                  {{ slot.Start | formattedDate("HH:mm") }}
                </a>
              </div>
            </template> 
            <div v-if="hasAvailableSlots(date)" class="has-background-info has-text-weight-medium">
              <a
                class="has-text-white"
                :title="$t('APPOINTMENT.PLANNER.MORE_SLOTS')"
                :id="`more-slot_${$moment(date).format(DATE_FORMAT)}`"
                :name="`more-slot_${$moment(date).format(DATE_FORMAT)}`"
                @click="showMoreSlots(date)"
              >
                {{ $t("APPOINTMENT.PLANNER.MORE_SLOTS") }}
              </a>
            </div> 
          </div>
        </div>
      </div>
    </div>
    <!-- Start ::: Appointment modal -->
    <div class="modal" :class="{ 'is-active': showModal, 'is-clipped': showModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head has-background-white">
          <p class="modal-card-title has-text-left">{{$t('APPOINTMENT.CONFIRMATION_MODAL.TITTLE')}}</p>
          <button class="delete" aria-label="close" @click="showModal = false"></button>
        </header>
        <section class="modal-card-body">
          <article class="media">
            <div class="media-content has-text-left">
              <div class="content">
                <p>
                  <span class="has-text-grey"><small>{{$t('APPOINTMENT.CONFIRMATION_MODAL.ORIGINAL_APPOINTMENT_DATE')}}</small></span>
                  <br />
                  <span class="subtitle is-5 is-capitalized" style="text-decoration: line-through">
                    {{ appointment.date }}
                  </span>
                </p>
              </div>
            </div>
          </article>
          <article class="media">
            <div class="media-content has-text-left">
              <div class="content">
                <p>
                  <span class="has-text-grey"><small>{{$t('APPOINTMENT.CONFIRMATION_MODAL.NEW_APPOINTMENT_DATE')}}</small></span>
                  <br />
                  <span class="subtitle is-5 is-capitalized">
                    {{ newAppointmentDate | formattedDate("LLLL") }}
                  </span>
                </p>
              </div>
            </div>
          </article>
        </section>
        <footer class="modal-card-foot has-background-white" style="justify-content: flex-end">
          <button class="button is-light" name="cancel_appointment_btn" id="cancel_appointment_btn" @click="showModal = false">
            {{$t('APPOINTMENT.CONFIRMATION_MODAL.CANCEL_BTN')}}
          </button>
          <button class="button is-primary is-light" name="confirm_appointment_btn" id="confirm_appointment_btn">
            {{$t('APPOINTMENT.CONFIRMATION_MODAL.CONFIRM_APPOINTMENT_BTN')}}
          </button>
        </footer>
      </div>
    </div>
    <!-- End ::: Appointment modal -->
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { DATE_FORMAT, LIMIT_SLOT_TO_SHOW } from '../../configuration/parameters';

export default {
  name: 'AppointmentSchedulePlanner',
  data() {
    return {
      DATE_FORMAT,
      LIMIT_SLOT_TO_SHOW,
      dateInterval: this.generateWeekInterval(this.$moment()),
      dailySlots: [],
      showModal: false,
      newAppointmentDate: null
    };
  },
  computed: {
    ...mapGetters('Appointment', ['weeklySlots']),
    ...mapState('Appointment', ['appointment']),
    allowPrevNavigation() {
      return this.$moment(this.dateInterval.end).diff(this.$moment(), 'days') !== 5;
    },
    dateRange() {
      return this.dateInterval && Array.from(this.dateInterval.by('days'));
    },
  },
  created() {
    this.fetchWeekInterval();
  },
  methods: {
    ...mapActions('Appointment', ['getWeeklySlotsByFirstDayOfWeek', 'clearWeeklySlots']),
    generateWeekInterval(initialDay) {
      return this.$moment.rangeFromInterval('day', 6, initialDay);
    },
    calendarNavigation({ orientation }) {
      this.clearWeeklySlots();
      const navigationActions = {
        PREV: () => this.generateWeekInterval(this.$moment(this.dateInterval.start).subtract(7, 'days')),
        NEXT: () => this.generateWeekInterval(this.$moment(this.dateInterval.end).add(1, 'days'))
      };
      this.dateInterval = navigationActions[orientation]();
      this.fetchWeekInterval();
    },
    setDailySlots() {
      this.dailySlots = Object.assign(this.dateRange).map(date => ({
        date,
        slots: this.setDailySlotsByDate(date),
      }));
    },
    setDailySlotsByDate(date) {
      const dailySlotObject = Object.assign(this.weeklySlots).filter(
        weeklySlot => weeklySlot.date === this.$moment(date).format(DATE_FORMAT)
      )[0];

      return typeof dailySlotObject === "object"
        ? dailySlotObject.slots
            .filter(slot => !slot.Taken)
            .map((slot, index) => ({
              Start: slot.Start,
              End: slot.End,
              isShown: index < LIMIT_SLOT_TO_SHOW
            }))
        : [];
    },
    getDailySlotsAccordingByDate(date) {
      return this.dailySlots.find(
        obj => this.$moment(obj.date).format(DATE_FORMAT) === this.$moment(date).format(DATE_FORMAT)
      );
    },
    availableSlotsByDate(date) {
      return this.getDailySlotsAccordingByDate(date)?.slots || [];
    },
    hasAvailableSlots(date) {
        return this.getDailySlotsAccordingByDate(date)?.slots.some(slot => !slot.isShown) || false;
    },
    selectSlot(date) {
      this.newAppointmentDate = date;
      this.showModal = true;
    },
    showMoreSlots(date) {
      this.getDailySlotsAccordingByDate(date)?.slots.forEach((slot) => { slot.isShown = true});
    },
    async fetchWeekInterval() {
      const weekDays = [this.$moment(this.dateInterval.start).weekday(0).format(DATE_FORMAT)];
      this.dateRange.forEach((date) => {
        if(date.weekday() === 0) weekDays.push(this.$moment(date).format(DATE_FORMAT));
      });
      
      try {
        await Promise.all(weekDays.map((weekDay) => this.getWeeklySlotsByFirstDayOfWeek(weekDay)));
        this.setDailySlots();
      } catch (error) {
        throw new Error(error);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__nav-button {
    border: none;
    &--disabled {
      opacity: 0.2;
      cursor: initial;
    }
  }
}
</style>
