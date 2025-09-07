/*jshint esversion: 6 */
/* jshint browser: true */

window.gameSettings = {
        grid: "standard",
        ghost: false,
        themeColor: "default",
        customTheme: {
                background: "#0a0a1a",
                border: "#5A65F1",
                text: "#ffffff",
        },
        blockSpeed: 5,
        sound: true,
        visualEffects: true,
        language: "french",
};

const themes = {
        default: {
                background: "#0a0a1a",
                border: "#5A65F1",
                text: "#ffffff",
        },
        blue: {
                background: "#001f3f",
                border: "#1e90ff",
                text: "#ffffff",
        },
        red: {
                background: "#330000",
                border: "#ff4d4d",
                text: "#ffffff",
        },
        green: {
                background: "#001f1a",
                border: "#2ecc71",
                text: "#ffffff",
        },
        purple: {
                background: "#2e003e",
                border: "#9b59b6",
                text: "#ffffff",
        },
};

function applyTheme(theme) {
        const root = document.documentElement;
        const selectedTheme = typeof theme === "string" ? themes[theme] || themes.default : theme;
        if (!selectedTheme) {
                return;
        }
        root.style.setProperty("--dark-bg", selectedTheme.background);
        root.style.setProperty("--primary-color", selectedTheme.border);
        root.style.setProperty("--text-primary", selectedTheme.text);
}

applyTheme(window.gameSettings.themeColor === "custom" ? window.gameSettings.customTheme : window.gameSettings.themeColor);
