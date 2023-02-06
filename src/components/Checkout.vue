<script setup>
  import { ref, computed } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import Search from './Search/Search.vue';
  import CheckOutDetails from './CheckOutDetails.vue';

  const bookingStore = useBookingStore();
  const { booking } = bookingStore;
  const emit = defineEmits(['backToInitial']);
  const active = ref(0);
  const isNextDisabled = computed(() => isNextDisabledCondition());

  const isNextDisabledCondition = () => {
    const bookingHasNotBeenSelected = Object.keys(booking).length === 0;

    return bookingHasNotBeenSelected;
  };

  const next = () => {
    active.value++;
  };

  const back = () => {
    if (active.value === 0) {
      emit('backToInitial');
    } else {
      --active.value;
    }
  };
</script>

<template>
  <el-steps :active="active" finish-status="success" class="steps">
    <el-step :title="$t('checkout.search')" />
    <el-step :title="$t('checkout.checkOutDetails')" />
  </el-steps>
  
  <Search v-if="active === 0" />
  <CheckOutDetails v-if="active === 1" />

  <div class="navigation">
    <el-button v-if="active < 1" style="margin-top: 12px" @click="back">{{ $t('common.back') }}</el-button>
    <el-button v-if="active < 1" style="margin-top: 12px" @click="next" :disabled="isNextDisabled">{{ $t('common.next') }}</el-button>
    <el-button v-else style="margin-top: 12px" @click="$emit('backToInitial')">{{ $t('common.exit') }}</el-button>
  </div>
</template>

<style scoped>
  .navigation {
    display: flex;
    justify-content: space-between;
  }

  .steps {
    margin: 0 0 40px;
  }
</style>
