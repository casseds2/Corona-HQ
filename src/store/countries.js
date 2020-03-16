export default {
  state: {
    countries: [],
  },
  getters: {
    countries: (state) => state['countries'],
  },
  actions: {
    async fetchCountries({ commit }) {
      try {
        const response = await fetch('https://covid19.mathdro.id/api/countries');
        const { countries } = await response.json();
        const countriesList = Object.entries(countries).reduce((list, [country, iso]) => {
          list.push({ country, iso });
          return list;
        }, []);
        commit('setCountries', countriesList);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    },
  },
  mutations: {
    setCountries(state, data) {
      state['countries'] = data;
    },
  },
};
