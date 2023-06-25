import { defineStore } from 'pinia';
import { reactive } from 'vue';
import socket from '../socket/main';
export const useNotificationStore = defineStore('notificationsStore', () => {
    const notifications = reactive({
        recommended: []
    });
    function addNotification(key, value) {
        notifications[key] = [value, ...notifications[key]];
    }
    function removeNotification(key) {
        notifications[key] = [];
    }
    socket.on('newRecommended', (data) => {
        const { type, id } = data.title.title;
        addNotification('recommended', { type, id });
    });
    return {
        notifications,
        addNotification,
        removeNotification
    };
});
//# sourceMappingURL=notifications.js.map