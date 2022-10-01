<script setup>
  import { ref, reactive, computed } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import { usePhotosStore } from '@/stores/photos';
  import Search from '../Search/Search.vue';
  import Instruction from './Instruction.vue';
  import Tax from '../Tax.vue';
  import Payment from '../Payment/Payment.vue';
  import Rules from '../Rules.vue';
  import CheckInDetailsVue from '../CheckInDetails/CheckInDetails.vue';

  const active = ref(0);
  const emit = defineEmits(['backToInitial', 'selectBooking']);
  const bookingStore = useBookingStore();
  const { booking, updateBooking } = bookingStore;
  const photosStore = usePhotosStore();
  const { photosBlobs } = photosStore;
  const isNextDisabled = computed(() => isNextDisabledCondition());
  const showNotification = ref(false);
  const notifications = reactive([]);

  const isNextDisabledCondition = () => {
    const bookingHasNotBeenSelected = Object.keys(booking).length === 0;
    const bookingHasNotBeenPaid = active.value === 4 && !(booking.status === 'paid' || booking.status === 'payByCashe');
    const bookingRuleHasNotBeenAccepted = active.value === 2 && !booking.isRuleAccepted;

    return bookingHasNotBeenSelected || bookingHasNotBeenPaid || bookingRuleHasNotBeenAccepted;
  };

  const next = () => {
    if (active.value === 3) {
      if (isGuestLimit()) {
        notifications.push(`Нет возможности принять больше чем ${booking.capacity}`);
      }
      if (isExtraGuest()) {
        notifications.push('You will be required to pay for an additional guest');
      }
      if (isLessDocs()) {
        notifications.push('Нужно дослать потом фото');
      }
      if (notifications.length) {
        showNotification.value = true;
        return;
      }
    }
    active.value++;
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
  const isGuestLimit = () => confirmedGuests() > booking.capacity;
  const isLessDocs = () => Object.keys(photosBlobs).length < booking.adults + booking.children;

  const goNext = () => {
    if (isGuestLimit()) {
      booking.overmax = confirmedGuests();
    }
    if (isExtraGuest()) {
      booking.plusGuest = true;
    }
    if (isLessDocs()) {
      booking.LessDocs = true;
    }
    if (extraGuests() > 0) {
      booking.extraGuests = isGuestLimit() ? booking.capacity : extraGuests();
    }
    updateBooking(booking);

    showNotification.value = false;
    active.value++;
  };

  const cancelNotification = () => {
    notifications.length = 0;
    showNotification.value = false;
  };

  const back = () => {
    notifications.length = 0;
    if (active.value === 0) {
      emit('backToInitial');
    } else {
      --active.value;
    }
  };
</script>

<template>
  <el-steps :active="active" finish-status="success">
    <el-step title="Search" />
    <el-step title="Information" />
    <el-step title="Rules" />
    <el-step title="Tax" />
    <el-step title="CheckIn Details" />
  </el-steps>

  <Search v-if="active === 0" />
  <Instruction v-if="active === 1" />
  <Rules v-if="active === 2" />
  <Tax v-if="active === 3" />
  <Payment v-if="active === 4" />
  <CheckInDetailsVue v-if="active === 5" />

  <div class="navigation">
    <el-button style="margin-top: 12px" @click="back">Back</el-button>
    <el-button style="margin-top: 12px" @click="next" :disabled="isNextDisabled">Next step</el-button>
  </div>
  <el-dialog v-model="showNotification" title="Warning" width="30%">
    <p v-for="note in notifications" :key="note">{{ note }}</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelNotification">Cancel</el-button>
        <el-button type="primary" @click="goNext">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
  .navigation {
    display: flex;
    justify-content: space-between;
  }
</style>
