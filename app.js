const faceSize = 16;
const grid = document.getElementsByClassName('grid')[0];
grid.style.gridTemplateRows = `repeat(${faceSize}, 1fr)`;
grid.style.gridTemplateColumns = `repeat(${faceSize}, 1fr)`;

for(let i = 0; i < faceSize**2 ; i++){
    let cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell); 
}