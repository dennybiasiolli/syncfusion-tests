import { shallowMount } from "@vue/test-utils";

import Grid1 from './Grid1.vue';

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('2', () => {
  let wrapper = shallowMount(Grid1);
  expect(wrapper.vm.$data).toBeDefined();
  expect(wrapper).toMatchSnapshot();
});
