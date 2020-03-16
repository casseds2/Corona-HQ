<template>
  <div>
    <h2 class="page__title">{{ region }} Statistics</h2>
    <section class="stats__cards">
      <div class="card">
        <h2 class="card__title">Confirmed</h2>
        <div class="card__stat">
          <p>{{ confirmed || 0 }}</p>
        </div>
      </div>
      <div class="card">
        <h2 class="card__title">Recovered</h2>
        <div class="card__stat">
          <p>{{ recovered || 0 }}</p>
        </div>
      </div>
      <div class="card">
        <h2 class="card__title">Deaths</h2>
        <div class="card__stat">
          <p>{{ deaths || 0 }}</p>
        </div>
      </div>
    </section>
    <img
      v-if="region === 'Global'"
      class="summary"
      src="https://covid19.mathdro.id/api/og"
      alt="Open Graph Summary"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['fetchStats', 'fetchCountries']),
  },
  computed: {
    ...mapGetters(['stats', 'countries']),
    iso: function() {
      return this.$route.params.iso;
    },
    region: function() {
      let region = 'Global';
      for (let { country, iso } of this.countries) {
        if (iso === this.iso) {
          region = country;
          break;
        }
      }
      return region;
    },
    confirmed: function() {
      return this.stats ? this.stats['confirmed'] : 0;
    },
    recovered: function() {
      return this.stats ? this.stats['recovered'] : 0;
    },
    deaths: function() {
      return this.stats ? this.stats['deaths'] : 0;
    },
  },
  watch: {
    '$route.params.iso': function(id) {
      this.fetchStats(this.iso);
    },
  },
  created() {
    if (this.iso === null) {
      this.fetchStats();
    } else {
      this.fetchStats(this.iso);
    }
    this.fetchCountries();
  },
};
</script>

<style></style>
