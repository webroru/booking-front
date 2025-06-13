<script setup>
  import { ref } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';
  import Rules from '@/components/Rules.vue';

  const bookingStore = useBookingStore();
  const { bookings, updateBooking } = bookingStore;
  const infoStore = useInfoStore();
  const { info, sendToEmail } = infoStore;
  const { t } = useI18n();
  const showRulesDialog = ref(false);

  const openSendInformation = async () => {
    const email = await ElMessageBox.prompt(t('checkInDetails.email'), 'Tip', {
      confirmButtonText: 'OK',
      cancelButtonText: t('common.cancel'),
      inputPattern:
        /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      inputErrorMessage: t('checkInDetails.invalidEmail'),
    });
    await sendToEmail(bookings.map(booking => booking.orderId), email.value);
    ElMessage({
      type: 'success',
      message: t('checkInDetails.sent', { email: email.value }),
    });
  };

  bookings.forEach(async booking => {
    booking.checkIn = true;
    await updateBooking(booking);
  });
</script>

<template>
  <h2>{{ $t('checkInDetails.information') }}</h2>
  <el-row v-for="booking in bookings" :key="booking.orderId">
    <el-col :xs="24" :sm="16">
      <h3>{{ $t('app.bookingFor', { name: booking.firstName, orderId: booking.orderId, referer: booking.originalReferer }) }}</h3>
      <el-descriptions :title="booking.propertyName" border class="description" :column="1">
        <el-descriptions-item :label="$t('bookingInfo.roomNumber')"><b>{{ booking.room }}</b></el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.checkIn')">{{ booking.checkInDate }}</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.checkOut')">{{ booking.checkOutDate }}</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.fullName')">{{ booking.firstName }} {{ booking.lastName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.originalReferer')">{{ booking.originalReferer }}</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.debt')">{{ Math.max(booking.debt, 0) }} €</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.smartLockCode')"><b>{{ booking.passCode }}</b></el-descriptions-item>
      </el-descriptions>
    </el-col>
    <el-col :xs="24" :sm="8">
    </el-col>
  </el-row>
  <a :href="'tel:' + info.phoneNumber" class="el-button el-button--primary">{{ $t('bookingInfo.call') }} {{ info.callTime }}</a>
  <el-button type="primary" @click="showRulesDialog = true">{{ $t('bookingInfo.rules') }}</el-button>
  <el-button type="primary" @click="openSendInformation">{{ $t('checkInDetails.sendToEmail') }}</el-button>

  <el-dialog v-model="showRulesDialog" :title="$t('bookingInfo.rules')" width="80%">
    <Rules />
    <template #footer>
      <el-button @click="showRulesDialog = false">{{ $t('common.close') }}</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
  .description {
    margin-bottom: 20px;
  }

  .el-button {
    text-decoration: none;
    margin-bottom: 20px;
  }
</style>
