<script setup>
  const props = defineProps({
    booking: Object,
  });

const emit = defineEmits(['selectBooking']);

</script>

<template>
  <el-descriptions :title="booking.fullName" @click="$emit('selectBooking', booking)" border :column="3" class="item">
    <el-descriptions-item label="Property">{{ booking.propertyName }}</el-descriptions-item>
    <el-descriptions-item label="Room">{{ booking.room }}</el-descriptions-item>
    <!-- <el-descriptions-item label="Full name">{{ booking.fullName }}</el-descriptions-item> -->
    <el-descriptions-item label="Check-in">{{ booking.checkInDate }}</el-descriptions-item>
    <el-descriptions-item label="Check-out">{{ booking.checkOutDate }}</el-descriptions-item>
    <el-descriptions-item label="Original Referrer">{{ booking.originalReferrer }}</el-descriptions-item>
  </el-descriptions>
  <el-divider />
</template>

<style scoped>

</style>
