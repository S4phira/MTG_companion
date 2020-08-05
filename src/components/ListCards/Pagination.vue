<template>
  <div class="page-box">
    <sliding-pagination :current="currentPage" :total="totalPages" @page-change="setCurrentPage"></sliding-pagination>
  </div>
</template>
<script>
import SlidingPagination from "vue-sliding-pagination";

export default {
  components: {
    SlidingPagination,
  },
  data() {
    return {
      pageNumbers: [],
      currentPage: 1,
      cardList: [],
    };
  },
  props: {
    cards: Array,
    totalPages: Number,
  },
  created() {
    this.getPageNumbers();
  },
  methods: {
    getPageNumbers() {
      for (let i = 1; i <= this.totalPages; i++) {
        this.pageNumbers.push(i);
      }
    },
    setCurrentPage(index) {
      this.currentPage = index;
      this.$emit("setCurrentPage", this.currentPage);
    },
  },
};
</script>
<style lang="scss" >
$sliding-pagination-background-primary: #153d42 !default;
$sliding-pagination-background-secondary: #0a1e20 !default;
$sliding-pagination-foreground-primary: #fff !default;
$sliding-pagination-foreground-secondary: #e9e9e9 !default;

$sliding-pagination-transition-duration: 300ms !default;
.page-box {
  position: absolute;
  bottom: 30px;
}
.c-sliding-pagination {
  pointer-events: all;
}

.c-sliding-pagination__list {
  display: inline;
  margin: 0;
  padding: 0;
}

.c-sliding-pagination__list-element {
  display: inline-block;

  background: $sliding-pagination-background-primary;
  color: $sliding-pagination-foreground-primary;

  padding: 0.6em;
  border-radius: 0.2em;
  margin: 0;
  margin-right: 0.2em;
  margin-bottom: 1em;

  transition-duration: $sliding-pagination-transition-duration;
  transition-property: background, color;

  &:hover {
    transition-duration: $sliding-pagination-transition-duration;
    transition-property: background, color;

    color: $sliding-pagination-foreground-secondary;
    background: $sliding-pagination-background-secondary;
  }

  &:last-of-type {
    margin-right: 0;
  }

  &--active {
    background: $sliding-pagination-background-secondary;
    color: $sliding-pagination-foreground-secondary;
  }

  &--active:hover {
    color: $sliding-pagination-foreground-primary;
    background: $sliding-pagination-background-primary;
    cursor: default;
  }

  &--disabled {
    background: none;
    color: inherit;
    cursor: not-allowed;
  }
}

.c-sliding-pagination__page {
  color: inherit;
  padding: 0;
  margin: 0;
  text-decoration: none;

  &[disabled] {
    pointer-events: none;
    cursor: not-allowed;
  }
}
</style>