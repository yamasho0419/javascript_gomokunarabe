const cells = document.querySelectorAll('[data-cell]');
const statusElement = document.getElementById('status');
const restartButton = document.getElementById('restart-button');
const muteButton = document.getElementById('mute-button');

// 音声ファイルを用意してください
// 音声ファイルを用意してください
const placeSound = new Audio('sounds/決定ボタンを押す6.mp3'); // コマを置く音
const winSound = new Audio('sounds/決定ボタンを押す4.mp3');     // 勝利の音
const drawSound = new Audio('sounds/決定ボタンを押す4.mp3');    // 引き分けの音

let currentPlayer = 'X';
let gameActive = true;
let isMuted = false;
const boardState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playSound(sound) {
    if (!isMuted) {
        sound.currentTime = 0;
        sound.play();
    }
}

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== null || !gameActive) {
        return;
    }

    boardState[cellIndex] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    playSound(placeSound);

    if (checkWin()) {
        statusElement.textContent = `${currentPlayer}の勝ち!`;
        gameActive = false;
        playSound(winSound);
        return;
    }

    if (boardState.every(cell => cell !== null)) {
        statusElement.textContent = '引き分け!';
        gameActive = false;
        playSound(drawSound);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `${currentPlayer}の番です`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === currentPlayer;
        });
    });
}

function restartGame() {
    boardState.fill(null);
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
    });
    currentPlayer = 'X';
    gameActive = true;
    statusElement.textContent = `${currentPlayer}の番です`;
}

function toggleMute() {
    isMuted = !isMuted;
    muteButton.textContent = isMuted ? 'ミュート解除' : 'ミュート';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
muteButton.addEventListener('click', toggleMute);

statusElement.textContent = `${currentPlayer}の番です`;