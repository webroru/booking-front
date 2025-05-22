<script setup>
  import { ref, reactive, computed } from 'vue';
  import { ElNotification } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  import { useBookingStore } from '@/stores/booking';
  import SmartCapture from '@/components/SmartCapture/SmartCapture.vue';
  import GuestName from '@/components/Documents/GuestName.vue';
  import { InfoFilled } from '@element-plus/icons-vue';
  import GuestForm from '@/components/Documents/GuestForm.vue';

  const props = defineProps({ booking: Object });
  const store = useBookingStore();
  const { setBooking, updateBooking } = store;
  const { t } = useI18n();
  const loading = ref(false);

  const localBooking = reactive(props.booking);
  const guest = ref({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    documentType: '',
    documentNumber: '',
  });

  const adults = computed(() => localBooking.guests.reduce((acc, guest) => acc + (getAges(guest) >= 18 ? 1 : 0), 0));
  const children = computed(() => localBooking.guests.reduce((acc, guest) => acc + (getAges(guest) >= 7 && getAges(guest) < 18 ? 1 : 0), 0));
  const preschoolers = computed(() => localBooking.guests.reduce((acc, guest) => acc + (getAges(guest) >= 4 && getAges(guest) < 7 ? 1 : 0), 0));
  const toddlers = computed(() => localBooking.guests.reduce((acc, guest) => acc + (getAges(guest) < 4 ? 1 : 0), 0));

  const getAges = guest => new Date().getFullYear() - new Date(guest.dateOfBirth).getFullYear();

  const bookedNights = () => Math.ceil((Date.parse(localBooking.checkOutDate) - Date.parse(localBooking.checkInDate)) / 1000 / 60 / 60 / 24);
  const showExtraPay = () => extraGuests() > 0 && extraPayment();

  const confirmedGuests = () => {
    let confirmedGuests = adults.value + children.value + preschoolers.value;
    if (toddlers.value > 1) {
      confirmedGuests += toddlers.value - 1;
    }
    return confirmedGuests;
  };

  const isExtraGuest = () => confirmedGuests() > localBooking.guestsAmount;
  const extraGuests = () => confirmedGuests() - localBooking.guestsAmount;
  const isGuestLimit = () => confirmedGuests() > localBooking.capacity + 2;
  const isLessDocs = () => localBooking.guestsAmount > adults.value + children.value + preschoolers.value + toddlers.value;
  const extraPayment = () => (Math.min(localBooking.capacity, confirmedGuests()) - localBooking.guestsAmount) * bookedNights() * localBooking.extraPerson;

  const showGuestForm = ref(false);

  let isGuestLimitShow = false;
  let isExtraGuestShow = false;
  let isLessDocsShow = false;
  let recognizeAttempts = 0;

  const onRecognize = (data) => {
    recognizeAttempts = 0;
    if (isDuplicate(data)) {
      ElNotification({
        title: 'Warning',
        message: t('documents.duplicateGuest'),
        type: 'warning',
      });
      return;
    }
    guest.value = data;
  };

  const onRecognizeError = () => {
    if (++recognizeAttempts < 3) {
      ElNotification({
        title: 'Error',
        message: t('documents.recognizeWarning'),
        type: 'error',
      });
      return;
    }
    ElNotification({
      title: 'Error',
      message: t('documents.recognizeError'),
      type: 'error',
    });
    showGuestForm.value = true;
  };

  const onGuestAdd = async (guest) => {
    loading.value = true;
    localBooking.guests.push(guest);
    setBooking(localBooking);
    await updateBooking(localBooking);
    loading.value = false;
    showGuestForm.value = false;
    update();
  };

  const onGuestRemove = async (index) => {
    loading.value = true;
    localBooking.guests.splice(index, 1);
    setBooking(localBooking);
    await updateBooking(localBooking);
    loading.value = false;
  };

  const isDuplicate = (guest) => {
    return localBooking.guests.some(existingGuest => existingGuest.documentNumber === guest.documentNumber);
  };

  const update = () => {
    if (isGuestLimit() && !isGuestLimitShow) {
      isGuestLimitShow = true;
      setTimeout(() => {
        ElNotification({
          title: 'Warning',
          message: t('tax.guestLimit', { limit: localBooking.capacity }),
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
  };
</script>

<template>
  <h2>{{ $t('documents.mandatory', { id: booking.orderId }) }}</h2>
  <el-row :gutter="20">
    <el-col :xs="24" :md="16">
      <div>
        <smart-capture @recognize="onRecognize" @error="onRecognizeError" />
      </div>
      <p><span class="info"><el-icon><InfoFilled /></el-icon> {{ $t('documents.requirement') }}</span></p>
      <guest-form v-if="showGuestForm" :guest="guest" @submit="onGuestAdd" />
    </el-col>
    <el-col :xs="24" :md="8">
      <h3>{{ $t('documents.guests') }}:</h3>
      <div v-loading="loading">
        <template v-for="(guest, index) in booking.guests">
          <guest-name v-if="guest.documentNumber" :guest="guest" :index="index" @remove="onGuestRemove" :key="guest.documentNumber" />
        </template>
      </div>
      <p v-if="showExtraPay()"><strong>{{ $t('tax.extraPay', { extraPayment: extraPayment() }) }}</strong></p>
    </el-col>
  </el-row>
</template>

<style scoped>
  .info {
    background: var(--el-color-primary-light-5);
    border-radius: 4px;
    padding: 4px;
    vertical-align: baseline;
  }

  .el-icon {
    vertical-align: middle;
  }
</style>
