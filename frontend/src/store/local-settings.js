import { reactive } from 'vue';
import { defineStore } from 'pinia';
export const useLocalSettingsStore = defineStore('localSettings', () => {
    const localSettings = reactive(initLocalSettings());
    function initLocalSettings() {
        const savedPinnedPlayer = Boolean(JSON.parse(localStorage.getItem('pinnedPlayer') ?? 'false'));
        const savedMainColor = localStorage.getItem('themeColor') ?? '#ED3F00';
        const savedDarkTheme = Boolean(JSON.parse(localStorage.getItem('darkTheme') ?? 'true'));
        return {
            pinnedPlayer: savedPinnedPlayer,
            themeColors: {
                colors: ['#ED3F00', '#F78764', '#2176AE', '#FBB13C', '#008080', '#89BD9E', '#B84A62'],
                mainColor: savedMainColor
            },
            darkTheme: savedDarkTheme
        };
    }
    function togglePinnedPlayer() {
        localSettings.pinnedPlayer = !localSettings.pinnedPlayer;
        localStorage.setItem('pinnedPlayer', JSON.stringify(localSettings.pinnedPlayer));
    }
    function setThemeColor(color) {
        localSettings.themeColors.mainColor = color;
        const root = document.querySelector(':root');
        root.style.setProperty('--theme-color', localSettings.themeColors.mainColor);
        root.style.setProperty('--theme-color-transparent', localSettings.themeColors.mainColor + '90');
        localStorage.setItem('themeColor', localSettings.themeColors.mainColor);
    }
    function setDarkTheme(darkTheme) {
        localSettings.darkTheme = darkTheme;
        document.body.setAttribute('data-dark-theme', darkTheme.toString());
        localStorage.setItem('darkTheme', JSON.stringify(localSettings.darkTheme));
    }
    (() => {
        setThemeColor(localSettings.themeColors.mainColor);
        setDarkTheme(localSettings.darkTheme);
    })();
    return {
        localSettings,
        togglePinnedPlayer,
        setThemeColor,
        setDarkTheme
    };
});
//# sourceMappingURL=local-settings.js.map