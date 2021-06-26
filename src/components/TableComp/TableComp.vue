<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(header, idx) in tableHeaders"
          :key="header"
          @click="onSort(sortTypes[idx])"
        >
          {{ header }}
          <img
            :class="{ up: sortInRising && sortField === sortTypes[idx] }"
            src="@/assets/icons/arrow.png"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, idx) in sortedData"
        @click="onRowSelect(idx)"
        :key="item.id + item.phone"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.firstName }}</td>
        <td>{{ item.lastName }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
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
  position: relative;
  text-align: left;
  border-collapse: collapse;
  width: 100%;
}

tr {
  border-bottom: 1px solid rgba(110, 96, 96, 0.3);
}

img {
  max-width: 15px;
  position: absolute;
  top: 8px;
  height: 15px;
}

.up {
  transform: scaleY(-1);
}

th {
  padding: 4px 0 4px 0;
  user-select: none;
}
td {
  padding: 4px 0 4px 0;
}
</style>
