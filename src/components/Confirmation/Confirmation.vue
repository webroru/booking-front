<script setup>
  import { ref, computed } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import Search from '../Search/Search.vue';
  import Instruction from './Instruction.vue';
  import Tax from '../Tax.vue';
  import Payment from '../Payment/Payment.vue';
  import Rules from '../Rules.vue';
  import CheckInDetails from '../CheckInDetails.vue';
  import BookingInfo from '../BookingInfo.vue';

  const active = ref(0);
  const emit = defineEmits(['backToInitial', 'selectBooking']);
  const bookingStore = useBookingStore();
  const { booking } = bookingStore;
  const isNextDisabled = computed(() => isNextDisabledCondition());

  const isNextDisabledCondition = () => {
    const bookingHasNotBeenSelected = Object.keys(booking).length === 0;
    const bookingHasNotBeenPaid = active.value === 4 && !(booking.paymentStatus === 'paid' || booking.paymentStatus === 'payByCashe');
    const bookingRuleHasNotBeenAccepted = active.value === 2 && !booking.isRuleAccepted;

    return bookingHasNotBeenSelected || bookingHasNotBeenPaid || bookingRuleHasNotBeenAccepted;
  };

  const next = () => {
    if (active.value === 3 && booking.debt <= 0) {
      active.value++;
    }
    if (active.value === 0 && booking.checkIn === true) {
      active.value = 6;
      return;
    }
    active.value++;
  };

  const back = () => {
    if (active.value === 5 && booking.debt <= 0) {
      --active.value;
    }
    if (active.value === 0) {
      emit('backToInitial');
    } else {
      --active.value;
    }
  };
</script>

<template>
  <el-steps :active="active" finish-status="success" class="steps">
    <el-step title="Search" />
    <el-step title="Information" />
    <el-step title="Rules" />
    <el-step title="Tax" />
    <el-step title="Payment" />
    <el-step title="CheckIn Details" />
  </el-steps>

  <Search v-if="active === 0" />
  <Instruction v-if="active === 1" />
  <Rules v-if="active === 2" />
  <Tax v-if="active === 3" />
  <Payment v-if="active === 4" />
  <CheckInDetails v-if="active === 5" />
  <BookingInfo v-if="active === 6" />

  <div class="navigation">
    <el-button v-if="active < 5" style="margin-top: 12px" @click="back">Back</el-button>
    <el-button v-if="active < 5" style="margin-top: 12px" @click="next" :disabled="isNextDisabled">Next step</el-button>
    <el-button v-else style="margin-top: 12px" @click="$emit('backToInitial')">Exit</el-button>
  </div>
</template>

<style scoped>
  .navigation {
      display: flex;
      justify-content: space-between;
    }

  .steps {
    margin: 0 0 40px;
  }
</style>
