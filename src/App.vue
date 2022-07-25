<script setup>
  import { ref, reactive } from 'vue';
  import BookingShortInfo from './components/BookingShortInfo.vue';
  import Confirmation from './components/Confirmation/Confirmation.vue';
  import LanguageSelect from './components/LanguageSelect.vue';
  import HotelAddress from './components/HotelAddress.vue';
  import State from './State';
  import SelectBooking from './components/Booking/SelectBooking.vue';

  const selectedBooking = reactive({});
  const currentState = ref(State.Initial)

  const changeState = (state) => {
    currentState.value = state;
  };

  const backToInitial = () => {
    currentState.value = State.Initial;
    Object.keys(selectedBooking).forEach(key => {
      delete selectedBooking[key]
    })
  };

  const selectBooking = (booking) => {
    Object.assign(selectedBooking, booking);
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
            <BookingShortInfo :booking="selectedBooking" v-if="Object.keys(selectedBooking).length" />
          </el-col>
          <el-col :span="12">
            <HotelAddress />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <SelectBooking v-if="currentState === State.Initial" @change-state="changeState" />
            <Confirmation v-if="currentState === State.Confirmation" @back-to-initial="backToInitial"
              @select-booking="selectBooking" />
          </el-col>
        </el-row>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style>
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
