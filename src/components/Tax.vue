<script setup>
  import { ref, computed } from 'vue';
  import { ElNotification } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  import { useBookingStore } from '@/stores/booking';
  import { usePhotosStore } from '@/stores/photos';
  import MakePhoto from './Photos/MakePhoto.vue';
  import ShowPhotos from './Photos/ShowPhotos.vue';
  import UploadPhoto from './Photos/UploadPhoto.vue';

  const store = useBookingStore();
  const { booking, updateGuests } = store;
  const photosStore = usePhotosStore();
  const { photosBlobs } = photosStore;
  const { t } = useI18n();
  const showMakePhoto = ref(false);
  const isCameraEnabled = ref(false);
  const doesShowUpload = true;
  const loading = ref(false);

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

  const confirmedGuests = () => {
    let confirmedGuests = booking.adults + booking.children + booking.babies;
    if (booking.sucklings > 1) {
      confirmedGuests += booking.sucklings - 1;
    }
    return confirmedGuests;
  };

  const isExtraGuest = () => confirmedGuests() > booking.guestsAmount;
  const extraGuests = () => confirmedGuests() - booking.guestsAmount;
  const isGuestLimit = () => confirmedGuests() > booking.capacity + 2;
  const isLessDocs = () => Object.keys(photosBlobs).length < booking.adults + booking.children;
  const extraPayment = computed(() => (Math.min(booking.capacity, confirmedGuests()) - booking.guestsAmount) * bookedNights * booking.extraPerson);

  let isGuestLimitShow = false;
  let isExtraGuestShow = false;
  let isLessDocsShow = false;

  const update = async () => {
    loading.value = true;
    booking.overmax = isGuestLimit() ? confirmedGuests() : 0;
    booking.plusGuest = isExtraGuest();
    booking.lessDocs = isLessDocs();

    if (isGuestLimit() && !isGuestLimitShow) {
      isGuestLimitShow = true;
      setTimeout(() => {
        ElNotification({
          title: 'Warning',
          message: t('tax.guestLimit', { limit: booking.capacity }),
          type: 'warning',
          onClose: () => isGuestLimitShow = false,
        });

      }, 0);
    }
    if (isExtraGuest() && !isExtraGuestShow) {
      isExtraGuestShow = true;
      setTimeout(() => {
        ElNotification({
          title: 'Warning',
          message: t('tax.extraGuest'),
          type: 'warning',
          onClose: () => isExtraGuestShow = false,
        });

      }, 0);
    }
    if (isLessDocs() && !isLessDocsShow) {
      isLessDocsShow = true;
      setTimeout(() => {
        ElNotification({
          title: 'Info',
          message: t('tax.lessDocs'),
          type: 'info',
          onClose: () => isLessDocsShow = false,
        });
      }, 0);
    }

    await updateGuests(booking);
    loading.value = false;
  };
</script>

<template>
  <el-row :gutter="20" v-loading="loading">
    <el-col :xs="24" :md="16" class="input-fields">
      <el-row>
        <el-col :xs="24" :sm="16">
          <span class="label">{{ $t('tax.enterAdults') }}</span>
        </el-col>
        <el-col :xs="24" :sm="8">
          <el-input-number v-model="booking.adults" :min="0" :max="10" @change="update" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="16">
          <span class="label">{{ $t('tax.enterChildren') }}</span>
        </el-col>
        <el-col :xs="24" :sm="8">
          <el-input-number v-model="booking.children" :min="0" :max="10" @change="update" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="16">
          <span class="label">{{ $t('tax.enterBabies') }}</span>
        </el-col>
        <el-col :xs="24" :sm="8">
          <el-input-number v-model="booking.babies" :min="0" :max="10" @change="update" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="16">
          <span class="label">{{ $t('tax.enterSucklings') }}</span>
        </el-col>
        <el-col :xs="24" :sm="8">
          <el-input-number v-model="booking.sucklings" :min="0" :max="10" @change="update" />
        </el-col>
      </el-row>
      <div class="output">
        <ShowPhotos />
      </div>
    </el-col>
    <el-col :xs="24" :md="8">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>{{ $t('tax.cityTax') }}</span>
          </div>
        </template>
        <div class="text item">{{ $t('tax.taxAdult', { adult: TAX.adult }) }}</div>
        <div class="text item">{{ $t('tax.taxChildren', { children: TAX.children }) }}</div>
        <div class="text item">{{ $t('tax.taxBaby', { baby: TAX.baby }) }}</div>
        <div class="bottom">{{ $t('tax.total', { total: totalTax }) }}</div>
      </el-card>
      <p v-if="showExtraPay"><strong>{{ $t('tax.extraPay', { extraPayment }) }}</strong></p>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <p>{{ $t('tax.passportOrId') }}</p>
      <UploadPhoto v-if="doesShowUpload" />
      <el-button type="primary" @click="openMakePhoto">{{ $t('tax.makePhoto') }}</el-button>
    </el-col>
  </el-row>
  <el-row>
  </el-row>
  <el-dialog v-model="showMakePhoto" :title="$t('photos.makePhotoTitle')" width="80%"
    :before-close="closeMakePhoto">
    <MakePhoto :is-camera-enabled="isCameraEnabled" />
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="closeMakePhoto">{{ $t('common.done') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
  .input-fields {
    margin-bottom: 20px;
  }

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

  .label {
    display: inline-flex;
    font-size: var(--el-font-size-base);
    color: var(--el-text-color-regular);
    height: 32px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
  }

  .bottom {
    font-weight: bold;
  }

  .output {
    display: flex;
    flex-wrap: wrap;
  }
</style>
