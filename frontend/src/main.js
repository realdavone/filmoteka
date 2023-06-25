import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import Notifications from '@kyvg/vue3-notification';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import _ from './utils/main';
import './styles/main.scss';
import { createPinia } from 'pinia';
import { useGlobalConfigStore } from './store/global-config';
import { useLocalSettingsStore } from './store/local-settings';
import { useAuthStore } from './store/auth';
import focus from './directives/focus';
import font from './directives/font';
const app = createApp(App);
app.use(createPinia());
app.use(Notifications);
app.use(autoAnimatePlugin);
const globalConfigStore = useGlobalConfigStore();
useLocalSettingsStore();
const authStore = useAuthStore();
function startApp() {
    _.initLoader();
    Promise.allSettled([
        authStore.refresh(localStorage.getItem('refreshToken')),
        globalConfigStore.getConfig()
    ])
        .then(result => {
        const [attemptLogin, config] = result;
        if (config.status === 'rejected')
            return _.setFailedScreen(config.reason, startApp);
        if (attemptLogin.status === 'rejected')
            localStorage.removeItem('refreshToken');
        globalConfigStore.setConfig(config.value.settings);
        app.directive('focus', focus);
        app.directive('font', font);
        app.use(router);
        app.mount('#app');
    });
}
startApp();
//# sourceMappingURL=main.js.map