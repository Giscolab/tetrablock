/*jshint esversion: 6 */
/* jshint browser: true */

import { getNextTetromino, rotate, colors } from "./tetromino.js";

export const canvas = document.getElementById("game-canvas");
export const context = canvas.getContext("2d");

export const grid = 32;

export let score = 0;
export let lines = 0;

let count = 0;
let gridOption = "none";
export let playfield = [];
for (let row = -2; row < 20; row++) {
        playfield[row] = [];
        for (let col = 0; col < 10; col++) {
                playfield[row][col] = 0;
        }
}

export let tetromino = getNextTetromino(playfield);
export let gameOver = false;
let rAF = null;

function isInsidePlayfield(cellCol, cellRow, matrixRowLength, matrixColLength) {
        return !(cellCol < 0 || cellCol >= matrixColLength || cellRow >= matrixRowLength);
}

function isCellEmpty(cellRow, cellCol) {
        return !playfield[cellRow][cellCol];
}

export function isValidMove(matrix, cellRow, cellCol) {
        for (let row = 0; row < matrix.length; row++) {
                for (let col = 0; col < matrix[row].length; col++) {
                        if (matrix[row][col]) {
                                if (!isInsidePlayfield(cellCol + col, cellRow + row, playfield.length, playfield[0].length) || !isCellEmpty(cellRow + row, cellCol + col)) {
                                        return false;
                                }
                        }
                }
        }
        return true;
}

export function placeTetromino() {
        for (let row = 0; row < tetromino.matrix.length; row++) {
                for (let col = 0; col < tetromino.matrix[row].length; col++) {
                        if (tetromino.matrix[row][col]) {
                                if (tetromino.row + row < 0) {
                                        return showGameOver();
                                }
                                playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
                        }
                }
        }
        for (let row = playfield.length - 1; row >= 0; row--) {
                if (playfield[row].every(cell => !!cell)) {
                        score++;
                        document.getElementById("score-content").textContent = score;
                        lines++;
                        document.getElementById("time-content").textContent = lines;
                        for (let r = row; r >= 0; r--) {
                                for (let c = 0; c < playfield[r].length; c++) {
                                        playfield[r][c] = playfield[r - 1][c];
                                }
                        }
                }
        }
        tetromino = getNextTetromino(playfield);
}

function showGameOver() {
        cancelAnimationFrame(rAF);
        gameOver = true;
        const modal = document.createElement('div');
        modal.id = 'game-over-modal';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.background = 'rgba(0, 0, 0, 0.8)';
        modal.style.color = 'white';
        modal.style.padding = '20px';
        modal.style.borderRadius = '10px';
        modal.style.textAlign = 'center';
        modal.style.zIndex = '1000';
        modal.innerHTML = `
    <h1>GAME OVER!</h1>
    <p>Score: ${score}</p>
    <button id="restart-button" style="padding: 10px 20px; border: none; border-radius: 5px; background: #5A65F1; color: white; font-size: 16px; cursor: pointer;">
      Rejouer
    </button>
  `;
        document.body.appendChild(modal);
        document.getElementById('restart-button').addEventListener('click', () => {
                document.body.removeChild(modal);
                startNewGame();
        });
}

export function startNewGame() {
        score = 0;
        lines = 0;
        document.getElementById("score-content").textContent = score;
        document.getElementById("time-content").textContent = lines;
        playfield = [];
        for (let row = -2; row < 20; row++) {
                playfield[row] = [];
                for (let col = 0; col < 10; col++) {
                        playfield[row][col] = 0;
                }
        }
        tetromino = getNextTetromino(playfield);
        count = 0;
        gameOver = false;
        startLoop();
}

export function setGridOption(option) {
        gridOption = option;
}

