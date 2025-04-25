<script setup>
  import { ref, reactive, computed } from 'vue';
  import { ElNotification } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  import { useBookingStore } from '@/stores/booking';
  import SmartCapture from '@/components/SmartCapture/SmartCapture.vue';
  import Guest from '@/components/Documents/Guest.vue';

  const store = useBookingStore();
  const { setBooking, updateBooking } = store;
  const { t } = useI18n();
  const loading = ref(false);

  const props = defineProps({
    booking: Object,
  });

  const localBooking = reactive(props.booking);

  const adults = computed(() => localBooking.guests.reduce((acc, guest) => acc + (getAges(guest) >= 18 ? 1 : 0), 0));
  const children = computed(() => localBooking.guests.reduce((acc, guest) => acc + (getAges(guest) >= 7 && getAges(guest) < 18 ? 1 : 0), 0));
  const preschoolers = computed(() => localBooking.guests.reduce((acc, guest) => acc + (getAges(guest) >= 4 && getAges(guest) < 7 ? 1 : 0), 0));
  const toddlers = computed(() => localBooking.guests.reduce((acc, guest) => acc + (getAges(guest) < 4 ? 1 : 0), 0));

  const getAges = guest => new Date().getFullYear() - new Date(guest.dateOfBirth).getFullYear();

  const bookedNights = (booking) => Math.ceil((Date.parse(booking.checkOutDate) - Date.parse(booking.checkInDate)) / 1000 / 60 / 60 / 24);
  const showExtraPay = booking => extraGuests(booking) > 0 && extraPayment(booking);

  const confirmedGuests = () => {
    let confirmedGuests = adults.value + children.value + preschoolers.value;
    if (toddlers.value > 1) {
      confirmedGuests += toddlers.value - 1;
    }
    return confirmedGuests;
  };

  const isExtraGuest = (booking) => confirmedGuests() > booking.guestsAmount;
  const extraGuests = (booking) => confirmedGuests() - booking.guestsAmount;
  const isGuestLimit = (booking) => confirmedGuests() > booking.capacity + 2;
  const isLessDocs = (booking) => booking.guestsAmount > adults.value + children.value + preschoolers.value + toddlers.value;
  const extraPayment = booking => (Math.min(booking.capacity, confirmedGuests()) - booking.guestsAmount) * bookedNights(booking) * booking.extraPerson;

  let isGuestLimitShow = false;
  let isExtraGuestShow = false;
  let isLessDocsShow = false;

  const onRecognize = async (guest) => {
    loading.value = true;
    localBooking.guests.push(guest);
    setBooking(localBooking);
    await updateBooking(localBooking);
    loading.value = false;
    update(localBooking);
  };

  const onGuestChange = async (guest, index) => {
    loading.value = true;
    Object.assign(localBooking.guests[index], guest);
    setBooking(localBooking);
    await updateBooking(localBooking);
    loading.value = false;
  };

  const onGuestRemove = async (index) => {
    loading.value = true;
    localBooking.guests.splice(index, 1);
    setBooking(localBooking);
    await updateBooking(localBooking);
    loading.value = false;
  };

  const update = (booking) => {
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
  };
</script>

<template>
  <h2>{{ $t('app.bookingFor', { name: booking.firstName, orderId: booking.orderId, referer: booking.originalReferer }) }}</h2>
  <template v-for="guest in booking.guests">
    <guest v-if="guest.documentNumber" :guest="guest" @change="onGuestChange" @remove="onGuestRemove" :key="guest.documentNumber" v-loading="loading" />
    <el-divider v-if="guest.documentNumber" :key="guest.documentNumber" />
  </template>
  <p v-if="showExtraPay(booking)"><strong>{{ $t('tax.extraPay', { extraPayment: extraPayment(booking) }) }}</strong></p>
  <div>
    <smart-capture @recognize="onRecognize" />
  </div>
</template>
