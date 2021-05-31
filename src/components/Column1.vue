<template>
  <div>{{ data }}</div>
</template>

<script>
const Column1 = {
  name: 'column1',
  data() {
    return {
      data: {},
    };
  },
};

export default Column1;
export const Column1GridTemplate = () => ({ template: Column1 });
</script>