function drawGrid() {
        context.strokeStyle = "white";
        if (gridOption === "none") {
                return;
        }
        else if (gridOption === "standard") {
                for (let x = 0; x < canvas.width; x += grid) {
                        context.beginPath();
                        context.moveTo(x, 0);
                        context.lineTo(x, canvas.height);
                        context.stroke();
                }
                for (let y = 0; y < canvas.height; y += grid) {
                        context.beginPath();
                        context.moveTo(0, y);
                        context.lineTo(canvas.width, y);
                        context.stroke();
                }
        }
        else if (gridOption === "vertical") {
                for (let x = 0; x < canvas.width; x += grid) {
                        context.beginPath();
                        context.moveTo(x, 0);
                        context.lineTo(x, canvas.height);
                        context.stroke();
                }
        }
        else if (gridOption === "horizontal") {
                for (let y = 0; y < canvas.height; y += grid) {
                        context.beginPath();
                        context.moveTo(0, y);
                        context.lineTo(canvas.width, y);
                        context.stroke();
                }
        }
}

function cloneTetromino(t) {
        return {
                matrix: t.matrix.map(row => row.slice()),
                row: t.row,
                col: t.col,
                name: t.name
        };
}

function drawGhostTetromino() {
        if (!gameSettings.ghost) return;
        const ghost = cloneTetromino(tetromino);
        while (isValidMove(ghost.matrix, ghost.row + 1, ghost.col)) {
                ghost.row++;
        }
        context.fillStyle = "rgba(255, 255, 255, 0.3)";
        context.strokeStyle = "rgba(255, 255, 255, 0.5)";
        context.lineWidth = 1;
        for (let row = 0; row < ghost.matrix.length; row++) {
                for (let col = 0; col < ghost.matrix[row].length; col++) {
                        if (ghost.matrix[row][col]) {
                                context.fillRect((ghost.col + col) * grid, (ghost.row + row) * grid, grid - 1, grid - 1);
                                context.strokeRect((ghost.col + col) * grid, (ghost.row + row) * grid, grid - 1, grid - 1);
                        }
                }
        }
}

export function loop() {
        rAF = requestAnimationFrame(loop);
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        for (let row = 0; row < 20; row++) {
                for (let col = 0; col < 10; col++) {
                        if (playfield[row][col]) {
                                const name = playfield[row][col];
                                context.fillStyle = colors[name];
                                context.fillRect(col * grid, row * grid, grid - 1, grid - 1);
                        }
                }
        }
        if (tetromino) {
                if (++count > (40 - gameSettings.blockSpeed * 2) - Math.floor(score / 10)) {
                        tetromino.row++;
                        count = 0;
                        if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
                                tetromino.row--;
                                placeTetromino();
                        }
                }
                drawGhostTetromino();
                context.fillStyle = colors[tetromino.name];
                context.strokeStyle = "black";
                context.lineWidth = 3;
                for (let row = 0; row < tetromino.matrix.length; row++) {
                        for (let col = 0; col < tetromino.matrix[row].length; col++) {
                                if (tetromino.matrix[row][col]) {
                                        context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid, grid);
                                        context.strokeRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid, grid);
                                }
                        }
                }
        }
}

export function moveLeft() {
        if (!gameOver && isValidMove(tetromino.matrix, tetromino.row, tetromino.col - 1)) {
                tetromino.col--;
        }
}

export function moveRight() {
        if (!gameOver && isValidMove(tetromino.matrix, tetromino.row, tetromino.col + 1)) {
                tetromino.col++;
        }
}

export function rotateLeft() {
        if (!gameOver) {
                const matrix = rotate(rotate(rotate(tetromino.matrix)));
                if (isValidMove(matrix, tetromino.row, tetromino.col)) {
                        tetromino.matrix = matrix;
                }
        }
}

export function rotateRight() {
        if (!gameOver) {
                const matrix = rotate(tetromino.matrix);
                if (isValidMove(matrix, tetromino.row, tetromino.col)) {
                        tetromino.matrix = matrix;
                }
        }
}

export function softDrop() {
        const row = tetromino.row + 1;
        if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
                tetromino.row = row - 1;
                placeTetromino();
                return;
        }
        tetromino.row = row;
}

export function startLoop() {
        if (!window.requestAnimationFrame) {
                window.alert("Désolé, votre navigateur ne supporte pas requestAnimationFrame.");
                return;
        }
        rAF = requestAnimationFrame(loop);
}
