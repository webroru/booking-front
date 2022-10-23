<script setup>
  import { ref } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import Feedback from './Feedback.vue';
  import Rules from './Rules.vue';

  const bookingStore = useBookingStore();
  const { booking } = bookingStore;
  const showFeedbackDialog = ref(false);
  const showRulesDialog = ref(false);
  const showHowToMakeInDialog = ref(false);
  const showFacilitiesDialog = ref(false);
  const showextrasDialog = ref(false);

  const hotelInfo = {
    callTime: '9:00 — 23:00',
    contactInformation: '+420 123 456 789',
    howToMakeIt: 'Информацию о том, как добраться',
    facilities: 'Информацию об удобствах',
    extras: 'Информацию об дополнительных услугах',
  };
</script>

<template>
  <el-row>
    <el-col :span="16">
      <h2>Информация о Вашем номере</h2>
      <el-descriptions :title="booking.propertyName">
        <el-descriptions-item label="Номер комнаты">{{ booking.room }}</el-descriptions-item>
        <el-descriptions-item label="CheckIn">{{ booking.checkInDate }}</el-descriptions-item>
        <el-descriptions-item label="CheckOut">{{ booking.checkOutDate }}</el-descriptions-item>
        <el-descriptions-item label="Full Name">{{ booking.fullName }}</el-descriptions-item>
        <el-descriptions-item label="Original Referrer">{{ booking.originalReferrer }}</el-descriptions-item>
        <el-descriptions-item label="Код на входную дверь">{{ booking.passCode }}</el-descriptions-item>
      </el-descriptions>

      <a href="tel:{{ hotelInfo.contactInformation }}" class="el-button el-button--primary">Позвонить {{ hotelInfo.callTime }}</a>
      <el-button type="primary" @click="showRulesDialog = true">Правила проживания</el-button>
      <el-button type="primary" @click="showHowToMakeInDialog = true">Как добраться из</el-button>
      <el-button type="primary" @click="showFacilitiesDialog = true">Удобства</el-button>
      <el-button type="primary" @click="showextrasDialog = true">Доб услуги</el-button>

      <el-dialog v-model="showFeedbackDialog" title="Send Feedback" width="30%">
        <Feedback />
        <template #footer>
          <el-button @click="showFeedbackDialog = false">Close</el-button>
        </template>
      </el-dialog>

      <el-dialog v-model="showRulesDialog" title="Rules" width="30%">
        <Rules />
        <template #footer>
          <el-button @click="showRulesDialog = false">Close</el-button>
        </template>
      </el-dialog>

      <el-dialog v-model="showHowToMakeInDialog" title="Rules" width="30%">
        {{ hotelInfo.howToMakeIt }}
        <template #footer>
          <el-button @click="showHowToMakeInDialog = false">Close</el-button>
        </template>
      </el-dialog>

      <el-dialog v-model="showFacilitiesDialog" title="Rules" width="30%">
        {{ hotelInfo.facilities }}
        <template #footer>
          <el-button @click="showFacilitiesDialog = false">Close</el-button>
        </template>
      </el-dialog>

      <el-dialog v-model="showextrasDialog" title="Rules" width="30%">
        {{ hotelInfo.extras }}
        <template #footer>
          <el-button @click="showextrasDialog = false">Close</el-button>
        </template>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<style scoped>
  .el-button {
    margin-bottom: 20px;
    text-decoration: none;
  }
</style>