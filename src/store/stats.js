export default {
  state: {
    stats: {},
  },
  getters: {
    stats: (state) => state['stats'],
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
  },
  mutations: {
    setStats(state, data) {
      state['stats'] = data;
    },
  },
};
