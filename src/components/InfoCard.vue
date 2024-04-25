<template>
  <div>
    <div
      class="w-[465px] h-[320px] flex flex-col justify-between bg-white rounded-2xl shadow"
    >
      <div class="px-5 py-8 sm:p-10 sm:pb-6">
        <div class="flex flex-col">
          <div>
            <h2 class="text-2xl tracking-tighter text-gray-800">
              {{ data.name }}
            </h2>
            <p class="flex items-start gap-2 text-md text-gray-700">
              <img
                src="/icons/mail.svg"
                alt="home"
                class="w-4 aspect-square mt-1"
              />
              {{ data.email }}
            </p>
          </div>
          <div>
            <p class="flex items-start text-sm text-gray-700 gap-2">
              <img
                src="/icons/home.svg"
                alt="home"
                class="w-4 aspect-square mt-0.5"
              />
              {{ data.address?.address }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-center px-6 pb-8">
        <div
          @click="handleRedirect"
          class="flex items-center justify-center w-60 px-6 py-2.5 text-center text-white duration-200 bg-blue-600 border-2 rounded-full text-sm cursor-pointer"
        >
          View Details
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    data: Object
  },
  methods: {
    handleRedirect() {
      this.$router.push(`/details/${this.data?._id}`);
    }
  }
};
</script>

