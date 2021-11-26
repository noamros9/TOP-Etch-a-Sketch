let mouseDown = 0;
let faceSize = 16;

const colorCell = (e) => {
    setTimeout(() => {
        if(mouseDown) e.target.classList.add('colored');
    }, 25);
}

const initDrawWithMouseClicked = () => {
    // enable drawing by click and move - hence disabling drag and drop
    document.body.ondragstart = function() { return false; }
    document.body.ondrop = function() { return false; }
    
    document.body.onmousedown = function() { mouseDown = 1; }
    document.body.onmouseup = function() { mouseDown = 0; }
} 

const createGrid = (faceSize) => {
    const grid = document.getElementsByClassName('grid')[0];
    grid.style.gridTemplateRows = `repeat(${faceSize}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${faceSize}, 1fr)`;
    
    for(let i = 0; i < faceSize**2 ; i++){
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mouseenter', colorCell);
        grid.appendChild(cell); 
    }
}

const clearBoard = (e) => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.classList.remove('colored')
    })
}

const setClearButton = () => {
    const clearButton = document.getElementsByClassName('clear-button')[0];
    clearButton.addEventListener('click', clearBoard)    
}


const setButtonsEvents = () => {
    setClearButton();
}

const initGame = (faceSize) => {
    createGrid(faceSize);
    initDrawWithMouseClicked();
    setButtonsEvents();
}

initGame(faceSize)





    


