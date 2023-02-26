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
    'instruction',
    'rules',
    'tax',
    'payment',
    'checkin-details',
    'booking-info',
  ];

  const currentStep = () => step.findIndex(path => route.path.includes(path));
  const isLastStep = () => currentStep() >= 5;

  const nextStep = () => {
    let stepIndex = currentStep();
    if (!props.prev && booking.checkIn && stepIndex === 0) {
      return `/confirmation/${booking.orderId}/booking-info`;
    }
    props.prev ? stepIndex-- : stepIndex++;
    if (step[stepIndex] === 'payment' && booking.debt <= 0) {
      props.prev ? stepIndex-- : stepIndex++;
    }
    if (stepIndex < 0) {
      return '/';
    }
    return stepIndex === 0 ? '/confirmation/search' : `/confirmation/${booking.orderId}/${step[stepIndex]}`;
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
