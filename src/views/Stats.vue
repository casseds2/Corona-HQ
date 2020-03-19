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
    <!-- Responsive Height -->
    <weekly-summary :chartData="dailySummary" :height="20" :width="100"></weekly-summary>
  </div>  
</template>

<script>
import WeeklySummary from '../components/WeeklySummary';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    WeeklySummary,
  },
  methods: {
    ...mapActions(['fetchStats', 'fetchDailySummary', 'fetchCountries']),
  },
  computed: {
    ...mapGetters(['stats', 'dailySummary', 'countries']),
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
    this.fetchDailySummary();
  },
};
</script>

<style>
</style>
