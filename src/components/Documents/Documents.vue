<script setup>
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { InfoFilled } from '@element-plus/icons-vue';
  import { useBookingStore } from '@/stores/booking';
  import SmartCapture from '@/components/SmartCapture/SmartCapture.vue';
  import GuestName from '@/components/Documents/GuestName.vue';
  import GuestForm from '@/components/Documents/GuestForm.vue';
  import NextButton from '@/components/Confirmation/NextButton.vue';

  const store = useBookingStore();
  const { booking, bookings, updateBooking } = store;
  const { t } = useI18n();
  const loading = ref(false);
  const showRequirement = ref(true);
  const showGuestForm = ref(false);
  const showSmartCapture = ref(true);

  const initialGuest = {
    id: null,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    documentType: '',
    documentNumber: '',
    checkOutTime: '',
    checkOutDate: '',
    cityTaxExemption: undefined,
  };
  const guest = ref({ ...initialGuest });

  const adults = computed(() => booking.guests.reduce((acc, guest) => acc + (getAges(guest) >= 18 ? 1 : 0), 0));
  const children = computed(() => booking.guests.reduce((acc, guest) => acc + (getAges(guest) >= 7 && getAges(guest) < 18 ? 1 : 0), 0));
  const preschoolers = computed(() => booking.guests.reduce((acc, guest) => acc + (getAges(guest) >= 4 && getAges(guest) < 7 ? 1 : 0), 0));
  const toddlers = computed(() => booking.guests.reduce((acc, guest) => acc + (getAges(guest) < 4 ? 1 : 0), 0));

  const isNextDisabled = computed(() => booking.guests.length === 0);

  const getAges = guest => new Date().getFullYear() - new Date(guest.dateOfBirth).getFullYear();

  const confirmedGuests = computed(() => {
    let confirmedGuests = adults.value + children.value + preschoolers.value;
    if (toddlers.value > 1) {
      confirmedGuests += toddlers.value - 1;
    }
    return confirmedGuests;
  });

  const totalGuestsAmount = computed(() => bookings.reduce((total, booking) => total + (booking.guestsAmount || 0), 0));
  const totalCapacity = computed(() => bookings.reduce((total, booking) => total + (booking.capacity || 0), 0));
  const isExtraGuest = computed(() => confirmedGuests.value > totalGuestsAmount.value);
  const extraGuests = computed(() => confirmedGuests.value - totalGuestsAmount.value);
  const isGuestLimit = computed(() => confirmedGuests.value > totalCapacity.value + 2);
  const isLessDocs = computed(() => totalGuestsAmount.value > adults.value + children.value + preschoolers.value + toddlers.value);
  const extraPayment = computed(() => (Math.min(totalCapacity.value, confirmedGuests.value) - totalGuestsAmount.value) * bookedNights.value * booking.extraPerson);
  const bookedNights = computed(() => Math.ceil((Date.parse(booking.checkOutDate) - Date.parse(booking.checkInDate)) / 1000 / 60 / 60 / 24));
  const showExtraPay = computed(() => extraGuests.value > 0 && extraPayment.value);

  let isGuestLimitShow = false;
  let isExtraGuestShow = false;
  let isLessDocsShow = false;

  const onRecognize = (data) => {
    showRequirement.value = false;
    if (!validate(data)) {
      return;
    }
    ElNotification({
      title: '',
      message: t('documents.additionalInfo'),
      type: 'info',
    });
    Object.assign(guest.value, data);
    showGuestForm.value = true;
  };

  const onRecognizeError = () => {
    ElNotification({
      title: 'Error',
      message: t('documents.recognizeError'),
      type: 'error',
    });
    Object.assign(guest.value, initialGuest);
    showGuestForm.value = true;
  };

  const onGuestAdd = async (guest) => {
    scrollToTop();
    loading.value = true;
    booking.guests.push(guest);
    await updateBooking(booking);
    loading.value = false;
    showGuestForm.value = false;
    showSmartCapture.value = true;
    update();
  };

  const onGuestRemove = async (index) => {
    loading.value = true;
    booking.guests.splice(index, 1);
    await updateBooking(booking);
    loading.value = false;
  };

  const validate = (guest) => {
    if (isDuplicate(guest)) {
      ElNotification({
        title: 'Warning',
        message: t('documents.duplicateGuest'),
        type: 'warning',
      });
      return false;
    }

    if (!isRecognized(guest)) {
      ElNotification({
        title: 'Error',
        message: t('documents.partlyRecognize'),
        type: 'error',
      });
      showGuestForm.value = true;
      showSmartCapture.value = false;
    }

    return true;
  };

  const isDuplicate = (guest) => {
    return booking.guests.some(existingGuest => existingGuest.documentNumber === guest.documentNumber);
  };

  const isRecognized = (guest) => {
    return ['firstName', 'lastName', 'dateOfBirth', 'gender', 'nationality', 'documentType', 'documentNumber']
      .every(key => guest[key] !== undefined);
  };

  const update = () => {
    if (isGuestLimit.value && !isGuestLimitShow) {
      isGuestLimitShow = true;
      setTimeout(() => {
        ElNotification({
          title: 'Warning',
          message: t('tax.guestLimit', { limit: totalCapacity.value }),
          type: 'warning',
          onClose: () => isGuestLimitShow = false,
        });
      }, 0);
    }
    if (isExtraGuest.value && !isExtraGuestShow) {
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
    if (isLessDocs.value && !isLessDocsShow) {
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
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
</script>

<template>
  <h2>{{ $t('documents.mandatory', { id: booking.orderId }) }}</h2>
  <el-row :gutter="20">
    <el-col :xs="24" :md="16">
      <div v-if="showSmartCapture">
        <smart-capture @recognize="onRecognize" @error="onRecognizeError" />
      </div>
      <p v-if="showRequirement" class="info"><el-icon><InfoFilled /></el-icon> {{ $t('documents.requirement') }}</p>
      <guest-form
          v-if="showGuestForm"
          :guest="guest"
          :check-in-date="booking.checkInDate"
          :check-out-date="booking.checkOutDate"
          :id="booking.orderId"
          @submit="onGuestAdd"
      />
    </el-col>
    <el-col :xs="24" :md="8">
      <h3>{{ $t('documents.guests') }}:</h3>
      <div v-loading="loading">
        <template v-for="(guest, index) in booking.guests">
          <guest-name v-if="guest.documentNumber" :guest="guest" :index="index" @remove="onGuestRemove" :key="guest.documentNumber" />
        </template>
      </div>
      <p v-if="showExtraPay"><strong>{{ $t('tax.extraPay', { extraPayment: extraPayment }) }}</strong></p>
      <next-button :disabled="isNextDisabled" />
    </el-col>
  </el-row>
</template>

<style scoped>
  .info {
    background: var(--el-color-primary-light-5);
    border-radius: 4px;
    padding: 4px;
    vertical-align: baseline;
    line-height: 1.5;
  }

  .el-icon {
    vertical-align: middle;
  }
</style>
