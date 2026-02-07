<script setup lang="ts">
  import { Delete, Avatar, QuestionFilled } from '@element-plus/icons-vue';
  import type { Guest } from '@/types/guest';

  defineProps<{
    guest: Guest | null;
    index: number;
  }>();
</script>

<template>
  <el-row align="middle">
    <el-col :span="2">{{ index }}</el-col>
    <el-col :span="2"><el-icon :color="!guest ? 'red' : 'black'"><avatar /></el-icon></el-col>
    <el-col v-if="guest" :span="17">{{guest.firstName }} {{guest.lastName }}</el-col>
    <el-col v-else :span="17"><el-icon :color="'red'"><question-filled /></el-icon></el-col>
    <el-col v-if="guest && !guest.id" :span="3"><el-button type="danger" :icon="Delete" circle @click="$emit('remove', index)" /></el-col>
  </el-row>
</template>
