import Vue from 'vue';
import VueI18n from 'vue-i18n';
import moment from 'moment';
import { extendMoment } from 'moment-range';
import App from './App.vue';
import router from './router';
import store from './store';
import es from './i18n/es';
import filters from './filters';

Vue.config.productionTip = false;

const $moment = extendMoment(moment);
$moment.locale('es');
Vue.prototype.$moment = $moment;

Vue.use(filters);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'es',
  messages: {
    es,
  },
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
