<script setup>
  import { ref } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import Rules from '@/components/Rules.vue';

  const bookingStore = useBookingStore();
  const { bookings, updateBooking } = bookingStore;
  const isRuleAccepted = ref(false);

  const acceptRule = (isRuleAccepted) => {
    bookings.forEach(async booking => {
      booking.isRuleAccepted = isRuleAccepted;
      await updateBooking(booking);
    });
  };
  isRuleAccepted.value = bookings.every(booking => booking.isRuleAccepted);
</script>

<template>
  <h1>{{ $t('rules.header') }}</h1>
  <Rules />
  <div>
    <el-checkbox
      v-model="isRuleAccepted"
      @change="acceptRule(isRuleAccepted)"
      :label="$t('rules.agree')"
      size="large" />
  </div>
</template>
