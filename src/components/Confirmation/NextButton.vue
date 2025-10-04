<script setup>
  import { useBookingStore } from '@/stores/booking';
  import { useRoute } from 'vue-router';

  defineProps({
    disabled: Boolean,
  });
  const bookingStore = useBookingStore();
  const route = useRoute();
  const { booking, bookings } = bookingStore;

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
    const getDebt = () => Math.max(bookings.reduce((debt, booking) => (debt + booking.debt), 0), 0);
    if (bookings.every(booking => booking.checkIn) && stepIndex === 0) {
      return `/confirmation/${booking?.orderId}/booking-info`;
    }
    stepIndex++;
    if (step[stepIndex] === 'payment' && getDebt() === 0) {
      stepIndex++;
    }
    if (stepIndex < 0) {
      return '/';
    }
    return stepIndex === 0 ? '/confirmation/search' : `/confirmation/${booking?.orderId}/${step[stepIndex]}`;
  };
</script>

<template>
  <router-link v-if="!isLastStep()" :to="nextStep()" :class="{ disabled }">
    <el-button  :disabled="disabled"><b>{{ $t('common.next') }}</b></el-button>
  </router-link>
  <router-link v-if="isLastStep()" to="/">
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
