<script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import config from '@/config';
  import { useInfoStore } from '@/stores/info';
  import { useBookingStore } from '@/stores/booking';
  import { usePhotosStore } from '@/stores/photos';
  import LanguageSelect from '@/components/LanguageSelect.vue';
  import HotelAddress from '@/components/HotelAddress.vue';
  import EarlyCheckInWarning from '@/components/EarlyCheckInWarning.vue';

  const photosStore = usePhotosStore();
  const { clearPhotosStore, syncPhotos } = photosStore;
  const bookingStore = useBookingStore();
  const { booking, bookings, resetBooking, searchBooking, setBookings } = bookingStore;
  const infoStore = useInfoStore();
  const { getInfo } = infoStore;
  const date = ref('');
  const inActiveTime = 60000;
  const lastActivity = new Date();
  const router = useRouter();
  const route = useRoute();
  const loading = ref(false);
  const orderId = computed(() => parseInt(route.params.orderId, 10));
  const path = computed(() => route.path);

  onMounted(() => {
    setInterval(() => date.value = new Date().toLocaleTimeString(), 100);
    setInterval(resetInactivePage, inActiveTime);
    fetchBookingByUrlParam(orderId.value);
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

  document.addEventListener('click', () => {
    lastActivity.setTime(new Date());
  });

  const resetInactivePage = () => {
    const currentTime = new Date();
    if (currentTime.getTime() - lastActivity.getTime() >= inActiveTime && config.env === 'prod') {
      router.push('/');
    }
  };

  const fetchBookingByUrlParam = async (orderId) => {
    if (orderId && !bookings.some(booking => booking.orderId === orderId)) {
      loading.value = true;
      const bookings = await searchBooking(orderId);
      if (!bookings.length) {
        await router.push('/');
        loading.value = false;
        return;
      }

      setBookings(bookings);
      syncPhotos();
      loading.value = false;
    }
  };
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-row justify="center" align="middle">
          <el-col style="text-align: center">
            <span class="date">{{ date }}</span>
            <LanguageSelect/>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="8" :md="6">
            <el-card class="card">
              {{
                $t('app.bookingFor', {
                  name: booking.firstName,
                  orderId: booking.orderId,
                  referer: booking.originalReferer
                })
              }}
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12">
            <HotelAddress/>
          </el-col>
        </el-row>
        <el-row justify="center" v-loading="loading">
          <el-col :xs="24" :sm="18">
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
  <EarlyCheckInWarning />
</template>

<style>
  .el-row {
    margin-bottom: 20px;
  }

  .el-row:last-child {
    margin-bottom: 0;
  }

  .card {
    margin-bottom: 10px;
  }

  .date {
    margin-right: 15px;
  }
</style>
