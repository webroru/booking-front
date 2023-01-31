<script setup>
  import config from '@/config';
</script>

<template>
  <h1>{{ config.title }}</h1>
  <p>{{ config.address }}</p>
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
