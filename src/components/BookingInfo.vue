<script setup>
  import { ref } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';
  import Rules from './Rules.vue';

  const bookingStore = useBookingStore();
  const { booking } = bookingStore;
  const infoStore = useInfoStore();
  const { info } = infoStore;
  const showRulesDialog = ref(false);
  const showHowToMakeInDialog = ref(false);
  const showFacilitiesDialog = ref(false);
  const showextrasDialog = ref(false);
</script>

<template>
  <el-row>
    <el-col :span="16">
      <h2>{{ $t('bookingInfo.header') }}</h2>
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
      <el-button type="primary" @click="showHowToMakeInDialog = true">{{ $t('bookingInfo.howToMakeIn') }}</el-button>
      <el-button type="primary" @click="showFacilitiesDialog = true">{{ $t('bookingInfo.facilities') }}</el-button>
      <el-button type="primary" @click="showextrasDialog = true">{{ $t('bookingInfo.extras') }}</el-button>

      <el-dialog v-model="showRulesDialog" :title="$t('bookingInfo.rules')" width="30%">
        <Rules />
        <template #footer>
          <el-button @click="showRulesDialog = false">{{ $t('common.close') }}</el-button>
        </template>
      </el-dialog>

      <el-dialog v-model="showHowToMakeInDialog" :title="$t('bookingInfo.rules')" width="30%">
        <div v-html="info.howToMakeIt"></div>
        <template #footer>
          <el-button @click="showHowToMakeInDialog = false">{{ $t('common.close') }}</el-button>
        </template>
      </el-dialog>

      <el-dialog v-model="showFacilitiesDialog" :title="$t('bookingInfo.rules')" width="30%">
        <div v-html="info.facilities"></div>
        <template #footer>
          <el-button @click="showFacilitiesDialog = false">{{ $t('common.close') }}</el-button>
        </template>
      </el-dialog>

      <el-dialog v-model="showextrasDialog" :title="$t('bookingInfo.rules')" width="30%">
        <div v-html="info.extras"></div>
        <template #footer>
          <el-button @click="showextrasDialog = false">{{ $t('common.close') }}</el-button>
        </template>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<style scoped>
  .description {
    margin-bottom: 20px;
  }

  .el-button {
    margin-bottom: 20px;
    text-decoration: none;
  }
</style>
