<script setup>
  import { useRouter } from 'vue-router';
  import { watch, ref} from 'vue';
  import { useBookingStore } from "@/stores/booking";

  const bookingStore = useBookingStore();
  const { bookings } = bookingStore;
  const router = useRouter();
  const showDialog = ref(false);
  const date = ref(new Date());

  watch(
    bookings,
    (bookings) => {
      if (bookings) {
        date.value.setTime(Math.min(...bookings.map(booking => new Date(booking.checkInDate))));
        date.value.setDate(date.value.getDate() - 4);

        if (date.value > new Date()) {
          showDialog.value = true;
        }
      }
    }
  );


  const closeDialog = () => {
    showDialog.value = false;
    router.push('/');
  };

  const handleClose = () => {
    closeDialog();
  };
</script>

<template>
  <el-dialog v-model="showDialog" title="Warning" width="30%" center @close="handleClose">
    {{ $t('app.earlyCheckInWarning', { date: date.toLocaleDateString() }) }}
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">{{ $t('common.close') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
