<template>
  <div
    v-if="loading"
    class="flex flex-col justify-center items-center h-[90vh]"
  >
    <div class="loader"></div>
  </div>
  <div
    v-else-if="clientData"
    class="flex flex-col justify-center items-center h-[100vh]"
  >
    <div
      class="flex justify-between items-center fs-1 mb-5 font-bold text-gray-700 w-[50vw]"
    >
      <div class="cursor-pointer" @click="() => $router.back()">
        <img
          src="/icons/arrow-left.svg"
          alt="back-icon"
          class="shadow-lg bg-white rounded-full p-1.5"
        />
      </div>
      <p>Client Details</p>
      <p></p>
    </div>
    <div class="w-[50%] flex flex-col bg-white rounded-2xl shadow p-4">
      <div
        class="row items-center text-md"
        v-for="(value, key) in clientDetails"
        :key="key"
      >
        <div class="col font-semibold py-2">{{ key }}</div>
        <div class="col">{{ value }}</div>
        <hr />
      </div>
    </div>
    <div class="buttons mt-5">
      <button
        class="btn btn-secondary mr-3 text-white"
        @click="
          () =>
            this.$router.push({
              name: 'createClient',
              query: { clientObj: JSON.stringify(clientData) }
            })
        "
      >
        Update
      </button>
      <button class="btn btn-danger text-white" @click="showModal">
        Delete
      </button>
    </div>
  </div>
  <CModal
    alignment="center"
    :visible="modalShow"
    @close="hideModal"
    aria-labelledby="VerticallyCenteredExample"
  >
    <div className="flex flex-col items-center justify-around p-4 h-[30vh]">
      <div className="text-2xl text-gray-700 text-center">
        Are you sure you want to delete
        <p>{{ clientData && clientData.name }}?</p>
      </div>
      <div className="buttons">
        <div className="btn btn-danger mr-5 text-white" @click="handleDelete">
          Delete
        </div>
        <div className="btn btn-dark" @click="hideModal">Cancel</div>
      </div>
    </div>
  </CModal>
</template>

<script>
import apiCall from "../services/apiService";
import { CModal } from "@coreui/vue";
export default {
  components: {
    CModal
  },
  data() {
    return {
      clientData: null,
      loading: true,
      modalShow: false
    };
  },
  mounted() {
    this.fetchClient();
  },
  computed: {
    clientDetails() {
      return {
        "Client Name": this.clientData.name,
        CIN: this.clientData.cin,
        Email: this.clientData.email,
        Address: this.clientData.address?.address,
        "Pin Code": this.clientData.address?.pinCode,
        State: this.clientData.address?.state,
        Country: this.clientData.address?.country
      };
    }
  },
  methods: {
    async fetchClient() {
      const apiResponse = await apiCall(
        `http://localhost:8000/clients/${this.$route.params.id}`
      );
      this.clientData = apiResponse.data?.client || null;
      this.loading = false;
    },
    async handleDelete() {
      const apiResponse = await apiCall(
        `http://localhost:8000/clients/${this.$route.params.id}`,
        "DELETE"
      );
      if (apiResponse.status === 200) {
        this.$router.push("/");
      } else {
        console.log("Error Deleting client");
      }
    },
    showModal() {
      this.modalShow = true;
    },
    hideModal() {
      this.modalShow = false;
    }
  }
};
</script>
