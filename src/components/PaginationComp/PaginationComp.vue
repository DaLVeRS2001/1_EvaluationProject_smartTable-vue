<template>
  <div class="container">
    <button :disabled="currentPage === 1" @click="firstPageHandle">
      First
    </button>
    <button :disabled="currentPage === 1" @click="onPrevPage">Prev</button>
    <button :disabled="!hasNextPage" @click="onNextPage">
      Next
    </button>
    <button :disabled="!hasNextPage" @click="lastPageHandle">
      Last
    </button>
  </div>
</template>
<script>
export default {
  emits: {
    getIndex: (val) => typeof val === "object",
  },
  props: {
    dataLength: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      currentPage: 1,
      pageElems: 50,
      totalElems: 1000,
    };
  },
  created() {
    this.$emit("getIndex", [this.startIndex, this.endIndex]);
  },
  methods: {
    firstPageHandle() {
      this.currentPage = 1;
    },
    onPrevPage() {
      this.currentPage -= 1;
    },
    onNextPage() {
      this.currentPage += 1;
    },
    lastPageHandle() {
      this.currentPage = this.pageCount;
    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalElems / this.pageElems);
    },
    startIndex() {
      return (this.currentPage - 1) * this.pageElems;
    },
    endIndex() {
      return this.currentPage * this.pageElems;
    },
    hasNextPage() {
      return this.dataLength.filtered > this.endIndex;
    },
  },
  watch: {
    currentPage() {
      this.$emit("getIndex", [this.startIndex, this.endIndex]);
    },
    dataLength(data) {
      const { filtered, sorted } = data;
      this.totalElems = filtered;
      if (this.currentPage > 1 && sorted === 0) {
        this.currentPage -= 1;
      }
    },
  },
};
</script>
<style scoped></style>
