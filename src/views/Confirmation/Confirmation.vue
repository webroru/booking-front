<script setup>
  import 'element-plus/theme-chalk/display.css';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useBookingStore } from '@/stores/booking';
  import { usePhotosStore } from '@/stores/photos';
  import NextButton from '@/components/Confirmation/NextButton.vue';

  const bookingStore = useBookingStore();
  const { bookings } = bookingStore;

  const photosStore = usePhotosStore();
  const { photosBlobs } = photosStore;

  const route = useRoute();
  const active = computed(() => {
    const stepIndex = step.findIndex(path => route.path.includes(path));
    return stepIndex === 6 ? stepIndex - 1 : stepIndex;
  });
  const isNextDisabled = computed(() => isNextDisabledCondition());
  
  const step = [
    'search',
    'instruction',
    'rules',
    'tax',
    'payment',
    'checkin-details',
    'booking-info',
  ];

  const isNextDisabledCondition = () => {
    const bookingHasNotBeenSelected = bookings.length === 0;
    const isBookingPaid = bookings.every(booking => ['paid', 'paid by cash'].includes(booking.paymentStatus));
    const bookingHasNotBeenPaid = active.value === 4 && !isBookingPaid;
    const bookingRuleHasNotBeenAccepted = active.value === 2 && !bookings.every(booking => booking.isRuleAccepted);
    const guests = bookings.reduce((total, booking) => total + booking.guests.length, 0);
    const guestsWereNotSpecified = active.value === 3 && guests === 0;
    const noPhotos = active.value === 3 && bookings.some(booking => Object.keys(photosBlobs[booking.orderId]).length === 0);

    return bookingHasNotBeenSelected || bookingHasNotBeenPaid || bookingRuleHasNotBeenAccepted || guestsWereNotSpecified || noPhotos;
  };
</script>

<template>
  <el-steps :active="active" finish-status="success" class="steps hidden-xs-only">
    <el-step :title="$t('confirmation.search')" />
    <el-step :title="$t('confirmation.information')" />
    <el-step :title="$t('confirmation.rules')" />
    <el-step :title="$t('confirmation.tax')" />
    <el-step :title="$t('confirmation.payment')" />
    <el-step :title="$t('confirmation.checkInDetails')" />
  </el-steps>

  <router-view></router-view>

  <div class="navigation">
    <next-button prev/>
    <next-button :disabled="isNextDisabled "/>
  </div>
</template>

<style scoped>
  .navigation {
      display: flex;
      justify-content: space-between;
    }

  .steps {
    margin: 0 0 40px;
  }
</style>
