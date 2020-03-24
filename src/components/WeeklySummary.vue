<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    chartData: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      required: false,
      default: () => {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ];
        }
      },
    },
  },
  methods: {
    renderSummary() {
      this.renderChart(
        {
          labels: this.labels,
          datasets: [
            {
              label: 'Confirmed',
              backgroundColor: 'rgba(194, 202, 232, 0.4)',
              data: this.confirmedLastWeek,
            },
            {
              label: 'Recovered',
              backgroundColor: 'rgba(131, 128, 182, 0.7)',
              data: this.recoveredLastWeek,
            },
          ],
        },
        this.options,
      );
    },
  },
  computed: {
    lastWeek: function() {
      return this.chartData.slice(Math.max(this.chartData.length - 8, 0));
    },
    confirmedLastWeek: function() {
      return this.lastWeek.map((item) => {
        return item['totalConfirmed'];
      });
    },
    recoveredLastWeek: function() {
      return this.lastWeek.map((item) => {
        return item['totalRecovered'];
      });
    },
    labels: function() {
      return this.lastWeek.map((item) => {
        return item['reportDate'];
      });
    },
  },
  watch: {
    confirmedLastWeek: function() {
      this.renderSummary();
    },
    recoveredLastWeek: function() {
      this.renderSummary();
    },
    labels: function() {
      this.renderSummary();
    },
  },
  mounted() {
    this.renderSummary();
  },
};
</script>

<style></style>
