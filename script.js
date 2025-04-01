// script.js
const board = document.getElementById("board");
const status = document.getElementById("status");
const bgMusic = document.getElementById("bg-music");
const adFallback = document.querySelector('.ad-fallback');
let currentPlayer = "X";
let cells = Array(9).fill(null);

// AdMob error handling
window.addEventListener('load', () => {
    if (!window.adsbygoogle) {
        adFallback.style.display = 'block';
    }
});

// Refresh ads on game reset
function refreshAds() {
    if (window.adsbygoogle) {
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error('Ad refresh failed:', e);
            adFallback.style.display = 'block';
        }
    }
}

function createBoard() {
    board.innerHTML = "";
    cells.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    });
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (cells[index] || checkWinner()) return;
    
    cells[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("taken");
    
    if (checkWinner()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        return;
    }
    
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

function resetGame() {
    cells = Array(9).fill(null);
    currentPlayer = "X";
    status.textContent = "Player X's turn";
    createBoard();
    refreshAds();
}

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
}

createBoard();
