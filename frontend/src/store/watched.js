import { ref } from 'vue';
import { defineStore } from 'pinia';
export const useWatchedStore = defineStore('watched', () => {
    const watched = ref(JSON.parse(localStorage.getItem('watched') ?? '[]'));
    function toggle({ id, type, title }) {
        const doesExist = exists({ type, id });
        if (doesExist)
            watched.value = watched.value.filter(title => title.id !== id);
        else
            watched.value.push({ id, type, title });
        localStorage.setItem('watched', JSON.stringify(watched.value));
    }
    function exists({ type, id }) {
        return watched.value.some(item => item['type'].toLowerCase() === type?.toLowerCase() && item['id'].toString() === id?.toString());
    }
    return {
        watched,
        toggle,
        exists
    };
});
//# sourceMappingURL=watched.js.map