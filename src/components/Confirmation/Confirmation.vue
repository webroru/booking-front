<script setup>
  import { ref, reactive } from 'vue';
  import Search from '../Search/Search.vue';
  import Instruction from './Instruction.vue';
  import Tax from '../Tax.vue';

  const active = ref(1);
  const emit = defineEmits(['backToInitial', 'selectBooking']);
  const isNextDisabled = ref(true);
  const selectedBooking = reactive({});

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
    Object.assign(selectedBooking, booking);
    emit('selectBooking', booking);
  };
</script>

<template>
  <el-steps :active="active" finish-status="success">
    <el-step title="Search" />
    <el-step title="Information" />
    <el-step title="Tax" />
    <el-step title="Step 4" />
  </el-steps>

  <Search v-if="active === 1" @select-booking="selectBooking" />
  <Instruction v-if="active === 2" />
  <Tax v-if="active === 3" :booking="selectedBooking" />

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
