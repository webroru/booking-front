<script setup>
  import { ref, onMounted } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';
  import Documents from '@/components/Documents/Documents.vue';
  import MakePhoto from '@/components/Photos/MakePhoto.vue';
  import Rules from '@/components/Rules.vue';
  import ShowPhotos from '@/components/Photos/ShowPhotos.vue';
  import UploadPhoto from '@/components/Photos/UploadPhoto.vue';

  const bookingStore = useBookingStore();
  const { bookings, updateBooking } = bookingStore;
  const infoStore = useInfoStore();
  const { info } = infoStore;
  const showRulesDialog = ref(false);
  const showHowToMakeInDialog = ref(false);
  const showFacilitiesDialog = ref(false);
  const showextrasDialog = ref(false);
  const showMakePhoto = ref(false);
  const isCameraEnabled = ref(false);

  const closeMakePhoto = () => {
    isCameraEnabled.value = false;
    showMakePhoto.value = false;
  };

  const openMakePhoto = () => {
    isCameraEnabled.value = true;
    showMakePhoto.value = true;
  };

  const hasDebt = () => bookings.find(booking => booking.debt > 0) !== undefined;

  onMounted(async () => {
    for (const booking of bookings) {
      if (!booking.checkIn) {
        booking.checkIn = true;
        await updateBooking(booking);
      }
    }
  });

</script>

<template>
  <h2>{{ $t('bookingInfo.header') }}</h2>
  <el-row v-for="booking in bookings" :key="booking.orderId">
    <el-col :span="16">
      <el-descriptions :title="booking.propertyName" border :column="1" class="description">
        <el-descriptions-item :label="$t('bookingInfo.roomNumber')">{{ booking.room }} <b>{{ booking.unit ? '№: ' + booking.unit : '' }}</b></el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.checkIn')">{{ booking.checkInDate }}</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.checkOut')">{{ booking.checkOutDate }}</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.fullName')">{{ booking.firstName }} {{ booking.lastName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.debt')">{{ Math.max(booking.debt, 0) }} €</el-descriptions-item>
        <el-descriptions-item :label="$t('bookingInfo.smartLockCode')"><b>{{ booking.passCode }}</b></el-descriptions-item>
      </el-descriptions>

      <p>{{ $t('bookingInfo.photoDocuments') }}</p>
      <documents :booking="booking" />
    </el-col>
  </el-row>
  <router-link v-if="hasDebt()" :to="`/confirmation/${bookings[0].orderId}/payment`">
    <el-button type="primary">{{ $t('bookingInfo.payDebt') }}</el-button>
  </router-link>

  <a :href="'tel:' + info.phoneNumber" class="el-button el-button--primary button-call">{{ $t('bookingInfo.call') }} {{ info.callTime }}</a>
  <el-button type="primary" @click="showRulesDialog = true">{{ $t('bookingInfo.rules') }}</el-button>
  <el-button type="primary" @click="showHowToMakeInDialog = true">{{ $t('bookingInfo.howToMakeIn') }}</el-button>
  <el-button type="primary" @click="showFacilitiesDialog = true">{{ $t('bookingInfo.facilities') }}</el-button>
  <el-button type="primary" @click="showextrasDialog = true">{{ $t('bookingInfo.extras') }}</el-button>

  <el-dialog v-model="showRulesDialog" :title="$t('bookingInfo.rules')" width="80%">
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
