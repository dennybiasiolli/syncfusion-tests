<template>
  <div>
    {{ data }}
    <p>
      <input type="text" v-model="data.ListABC" />
    </p>
  </div>
</template>

<script>
const DialogForm = {
  name: 'DialogForm',
  data() {
    return {
      data: {},
    };
  },
};

export default DialogForm;
export const DialogFormTemplate = () => ({ template: DialogForm });
</script>
