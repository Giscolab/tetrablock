/*jshint esversion: 6 */
/* jshint browser: true */

// Gestion des tétraminos et utilitaires associés

const tetrominoShapes = {
        I: "0/1111/0/0",
        J: "100/111/0",
        L: "001/111/0",
        O: "11/11",
        S: "011/110/0",
        Z: "110/011/0",
        T: "010/111/0",
};

function createMatrix(shape) {
        return shape.split("/")
                .map((row) => [...row].map(Number));
}

export const tetrominos = Object.fromEntries(Object.entries(tetrominoShapes)
        .map(([name, shape]) => [
                name,
                createMatrix(shape),
        ]));

export const colors = {
        I: "cyan",
        O: "yellow",
        T: "purple",
        S: "green",
        Z: "red",
        J: "blue",
        L: "orange",
};

function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateSequence() {
        const sequence = ["I", "J", "L", "O", "S", "T", "Z"];
        const tetrominoSequence = [];
        while (sequence.length) {
                const rand = getRandomInt(0, sequence.length - 1);
                const name = sequence.splice(rand, 1)[0];
                tetrominoSequence.push(name);
        }
        return tetrominoSequence;
}

let tetrominoSequence = [];

export function getNextTetromino(playfield) {
        if (tetrominoSequence.length === 0) {
                tetrominoSequence = generateSequence();
        }
        const name = tetrominoSequence.pop();
        const matrix = tetrominos[name];
        const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);
        const row = name === "I" ? -1 : -2;
        return {
                name,
                matrix,
                row,
                col,
        };
}

export function rotate(matrix) {
        const N = matrix.length - 1;
        const result = Array.from({
                        length: N + 1
                }, () => Array(N + 1).fill(0));
        for (let i = 0; i <= N; i++) {
                for (let j = 0; j <= N; j++) {
                        result[j][N - i] = matrix[i][j];
                }
        }
        return result;
}
