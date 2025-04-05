import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createI18n } from 'vue-i18n';
import App from '@/App.vue';
import 'normalize.css';
import messages from './localisation/messages';
import routes from './routing/routes';

const pinia = createPinia();
const app = createApp(App);
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages,
});
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


app.use(pinia);
app.use(ElementPlus);
app.use(i18n);
app.use(router);
app.mount('#app');
