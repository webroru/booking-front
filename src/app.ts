import { createApp } from 'vue';
import App from '@/App.vue';
import { pinia } from '@/plugins/pinia';
import { i18n } from '@/plugins/i18n';
import { router } from '@/plugins/router';
import 'normalize.css';

export function setupApp() {
    const app = createApp(App);

    app.use(pinia);
    app.use(i18n);
    app.use(router);

    return app;
}
