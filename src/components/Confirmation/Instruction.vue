<script setup>
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';

  const bookingStore = useBookingStore();
  const { booking } = bookingStore;
  const infoStore = useInfoStore();
  const { info } = infoStore;
</script>

<template>
  <h2>
    {{ $t('instruction.register') }}
    <span v-if="booking.debt">{{ $t('instruction.pay') }}</span>
  </h2>

  <div v-html="info.instruction"></div>
</template>
