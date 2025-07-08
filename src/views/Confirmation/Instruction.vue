<script setup>
  import { ref, watch } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';

  const bookingStore = useBookingStore();
  const { booking } = bookingStore;
  const infoStore = useInfoStore();
  const { info } = infoStore;
  const showDialog = ref((() => {
    if (!booking.checkInDate) {
      return false;
    }
    const today = new Date();
    const chechIn = new Date(booking.checkInDate);
    return today < chechIn;
  })());
  const isCheckinNotToday = () => {
    if (!booking.checkInDate) {
      return false;
    }
    const today = new Date();
    const chechIn = new Date(booking.checkInDate);
    return today < chechIn;
  };
  
  watch(() => booking.checkInDate, (checkInDate) => {
    if (checkInDate) {
      showDialog.value = isCheckinNotToday();
    }
  });
</script>

<template>
  <h2>
    {{ $t('instruction.register') }}
    <span v-if="booking.debt">{{ $t('instruction.pay') }}</span>
  </h2>

  <div v-html="info.instruction"></div>

  <el-dialog v-model="showDialog" title="Warning" width="30%" center>
      <span>
        {{ $t('instruction.warning') }}
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">Close</el-button>
        </span>
      </template>
    </el-dialog>
</template>
