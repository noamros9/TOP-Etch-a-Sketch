let mouseDown = 0;
let eraseMode = 0;
let faceSize = 16;

const colorCell = (e) => {
    setTimeout(() => {
        if(mouseDown){
            if(!eraseMode) e.target.classList.add('colored');
            if(eraseMode) e.target.classList.remove('colored');
        }
    }, 25);
}


const initDrawWithMouseClicked = () => {
    // enable drawing by click and move - hence disabling drag and drop
    document.body.ondragstart = function() { return false; }
    document.body.ondrop = function() { return false; }
    
    document.body.onmousedown = function() { mouseDown = 1; }
    document.body.onmouseup = function() { mouseDown = 0; }
} 

const removeExistingGrid = () => {
    const currentGrid = document.getElementsByClassName('grid')[0];
    if(currentGrid){
        document.querySelector('.board').removeChild(currentGrid);
    }
}

const createGrid = (faceSize) => {
    
    removeExistingGrid();

    // create new grid
    const grid = document.createElement('div');
    grid.classList.add('grid');
    document.querySelector('.board').appendChild(grid);

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

    // clear board returns us to etching mode
    eraseMode = 0;
    document.getElementsByClassName('erase-button')[0].textContent = "Erase";
    
}


const setClearButton = () => {
    const clearButton = document.getElementsByClassName('clear-button')[0];
    clearButton.addEventListener('click', clearBoard)    

}

const setEraseButton = () => {
    const eraseButton = document.getElementsByClassName('erase-button')[0];
    eraseButton.addEventListener('click', (e) => {
        eraseMode = !eraseMode
        e.target.textContent = e.target.textContent == "Erase" ? "Etch" : "Erase";
    })
}

const setColorPicker = () => {
    const colorPicker = document.getElementById('color-picker');
    colorPicker.value = '#000000';  // reset color to black when init
    colorPicker.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--colored-cell-color', e.target.value);
    })
}


const setChangeFaceSizeRange = () => {
    const range = document.getElementById('face-size');
    const faceSizeLabel = document.querySelector('.change-face-size > label');
    faceSizeLabel.textContent = `${faceSize}X${faceSize}`

    range.addEventListener('change', (e) => {
        faceSizeLabel.textContent = `${e.target.value}X${e.target.value}`;
        createGrid(e.target.value);
    })
}

const setResetButton = () => {
    const resetButton = document.querySelector('.reset-button');
    resetButton.removeEventListener('click', () => {
        initGame(faceSize);
    })
    resetButton.addEventListener('click', () => {
        initGame(faceSize);
    })
}

const setButtonsEvents = () => {
    setClearButton();
    setEraseButton();
    setColorPicker();
    setChangeFaceSizeRange();
    setResetButton();
}

const initGame = (faceSize) => {
    createGrid(faceSize);
    initDrawWithMouseClicked();
    setButtonsEvents();
}

initGame(faceSize)





    


