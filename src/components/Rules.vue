<script setup>
  import { useInfoStore } from '@/stores/info';

  const infoStore = useInfoStore();
  const { info } = infoStore;
</script>

<template>
  <div v-html="info.rules"></div>
</template>
