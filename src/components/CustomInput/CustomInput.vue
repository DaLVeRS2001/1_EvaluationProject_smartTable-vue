<template>
  <div class="field">
    <input
      @input="$emit('inputC', { name: name, value: $event.target.value })"
      :name="name"
      :placeholder="placeholder"
      :type="fieldType"
    /><br />
    <small style="color: red">{{ errorMessage }}</small>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    fieldType: {
      type: String,
      required: true,
    },
    errorMessage: {
      type: String,
      required: false,
    },
  },
};
</script>
