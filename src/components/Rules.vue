<script setup>
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';

  const bookingStore = useBookingStore();
  const { booking, acceptRule } = bookingStore;
  const infoStore = useInfoStore();
  const { info } = infoStore;
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    showCheckbox: {
      type: Boolean,
      default: true,
    },
  });
</script>

<template>
  <h1>{{ $t('rules.header') }}</h1>
  <div v-html="info.rules"></div>
  <div>
    <el-checkbox
      v-if="showCheckbox === true"
      v-model="booking.isRuleAccepted"
      @change="acceptRule(booking.orderId, booking.isRuleAccepted)"
      :label="$t('rules.agree')"
      size="large" />
  </div>
</template>
