const playerList = [];

let currentTurn = true;

const gridButtons = [];

const gridTokens = [];

const Player = (name, token) => {
    const sayName = () => console.log(`Hello ${name}`);
    return { name, token, sayName };
};

// Alternate currentTurn between true and false
// Represents the turn of player0 and player1
playerList[0] = Player('Chris', 'X');
playerList[1] = Player('Nick', 'O');

function checkResult() {
    const g = gridTokens;
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
        alert('player 0 wins!');
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
        alert('player 1 wins!');
    }
}
function clickButton(value) {
    const currentButton = document.querySelector(`#${value}`);
    const index = value.slice(-1);
    if (currentTurn) {
        currentButton.innerHTML = playerList[0].token;
        currentTurn = false;
        gridTokens[index] = playerList[0].token;
        checkResult();
    } else {
        currentButton.innerHTML = playerList[1].token;
        currentTurn = true;
        gridTokens[index] = playerList[1].token;
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
        gridButtons[i] = Button(i);
    }
}

assignButtons();
