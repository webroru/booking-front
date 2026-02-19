<script setup>
  import { watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useBookingStore } from '@/stores/booking';
  import { useNavigationStore } from '@/stores/navigation';
  import Rules from '@/components/Rules.vue';

  const bookingStore = useBookingStore();
  const { booking, updateBooking } = bookingStore;
  const navigation = useNavigationStore();
  const { button } = navigation;
  const { t } = useI18n();

  const acceptRule = async () => {
    await updateBooking(booking);
  };

  watch(
    booking,
    (booking) => {
      if (!booking.orderId) {
        return;
      }

      button.label = t('common.next');
      button.variant = 'primary';
      button.disabled = !booking.isRuleAccepted;
      button.to = `/confirmation/${booking.orderId}/documents`;
      button.confirmation = null;
    },
    { immediate: true }
  )
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
