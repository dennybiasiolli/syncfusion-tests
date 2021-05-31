<template>
  <div>{{ data.ListABC && data.ListABC.join(', ') }}</div>
</template>

<script>
const ListColumn1 = {
  name: 'ListColumn1',
  data() {
    return {
      data: {},
    };
  },
};

export default ListColumn1;
export const ListColumn1GridColumn = {
  template: () => ({ template: ListColumn1 }),
  // editType: 'DropDownList',
  // dataSource: [],
  edit: {
    read(args) {
      return args.value
        .split(',')
        .map((e) => e.trim())
        .filter((e) => e !== '');
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
