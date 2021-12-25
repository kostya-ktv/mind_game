// ADD 4 MORE CLASSES!!!!!!?????


// --- ICONS TO CREATE THE GAME

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


//--- VARIABLES ---

let widthGrid; //amounts of desired cells horizontally
let heightGrid; //amounts of desired cells vertically
let guessedCells; //counter for guessed cell in order to finish the game
let pair = []; //array to save two opened cells to check if they are equal, the check will be done only if there are two elements in the array
let arrayOfCells; //array of DOM cells that were created for the game, is used to add event listeners after guessing right, on the rest of the cells
let grid = document.createElement('div'); //container to render grid
const container = document.querySelector('.container'); //container to append the grid, exists in the body
const nav = document.querySelector('.navigation');
const navList = document.querySelector('.nav-list');
const title = document.querySelector('h1');
const homeButton = document.querySelector('.home-button');
let isGameOver = false;



//--- FUNCTIONS ---

// gets the needed amount of unique icon classes depending on the size of the grid, and pushes each class twice to create pairs
const getClasses = function (number) {
    let array = [];
    for (let i = 0; i < number; i++) {
        array.push(classes[i]);
        array.push(classes[i]);
    }
    // shuffles the array, so each icon gets random position
    array.sort(() => Math.random() - 0.5);
    return array;
}

// generates grid, takes two values - number of columns(width), and number of rows(height)
const generateGrid = function (cols, rows) {
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    grid.classList.add('grid');
    // calls function to create cells and append them to the grid container
    generateCells(cols, rows, grid);
    container.append(grid);
    homeButton.style.visibility = 'visible';
    //creates array using spread operator from the NodeList
    //(in order to perfom filter function) to add event listeners on the cells that are still not guessed after filtering them
    arrayOfCells = [...document.querySelectorAll('.cell')];
    // adjust the font size by deviding the given number by the amount of colums in the grid    
    arrayOfCells.forEach(el => el.style.fontSize = `${25 / cols}rem`);
}

//generates cells, takes 3 arguments, creates needed amount of cells (width*height), appends them to the grid
const generateCells = function (w, h, g) { //w-width(colums)    //h-height(rows)   //g-grid
    //choose unique classes for each sell
    //      we are pushing each element twice to the array, so we need (number of cells / 2) classes
    let cellClassesArr = getClasses(w * h / 2);
    for (let i = 0; i < w * h; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        let icon = document.createElement('i');
        // the first class ('fas') is necessary class for fontawesome icons
        // second is a unique class responsible for the kind of icon,
        // class hidden hides icons before clicking
        icon.classList.add('fas', cellClassesArr[i]);
        // attach to each icon unique id
        icon.id = i;
        cell.append(icon);
        g.append(cell);

    }
    //show icons and then turn on the class hidden and add event listener
    //EVENT LISTENERS ON THE CELL

    setTimeout(() => {
        arrayOfCells.forEach(el => {
            el.children[0].classList.add('hidden');
            el.addEventListener('click', showIcons);
        })

    }, widthGrid * 500)
}

//shows clicked icons
const showIcons = function (e) {
    // start shaking animation
    this.children[0].classList.add('wave', true);
    // clear the pair if we have two elements, because the check will be made only on two shown icons
    if (pair.length === 2) pair = [];
    // turn off hidden class and show clicked icon
    this.children[0].classList.toggle('hidden');
    // push the icon to the pair array to perform equality check
    pair.push(this.children[0]);
    // start checking icons when we have two
    if (pair.length === 2) {
        // if the first icon's unique class is not equal to the second icon's unique class ->
        if (pair[0].classList[1] != pair[1].classList[1]) {
            // remove listeners from all cells to prevent multiple clicking
            arrayOfCells.forEach(el => {
                el.removeEventListener('click', showIcons);
            })
            // after third of a second turn on hidden class on the two clicked icons and hide them
            setTimeout(() => {
                document.getElementById(pair[0].id).classList.toggle('hidden');
                document.getElementById(pair[1].id).classList.toggle('hidden');
                arrayOfCells.forEach(el => {
                    el.addEventListener('click', showIcons);
                })
            }, 300)
            // if the first icon's unique class EQUALS to the second icon's unique class ->
        } else {
            // remove shaking animation on guessed icons
            document.getElementById(pair[0].id).classList.toggle('wave', false);
            document.getElementById(pair[0].id).parentElement.style.opacity = '0.5';
            document.getElementById(pair[1].id).classList.toggle('wave', false);
            document.getElementById(pair[1].id).parentElement.style.opacity = '0.5';
            // document.getElementById(pair[1].id).style.opacity = '0.5';

            // before the game ends (if the counter for guessed cells is more then 0)
            if (guessedCells !== 0) {
                //filter the array of cells - delete those which id is in the pair (thee were guessed correctly)
                arrayOfCells = arrayOfCells.filter(item => {
                    return (item.children[0].id != pair[0].id && item.children[0].id != pair[1].id)
                })
                // remove listeners from the guessed cells
                pair[0].parentElement.removeEventListener('click', showIcons);
                pair[1].parentElement.removeEventListener('click', showIcons);
                // decrement the counter by two (two cells of the whole amount are guessed and visible)
                guessedCells -= 2;
                // when the counter is 0 the game ends
                if (guessedCells === 0) return isWinner();
            }
        }
    }
}

function isWinner() {
    grid.textContent = '';
    grid.remove();

    // CLEAR GLOBAL VARIABLES
    widthGrid = undefined;
    heightGrid = undefined;
    guessedCells = undefined;
    pair = [];
    isGameOver = true;
    showTitle();
    // show the navigation
    nav.classList.toggle('hide-nav');
    homeButton.style.visibility = 'hidden';
}

const showTitle = function () {

    isGameOver ? title.innerText = 'Good Job! Try again?' : title.innerText = '" Find The Pair "';
    title.classList.add('title');

}

const showMainMenu = function () {
    nav.classList.toggle('hide-nav');
    // change the header text for start/end of the game
    showTitle();
    // create 3 li's for 3 levels of difficulty
    let liEasy = document.createElement('li');
    let liMedium = document.createElement('li');
    let liHard = document.createElement('li');
    liEasy.innerText = 'Easy';
    liMedium.innerText = 'Medium';
    liHard.innerText = 'Hard';
    // set data attributes for the li's
    liEasy.dataset.size = 2;
    liMedium.dataset.size = 4;
    liHard.dataset.size = 6;
    // append li's to the ul in the nav
    navList.append(liEasy, liMedium, liHard);
    // add class of nav-item to each of the li's and eventListener
    document.querySelectorAll('.nav-list li').forEach((el) => {
        el.classList.add('nav-item');
        el.addEventListener('click', function () {
            // on the click the main menu will disappear
            nav.classList.remove('hide-nav');
            // widthGrid (number of columns) and heightGrid (number of rows) will get the value from the data attribute
            widthGrid = el.dataset.size;
            // console.log(el.dataset.size);
            heightGrid = el.dataset.size;
            // initialize counter to start count guessed pairs
            guessedCells = widthGrid * heightGrid;
            // make the grid to start game
            generateGrid(widthGrid, heightGrid);
            nav.classList.toggle('hide-nav');
        })
    })
}

homeButton.addEventListener('click', () => {
    isWinner();
    title.innerText = 'Wanna Try Another Level?'
})


showMainMenu();
