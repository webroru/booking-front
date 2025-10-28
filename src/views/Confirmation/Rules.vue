<script setup>
  import { useBookingStore } from '@/stores/booking';
  import Rules from '@/components/Rules.vue';

  const bookingStore = useBookingStore();
  const { booking, updateBooking } = bookingStore;

  const acceptRule = async () => {
    await updateBooking(booking);
  };
</script>

<template>
  <h1>{{ $t('rules.header') }}</h1>
  <Rules />
  <div>
    <el-checkbox
      v-model="booking.isRuleAccepted"
      @change="acceptRule()"
      :label="$t('rules.agree')"
      size="large" />
  </div>
</template>
