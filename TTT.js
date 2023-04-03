const theGrid = (() => {
    const playerList = [];
    const gridButtons = [];
    const gridTokens = [];
    let currentTurn = true;

    return { playerList, gridButtons, gridTokens, currentTurn };
})();

const Player = (name, token) => {
    const sayName = () => console.log(`Hello ${name}`);
    return { name, token, sayName };
};

function checkResult() {
    const g = theGrid.gridTokens;
    if (
        g[0] + g[1] + g[2] === 'XXX' ||
        g[3] + g[4] + g[5] === 'XXX' ||
        g[6] + g[7] + g[8] === 'XXX' ||
        g[0] + g[3] + g[6] === 'XXX' ||
        g[1] + g[4] + g[7] === 'XXX' ||
        g[2] + g[5] + g[8] === 'XXX' ||
        g[0] + g[4] + g[8] === 'XXX' ||
        g[6] + g[4] + g[2] === 'XXX'
    ) {
        alert(`The winner is ${theGrid.playerList[0].name}`);
    }
    if (
        g[0] + g[1] + g[2] === 'OOO' ||
        g[3] + g[4] + g[5] === 'OOO' ||
        g[6] + g[7] + g[8] === 'OOO' ||
        g[0] + g[3] + g[6] === 'OOO' ||
        g[1] + g[4] + g[7] === 'OOO' ||
        g[2] + g[5] + g[8] === 'OOO' ||
        g[0] + g[4] + g[8] === 'OOO' ||
        g[6] + g[4] + g[2] === 'OOO'
    ) {
        alert(`The winner is ${theGrid.playerList[1].name}`);
    }
}

function clickButton(value) {
    const currentButton = document.querySelector(`#${value}`);
    const index = value.slice(-1);

    if (theGrid.gridTokens[index]) {
        // Ignore duplicates
        return;
    }

    if (theGrid.currentTurn) {
        currentButton.innerHTML = theGrid.playerList[0].token;
        theGrid.currentTurn = false;
        theGrid.gridTokens[index] = theGrid.playerList[0].token;
        checkResult();
    } else {
        currentButton.innerHTML = theGrid.playerList[1].token;
        theGrid.currentTurn = true;
        theGrid.gridTokens[index] = theGrid.playerList[1].token;
        checkResult();
    }
}

/*
Assign each html button to a Button object
Give each one an eventListener, passing the value of the button
The value corresponds to the position (p0 -> p8)
*/
const Button = (position) => {
    const actualButton = document.querySelector(`#p${position}`);
    actualButton.addEventListener('click', function () {
        clickButton(this.value);
    });
    return { actualButton };
};

/*
Set up an array of Button objects
*/
function assignButtons() {
    for (let i = 0; i < 9; i++) {
        theGrid.gridButtons[i] = Button(i);
    }
}

function startGame() {
    // erases the board, clears the arrays

    // creates Player objects from the names inputted
    const player0 = document.querySelector('#left-name').value;
    const player1 = document.querySelector('#right-name').value;

    // if blank, insert a default
    //

    theGrid.playerList[0] = Player(player0, 'X');
    theGrid.playerList[1] = Player(player1, 'O');

    assignButtons();
}

const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', function () {
    startGame();
});
