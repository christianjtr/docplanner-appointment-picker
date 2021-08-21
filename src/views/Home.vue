<template>
  <div class="container no-border">
    <AppointmentInfo />
    <hr />
    <AppointmentSchedulePlanner />
    <hr />
    <div class="has-text-left">
      <p
        class="mb-2"
        v-html="
          $t('APPOINTMENT.CANCELLATION_TITLE', {
            professional: professionalName
          })
        "
      ></p>
      <div>
        <button
          id="cancel-appointment-button"
          name="cancle-appointment-button"
          :title="$t('APPOINTMENT.BUTTON.CONFIRM_APPOINTMENT')"
          class="button is-danger is-light is-medium"
          @click="cancelAppointment"
        >
          {{ $t("APPOINTMENT.BUTTON.CANCEL_APPOINTMENT") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import AppointmentInfo from "@/components/appointment/AppointmentInfo.vue";
import AppointmentSchedulePlanner from "@/components/appointment/AppointmentSchedulePlanner.vue";

export default {
  name: "Home",
  components: {
    AppointmentInfo,
    AppointmentSchedulePlanner
  },
  computed: {
    ...mapGetters("Appointment", ["professionalName"])
  },
  methods: {
    ...mapActions("Appointment", ["cancelAppointment"])
  }
};
</script>
