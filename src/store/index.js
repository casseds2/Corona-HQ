import Vue from 'vue';
import Vuex from 'vuex';

import stats from './stats';
import countries from './countries';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    stats,
    countries,
  },
});
