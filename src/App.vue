<script setup>
  import { ref } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import { usePhotosStore } from '@/stores/photos';
  import Confirmation from './components/Confirmation/Confirmation.vue';
  import LanguageSelect from './components/LanguageSelect.vue';
  import HotelAddress from './components/HotelAddress.vue';
  import State from './State';
  import SelectBooking from './components/Booking/SelectBooking.vue';

  const bookingStore = useBookingStore();
  const { booking, resetBooking } = bookingStore;
  const photosStore = usePhotosStore();
  const { clearPhotosStore } = photosStore;
  const currentState = ref(State.Initial);

  const changeState = (state) => {
    currentState.value = state;
  };

  const backToInitial = () => {
    currentState.value = State.Initial;
    resetBooking();
    clearPhotosStore();
  };
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="24">
            <LanguageSelect />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-card v-if="Object.keys(booking).length">
              Брониование для {{ booking.fullName }}
            </el-card>
          </el-col>
          <el-col :span="12">
            <HotelAddress />
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="18">
            <UploadPhoto />
            <SelectBooking v-if="currentState === State.Initial" @change-state="changeState" />
            <Confirmation v-if="currentState === State.Confirmation" @back-to-initial="backToInitial" />
          </el-col>
        </el-row>
      </el-main>
      <el-footer>Footer</el-footer>
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
