<script setup>
  import { ref, computed } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import MakePhoto from './Photos/MakePhoto.vue';
  import ShowPhotos from './Photos/ShowPhotos.vue';
  import UploadPhoto from './Photos/UploadPhoto.vue';

  const store = useBookingStore();
  const { booking, updateGuests } = store;
  const showMakePhoto = ref(false);
  const formRef = ref();
  const isCameraEnabled = ref(false);
  const doesShowUpload = window.location !== 'https://test.smartlock.ovh/';

  const TAX = {
    adult: 3.13,
    children: 1.57,
    baby: 0,
  };

  const bookedNights = Math.ceil((Date.parse(booking.checkOutDate) - Date.parse(booking.checkInDate)) / 1000 / 60 / 60 / 24);
  const totalTax = computed(() => strip(bookedNights * (booking.adults * TAX.adult + booking.children * TAX.children + booking.babies * TAX.baby)));
  const showExtraPay = computed(() => extraGuests() > 0);
  const strip = (number) => parseFloat(number).toPrecision(4);

  const closeMakePhoto = () => {
    isCameraEnabled.value = false;
    showMakePhoto.value = false;
  };

  const openMakePhoto = () => {
    isCameraEnabled.value = true;
    showMakePhoto.value = true;
  };

  const extraGuests = () => {
    let confirmedGuests = booking.adults + booking.children + booking.babies;
    if (booking.sucklings > 1) {
      confirmedGuests += booking.sucklings - 1;
    }
    return confirmedGuests - booking.guestsAmount;
  };
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <el-form :model="booking" label-width="50%" ref="formRef">
        <el-form-item label="Enter amount of Addults (18 years and older)">
          <el-input-number v-model="booking.adults" :min="0" :max="10" @change="updateGuests(booking)" />
        </el-form-item>
        <el-form-item label="Enter amount of Children (from 7 years up to 18 years)">
          <el-input-number v-model="booking.children" :min="0" :max="10" @change="updateGuests(booking)" />
        </el-form-item>
        <el-form-item label="Enter amount of Children (from 4 years up to 7)">
          <el-input-number v-model="booking.babies" :min="0" :max="10" @change="updateGuests(booking)" />
        </el-form-item>
        <el-form-item label="Enter amount of Children (4 years and younger)">
          <el-input-number v-model="booking.sucklings" :min="0" :max="10" @change="updateGuests(booking)" />
        </el-form-item>
        <el-form-item>
          <div class="output">
            <ShowPhotos />
          </div>
        </el-form-item>
      </el-form>
      <p>Please provide Pasport or Card ID for every guest</p>
      <UploadPhoto v-if="doesShowUpload" />
      <el-button type="primary" @click="openMakePhoto">Сфотографировать документ</el-button>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>The city tax for a person per night</span>
          </div>
        </template>
        <div class="text item">18 years and older: {{ TAX.adult }} &euro;</div>
        <div class="text item">from 7 years to 18 years: {{ TAX.children }} &euro;</div>
        <div class="text item">6 years and younger: {{ TAX.baby }} &euro;</div>
        <div class="bottom">
          Total Tax: {{ totalTax }} &euro;
        </div>
      </el-card>
      <p v-if="showExtraPay"><strong>Дополнительная плата за дополнительного гостя: {{ bookedNights * booking.extraPerson}} &euro;</strong></p>
    </el-col>
  </el-row>
  <el-row>
  </el-row>
  <el-dialog v-model="showMakePhoto" title="Make photos of yours Pasports or Card IDs" width="80%"
    :before-close="closeMakePhoto">
    <MakePhoto :is-camera-enabled="isCameraEnabled" />
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="closeMakePhoto">Done</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .text {
    font-size: 14px;
  }
  
  .item {
    margin-bottom: 18px;
  }

  .bottom {
    font-weight: bold;
  }

  .output {
    display: flex;
    flex-wrap: wrap;
  }
</style>
