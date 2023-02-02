<script setup>
  import { ref } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { useBookingStore } from '@/stores/booking';
  import { useInfoStore } from '@/stores/info';
  import Feedback from './Feedback.vue';
  import Rules from './Rules.vue';

  const bookingStore = useBookingStore();
  const { booking, checkIn } = bookingStore;
  const infoStore = useInfoStore();
  const { info } = infoStore;
  const showFeedbackDialog = ref(false);
  const showRulesDialog = ref(false);

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

  checkIn(booking.orderId, true);

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
        <el-descriptions-item label="Original Referrer">{{ booking.originalReferer }}</el-descriptions-item>
        <el-descriptions-item label="Код на входную дверь">{{ booking.passCode }}</el-descriptions-item>
      </el-descriptions>

      <el-button type="primary" @click="showFeedbackDialog = true">Отправьте запрос или вопрос</el-button>
      <a :href="'tel:' + info.phoneNumber" class="el-button el-button--primary">Позвонить {{ info.callTime }}</a>
      <el-button type="primary" @click="showRulesDialog = true">Правила проживания</el-button>

      <el-dialog v-model="showFeedbackDialog" title="Send Feedback" width="30%">
        <Feedback />
        <template #footer>
          <el-button @click="showFeedbackDialog = false">Close</el-button>
        </template>
      </el-dialog>

      <el-dialog v-model="showRulesDialog" title="Rules" width="30%">
        <Rules show-checkbox="false" />
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

<style scoped>
  .el-button {
    text-decoration: none;
  }
</style>
