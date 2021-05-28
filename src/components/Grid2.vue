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
import { createElement } from '@syncfusion/ej2-base';
import {
  CheckBoxSelection,
  DropDownList,
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
import { mapState } from 'vuex';
import Column1 from './Column1';

MultiSelect.Inject(CheckBoxSelection);

export default {
  name: 'grid1',
  data() {
    return {
      editSettings: {
        allowEditing: true,
        allowAdding: false,
        allowDeleting: false,
        mode: 'Dialog',
        showDeleteConfirmDialog: true,
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
        let dropInstance = null;
        let countryElem, countryObj;
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
            field: 'ShipCountry',
            headerText: 'Ship Country',
            allowFiltering: true,
            allowGrouping: true,
            allowReordering: true,
            allowSorting: true,
            allowEditing: true,
            editType: 'dropdownedit',
            edit: {
              create() {
                countryElem = document.createElement('input');
                return countryElem;
              },
              read() {
                return countryObj.text + 'foo';
              },
              destroy() {
                countryObj.destroy();
              },
              write() {
                countryObj = new DropDownList({
                  dataSource: [
                    { countryName: 'United States', countryId: '1' },
                    { countryName: 'Australia', countryId: '2' },
                  ],
                  fields: { value: 'countryId', text: 'countryName' },
                  placeholder: 'Select a country',
                  floatLabelType: 'Never',
                });
                countryObj.appendTo(countryElem);
              },
            },
            filter: {
              ui: {
                create(args) {
                  let flValInput = createElement('input', {
                    className: 'flm-input',
                  });
                  args.target.appendChild(flValInput);
                  dropInstance = new MultiSelect({
                    dataSource: ['France', 'Germany', 'Brazil', 'Belgium'],
                    fields: { text: 'ShipCountry', value: 'ShipCountry' },
                    placeholder: 'Select a value',
                    popupHeight: '200px',
                    mode: 'CheckBox',
                  });
                  dropInstance.appendTo(flValInput);
                },
                destroy() {
                  dropInstance.destroy();
                },
                write(args) {
                  dropInstance.value = args.filteredValue;
                },
                read(args) {
                  args.fltrObj.filterSettings.columns = [];
                  args.fltrObj.filterByColumn(
                    args.column.field,
                    'contains',
                    dropInstance.value
                  );
                },
              },
            },
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
            template: () => ({ template: Column1 }),
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
