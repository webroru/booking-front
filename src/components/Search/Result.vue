<script setup>
  import { computed } from 'vue';
  import { Select } from '@element-plus/icons-vue';
  import { useBookingStore } from '@/stores/booking';

  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    booking: Object,
  });

  const store = useBookingStore();
  const { booking: selectedBooking, setBooking } = store;
  const showIcon = computed(() => props.booking.orderId === selectedBooking.orderId ? 'Edit' : null);
</script>

<template>
  <el-link :underline="false" @click="setBooking(booking)">
    <el-icon class="el-icon--left" >
      <Select v-if="showIcon" />
    </el-icon>
    {{ booking.fullName }}, Booring Order № {{ booking.orderId }}
  </el-link>
  <el-divider />
</template>
