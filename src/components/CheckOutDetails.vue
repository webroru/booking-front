<script setup>
  import { ref } from 'vue';
  import { useInfoStore } from '@/stores/info';
  import Feedback from './Feedback.vue';

  const infoStore = useInfoStore();
  const { info } = infoStore;
  const showFeedbackDialog = ref(false);
</script>

<template>
  <div v-html="info.checkoutInfo"></div>

  <el-button type="primary" @click="showFeedbackDialog = true">Отправьте запрос или вопрос</el-button>

  <el-dialog v-model="showFeedbackDialog" title="Send Feedback" width="30%">
    <Feedback />
    <template #footer>
      <el-button @click="showFeedbackDialog = false">Close</el-button>
    </template>
  </el-dialog>
</template>
