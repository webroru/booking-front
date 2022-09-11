<script setup>
  import { ref } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { useBookingStore } from '@/stores/booking';
  import Feedback from './Feedback.vue';
  import Rules from '../Rules.vue';

  const bookingStore = useBookingStore();
  const { booking } = bookingStore;
  const showFeedbackDialog = ref(false);
  const showRulesDialog = ref(false);

  const hotelInfo = {
    callTime: '9:00 — 23:00',
    contactInformation: '+420 123 456 789'
  };

  const openSendInformation = async () => {
    const value = await ElMessageBox.prompt('Please input your e-mail', 'Tip', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      inputPattern:
        /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      inputErrorMessage: 'Invalid Email',
    });

    fetchData({ orderId: booking.orderId, mail: value });
    ElMessage({
      type: 'success',
      message: `Information has been sent to: ${value}`,
    });
  };

  const showCallInfo = () => {
    ElMessageBox.alert(`Hote contact information: ${hotelInfo.contactInformation}`, 'Info', {
      confirmButtonText: 'OK',
    });
  };

  const fetchData = async (data) => {
    const url = 'https://run.mocky.io/v3/6f22b652-258e-4388-827e-98e0ad85565e';
    let json = [];

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      json = await response.json();
    } catch (err) {
      console.log(err);
    }

    return json;
  };
</script>

<template>
  <el-row>
    <el-col :span="16">
      <h2>Информация для заезда</h2>
      <el-descriptions :title="booking.propertyName">
        <el-descriptions-item label="Номер комнаты">{{ booking.room }}</el-descriptions-item>
        <el-descriptions-item label="CheckIn">{{ booking.checkInDate }}</el-descriptions-item>
        <el-descriptions-item label="CheckOut">{{ booking.checkOutDate }}</el-descriptions-item>
        <el-descriptions-item label="Full Name">{{ booking.fullName }}</el-descriptions-item>
        <el-descriptions-item label="Original Referrer">{{ booking.originalReferrer }}</el-descriptions-item>
        <el-descriptions-item label="Код на входную дверь">{{ booking.passCode }}</el-descriptions-item>
      </el-descriptions>

      <el-button type="primary" @click="showFeedbackDialog = true">click to open the Dialog</el-button>
      <el-button type="primary" @click="showCallInfo">Позвонить {{ hotelInfo.callTime }}</el-button>
      <el-button type="primary" @click="showRulesDialog = true">Правила проживания</el-button>

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
    </el-col>
    <el-col :span="8">
      <el-button type="primary" @click="openSendInformation">Отправить информацию на электронную почту</el-button>
    </el-col>
  </el-row>
</template>
