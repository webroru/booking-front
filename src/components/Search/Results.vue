<script setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const props = defineProps({
    bookings: Array
  });

  const emit = defineEmits(['selectBooking']);

  const tableData = computed(() => {
    return props.bookings.map(booking => {
      let result = `${booking.firstName} ${booking.lastName}, ${booking.propertyName}`;
      if (booking.checkIn) {
        result += ', ' + t('search.checkIn');
      }

      if (booking.checkOut) {
        result += ', ' + t('search.checkOut');
      }

      result += ', ' + t('search.originalReferer') + ': ' + booking.originalReferer;

      return { result, orderId: booking.orderId };
    });
  });

  const handleCurrentChange = (val) => {
    if (val) {
      emit('selectBooking', val.orderId);
    }
  };
</script>

<template>
  <el-table
      :data="tableData"
      :cell-style="{ cursor: 'pointer' }"
      highlight-current-row
      @current-change="handleCurrentChange"
  >
    <el-table-column type="index" width="50" />
    <el-table-column prop="result" />
  </el-table>
</template>
