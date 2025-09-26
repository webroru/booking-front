import { createI18n } from 'vue-i18n';
import messages from '@/localisation/messages';

export const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages,
});
