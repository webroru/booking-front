<script setup>
  import { ref } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import Documents from '@/components/Documents/Documents.vue';
  import Guide from '@/components/Documents/Guide.vue';
  import Guest from '@/components/Documents/Guest.vue';

  const store = useBookingStore();
  const { bookings } = store;

  const localGuest = ref({});

  const onNewGuest = (guest) => {
    localGuest.value = guest;
  };
</script>

<template>
  <el-row :gutter="20">
    <el-col :xs="24" :md="16">
      <guest :guest="localGuest" />
      <guide />
    </el-col>
    <el-col :xs="24" :md="8">
      <documents v-for="booking in bookings" :key="booking.orderId" :booking="booking" @newGuest="onNewGuest" />
    </el-col>
  </el-row>
</template>
