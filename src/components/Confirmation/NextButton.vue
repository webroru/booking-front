<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useNavigationStore } from '@/stores/navigation';

  const router = useRouter()
  const navigation = useNavigationStore();
  const { button } = navigation;
  const showDialog = ref(false);

  const onClick = () => {
    if (button.confirmation) {
      showDialog.value = true;
    } else {
      router.push(button.to);
    }
  }

  const confirm = () => {
    showDialog.value = false
    router.push(button.to);
  }
</script>

<template>
  <el-button
      class="button"
      :type="button.variant"
      :disabled="button.disabled"
      :class="{ disabled: button.disabled, 'glow-button': !button.disabled && button.variant === 'primary' }"
      @click="onClick"
  >
    <b>{{ button.label }}</b>
  </el-button>

  <el-dialog v-model="showDialog" title="Warning" width="80%">
    {{ $t('documents.temporaryAccessWarning') }}
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="confirm">{{ $t('common.next') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
  .button {
    margin-top: 12px;
    text-decoration: none;
  }

  .disabled {
    pointer-events: none;
  }

  @keyframes glow {
    0% {
      box-shadow: 0 0 0 rgba(64, 158, 255, 0);
    }
    50% {
      box-shadow: 0 0 12px rgba(64, 158, 255, 0.6);
    }
    100% {
      box-shadow: 0 0 0 rgba(64, 158, 255, 0);
    }
  }

  .glow-button {
    animation: glow 2s infinite;
  }
</style>
