<script setup>
  import { ref, reactive } from 'vue';
  import { ElNotification } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  import { useBookingStore } from '@/stores/booking';
  import { usePhotosStore } from '@/stores/photos';
  import ShowPhotos from '@/components/Photos/ShowPhotos.vue';
  import UploadPhoto from '@/components/Photos/UploadPhoto.vue';

  const store = useBookingStore();
  const { updateGuests } = store;
  const photosStore = usePhotosStore();
  const { photosBlobs } = photosStore;
  const { t } = useI18n();
  const doesShowUpload = true;
  const loading = ref(false);

  const TAX = {
    adult: 3.13,
    children: 1.57,
    baby: 0,
  };

  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    booking: Object,
  });

  const localBooking = reactive(props.booking);

  const bookedNights = (booking) => Math.ceil((Date.parse(booking.checkOutDate) - Date.parse(booking.checkInDate)) / 1000 / 60 / 60 / 24);
  const totalTax = (booking) => {
    const adults = booking.adults * TAX.adult;
    const children = booking.children * TAX.children;
    const babies = booking.babies * TAX.baby;
    return strip(bookedNights(booking) * (adults + children + babies));
  };
  const showExtraPay = booking => extraGuests(booking) > 0 && extraPayment(booking);
  const strip = (number) => parseFloat(number).toPrecision(4);

  const confirmedGuests = (booking) => {
    let confirmedGuests = booking.adults + booking.children + booking.babies;
    if (booking.sucklings > 1) {
      confirmedGuests += booking.sucklings - 1;
    }
    return confirmedGuests;
  };

  const isExtraGuest = (booking) => confirmedGuests(booking) > booking.guestsAmount;
  const extraGuests = (booking) => confirmedGuests(booking) - booking.guestsAmount;
  const isGuestLimit = (booking) => confirmedGuests(booking) > booking.capacity + 2;
  const isLessDocs = (booking) => Object.keys(photosBlobs[booking.orderId]).length < booking.adults + booking.children;
  const extraPayment = booking => (Math.min(booking.capacity, confirmedGuests(booking)) - booking.guestsAmount) * bookedNights(booking) * booking.extraPerson;

  let isGuestLimitShow = false;
  let isExtraGuestShow = false;
  let isLessDocsShow = false;

  const update = async (booking) => {
    loading.value = true;
    booking.overmax = isGuestLimit(booking) ? confirmedGuests(booking) : 0;
    booking.plusGuest = isExtraGuest(booking);
    booking.lessDocs = isLessDocs(booking);

    if (isGuestLimit(booking) && !isGuestLimitShow) {
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
    if (isExtraGuest(booking) && !isExtraGuestShow) {
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
    if (isLessDocs(booking) && !isLessDocsShow) {
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
  <el-row v-loading="loading">
    <el-col>
      <h2>{{ $t('app.bookingFor', { name: booking.firstName, orderId: booking.orderId, referer: booking.originalReferer }) }}</h2>
      <el-row :gutter="20">
        <el-col :xs="24" :md="16" class="input-fields">
          <el-row>
            <el-col :xs="24" :sm="16">
              <span class="label">{{ $t('tax.enterAdults') }}</span>
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-input-number v-model="localBooking.adults" :min="0" :max="10" @change="update(localBooking)" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="16">
              <span class="label">{{ $t('tax.enterChildren') }}</span>
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-input-number v-model="localBooking.children" :min="0" :max="10" @change="update(localBooking)" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="16">
              <span class="label">{{ $t('tax.enterBabies') }}</span>
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-input-number v-model="localBooking.babies" :min="0" :max="10" @change="update(localBooking)" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="16">
              <span class="label">{{ $t('tax.enterSucklings') }}</span>
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-input-number v-model="localBooking.sucklings" :min="0" :max="10" @change="update(localBooking)" />
            </el-col>
          </el-row>
          <div class="output">
            <show-photos :order-id="booking.orderId" />
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
            <div class="bottom">{{ $t('tax.total', { total: totalTax(booking) }) }}</div>
          </el-card>
          <p v-if="showExtraPay(booking)"><strong>{{ $t('tax.extraPay', { extraPayment: extraPayment(booking) }) }}</strong></p>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <p>{{ $t('tax.passportOrId') }}</p>
          <upload-photo :order-id="booking.orderId" v-if="doesShowUpload" />
          <el-button type="primary" @click="$emit('openMakePhoto', booking.orderId)">{{ $t('tax.makePhoto') }}</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
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
