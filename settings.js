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
                default: "#5A65F1",
                blue: "#1e90ff",
                red: "#ff4d4d",
                green: "#2ecc71",
                purple: "#9b59b6",
        };
        root.style.setProperty("--clr", themes[color] || themes.default);
}

applyTheme(window.gameSettings.themeColor);
