<script setup>
import { useRoute } from 'vue-router'
import { useNavigationStore } from '@/stores/navigation'

const route = useRoute()
const navigation = useNavigationStore()
</script>

<template>
  <router-link
      v-if="!navigation.isLastStep(route.path)"
      :to="navigation.button.to"
      :class="{ disabled: navigation.button.disabled }"
  >
    <el-button :type="navigation.button.variant" :disabled="navigation.button.disabled">
      <b>{{ navigation.button.label }}</b>
    </el-button>
  </router-link>

  <router-link v-else to="/">
    <el-button>{{ $t('common.exit') }}</el-button>
  </router-link>
</template>

<style scoped>
a {
  margin-top: 12px;
  text-decoration: none;
}

.disabled {
  pointer-events: none;
}
</style>
