<script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';
  import Documents from '@/components/Documents/Documents.vue';
  import Rules from '@/components/Rules.vue';

  const bookingStore = useBookingStore();
  const { booking, bookings, updateBooking } = bookingStore;
  const infoStore = useInfoStore();
  const { info } = infoStore;
  const showRulesDialog = ref(false);
  const showHowToMakeInDialog = ref(false);
  const showFacilitiesDialog = ref(false);
  const showextrasDialog = ref(false);

  const hasDebt = () => bookings.find(booking => booking.debt > 0) !== undefined;

  function waitForBookingReady() {
    return new Promise(resolve => {
      const stop = watch(
          () => booking.orderId,
          v => {
            if (v) {
              stop();
              resolve();
            }
          }
      );

      if (booking.orderId) {
        stop();
        resolve();
      }
    })
  }

  onMounted(async () => {
    await waitForBookingReady();
    if (!booking.checkIn) {
      booking.checkIn = true;
      await updateBooking(booking);
    }
  });
</script>

<template>
  <h2>{{ $t('bookingInfo.header') }}</h2>
  <el-row v-for="booking in bookings" :key="booking.orderId">
    <el-col :span="16">
      <el-descriptions :title="booking.propertyName" border :column="1" class="description">
        <el-descriptions-item :label="$t('bookingInfo.roomNumber')">{{ booking.room }} <b>{{ booking.unit ? '№: ' + booking.unit : '' }}</b></el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.checkIn')">{{ booking.checkInDate }}, 14:00</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.checkOut')">{{ booking.checkOutDate }}, 11:00</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.fullName')">{{ booking.firstName }} {{ booking.lastName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.debt')">{{ Math.max(booking.debt, 0) }} €</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.smartLockCode')"><b>{{ booking.passCode }}</b></el-descriptions-item>
      </el-descriptions>
    </el-col>
  </el-row>
  <p>{{ $t('bookingInfo.photoDocuments') }}</p>
  <documents />
  <router-link v-if="hasDebt()" :to="`/confirmation/${bookings[0].orderId}/payment`">
    <el-button type="primary">{{ $t('bookingInfo.payDebt') }}</el-button>
  </router-link>

  <a :href="'tel:' + info.phoneNumber" class="el-button el-button--primary button-call">{{ $t('bookingInfo.call') }} {{ info.callTime }}</a>
  <el-button type="primary" @click="showRulesDialog = true">{{ $t('bookingInfo.rules') }}</el-button>
  <el-button type="primary" @click="showHowToMakeInDialog = true">{{ $t('bookingInfo.howToMakeIn') }}</el-button>
  <el-button type="primary" @click="showFacilitiesDialog = true">{{ $t('bookingInfo.facilities') }}</el-button>
  <el-button type="primary" @click="showextrasDialog = true">{{ $t('bookingInfo.extras') }}</el-button>

  <el-dialog v-model="showRulesDialog" width="80%">
    <Rules />
    <template #footer>
      <el-button @click="showRulesDialog = false">{{ $t('common.close') }}</el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="showHowToMakeInDialog" width="30%">
    <div v-html="info.howToMakeIt"></div>
    <template #footer>
      <el-button @click="showHowToMakeInDialog = false">{{ $t('common.close') }}</el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="showFacilitiesDialog" width="30%">
    <div v-html="info.facilities"></div>
    <template #footer>
      <el-button @click="showFacilitiesDialog = false">{{ $t('common.close') }}</el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="showextrasDialog" width="30%">
    <div v-html="info.extras"></div>
    <template #footer>
      <el-button @click="showextrasDialog = false">{{ $t('common.close') }}</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
    a {
      text-decoration: none;
    }

  .description {
    margin-bottom: 20px;
  }

  .el-button {
    margin-bottom: 20px;
    text-decoration: none;
  }

  .button-call {
    margin-left: 12px;
  }

  .output {
    display: flex;
    flex-wrap: wrap;
  }

  .upload-container {
    margin: 0 20px 20px 0;
    display: inline-block;
    vertical-align: middle;
  }
</style>
