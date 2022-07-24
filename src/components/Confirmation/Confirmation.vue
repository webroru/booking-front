<script setup>
  import { ref } from 'vue';
  import Search from '../Search/Search.vue';

  const active = ref(1)

  const next = () => {
    if (active.value++ > 2) active.value = 0
  }
</script>

<template>
  <el-steps :active="active" finish-status="success">
    <el-step title="Step 1" />
    <el-step title="Step 2" />
    <el-step title="Step 3" />
  </el-steps>

  <Search v-if="active===1" />

  <el-button style="margin-top: 12px" @click="next">Next step</el-button>
  <el-button style="margin-top: 12px" @click="next">Next step</el-button>
</template>
