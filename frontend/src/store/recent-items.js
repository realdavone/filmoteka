import { ref } from 'vue';
import { defineStore } from 'pinia';
export const useRecentTitlesStore = defineStore('recentTitles', () => {
    const recentItems = ref(JSON.parse(localStorage.getItem('recentItems') ?? '[]'));
    function addItem(item) {
        if (recentItems.value.some(title => title.id === item.id)) {
            recentItems.value.splice(recentItems.value.findIndex(title => title.id === item.id && title.type === item.type), 1);
        }
        recentItems.value = [item, ...recentItems.value];
        if (recentItems.value.length > 10)
            recentItems.value = recentItems.value.splice(0, 10);
        localStorage.setItem('recentItems', JSON.stringify(recentItems.value));
    }
    function clear() {
        recentItems.value = [];
        localStorage.removeItem('recentItems');
    }
    return {
        recentItems,
        addItem,
        clear
    };
});
//# sourceMappingURL=recent-items.js.map