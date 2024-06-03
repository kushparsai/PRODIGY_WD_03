const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
const clickSound = new Audio('start.mp3');
const winSound = new Audio('file:///C:/Users/Kush%20parsai/Downloads/click.mp3.mp3');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);

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

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== null) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    clickSound.play();

    if (checkWinner()) {
        messageElement.textContent = `Player ${currentPlayer} wins!`;
        winSound.play();
        board.removeEventListener('click', handleCellClick);
    } else if (gameState.every(cell => cell !== null)) {
        messageElement.textContent = 'It\'s a draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function resetGame() {
    gameState = Array(9).fill(null);
    currentPlayer = 'X';
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
    board.addEventListener('click', handleCellClick);
}

board.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);
