<script setup>
  import { ref, onMounted } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';
  import { usePhotosStore } from '@/stores/photos';
  import Confirmation from './components/Confirmation/Confirmation.vue';
  import LanguageSelect from './components/LanguageSelect.vue';
  import HotelAddress from './components/HotelAddress.vue';
  import State from './State';
  import SelectBooking from './components/Booking/SelectBooking.vue';
  import Checkout from './components/Checkout.vue';
  import Registration from "./components/Registration.vue";

  const bookingStore = useBookingStore();
  const { booking, resetBooking } = bookingStore;
  const infoStore = useInfoStore();
  const { getInfo } = infoStore;
  const photosStore = usePhotosStore();
  const { clearPhotosStore } = photosStore;
  const currentState = ref(State.Initial);
  const date = ref('');
  const inActiveTime = 60000;
  const lastActivity = new Date();

  onMounted(() => {
    setInterval(() => date.value = new Date().toLocaleTimeString(), 100);
    setInterval(resetInactivePage, inActiveTime);
    getInfo('en');
  });

  const changeState = (state) => {
    currentState.value = state;
  };

  const backToInitial = () => {
    currentState.value = State.Initial;
    resetBooking();
    clearPhotosStore();
  };

  document.addEventListener('click', () => {
    lastActivity.setTime(new Date());
  });

  const resetInactivePage = () => {
    const currentTime = new Date();
    if (currentTime.getTime() - lastActivity.getTime() >= inActiveTime) {
      backToInitial();
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
            <SelectBooking v-if="currentState === State.Initial" @change-state="changeState" />
            <Confirmation v-if="currentState === State.Confirmation" @back-to-initial="backToInitial" />
            <Checkout v-if="currentState === State.Checkout" @back-to-initial="backToInitial" />
            <Registration v-if="currentState === State.Registration" @back-to-initial="backToInitial" />
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
