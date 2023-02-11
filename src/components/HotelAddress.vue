<script setup>
  import { useInfoStore } from '@/stores/info';

  const infoStore = useInfoStore();
  const { info } = infoStore;
</script>

<template>
  <h1>{{ info.hotelName }}</h1>
  <p>{{ info.address }}</p>
</template>

<style scoped>
  h1 {
    text-align: center;
  }

  p {
    text-align: center;
  }
</style>
