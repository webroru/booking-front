<script setup>
  import { ref } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import MakePhoto from '@/components/Photos/MakePhoto.vue';
  import TaxItem from '@/components/Tax/TaxItem.vue';

  const store = useBookingStore();
  const { bookings } = store;
  const showMakePhoto = ref(false);
  const isCameraEnabled = ref(false);
  const makePhotoOrderId = ref();

  const openMakePhoto = (orderId) => {
    isCameraEnabled.value = true;
    showMakePhoto.value = true;
    makePhotoOrderId.value = orderId;
  };

  const closeMakePhoto = () => {
    isCameraEnabled.value = false;
    showMakePhoto.value = false;
  };
</script>

<template>
  <TaxItem v-for="booking in bookings" :key="booking.orderId" :booking="booking" @open-make-photo="openMakePhoto"/>
  <el-dialog v-model="showMakePhoto" :title="$t('photos.makePhotoTitle')" width="80%"
    :before-close="closeMakePhoto">
    <make-photo :is-camera-enabled="isCameraEnabled" :order-id="makePhotoOrderId" />
  </el-dialog>
</template>
