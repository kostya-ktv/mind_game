// ADD 4 MORE CLASSES!!!!!!
// ADD COMMENTS 

const classes = ['fa-star',
    'fa-umbrella',
    'fa-cloud-rain',
    'fa-thumbs-up',
    'fa-hand-spock',
    'fa-meteor',
    'fa-crown',
    'fa-apple-alt',
    'fa-coffee',
    'fa-bomb',
    'fa-broom',
    'fa-anchor',
    'fa-laptop-code',
    'fa-gift',
    'fa-sun',
    'fa-cloud-sun',
    'fa-snowflake',
    'fa-mitten',
    'fa-poo',
    'fa-heart',
    'fa-horse',
    'fa-tree',
    'fa-pizza-slice',
    'fa-socks',
    'fa-bell',
    'fa-fish',
    'fa-home',
    'fa-fire-alt',
    'fa-seedling',
    'fa-snowman',
    'fa-birthday-cake',
    'fa-ice-cream',
    'fa-robot',
    'fa-graduation-cap',
    'fa-user-secret',
    'fa-compact-disc',
    'fa-tint',
    'fa-palette',
    'fa-bone',
    'fa-gamepad',
    'fa-mug-hot',
    'fa-lightbulb',
    'fa-shuttle-van',
    'fa-envelope',
    'fa-globe-americas',
    'fa-truck',
    'fa-bread-slice',
    'fa-camera',
    'fa-flag',
    'fa-igloo',
    'fa-key',
    'fa-peace',
    'fa-paw',
    'fa-yin-yang',
    'fa-candy-cane',
    'fa-code',
    'fa-hippo',
    'fa-dog',
    'fa-cloud-showers-heavy',
    'fa-virus'
];


//variables
let widthGrid;
let heightGrid;
let guessedCells;
let pair = [];
let arrayOfCells;
let grid = document.createElement('div');
const container = document.querySelector('.container');



//functions
const getClasses = function (number) {
    let array = [];
    for (let i = 0; i < number; i++) {
        array.push(classes[i]);
        array.push(classes[i]);
    }
    array.sort(() => Math.random() - 0.5);
    return array;
}

const generateGrid = function (width, height) {
    grid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${height}, 1fr)`;
    grid.classList.add('grid');
    generateCells(width, height, grid);
    container.append(grid);
    arrayOfCells = [...document.querySelectorAll('.cell')];
}

const generateCells = function (w, h, g) { //w width h height // g grid
    let gameArray = getClasses(w * h / 2); //we are pushing each element twice to the array, so we need number of cells / 2
    for (let i = 0; i < w * h; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        let icon = document.createElement('i');
        icon.classList.add('fas', gameArray[i], 'hidden');
        icon.id = i;
        cell.append(icon);
        g.append(cell);
        cell.addEventListener('click', showIcons);
    }
}

const showIcons = function (e) {
    this.children[0].classList.add('wave');
    if (pair.length === 2) {
        pair = [];
    }
    this.children[0].classList.toggle('hidden');
    pair.push(this.children[0]);
    if (pair.length === 2) {
        if (pair[0].classList[1] != pair[1].classList[1]) {
            arrayOfCells.forEach(el => {
                el.removeEventListener('click', showIcons);
            })
            setTimeout(() => {
                document.getElementById(pair[0].id).classList.toggle('hidden');
                document.getElementById(pair[1].id).classList.toggle('hidden');
                arrayOfCells.forEach(el => {
                    el.addEventListener('click', showIcons);
                })
            }, 500)
        } else {
            // console.log(guessedCells);
            if (guessedCells !== 0) {
                arrayOfCells = arrayOfCells.filter(item => {
                    return (item.children[0].id != pair[0].id && item.children[0].id != pair[1].id)
                })
                console.log(guessedCells);
                pair[0].parentElement.removeEventListener('click', showIcons);
                pair[1].parentElement.removeEventListener('click', showIcons);
                guessedCells -= 2;
                if (guessedCells === 0) return isWinner();
                // console.log(guessedCells);
            }
            // guessedCells -= 2;
        }
    }
}

function isWinner() {
    // console.log('hi')
    grid.remove();
    // showDisplay();
}

const showDisplay = function () {
    let mainDisplay = document.createElement('div');
    mainDisplay.classList.add('main-display');
    let buttonEasy = document.createElement('button');
    let buttonMedium = document.createElement('button');
    let buttonHard = document.createElement('button');
    buttonEasy.innerText = 'Easy';
    buttonMedium.innerText = 'Medium';
    buttonHard.innerText = 'Hard';
    buttonEasy.dataset.size = 2;
    buttonMedium.dataset.size = 4;
    buttonHard.dataset.size = 6;
    mainDisplay.append(buttonEasy, buttonMedium, buttonHard);
    container.append(mainDisplay);

    document.querySelectorAll('.main-display button').forEach((el) => {
        el.addEventListener('click', function () {
            mainDisplay.style.display = 'none';
            // console.log(el.dataset.size);
            widthGrid = el.dataset.size;
            heightGrid = el.dataset.size;
            guessedCells = widthGrid * heightGrid;
            generateGrid(widthGrid, heightGrid);
        })
    })

}


showDisplay();
// generateGrid(widthGrid, heightGrid);


// generateGrid(widthGrid, heightGrid);



