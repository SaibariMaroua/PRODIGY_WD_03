document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const board = document.querySelector('.board');
    const messageElement = document.querySelector('.message');
    const resetButton = document.querySelector('.reset-button');

    let currentPlayer = 'x'; 
    let gameActive = true; 

    function handleCellClick(event) {
        const cell = event.target;
        if (cell.classList.contains('cell') && cell.textContent === '' && gameActive) {
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);
            if (checkWin()) {
                showMessage(`Player ${currentPlayer.toUpperCase()} wins!`, 'win');
                gameActive = false;
            } else if (checkDraw()) {
                showMessage('It\'s a draw!', 'draw');
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'x' ? 'o' : 'x'; 
            }
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], 
            [3, 4, 5], 
            [6, 7, 8], 
            [0, 3, 6], 
            [1, 4, 7], 
            [2, 5, 8], 
            [0, 4, 8], 
            [2, 4, 6]  
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
        });
    }

    function checkDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    function showMessage(message, type) {
        board.classList.add('hidden'); 
        messageElement.textContent = message;
        messageElement.classList.add('show', type); 
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o'); 
        });
        board.classList.remove('hidden');
        messageElement.classList.remove('show', 'win', 'draw');
        messageElement.textContent = ''; 
        currentPlayer = 'x'; 
        gameActive = true; 
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
