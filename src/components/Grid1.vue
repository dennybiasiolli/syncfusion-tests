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
  CheckBoxSelection,
  MultiSelect,
} from '@syncfusion/ej2-dropdowns';
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
import { mapState, mapGetters, mapActions } from 'vuex';
import { Column1GridTemplate } from './Column1';
import { getDetailColumn1GridColumn } from './DetailColumn1';
import { ListColumn1GridColumn } from './ListColumn1';
import { ShipCountryGridColumn } from './ShipCountryColumn.vue';

MultiSelect.Inject(CheckBoxSelection);

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
            field: 'OrderDate',
            headerText: 'Order Date',
            allowFiltering: true,
            allowGrouping: true,
            allowReordering: true,
            allowSorting: true,
            allowEditing: true,
            type: 'dateTime',
            format: { type: 'dateTime', skeleton: 'short' },
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
            field: 'ShipCountry',
            type: 'string',
            headerText: 'Ship Country',
            allowFiltering: true,
            allowGrouping: true,
            allowReordering: true,
            allowSorting: true,
            allowEditing: true,
            editType: 'dropdownedit',
            ...ShipCountryGridColumn,
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
          {
            headerText: 'Custom1',
            // allowFiltering: true,
            // allowGrouping: true,
            // allowReordering: true,
            allowSorting: true,
            allowEditing: false,
            // displayAsCheckBox: true,
            // type: 'boolean',
            template: Column1GridTemplate,
          },
          {
            field: 'ListABC',
            type: 'string',
            headerText: 'List ABC',
            // allowFiltering: true,
            // allowGrouping: true,
            // allowReordering: true,
            allowSorting: true,
            allowEditing: true,
            ...ListColumn1GridColumn,
          },
          {
            field: 'FieldDCE',
            type: 'string',
            headerText: 'FIELD DCE',
            // allowFiltering: true,
            // allowGrouping: true,
            // allowReordering: true,
            allowSorting: true,
            allowEditing: true,
            ...getDetailColumn1GridColumn(),
          },
        ];
      },
    }),
    ...mapGetters({
      dataSource: 'pagedListData',
    }),
  },
  methods: {
    ...mapActions(['getListData', 'deleteListData']),
    dataSourceChanged(e) {
      console.log('dataSourceChanged', e.requestType);
      switch (e.requestType) {
        case 'delete':
          this.deleteListData(e.data);
      }
      e.endEdit();
      // this.getListData(e.state);
    },
    dataStateChange(e) {
      if (['sorting'].includes(e.action.requestType)) {
        console.log('dataStateChange exiting');
        return;
      }
      console.log('dataStateChange', e);
      this.state = e;
      this.loadData();
    },
    loadData() {
      console.log('loadData', this.state);
      this.getListData(this.state);
    },
  },
  provide: {
    grid: [Sort, Group, Page, Reorder, Edit, ForeignKey, Toolbar, Filter],
  },
};
</script>
