<script setup>
  import { reactive, ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  import { useBookingStore } from '@/stores/booking';

  const bookingStore = useBookingStore();
  const { booking, sendMessage } = bookingStore;
  const { t } = useI18n();
  const formRef = ref({});
  const form = reactive({
    message: '',
  });

  const onSubmit = (formEl) => {
    formEl.validate((valid, fields) => {
      if (!valid) {
        console.log('error submit!', fields);
        return;
      }
      sendMessage(booking.orderId, form.message);
      ElMessage({
        message: t('feedback.sent'),
        type: 'success',
      });
    });
  };
</script>

<template>
  <el-form :model="form" label-width="120px" ref="formRef">
    <el-form-item prop="message" label="Message" :rules="{
      required: true,
      message: $t('feedback.validation'),
      trigger: 'blur',
    }">
      <el-input v-model="form.message" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(formRef)">Send</el-button>
    </el-form-item>
  </el-form>
</template>
