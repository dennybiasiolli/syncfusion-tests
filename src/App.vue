<template>
  <div id="app">
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
import { mapActions } from 'vuex';
import Chart1 from './components/Chart1.vue';
import Chart2 from './components/Chart2.vue';
import Chart3 from './components/Chart3.vue';
import Grid1 from './components/Grid1.vue';
import Grid2 from './components/Grid2.vue';

export default {
  name: 'App',
  components: {
    Chart1,
    Chart2,
    Chart3,
    Grid1,
    Grid2,
  },
  mounted() {
    this.getChartData();
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
