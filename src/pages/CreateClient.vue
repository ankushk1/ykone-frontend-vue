<template>
  <div class="flex flex-col justify-center items-center h-[100vh]">
    <div
      class="flex justify-between items-center fs-1 mb-5 font-bold text-gray-700 w-[60vw]"
    >
      <div class="cursor-pointer" @click="() => $router.back()">
        <img
          src="/icons/arrow-left.svg"
          alt="back-icon"
          class="shadow-lg bg-white rounded-full p-1.5"
        />
      </div>
      <div class="fs-1 font-bold text-gray-700">
        {{ dataFromRoute ? "Update Client" : "Create New Client" }}
      </div>
      <p></p>
    </div>
    <div class="w-[60vw] flex flex-col bg-white rounded-2xl shadow p-4">
      <form class="px-3" @submit.prevent="handleSubmit">
        <input
          name="companyName"
          class="form-control mb-3"
          placeholder="Client Name"
          v-model="clientData.name"
          required
        />
        <input
          name="email"
          class="form-control mb-3"
          placeholder="Client Email"
          type="email"
          v-model="clientData.email"
          required
        />
        <textarea
          class="form-control mb-3"
          placeholder="Address"
          v-model="clientData.address.address"
          required
        ></textarea>
        <div class="row mb-3">
          <div class="col-7">
            <input
              name="cin"
              class="form-control"
              placeholder="CIN"
              v-model="clientData.cin"
              required
            />
          </div>
          <div class="col-5">
            <input
              name="pinCode"
              class="form-control"
              placeholder="Pin Code"
              v-model="clientData.address.pinCode"
              required
            />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <input
              name="state"
              class="form-control"
              placeholder="State"
              v-model="clientData.address.state"
              required
            />
          </div>
          <div class="col">
            <input
              name="country"
              class="form-control"
              placeholder="Country"
              v-model="clientData.address.country"
              required
            />
          </div>
        </div>
        <div class="flex justify-center mt-4">
          <input
            type="submit"
            :value="dataFromRoute ? 'Update Client' : 'Create Client'"
            :class="`btn ${dataFromRoute ? 'btn-secondary' : 'btn-success'}`"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import apiCall from "../services/apiService";

export default {
  data() {
    return {
      clientData: {
        name: "",
        cin: "",
        email: "",
        address: {
          state: "",
          pinCode: "",
          address: "",
          country: ""
        }
      },
      dataFromRoute: false
    };
  },
  mounted() {
    this.dataFromRoute = this.$route.query?.clientObj ? true : false;
    if (this.dataFromRoute) {
      this.clientData = JSON.parse(this.$route.query?.clientObj);
      this.$router.replace({ query:{} });
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.dataFromRoute) {
          const apiResponse = await apiCall(
            `http://localhost:8000/clients/${this.clientData?._id}`,
            "POST",
            { contentType: "application/json" },
            this.clientData
          );
          if (apiResponse.status === 200) {
            this.$router.push("/");
          } else {
            console.log("Error Updating user");
          }
        } else {
          const apiResponse = await apiCall(
            "http://localhost:8000/clients",
            "POST",
            { contentType: "application/json" },
            this.clientData
          );
          if (apiResponse.status === 200) {
            this.$router.push("/");
          } else {
            console.log("Error Creating user");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
