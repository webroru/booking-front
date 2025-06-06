<script setup>
  import {computed, onMounted, ref} from 'vue';
  import { Select } from '@element-plus/icons-vue';
  import { useBookingStore } from '@/stores/booking';

  const props = defineProps({
    booking: Object,
  });

  const store = useBookingStore();
  const { bookings } = store;
  const isMobile = ref(false);
  const showIcon = computed(() => bookings.find(booking => booking.orderId === props.booking.orderId));
  const columns = computed(() => (isMobile.value ? 1 : 4));

  onMounted(() => {
    isMobile.value = window.innerWidth < 768;
  });
</script>

<template>
  <el-descriptions :title="`${booking.firstName} ${booking.lastName}`" @click="$emit('selectBooking', booking.orderId)" border :column="columns" class="item">
    <el-descriptions-item>
      <template #label>
        <el-icon class="el-icon--left">
          <Select v-if="showIcon" />
        </el-icon>
        Property
      </template>
      {{ booking.propertyName }}
    </el-descriptions-item>
    <el-descriptions-item :label="$t('search.checkIn')">{{ booking.checkInDate }}</el-descriptions-item>
    <el-descriptions-item :label="$t('search.checkOut')">{{ booking.checkOutDate }}</el-descriptions-item>
    <el-descriptions-item :label="$t('search.originalReferer')">{{ booking.originalReferer }}</el-descriptions-item>
  </el-descriptions>
</template>

<style scoped>
  .item {
    cursor: pointer;
    margin: 0 0 20px;
  }
</style>
