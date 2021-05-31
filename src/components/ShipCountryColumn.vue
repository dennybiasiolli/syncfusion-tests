<template>
  <div>{{ data.ShipCountry }}</div>
</template>

<script>
import { createElement } from '@syncfusion/ej2-base';
import { DropDownList, MultiSelect } from '@syncfusion/ej2-dropdowns';

const ShipCountryColumn = {
  name: 'ShipCountryColumn',
  data() {
    return {
      data: {},
    };
  },
};
export default ShipCountryColumn;

let dropInstance = null;
let countryElem, countryObj;
export const ShipCountryGridColumn = {
  template: () => ({ template: ShipCountryColumn }),
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
        console.log('create');
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
};
</script>
