/*jshint esversion: 6 */
/* jshint browser: true */

window.gameSettings = {
        grid: "standard",
        ghost: false,
        themeColor: "default",
        blockSpeed: 5,
        sound: true,
        visualEffects: true,
        language: "french",
};

function applyTheme(color) {
        const root = document.documentElement;
        const themes = {
                default: { primary: "#5A65F1", secondary: "#ff00ff" },
                blue: { primary: "#00bfff", secondary: "#0099cc" },
                red: { primary: "#ff4500", secondary: "#ff6347" },
                green: { primary: "#32cd32", secondary: "#90ee90" },
                purple: { primary: "#ba55d3", secondary: "#da70d6" },
        };
        const theme = themes[color] || themes.default;
        root.style.setProperty("--primary-color", theme.primary);
        if (theme.secondary) {
                root.style.setProperty("--secondary-color", theme.secondary);
        }
}

applyTheme(window.gameSettings.themeColor);
