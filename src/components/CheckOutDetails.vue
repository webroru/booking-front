<script setup>
  import { ref } from 'vue';
  import { Select, CloseBold } from '@element-plus/icons-vue';
  import Feedback from './Feedback.vue';

  const showFeedbackDialog = ref(false);

  const list = [
    { title: 'Собрать чемодан', isDone: true },
    { title: 'Проверить билеты', isDone: false },
    { title: 'Купить сувениры', isDone: false },
    { title: 'Посидеть на дорожку', isDone: false },
  ];
</script>

<template>
  <el-row v-for="item in list" :key="item.title">
    <el-col :span="20">
      {{ item.title }}
    </el-col>
    <el-col :span="4">
      <el-icon>
        <Select v-if="item.isDone" />
        <CloseBold v-else />
      </el-icon>
    </el-col>
  </el-row>

  <el-button type="primary" @click="showFeedbackDialog = true">Отправьте запрос или вопрос</el-button>

  <el-dialog v-model="showFeedbackDialog" title="Send Feedback" width="30%">
    <Feedback />
    <template #footer>
      <el-button @click="showFeedbackDialog = false">Close</el-button>
    </template>
  </el-dialog>
</template>
