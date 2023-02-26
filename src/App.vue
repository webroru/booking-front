<script setup>
  import { ref, onMounted, watch, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';
  import { usePhotosStore } from '@/stores/photos';
  import LanguageSelect from './components/LanguageSelect.vue';
  import HotelAddress from './components/HotelAddress.vue';

  const bookingStore = useBookingStore();
  const { booking, resetBooking, searchBooking, setBooking } = bookingStore;
  const infoStore = useInfoStore();
  const { getInfo } = infoStore;
  const photosStore = usePhotosStore();
  const { clearPhotosStore } = photosStore;
  const date = ref('');
  const inActiveTime = 60000;
  const lastActivity = new Date();
  const router = useRouter();
  const route = useRoute();
  const orderId = computed(() => route.params.orderId);
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

  document.addEventListener('click', () => {
    lastActivity.setTime(new Date());
  });

  const resetInactivePage = () => {
    const currentTime = new Date();
    if (currentTime.getTime() - lastActivity.getTime() >= inActiveTime) {
      router.push('/');
    }
  };

  const fetchBookingByUrlParam = async (orderId) => {
    if (orderId && booking.orderId !== orderId) {
      const { data } = await searchBooking(orderId);
      if (data.length) {
        setBooking(data[0]);
      }
    }
  };
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-row>
          <el-col style="text-align: center">
            {{ date }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <LanguageSelect />
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="8" :md="6">
            <el-card v-if="Object.keys(booking).length">
            {{ $t('app.bookingFor', { name: booking.firstName, orderId: booking.orderId, referer: booking.originalReferer }) }}
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12">
            <HotelAddress />
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="18">
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
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

  .el-row {
    margin-bottom: 20px;
  }

  .el-row:last-child {
    margin-bottom: 0;
  }
</style>
