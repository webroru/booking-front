<script setup>
  import { ref, computed } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import { usePhotosStore } from '@/stores/photos';
  import Search from '../Search/Search.vue';
  import Instruction from './Instruction.vue';
  import Tax from '../Tax.vue';
  import Payment from '../Payment/Payment.vue';
  import Rules from '../Rules.vue';

  const active = ref(0);
  const emit = defineEmits(['backToInitial', 'selectBooking']);
  const bookingStore = useBookingStore();
  const { booking } = bookingStore;
  const photosStore = usePhotosStore();
  const { photosBlobs } = photosStore;
  const isNextDisabled = computed(() => isNextDisabledCondition());
  const showTaxNotification = ref(false);

  const isNextDisabledCondition = () => {
    const bookingHasNotBeenSelected = Object.keys(booking).length === 0;
    const bookingHasNotBeenPaid = active.value === 3 && booking.status !== 'paid';
    const bookingRuleHasNotBeenAccepted = active.value === 4 && booking.isRuleAccepted;

    return bookingHasNotBeenSelected || bookingHasNotBeenPaid || bookingRuleHasNotBeenAccepted;
  };

  const next = () => {
    if (active.value === 2 && !areGuestsEqual()) {
      showTaxNotification.value = true;
      return;
    }

    active.value++;
  };

  const areGuestsEqual = () => {
    const confirmedGuests = booking.adult + booking.children + booking.babies;
    return booking.guestsAmount === confirmedGuests === photosBlobs.length;
  };

  const goToPayment = () => {
    showTaxNotification.value = false;
    active.value = 3;
  };

  const back = () => {
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
    <el-step title="Tax" />
    <el-step title="Rules" />
  </el-steps>

  <Search v-if="active === 0" />
  <Instruction v-if="active === 1" />
  <Tax v-if="active === 2" />
  <Payment v-if="active === 3" />
  <Rules v-if="active === 4" />

  <div class="navigation">
    <el-button style="margin-top: 12px" @click="back">Back</el-button>
    <el-button style="margin-top: 12px" @click="next" :disabled="isNextDisabled">Next step</el-button>
  </div>
  <el-dialog v-model="showTaxNotification" title="Extra Tax" width="30%">
    <p>The number of guests entered or the number of photos uploaded does not match the number of guests in the booking.</p>
    <p>You will be required to pay for an additional guest or send all documents.</p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showTaxNotification = false">Cancel</el-button>
        <el-button type="primary" @click="goToPayment">Confirm</el-button>
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
