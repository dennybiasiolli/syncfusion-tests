import Vue from 'vue';
import Vuex from 'vuex';

import { listData, employeeData } from '@/assets/dataSource';

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
      return response;
    },
  },
});

export default store;
