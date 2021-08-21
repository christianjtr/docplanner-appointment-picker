<template>
  <div>
    <h1
      class="title"
      v-html="
        $t('APPOINTMENT.INFO.CONFIRMATION_TITLE', {
          professional: appointment.professional
        })
      "
    ></h1>
    <div class="box">
      <article v-for="info in infoBox" :key="info.key" class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="require(`@/assets/${info.icon.file}`)" :alt="info.icon.alt" />
          </figure>
        </div>
        <div class="media-content has-text-left">
          <div class="content">
            <p>
              <span class="has-text-grey"
                ><small>{{ info.title }}</small></span
              >
              <br />
              <span class="subtitle is-5">{{ appointment[info.key] }}</span>
            </p>
          </div>
        </div>
      </article>
    </div>
    <div class="has-text-right">
      <button
        id="confirm-appointment-button"
        name="confirm-appointment-button"
        :title="$t('APPOINTMENT.BUTTON.CONFIRM_APPOINTMENT')"
        class="button is-primary is-light is-medium"
        v-if="!appointment.isConfirmed"
        @click="confirmAppointment"
      >
        {{ $t("APPOINTMENT.BUTTON.CONFIRM_APPOINTMENT") }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AppointmentInfo",
  data() {
    return {
      infoBox: [
        {
          key: "professional",
          title: this.$t("APPOINTMENT.INFO.PROFESSIONAL"),
          icon: {
            file: "caduceus-symbol.png",
            alt: "caduceus-symbol-icon"
          }
        },
        {
          key: "date",
          title: this.$t("APPOINTMENT.INFO.DATE"),
          icon: {
            file: "calendar.png",
            alt: "calendar-icon"
          }
        },
        {
          key: "facility",
          title: this.$t("APPOINTMENT.INFO.FACILITY"),
          icon: {
            file: "hospital.png",
            alt: "hospital-icon"
          }
        }
      ]
    };
  },
  computed: {
    ...mapState("Appointment", ["appointment"])
  },
  methods: {
    ...mapActions("Appointment", ["confirmAppointment"])
  }
};
</script>
