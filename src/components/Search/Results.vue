<script setup>
  import { computed } from 'vue';
  import { useBookingStore } from '@/stores/booking';

  defineProps({
    bookings: Object,
  });

  const emit = defineEmits(['selectBooking']);
  const store = useBookingStore();
  const { bookings } = store;

  const tableData = computed(() => {
    return bookings.map(booking => ({
      ...booking,
      fullName: `${booking.firstName} ${booking.lastName}`,
    }));
  });

  const handleCurrentChange = (val) => {
    emit('selectBooking', val.orderId);
  };
</script>

<template>
  <el-table
      :data="tableData"
      :cell-style="{ cursor: 'pointer' }"
      highlight-current-row
      @current-change="handleCurrentChange"
  >
    <el-table-column prop="fullName" :label="$t('search.fullName')" />
    <el-table-column prop="propertyName" :label="$t('search.property')" />
    <el-table-column prop="checkIn" :label="$t('search.checkIn')" />
    <el-table-column prop="checkOut" :label="$t('search.checkOut')" />
    <el-table-column prop="originalReferer" :label="$t('search.originalReferer')" />
  </el-table>
</template>
