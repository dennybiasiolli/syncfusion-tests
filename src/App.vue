<template>
  <div id="app">
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
import Grid1 from './components/Grid1.vue';
import Grid2 from './components/Grid2.vue';

export default {
  name: 'App',
  components: {
    Grid1,
    Grid2,
  },
  methods: {
    ...mapActions(['getEmployeeData', 'getListData', 'deleteListData']),
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
