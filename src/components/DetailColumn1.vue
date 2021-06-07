<template>
  <div>{{ data.FieldDCE && data.FieldDCE.description }}</div>
</template>

<script>
import { createElement } from '@syncfusion/ej2-base';
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

const DetailColumn1 = {
  name: 'DetailColumn1',
  data() {
    return {
      data: {},
    };
  },
};

export default DetailColumn1;
export const getDetailColumn1GridColumn = () => {
  let dropInstance = null;
  let lastDropInstanceValue = [];

  return {
    field: 'FieldDCE.id',
    type: 'string',
    template: () => ({ template: DetailColumn1 }),
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
            dataSource: [
              {
                id: 1,
                description: 'abc',
              },
              {
                id: 2,
                description: 'dce',
              },
            ],
            fields: { value: 'id', text: 'description' },
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
          args.fltrObj.removeFilteredColsByField(args.column.field);
          args.fltrObj.filterByColumn(
            args.column.field,
            'equal',
            dropInstance.value
          );
          lastDropInstanceValue = dropInstance.value;
        },
      },
    },
    sortComparer: (reference, comparer) => {
      const r = reference && reference.description;
      const c = comparer && comparer.description;
      if (!r || r < c) {
        return -1;
      }
      if (!c || r > c) {
        return 1;
      }
      return 0;
    },
  };
};
</script>
