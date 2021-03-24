<template>
  <div ref="chartContainer" :style="{ width: width, height: height }" />
</template>

<script>
import anychart from 'anychart';
import { mapState } from 'vuex';

export default {
  name: 'any-chart',
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    data: {
      type: [Array, Object],
      required: true,
    },
    title: {
      type: String,
    },
    width: String,
    height: String,
  },
  computed: {
    ...mapState({
      chartData: (state) =>
        state.chartData && {
          ...state.chartData,
          time_series: state.chartData.time_series.map((e) => ({
            ...e,
            date: new Date(e.date),
          })),
          time_series2: state.chartData.time_series.map((e) => {
            const m1 = Math.floor(Math.random() * 15);
            const m2 = Math.floor(Math.random() * 10);
            const m3 = Math.floor(Math.random() * 25);
            return {
              date: new Date(e.date),
              messages1_count: m1,
              messages2_count: m2,
              messages3_count: m3,
              messages_total_count: m1 + m2 + m3,
            };
          }),
        },
    }),
  },
  mounted() {
    var chart = anychart[this.type]();
    // set the data
    chart.data(this.data);
    // set chart title
    chart.title(this.title);
    // set the container element
    chart.container(this.$refs.chartContainer);
    // initiate chart display
    chart.draw();
  },
};
</script>
