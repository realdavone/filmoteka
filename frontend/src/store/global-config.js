import { ref } from 'vue';
import { defineStore } from 'pinia';
import socket from '../socket/main';
export const useGlobalConfigStore = defineStore('globalConfig', () => {
    const globalConfig = ref();
    async function getConfig() {
        return new Promise((resolve, reject) => {
            fetch(`${import.meta.env.VITE_BASE_URL}/config`).then(res => res.json())
                .then((data) => resolve(data))
                .catch(() => reject('Služba nie je dostupná. Skúste neskôr.'));
        });
    }
    function setConfig(config) {
        globalConfig.value = config;
    }
    socket.on('globalSettingsUpdate', (newConfig) => setConfig({ ...globalConfig.value, ...newConfig }));
    return {
        globalConfig,
        getConfig,
        setConfig
    };
});
//# sourceMappingURL=global-config.js.map