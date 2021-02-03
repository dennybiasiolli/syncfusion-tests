<template>
  <div id="app">
    <ejs-grid
      :data-source="dataSource"
      :allow-paging="true"
      :page-settings="pageOptions"
      :allow-sorting="true"
      :allow-grouping="true"
      :allow-reordering="true"
      :allow-filtering="true"
      :filter-settings="filterOptions"
      :toolbar="toolbar"
      :edit-settings="editSettings"
      :data-state-change="dataStateChange"
      :data-source-changed="dataSourceChanged"
    >
      <e-columns>
        <e-column
          v-for="col in columns"
          :key="col.OrderID"
          v-bind="col"
        ></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>
<script>
import {
  Sort,
  Group,
  Page,
  Reorder,
  Edit,
  ForeignKey,
  Toolbar,
  Filter,
} from '@syncfusion/ej2-vue-grids';
import { mapState } from 'vuex';

export default {
  name: 'grid1',
  data() {
    return {
      editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
      },
      filterOptions: {
        type: 'Menu',
      },
      pageOptions: { pageSize: 5 },
      state: { skip: 0, take: 10 },
      toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search', 'Print'],
    };
  },
  computed: {
    ...mapState({
      dataSource: 'listData',
      columns(state) {
        return [
          {
            field: 'OrderID',
            headerText: 'Order ID',
            textAlign: 'Right',
            width: 100,
            allowSorting: false,
            allowEditing: false,
          },
          {
            field: 'Employee.EmployeeID',
            headerText: 'Employee ID',
            allowFiltering: true,
            allowGrouping: true,
            allowReordering: true,
            allowSorting: true,
            allowEditing: true,
            foreignKeyField: 'EmployeeID',
            foreignKeyValue: 'FirstName',
            dataSource: state.employeeData,
          },
          {
            field: 'EmployeeID',
            headerText: 'Employee Name',
            allowFiltering: true,
            allowGrouping: true,
            allowReordering: true,
            allowSorting: true,
            allowEditing: true,
            // foreignKeyField: 'EmployeeID',
            foreignKeyValue: 'FirstName',
            dataSource: state.employeeData,
          },
          {
            field: 'Freight',
            headerText: 'Freight',
            textAlign: 'Right',
            allowFiltering: true,
            allowGrouping: true,
            allowReordering: true,
            allowSorting: true,
            allowEditing: true,
            width: 100,
          },
          {
            field: 'ShipCity',
            headerText: 'Ship City',
            allowFiltering: true,
            allowGrouping: true,
            allowReordering: true,
            allowSorting: true,
            allowEditing: true,
          },
          {
            field: 'Verified',
            headerText: 'Verified',
            allowFiltering: true,
            allowGrouping: true,
            allowReordering: true,
            allowSorting: true,
            allowEditing: true,
            displayAsCheckBox: true,
            type: 'boolean',
          },
        ];
      },
      // dataSource(state) {
      //   return { result: state.listData, count: state.totalListData };
      // },
    }),
  },
  methods: {
    dataStateChange(e) {
      console.log('Grid2 > dataStateChange', e);
    },
    dataSourceChanged(e) {
      console.log('Grid2 > dataSourceChanged', e);
    },
  },
  provide: {
    grid: [Sort, Group, Page, Reorder, Edit, ForeignKey, Toolbar, Filter],
  },
};
</script>
