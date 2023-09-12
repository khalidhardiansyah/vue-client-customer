import { computed, ref } from "vue";

export function usePagination({ pageSize }) {
  const listdata = ref([]);
  const currentPage = ref(1);

  const smallList = computed(() => {
    return listdata.value.slice((currentPage.value - 1)* pageSize, currentPage.value * pageSize)
  });

  const maxPage = computed(() => {
    return currentPage.value >= lastPageSize;
  });
  
  const lastPageSize = computed(() => {
    return Math.ceil(listdata.value.length / pageSize);
  });


  const nextPage = () => {
    currentPage.value++;
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  const setlistdata = (data) => {
    listdata.value = data;
    currentPage.value = 1; // Reset currentPage to the first page
  };

  return {
    listdata,
    currentPage,
    pageSize,
    smallList,
    maxPage,
    nextPage,
    prevPage,
    setlistdata,
    lastPageSize
  };
}
