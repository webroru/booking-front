<script setup>
  import { ref } from 'vue';
  import Search from '../Search/Search.vue';
  import Instruction from './Instruction.vue';

  const active = ref(1);
  const emit = defineEmits(['backToInitial', 'selectBooking']);
  const isNextDisabled = ref(true);

  const next = () => {
    if (active.value++ > 2) active.value = 1;
  }

  const back = () => {
    if (--active.value < 1) {
      emit('backToInitial');
      isNextDisabled.value = true;
    }
  }

  const selectBooking = (booking) => {
    isNextDisabled.value = Object.keys(booking).length === 0 && active.value === 1;
    emit('selectBooking', booking);
  };
</script>

<template>
  <el-steps :active="active" finish-status="success">
    <el-step title="Step 1" />
    <el-step title="Step 2" />
    <el-step title="Step 3" />
  </el-steps>

  <Search v-if="active===1" @select-booking="selectBooking" />
  <Instruction v-if="active===2" />

  <div class="navigation">
    <el-button style="margin-top: 12px" @click="back">Back</el-button>
    <el-button style="margin-top: 12px" @click="next" :disabled="isNextDisabled">Next step</el-button>
  </div>
</template>

<style scoped>
  .navigation {
    display: flex;
    justify-content: space-between;
  }
</style>
