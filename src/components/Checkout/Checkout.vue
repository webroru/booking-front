<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useBookingStore } from '@/stores/booking';
  import NextButton from './NextButton.vue';

  const bookingStore = useBookingStore();
  const { booking } = bookingStore;
  const route = useRoute();
  const active = computed(() => step.findIndex(path => route.path.includes(path)));
  const isNextDisabled = computed(() => Object.keys(booking).length === 0);

  const step = [
    'search',
    'details',
  ];
</script>

<template>
  <el-steps :active="active" finish-status="success" class="steps">
    <el-step :title="$t('checkout.search')" />
    <el-step :title="$t('checkout.checkOutDetails')" />
  </el-steps>

  <router-view></router-view>

  <div class="navigation">
    <next-button prev />
    <next-button :disabled="isNextDisabled" />
  </div>
</template>

<style scoped>
  .navigation {
    display: flex;
    justify-content: space-between;
  }

  .steps {
    margin: 0 0 40px;
  }
</style>
