<template>
  <div class="container">
    <ModeSelector
      v-if="!isModeSelected"
      @getModeSelected="modeSelectedHandle"
    />
    <div v-else class="App">
      <Preloader v-if="isLoading" />
      <div v-else>
        <div class="filteredBlock">
          <button @click="setFilteredData">Search</button>
          <input v-model="searchValue" type="text" />
        </div>
        <AddRow @addRow="setNewRow"/>
        <TableComp
          v-if="width > 650"
          @getSortedDataLength="sortedDataLength"
          :sortInRising="sortInRising"
          :sortField="sortField"
          :sortedData="sortedData"
          :onRowSelect="onRowSelect"
          :onSort="onSort"
        />
        <MobileTable
          v-else
          @getSortedDataLength="sortedDataLength"
          :sortInRising="sortInRising"
          :sortField="sortField"
          :sortedData="sortedData"
          :onRowSelect="onRowSelect"
          :onSort="onSort"
        />
      </div>

      <PaginationComp
        @getIndex="setIndex"
        v-if="!isLoading && modeType === 'big'"
        :dataLength="{
          filtered: filteredData.length,
          sorted: sortedData.length,
        }"
      />

      <RowDetail v-if="selectedRow" :row="selectedRow" />
    </div>
  </div>
</template>

<script>
import { fetchData } from "@/api/requests";
import { toSort } from "@/lib/toSort";
import ModeSelector from "@/components/ModeSelector/ModeSelector";
import RowDetail from "@/components/RowDetail/RowDetail";
import Preloader from "@/components/#common/Preloader/Preloader";
import PaginationComp from "@/components/PaginationComp/PaginationComp";
import MobileTable from "@/components/TableComp/MobileTable";
import TableComp from "@/components/TableComp/TableComp";
import AddRow from "@/components/AddRow/AddRow";

export default {
  name: "App",
  components: {
    AddRow,
    TableComp,
    MobileTable,
    PaginationComp,
    Preloader,
    RowDetail,
    ModeSelector,
  },
  data() {
    return {
      width: 0,
      data: [],
      sortedDataLength: null,
      filteredData: [],
      searchValue: "",
      sortInRising: false,
      isLoading: false,
      sortField: null,
      selectedRow: null,
      isModeSelected: false,
      modeType: null,
      startIndex: null,
      endIndex: null,
    };
  },
  created() {
    this.updateWidth(window.innerWidth);
    window.addEventListener("resize", (e) =>
      this.updateWidth(e.target.innerWidth)
    );
  },
  computed: {
    sortedData() {
      return this.filteredData.slice(this.startIndex ?? 0, this.endIndex ?? 50);
    },
  },
  methods: {
    updateWidth(width) {
      this.width = width;
    },
    setIndex(index) {
      this.startIndex = index[0];
      this.endIndex = index[1];
    },
    setNewRow(row){
      this.filteredData.push(row)
    },
    setFilteredData() {
      this.filteredData = this.data
        .map((item) => {
          let copyItem = { ...item };
          delete copyItem.address;
          return copyItem;
        })
        .filter((item) =>
          Object.values(item).join(" ").includes(this.searchValue)
        );
    },

    onSort(type) {
      this.sortInRising = this.sortField !== type;
      this.sortField = type;
      this.filteredData = toSort(this.filteredData, type, this.sortInRising);
      !this.sortInRising && (this.sortField = null);
    },

    onRowSelect(idx) {
      this.selectedRow = this.sortedData[idx];
    },

    modeSelectedHandle(modeData) {
      this.isModeSelected = true;
      this.isLoading = true;
      this.modeType = modeData[1];

      fetchData(modeData[0]).then((data) => {
        this.data = toSort(data, "id", this.sortInRising);
        this.isLoading = false;
      });
    },
  },
  watch: {
    modeType() {
      this.modeType === "big" && !this.isLoading && this.setIndex();
    },
    data() {
      this.filteredData = this.data;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 700px) {
  .container {
  }
}
</style>
