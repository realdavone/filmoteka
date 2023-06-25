const baseURL = import.meta.env.VITE_BASE_URL;
import { useAuthStore } from '../store/auth';
function makeRequest({ endpoint, options }) {
    const authStore = useAuthStore();
    let request = new Request(`${baseURL}${endpoint}`, {
        method: options?.method ?? 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(authStore.accessToken ? { 'access-token': authStore.accessToken } : undefined),
        },
        body: options?.body
    });
    return new Promise((resolve, reject) => {
        fetch(request.clone())
            .then(res => {
            if (res.ok)
                return res.json();
            if (res.status === 401 && localStorage.getItem('refreshToken') !== null) {
                authStore.refresh(localStorage.getItem('refreshToken')).then(() => {
                    let request = new Request(`${baseURL}${endpoint}`, {
                        method: options?.method ?? 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            ...(authStore.accessToken ? { 'access-token': authStore.accessToken } : undefined),
                        },
                        body: options?.body
                    });
                    fetch(request.clone())
                        .then(res => res.json())
                        .catch(err => err);
                });
            }
            else {
                throw new Error('Niečo sa pokazilo.');
            }
        })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}
export default makeRequest;
//# sourceMappingURL=main.js.map