<script setup>
  import { ref } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';
  import Rules from './Rules.vue';

  const bookingStore = useBookingStore();
  const { booking, checkIn } = bookingStore;
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
    sendToEmail(booking, email.value);
    ElMessage({
      type: 'success',
      message: t('checkInDetails.sent', { email: email.value }),
    });
  };

  checkIn(booking.orderId, true);
</script>

<template>
  <el-row>
    <el-col :xs="24" :sm="16">
      <h2>{{ $t('checkInDetails.information') }}</h2>
      <el-descriptions :title="booking.propertyName" border class="description">
        <el-descriptions-item :label="$t('bookingInfo.roomNumber')">{{ booking.room }}</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.checkIn')">{{ booking.checkInDate }}</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.checkOut')">{{ booking.checkOutDate }}</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.fullName')">{{ booking.firstName }} {{ booking.lastName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.originalReferer')">{{ booking.originalReferer }}</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.debt')">{{ booking.debt }} €</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.smartLockCode')">{{ booking.passCode }}</el-descriptions-item>
      </el-descriptions>

      <a :href="'tel:' + info.phoneNumber" class="el-button el-button--primary">{{ $t('bookingInfo.call') }} {{ info.callTime }}</a>
      <el-button type="primary" @click="showRulesDialog = true">{{ $t('bookingInfo.rules') }}</el-button>

      <el-dialog v-model="showRulesDialog" :title="$t('bookingInfo.rules')" width="30%">
        <Rules show-checkbox="false" />
        <template #footer>
          <el-button @click="showRulesDialog = false">{{ $t('common.close') }}</el-button>
        </template>
      </el-dialog>
    </el-col>
    <el-col :xs="24" :sm="8">
      <el-button type="primary" @click="openSendInformation">{{ $t('checkInDetails.sendToEmail') }}</el-button>
    </el-col>
  </el-row>
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
