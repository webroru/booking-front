<script setup>
  import { ref } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';

  const bookingStore = useBookingStore();
  const { bookings, acceptRule } = bookingStore;
  const infoStore = useInfoStore();
  const { info } = infoStore;
  const isRuleAccepted = ref(false);

  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    showCheckbox: {
      type: Boolean,
      default: true,
    },
  });
  isRuleAccepted.value = bookings.every(booking => booking.isRuleAccepted);
</script>

<template>
  <h1>{{ $t('rules.header') }}</h1>
  <div v-html="info.rules"></div>
  <div>
    <el-checkbox
      v-if="showCheckbox === true"
      v-model="isRuleAccepted"
      @change="acceptRule(isRuleAccepted)"
      :label="$t('rules.agree')"
      size="large" />
  </div>
</template>
