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

  <el-button type="primary" @click="showFeedbackDialog = true">{{ $t('checkOutDetails.askQuestion') }}</el-button>

  <el-dialog v-model="showFeedbackDialog" :title="$t('checkOutDetails.feedback')" width="30%">
    <Feedback />
    <template #footer>
      <el-button @click="showFeedbackDialog = false">{{ $t('common.close') }}</el-button>
    </template>
  </el-dialog>
</template>
