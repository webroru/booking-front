import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n';

export const useNavigationStore = defineStore('navigation', () => {
  const { t } = useI18n();

  const button = reactive({
    label: t('common.next'),
    disabled: true,
    variant: 'primary',
    confirmation: null,
    to: '/',
  })

  return {
    button,
  }
})
