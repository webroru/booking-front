<script setup>
  import { useBookingStore } from '@/stores/booking';

  const bookingStore = useBookingStore();
  const { booking, updateBooking } = bookingStore;
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    showCheckbox: {
      type: Boolean,
      default: true,
    },
  });
</script>


<template>
  <h1>
    Living Rules
  </h1>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda incidunt praesentium itaque cupiditate aperiam,
    quia eligendi impedit dolor mollitia doloribus? Id blanditiis voluptas eius fugiat voluptatum provident minima minus
    sed!
  </p>
  <div>
    <el-checkbox
      v-if="showCheckbox === true"
      v-model="booking.isRuleAccepted"
      @change="updateBooking(booking)"
      label="I am agree"
      size="large" />
  </div>
</template>
