<template>
  <div>{{ data.ListABC && data.ListABC.join(', ') }}</div>
</template>

<script>
import { createElement } from '@syncfusion/ej2-base';
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

const ListColumn1 = {
  name: 'ListColumn1',
  data() {
    return {
      data: {},
    };
  },
};

let dropInstance = null;
let lastDropInstanceValue = [];

export default ListColumn1;
export const ListColumn1GridColumn = {
  type: 'string',
  template: () => ({ template: ListColumn1 }),
  edit: {
    read(args) {
      return args.value
        .split(',')
        .map((e) => e.trim())
        .filter((e) => e !== '');
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
          dataSource: ['alberta', 'belgium', 'china', 'delaware', 'egypt'],
          fields: { value: 'ListABC', text: 'ListABC' },
          placeholder: 'Select a value',
          popupHeight: '200px',
          mode: 'CheckBox',
        });
        dropInstance.appendTo(flValInput);
      },
      write(args) {
        console.log('write args', args, dropInstance);
        console.log(args.filteredValue);
        dropInstance.value = lastDropInstanceValue;
      },
      read(args) {
        console.log('read args', args, dropInstance);
        args.fltrObj.filterSettings.columns = [];
        args.fltrObj.filterByColumn(
          args.column.field,
          'contains',
          dropInstance.value
        );
        lastDropInstanceValue = dropInstance.value;
      },
    },
  },
  sortComparer: (reference, comparer) => {
    const r = reference && reference.join(', ');
    const c = comparer && comparer.join(', ');
    if (!r || r < c) {
      return -1;
    }
    if (!c || r > c) {
      return 1;
    }
    return 0;
  },
};
</script>
