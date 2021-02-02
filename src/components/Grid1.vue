<template>
  <div id="app">
    <ejs-button @click.native="handleLoadData">Load Data</ejs-button>
    <ejs-grid
      :data-source="dataSource"
      :allow-paging="true"
      :page-settings="pageOptions"
      :allow-sorting="true"
      :allow-grouping="true"
      :allow-reordering="true"
      :edit-settings="editSettings"
      :data-state-change="dataStateChange"
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
} from '@syncfusion/ej2-vue-grids';
import { mapState, mapActions } from 'vuex';
import { employeeData } from '@/assets/dataSource';

export default {
  name: 'grid1',
  data() {
    return {
      columns: [
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
          dataSource: employeeData,
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
          dataSource: employeeData,
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
      ],
      editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
      },
      pageOptions: { pageSize: 5 },
      state: { skip: 0, take: 10 },
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    ...mapState({
      dataSource(state) {
        return { result: state.listData, count: state.totalListData };
      },
    }),
  },
  methods: {
    ...mapActions(['getListData']),
    dataStateChange(state) {
      this.state = state;
      this.loadData();
    },
    handleLoadData() {
      this.loadData();
    },
    loadData() {
      console.log(this.state);
      this.getListData(this.state);
    },
  },
  provide: {
    grid: [Sort, Group, Page, Reorder, Edit, ForeignKey],
  },
};
</script>
