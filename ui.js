/*jshint esversion: 6 */
/* jshint browser: true */

import { startLoop, setGridOption } from "./board.js";
import "./controls.js";

let modal;

document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("start-button").addEventListener("click", () => {
                document.getElementById("game-container").classList.add("game-started");
                document.getElementById("menu").style.display = "none";
                document.getElementById("game-canvas").style.display = "block";
                startLoop();
        });

        document.getElementById("grid").addEventListener("change", function() {
                gameSettings.grid = this.value;
                setGridOption(this.value);
        });
        document.getElementById("theme-color").addEventListener("change", function() {
                gameSettings.themeColor = this.value;
                applyTheme(this.value);
        });
        document.getElementById("block-speed").addEventListener("change", function() {
                gameSettings.blockSpeed = Number(this.value);
        });
        document.getElementById("sound").addEventListener("change", function() {
                gameSettings.sound = this.checked;
        });
        document.getElementById("visual-effects").addEventListener("change", function() {
                gameSettings.visualEffects = this.checked;
        });
        document.getElementById("language").addEventListener("change", function() {
                gameSettings.language = this.value;
        });

        let menu = document.getElementById("menu");
        let menuItems = Array.from(menu.getElementsByClassName("menu-item"));
        let containers = Array.from(document.getElementsByClassName("container"));
        menuItems.forEach((item) => {
                item.addEventListener("click", function() {
                        menuItems.forEach((i) => i.classList.remove("active"));
                        this.classList.add("active");
                        const targetContainer = document.getElementById(this.dataset.target);
                        containers.forEach((container) => (container.style.display = "none"));
                        targetContainer.style.display = "block";
                });
        });

        function showElement(buttonId, targetContainerId, targetClass) {
                let targetContainer = document.getElementById(targetContainerId);
                document.getElementById(buttonId).addEventListener("click", function() {
                        targetContainer.classList.add(targetClass);
                        menu.style.display = "none";
                        targetContainer.style.display = "block";
                });
        }

        function hideElement(buttonId, targetContainerId, targetClass) {
                let targetContainer = document.getElementById(targetContainerId);
                document.getElementById(buttonId).addEventListener("click", function() {
                        targetContainer.classList.remove(targetClass);
                        targetContainer.style.display = "none";
                        menu.style.display = "flex";
                });
        }

        showElement("instructions-button", "instructions-container", "instructions-started");
        hideElement("close-instructions-button", "instructions-container", "instructions-started");
        showElement("high-scores-button", "score-container", "score-started");
        hideElement("close-score-button", "score-container", "score-started");
        showElement("options-button", "options-container", "options-started");
        hideElement("close-options-button", "options-container", "options-started");

        let menuMusic = document.getElementById("menu-music");
        menuMusic.play();
        menuMusic.pause();
        menuMusic.currentTime = 0;
        let soundCheckbox = document.getElementById("sound");
        soundCheckbox.addEventListener("change", function() {
                if (this.checked) {
                        menuMusic.play();
                }
                else {
                        menuMusic.pause();
                        menuMusic.currentTime = 0;
                }
        });

        modal = document.getElementById("modal");

        function startGame() {
                closeModal();
        }

        function showInstructions() {
                closeModal();
        }

        function showScores() {
                closeModal();
        }

        function showOptions() {
                closeModal();
        }

        function showModal() {
                modal.style.display = "flex";
        }

        function closeModal() {
                modal.style.display = "none";
        }

        document.getElementById("start-button").addEventListener("click", startGame);
        document.getElementById("instructions-button").addEventListener("click", showInstructions);
        document.getElementById("high-scores-button").addEventListener("click", showScores);
        document.getElementById("options-button").addEventListener("click", showOptions);
        window.addEventListener("load", showModal);
});

const backButtons = document.getElementsByClassName("back-button");
for (const element of backButtons) {
        element.addEventListener("click", showMainMenu);
}

function showMainMenu() {
        document.getElementById("menu").style.display = "flex";
        document.getElementById("instructions-container").style.display = "none";
        document.getElementById("score-container").style.display = "none";
        document.getElementById("options-container").style.display = "none";
        if (modal) {
                modal.style.display = "flex";
        }
}

let menuBackButton = document.getElementById("menu-back-button");
if (menuBackButton) {
        menuBackButton.addEventListener("click", function() {
                showMainMenu();
        });
}
