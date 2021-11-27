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
    colorPicker.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--colored-cell-color', e.target.value);
    })
}


const setButtonsEvents = () => {
    setClearButton();
    setEraseButton();
    setColorPicker();
}

const initGame = (faceSize) => {
    createGrid(faceSize);
    initDrawWithMouseClicked();
    setButtonsEvents();
}

initGame(faceSize)





    


