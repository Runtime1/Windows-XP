function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
}

function openWindow(windowName) {
    const windowElement = document.getElementById(windowName.toLowerCase().replace(' ', '-'));
    windowElement.style.display = 'block';
    windowElement.style.top = `${Math.random() * 50 + 50}px`;
    windowElement.style.left = `${Math.random() * 50 + 50}px`;
    makeDraggable(windowElement);
}

document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', (event) => {
        event.target.closest('.window').style.display = 'none';
    });
});

document.querySelectorAll('.minimize').forEach(button => {
    button.addEventListener('click', (event) => {
        event.target.closest('.window').querySelector('.content').style.display = 'none';
    });
});

document.querySelectorAll('.maximize').forEach(button => {
    button.addEventListener('click', (event) => {
        const windowElement = event.target.closest('.window');
        windowElement.style.width = '100%';
        windowElement.style.height = '100%';
        windowElement.style.top = '0';
        windowElement.style.left = '0';
    });
});

function showContextMenu(event) {
    event.preventDefault();
    const contextMenu = document.getElementById('context-menu');
    contextMenu.style.top = `${event.clientY}px`;
    contextMenu.style.left = `${event.clientX}px`;
    contextMenu.style.display = 'block';
}

document.addEventListener('click', () => {
    document.getElementById('context-menu').style.display = 'none';
});

function changeCursor(cursorType) {
    document.body.style.cursor = cursorType;
}

function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    element.querySelector('.title-bar').addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - element.getBoundingClientRect().left;
        offsetY = event.clientY - element.getBoundingClientRect().top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(event) {
        if (isDragging) {
            element.style.left = `${event.clientX - offsetX}px`;
            element.style.top = `${event.clientY - offsetY}px`;
        }
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

function updateClock() {
    const clock = document.getElementById('taskbar-clock');
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

// Minesweeper game logic
function createMinesweeper() {
    const gameContainer = document.getElementById('minesweeper-game');
    const rows = 10;
    const cols = 10;
    const minesCount = 10;
    const grid = [];

    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', () => revealCell(r, c));
            gameContainer.appendChild(cell);
            row.push(cell);
        }
        grid.push(row);
    }

    // Place mines
    let placedMines = 0;
    while (placedMines < minesCount) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if (!grid[r][c].classList.contains('mine')) {
            grid[r][c].classList.add('mine');
            placedMines++;
        }
    }

    function revealCell(row, col) {
        const cell = grid[row][col];
        if (cell.classList.contains('mine')) {
            cell.classList.add('revealed');
            cell.textContent = '💣';
            alert('Game Over!');
        } else {
            cell.classList.add('revealed');
            const minesAround = countMinesAround(row, col);
            if (minesAround > 0) {
                cell.textContent = minesAround;
            }
        }
    }

    function countMinesAround(row, col) {
        let count = 0;
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c].classList.contains('mine')) {
                    count++;
                }
            }
        }
        return count;
    }
}

createMinesweeper();
