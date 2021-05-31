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

const countries = [
  { countryId: 1, countryName: 'Brazil' },
  { countryId: 2, countryName: 'Belgium' },
  { countryId: 3, countryName: 'Germany' },
  { countryId: 4, countryName: 'France' },
];

export const ShipCountryGridColumn = {
  template: () => ({ template: ShipCountryColumn }),
  // edit: {
  //   create() {
  //     countryElem = document.createElement('input');
  //     return countryElem;
  //   },
  //   read() {
  //     console.log(countryObj);
  //     return countryObj.text;
  //   },
  //   write() {
  //     countryObj = new DropDownList({
  //       dataSource: countries,
  //       fields: { value: 'countryId', text: 'countryName' },
  //       placeholder: 'Select a country',
  //       floatLabelType: 'Never',
  //     });
  //     countryObj.appendTo(countryElem);
  //   },
  //   destroy() {
  //     countryObj.destroy();
  //   },
  // },
  filter: {
    ui: {
      create(args) {
        console.log('create');
        let flValInput = createElement('input', {
          className: 'flm-input',
        });
        args.target.appendChild(flValInput);
        dropInstance = new MultiSelect({
          dataSource: countries, // ['France', 'Germany', 'Brazil', 'Belgium'],
          fields: { value: 'countryName', text: 'countryName' },
          placeholder: 'Select a value',
          popupHeight: '200px',
          mode: 'CheckBox',
        });
        dropInstance.appendTo(flValInput);
      },
      read(args) {
        args.fltrObj.filterSettings.columns = [];
        args.fltrObj.filterByColumn(
          args.column.field,
          'equal',
          dropInstance.value
        );
      },
      write(args) {
        dropInstance.value = args.filteredValue;
      },
      destroy() {
        dropInstance.destroy();
      },
    },
  },
};
</script>
