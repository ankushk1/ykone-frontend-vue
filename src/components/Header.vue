<template>
  <div
    className="flex justify-between items-center bg-white rounded-2xl shadow py-3 px-4 mt-2 mb-3"
  >
    <div className="text-3xl font-semibold">Client List</div>
    <button
      className="btn btn-primary btn"
      @click="() => $router.push('/create')"
    >
      Create New Client
    </button>
  </div>
</template>
