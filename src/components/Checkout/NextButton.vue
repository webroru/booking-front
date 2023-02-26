<script setup>
  import { useBookingStore } from '@/stores/booking';
  import { useRoute } from 'vue-router';

  const props = defineProps({
    prev: Boolean,
    disabled: Boolean,
  });
  const bookingStore = useBookingStore();
  const route = useRoute();
  const { booking } = bookingStore;

  const step = [
    'search',
    'details',
  ];

  const currentStep = () => step.findIndex(path => route.path.includes(path));
  const isLastStep = () => currentStep() >= 1;

  const nextStep = () => {
    let stepIndex = currentStep();
    props.prev ? stepIndex-- : stepIndex++;
    if (stepIndex < 0) {
      return '/';
    }
    return stepIndex === 0 ? '/checkout/search' : `/checkout/${booking.orderId}/${step[stepIndex]}`;
  };
</script>

<template>
  <router-link v-if="!isLastStep()" :to="nextStep()" :class="{ disabled }">
    <el-button  :disabled="disabled">{{ prev ? $t('common.back') : $t('common.next') }}</el-button>
  </router-link>
  <router-link v-if="isLastStep() && !prev" to="/">
    <el-button>{{ $t('common.exit') }}</el-button>
  </router-link>
</template>

<style scoped>
  a {
    margin-top: 12px;
    text-decoration: none;
  }

  .disabled {
    pointer-events: none;
  }
</style>
