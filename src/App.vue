<script setup>
  import { ref, onMounted, watch, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';
  import { usePhotosStore } from '@/stores/photos';
  import config from '@/config';

  const bookingStore = useBookingStore();
  const {bookings, resetBooking, searchBooking, setBookings} = bookingStore;
  const infoStore = useInfoStore();
  const { getInfo } = infoStore;
  const photosStore = usePhotosStore();
  const { clearPhotosStore, syncPhotos } = photosStore;
  const date = ref('');
  const inActiveTime = 60000;
  const lastActivity = new Date();
  const router = useRouter();
  const route = useRoute();
  const orderId = computed(() => Number(route.params.orderId));
  const path = computed(() => route.path);

  onMounted(() => {
    setInterval(() => date.value = new Date().toLocaleTimeString(), 100);
    setInterval(resetInactivePage, inActiveTime);
    getInfo('en');
  });

  watch(
    [orderId, path],
    ([orderId, path]) => {
      fetchBookingByUrlParam(orderId);
      if (path === '/') {
        resetBooking();
        clearPhotosStore();
      }
    }
  );

  const resetInactivePage = () => {
    const currentTime = new Date();
    if (currentTime.getTime() - lastActivity.getTime() >= inActiveTime && config.env === 'prod') {
      router.push('/');
    }
  };

  const fetchBookingByUrlParam = async (orderId) => {
    if (orderId && !bookings.some(booking => booking.orderId === orderId)) {
      const {data} = await searchBooking(orderId);
      if (data.length) {
        setBookings(data);
        syncPhotos();
      }
    }
  };
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: 'Roboto Condensed', sans-serif;
  }
</style>
