import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import 'normalize.css';
import messages from './localisation/messages';

const pinia = createPinia();
const app = createApp(App);
const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
  messages,
});


app.use(pinia);
app.use(ElementPlus);
app.use(i18n);
app.mount('#app');
