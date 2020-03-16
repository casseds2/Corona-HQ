export default {
  state: {
    stats: {},
    dailySummary: [],
  },
  getters: {
    stats: (state) => state['stats'],
    dailySummary: (state) => state['dailySummary'],
  },
  actions: {
    async fetchStats({ commit }, iso = null) {
      try {
        const url = iso
          ? `https://covid19.mathdro.id/api/countries/${iso}`
          : 'https://covid19.mathdro.id/api';
        const response = await fetch(url);
        const { confirmed, recovered, deaths } = await response.json();
        commit('setStats', {
          confirmed: confirmed['value'],
          recovered: recovered['value'],
          deaths: deaths['value'],
        });
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    },
    async fetchDailySummary({ commit }) {
      try {
        const response = await fetch('https://covid19.mathdro.id/api/daily');
        const json = await response.json();
        commit('setDailySummary', json);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    },
  },
  mutations: {
    setStats(state, data) {
      state['stats'] = data;
    },
    setDailySummary(state, data) {
      state['dailySummary'] = data;
    },
  },
};
