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
  const showIcon = computed(() => props.booking.orderId === selectedBooking.orderId);
</script>

<template>
    <el-descriptions :title="`${booking.firstName} ${booking.lastName}`" @click="setBooking(booking)" border :column="3" class="item">
      <el-descriptions-item>
        <template #label>
          <el-icon class="el-icon--left">
            <Select v-if="showIcon" />
          </el-icon>
          Property
        </template>
        {{ booking.propertyName }}
      </el-descriptions-item>
      <el-descriptions-item :label="$t('search.room')">{{ booking.room }}</el-descriptions-item>
      <el-descriptions-item :label="$t('search.checkIn')">{{ booking.checkInDate }}</el-descriptions-item>
      <el-descriptions-item :label="$t('search.checkOut')">{{ booking.checkOutDate }}</el-descriptions-item>
      <el-descriptions-item :label="$t('search.originalReferrer')">{{ booking.originalReferer }}</el-descriptions-item>
    </el-descriptions>
</template>

<style scoped>
  .item {
    cursor: pointer;
    margin: 0 0 20px;
  }
</style>
