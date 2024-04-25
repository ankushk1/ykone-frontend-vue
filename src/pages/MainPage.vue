<template>
  <div class="main-page-container">
    <Header></Header>
    <div class="ml-2">
      <input
        class="w-[350px] mb-3 relative m-0 block flex-auto rounded border border-solid border-neutral-200 bg-white px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none placeholder:text-neutral-800"
        placeholder="Search"
        type="search"
        v-model="searchInput"
      />
    </div>

    <div
      v-if="loading"
      class="flex flex-col justify-center items-center h-[90vh]"
    >
      <div class="loader"></div>
    </div>
    <div v-else>
      <p v-if="!clientData.length" class="text-4xl ml-3 text-bold text-center">
        No Clients Found
      </p>
      <div
        v-else
        class="flex justify-center 2xl:justify-start flex-wrap gap-x-12 gap-y-6"
      >
        <div v-for="(elem, idx) in paginatedData" :key="`client_${idx}`">
          <InfoCard :data="elem" />
        </div>
      </div>
      <div class="mt-4 flex justify-center">
        <Pagination
          v-model="page"
          :records="clientData.length"
          :per-page="6"
          :options="options"
          @paginate="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import InfoCard from "../components/InfoCard.vue";
import apiCall from "../services/apiService";
import Pagination from "v-pagination-3";

export default {
  components: {
    Header,
    InfoCard,
    Pagination
  },

  data() {
    return {
      clientData: [],
      clientDataCopy: [],
      loading: true,
      page: 1,
      searchInput: "",
      options: {
        hideCount: true
      }
    };
  },
  mounted() {
    this.fetchClients();
  },
  computed: {
    paginatedData() {
      return this.clientData.slice(
        (this.page - 1) * 6,
        (this.page - 1) * 6 + 6
      );
    }
  },
  methods: {
    async fetchClients() {
      const apiResponse = await apiCall("http://localhost:8000/clients");
      this.clientData = apiResponse.data?.clients || [];
      this.clientDataCopy = [...this.clientData];
      this.loading = false;
    },
    changePage(page) {
      console.log(page);
      this.page = page;
    }
  },
  watch: {
    searchInput(newValue) {
      if (!newValue) {
        this.clientData = [...this.clientDataCopy];
      } else {
        const filteredData = this.clientDataCopy.filter(
          (elem) =>
            elem.name.toLowerCase().includes(newValue.toLowerCase()) ||
            elem.email.toLowerCase().includes(newValue.toLowerCase()) ||
            elem.cin.includes(newValue)
        );
        this.clientData = filteredData;
      }
    }
  }
};
</script>
