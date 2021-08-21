import formattedDate from './dateFilters';

export default {
  install(Vue) {
    Vue.filter('formattedDate', formattedDate);
  },
};
