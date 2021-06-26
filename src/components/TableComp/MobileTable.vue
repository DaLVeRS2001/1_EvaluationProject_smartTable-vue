<template>
  <table>
    <tbody
      class="tablePart"
      v-for="(item, idx) in sortedData"
      @click="onRowSelect(idx)"
      :key="item.id + item.phone"
    >
      <tr v-for="(header, idx) in tableHeaders" :key="header">
        <th @click.stop="onSort(sortTypes[idx])">
          {{ header }}
          <img
            :class="{ up: sortInRising && sortField === sortTypes[idx] }"
            src="@/assets/icons/arrow.png"
          />
        </th>
        <td>{{ item[sortTypes[idx]] }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    sortedData: { type: Object, required: true },
    onSort: { type: Function, required: true },
    sortInRising: { type: Boolean, required: true },
    sortField: { type: String, required: false },
    onRowSelect: { type: Function, required: true },
  },
  components: {},
  data() {
    return {
      sortTypes: [],
    };
  },
  created() {
    this.setSortTypes();
  },
  methods: {
    setSortTypes() {
      this.tableHeaders.map((header) => {
        const sortType = header
          .replace(/^[А-ЯЁA-Z]/g, function (x) {
            return x.toLowerCase();
          })
          .split(" ")
          .join("");
        this.sortTypes.push(sortType);
      });
    },
  },
  computed: {
    tableHeaders() {
      return ["Id", "First Name", "Last Name", "Email", "Phone"];
    },
  },
};
</script>
<style scoped>
table {
  text-align: left;
  border-collapse: collapse;
  width: 100%;
}

tr {
  display: flex;
  justify-content: space-between;
  padding: 3px 10px 3px 10px;
}

.tablePart {
  border: 1px solid rgba(110, 96, 96, 0.3);
}

img {
  max-width: 15px;
  height: 15px;
}

.up {
  transform: scaleY(-1);
}

th {
  user-select: none;
}
</style>
