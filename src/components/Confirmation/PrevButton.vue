<script setup>
  import { useBookingStore } from '@/stores/booking';
  import { useRoute } from 'vue-router';

  const bookingStore = useBookingStore();
  const route = useRoute();
  const { bookings } = bookingStore;

  const step = [
    'search',
    'instruction',
    'rules',
    'documents',
    'payment',
    'booking-info',
  ];

  const currentStep = () => step.findIndex(path => route.path.includes(path));
  const isLastStep = () => currentStep() >= 5;

  const nextStep = () => {
    let stepIndex = currentStep();

    stepIndex--;
    if (step[stepIndex] === 'payment' && bookings.every(booking => booking.debt <= 0)) {
      stepIndex--;
    }
    if (stepIndex < 0) {
      return '/';
    }
    return stepIndex === 0 ? '/confirmation/search' : `/confirmation/${bookings[0]?.orderId}/${step[stepIndex]}`;
  };
</script>

<template>
  <router-link v-if="!isLastStep()" :to="nextStep()">
    <el-button>{{ $t('common.back') }}</el-button>
  </router-link>
</template>

<style scoped>
  a {
    margin-top: 12px;
    text-decoration: none;
  }
</style>
