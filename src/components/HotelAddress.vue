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
    margin: 80px 0 20px;
    text-align: center;
  }

  p {
    text-align: center;
  }
</style>
