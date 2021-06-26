<template>
  <div class="container">
    <p>Выбран пользователь: <b>{{ row.firstName + ' ' + row.lastName }}</b></p>
    Описание:
    <div
      style="
        width: 200px;
        height: 100px;
        overflow: auto;
        border: 1px solid black;
      "
    >
      {{ row.description }}
    </div>
    <p>Адрес проживания: <b>{{ row.address.streetAddress }}</b></p>
    <p>Город: <b>{{ row.address.city }}</b></p>
    <p>Провинция/штат: <b>{{ row.address.state }}</b></p>
    <p>Индекс: <b>{{ row.address.zip }}</b>c</p>
  </div>
</template>
<script>
export default {
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
};
</script>
