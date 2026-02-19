<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import NextButton from '@/components/Confirmation/NextButton.vue';
  import PrevButton from '@/components/Confirmation/PrevButton.vue';

  const route = useRoute();
  const active = computed(() => {
    const stepIndex = step.findIndex(path => route.path.includes(path));
    return stepIndex === 6 ? stepIndex - 1 : stepIndex;
  });

  const step = [
    'search',
    'instruction',
    'rules',
    'documents',
    'payment',
    'booking-info',
  ];
</script>

<template>
  <el-steps :active="active" finish-status="success" class="steps hidden-xs-only">
    <el-step :title="$t('confirmation.search')" />
    <el-step :title="$t('confirmation.information')" />
    <el-step :title="$t('confirmation.rules')" />
    <el-step :title="$t('confirmation.documents')" />
    <el-step :title="$t('confirmation.payment')" />
    <el-step :title="$t('confirmation.checkInDetails')" />
  </el-steps>

  <router-view></router-view>

  <div class="navigation">
    <prev-button />
    <next-button />
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
