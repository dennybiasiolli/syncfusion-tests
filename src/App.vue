<template>
  <div id="app">
    <h1>AnyChart</h1>
    <AnyChart
      :data="chartData.values"
      :events-a="[
        {
          date: new Date('2020-07-27'),
          title: 'Alan',
          description: 'Cihsortu fuhsdaofbs soudfhasdkbfliuasdf.',
        },
        {
          date: new Date('2020-08-10'),
          title: 'Alan',
          description: 'Cihsortu fuhsdaofbs soudfhasdkbfliuasdf.',
        },
        {
          date: new Date('2020-08-14'),
          title: 'Alan',
          description: 'Cihsortu fuhsdaofbs soudfhasdkbfliuasdf.',
        },
        {
          date: new Date('2020-08-24'),
          title: 'Alan',
          description: 'Cihsortu fuhsdaofbs soudfhasdkbfliuasdf.',
        },
        {
          date: new Date('2020-09-14'),
          title: 'Alan',
          description: 'Cisco announced the acquisition of Audium Corporation.',
        },
        {
          date: new Date('2020-10-14'),
          title: 'Alan',
          description: 'Cisco announced its intent to acquire PostPath, Inc.',
        },
        {
          date: new Date('2020-10-17'),
          title: 'Alan',
          description: 'Cisco announced its intent to acquire PostPath, Inc.',
        },
      ]"
      :events-b="[
        {
          date: new Date('2020-07-27'),
          title: 'Brad',
          description: 'Cihsortu fuhsdaofbs soudfhasdkbfliuasdf.',
        },
        {
          date: new Date('2020-08-10'),
          title: 'Brad',
          description: 'Cihsortu fuhsdaofbs soudfhasdkbfliuasdf.',
        },
        {
          date: new Date('2020-08-14'),
          title: 'Brad',
          description: 'Cisco announced the acquisition of Audium Corporation.',
        },
        {
          date: new Date('2020-10-17'),
          title: 'Brad',
          description: 'Cisco announced its intent to acquire PostPath, Inc.',
        },
      ]"
      :title="chartData.symbol"
      height="768px"
    />

    <Chart3 />
    <Chart1 />
    <Chart2 />

    <ejs-button @click.native="handleLoadHeaders">Load Headers</ejs-button>
    <ejs-button @click.native="handleLoadData">Load Data</ejs-button>

    <h1>Grid 1, server side integration</h1>
    <Grid1 />

    <h1>Grid 2, local data</h1>
    <Grid2 />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Chart1 from './components/Chart1.vue';
import Chart2 from './components/Chart2.vue';
import Chart3 from './components/Chart3.vue';
import AnyChart from './components/AnyChart.vue';
import Grid1 from './components/Grid1.vue';
import Grid2 from './components/Grid2.vue';

export default {
  name: 'App',
  components: {
    Chart1,
    Chart2,
    Chart3,
    AnyChart,
    Grid1,
    Grid2,
  },
  mounted() {
    this.getChartData();
  },
  computed: {
    ...mapState({
      chartData: (state) =>
        state.chartData && {
          ...state.chartData,
          values: state.chartData.time_series.map((e) => ({
            date: new Date(e.date),
            open: e.open,
            high: e.high,
            low: e.low,
            close: e.close,
            volume: e.volume,
          })),
        },
    }),
  },
  methods: {
    ...mapActions([
      'getEmployeeData',
      'getListData',
      'deleteListData',
      'getChartData',
    ]),
    handleLoadHeaders() {
      this.getEmployeeData();
    },
    handleLoadData() {
      this.getListData();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
