import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function stateToDjangoApiParams(state) {
  return {
    skip: state?.skip || 0,
    take: state?.take || 5,
    order_by: (state?.sorted || [])
      .map((s) => `${s.direction === 'descending' ? '-' : ''}${s.name}`)
      .join(','),
  };
}

const store = new Vuex.Store({
  state: {
    chartData: {
      time_series: [],
    },
    listData: [],
    totalListData: 0,
    employeeData: [],
  },
  getters: {
    pagedListData(state) {
      return {
        result: state.listData.slice(0, 5),
        count: state.listData.length,
      };
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setChartData(state, chartData) {
      state.chartData = chartData && { ...chartData };
    },
    setEmployeeData(state, results) {
      state.employeeData = [...results];
    },
    setListData(state, { results, count }) {
      state.listData = [...results];
      state.count = count;
    }
  },
  actions: {
    async getChartData({ commit }) {
      const response = await axios.get('/data/chartData.json');
      await new Promise((resolve) => setTimeout(resolve, 500));
      commit('setChartData', response.data);
    },
    async getEmployeeData({ commit }) {
      console.log('getEmployeeData');
      const response = await axios.get('/data/employeeData.json');
      await new Promise((resolve) => setTimeout(resolve, 500));
      commit('setEmployeeData', response.data.results);
      return response.data.results;
    },
    async getListData({ commit }, state) {
      console.log('getListData', stateToDjangoApiParams(state));
      const response = await axios.get('/data/listData.json');
      await new Promise((resolve) => setTimeout(resolve, 500));
      commit('setListData', response.data);
    },
    async deleteListData({ commit, state }, items) {
      console.log('deleteListData', items);
      const response = await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      const removedIds = items.map(e => e.OrderID);
      console.log('removedIds', removedIds);
      const newData = state.listData.filter(e => !removedIds.includes(e.OrderID));
      console.log('newData', state.listData, newData)
      commit('setListData', { results: newData, count: state.totalListData - removedIds.length });
      return response.data;
    },
  },
});

export default store;
