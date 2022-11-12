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
    <el-descriptions :title="booking.fullName" @click="setBooking(booking)" border :column="3" class="item">
      <el-descriptions-item>
        <template #label>
          <el-icon class="el-icon--left">
            <Select v-if="showIcon" />
          </el-icon>
          Property
        </template>
        {{ booking.propertyName }}
      </el-descriptions-item>
      <el-descriptions-item label="Room">{{ booking.room }}</el-descriptions-item>
      <el-descriptions-item label="Check-in">{{ booking.checkInDate }}</el-descriptions-item>
      <el-descriptions-item label="Check-out">{{ booking.checkOutDate }}</el-descriptions-item>
      <el-descriptions-item label="Original Referrer">{{ booking.originalReferer }}</el-descriptions-item>
    </el-descriptions>
</template>

<style scoped>
  .item {
    cursor: pointer;
    margin: 0 0 20px;
  }
</style>
