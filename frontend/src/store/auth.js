import { ref } from 'vue';
import { defineStore } from 'pinia';
export const useAuthStore = defineStore('authStore', () => {
    const user = ref(null);
    const isLoggedIn = ref(false);
    const accessToken = ref(null);
    function setCredentials(userArg, accessTokenArg) {
        user.value = userArg;
        isLoggedIn.value = true;
        accessToken.value = accessTokenArg;
    }
    function clearCredentials() {
        user.value = null;
        isLoggedIn.value = false;
        accessToken.value = null;
    }
    async function login({ email, password }) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (data.success === false) {
                    throw (data.message);
                }
                setCredentials(data.user, data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                resolve({ success: true, message: 'Úspešné prihlásenie' });
            }
            catch (error) {
                reject({ success: false, message: error });
            }
        });
    }
    async function refresh(refreshToken) {
        return new Promise(async (resolve, reject) => {
            if (refreshToken === null)
                return reject('Žiadny token');
            try {
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refreshToken })
                });
                const data = await res.json();
                if (data.success === false)
                    throw (data.message);
                setCredentials(data.user, data.accessToken);
                resolve({ success: true, message: 'Úspešné prihlásenie' });
            }
            catch (error) {
                reject({ success: false, message: error });
            }
        });
    }
    async function logout() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') })
                });
                const data = await res.json();
                if (data.success === false)
                    throw (data.message);
                clearCredentials();
                resolve({ success: true, message: 'Úspešné odhlásenie' });
            }
            catch (error) {
                reject({ success: false, message: error });
            }
        });
    }
    async function google(token) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/google`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token })
                });
                const data = await res.json();
                if (data.success === false)
                    throw (data.message);
                setCredentials(data.user, data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                resolve({ success: true, message: 'Úspešné prihlásenie' });
            }
            catch (error) {
                reject({ success: false, message: error });
            }
        });
    }
    return {
        user,
        isLoggedIn,
        accessToken,
        login,
        refresh,
        google,
        logout
    };
});
//# sourceMappingURL=auth.js.map