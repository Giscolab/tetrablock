/*jshint esversion: 6 */
/* jshint browser: true */

import { moveLeft, moveRight, rotateLeft, rotateRight, softDrop } from "./board.js";

document.addEventListener("keydown", function(e) {
        if (e.key === "ArrowLeft") {
                moveLeft();
        }
        if (e.key === "ArrowRight") {
                moveRight();
        }
        if (e.key === "ArrowUp") {
                rotateRight();
        }
        if (e.key === "ArrowDown") {
                softDrop();
        }
});

document.getElementById("deplacer-gauche").addEventListener("click", moveLeft);
document.getElementById("deplacer-droite").addEventListener("click", moveRight);
document.getElementById("tourner-gauche").addEventListener("click", rotateLeft);
document.getElementById("tourner-droite").addEventListener("click", rotateRight);
