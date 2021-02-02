import Vue from 'vue';
import Vuex from 'vuex';

import { listData, employeeData } from '@/assets/dataSource';

Vue.use(Vuex);

function stateToDjangoApiParams(state) {
  return {
    skip: state.skip,
    take: state.take,
    order_by: (state.sorted || [])
      .map((s) => `${s.direction === 'descending' ? '-' : ''}${s.name}`)
      .join(','),
  };
}

const store = new Vuex.Store({
  state: {
    listData: [],
    totalListData: 0,
    employeeData: [],
  },
  mutations: {
    increment(state) {
      state.count++;
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
    async getEmployeeData({ commit }) {
      console.log('getEmployeeData');
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              count: 15,
              results: employeeData,
            },
          });
        }, 500);
      });
      commit('setEmployeeData', response.data.results);
      return response;
    },
    async getListData({ commit }, state) {
      console.log('getListData', stateToDjangoApiParams(state));
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              count: 15,
              results: listData,
            },
          });
        }, 500);
      });
      commit('setListData', response.data);
      return response;
    }
  },
});

export default store;
