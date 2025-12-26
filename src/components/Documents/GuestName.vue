<script setup>
  import { Delete } from '@element-plus/icons-vue';

  defineProps({
    guest: Object,
    index: Number,
  });
</script>

<template>
  <el-row align="middle">
    <el-col :span="18">{{guest.firstName }} {{guest.lastName}}</el-col>
    <el-col v-if="!guest.id" :span="6"><el-button type="danger" :icon="Delete" circle @click="$emit('remove', index)" /></el-col>
  </el-row>
</template>
