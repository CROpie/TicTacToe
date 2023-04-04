// Contains most of the functions related to setting up the board and players
const theGrid = (() => {
    // Player Factory
    const Player = (name, token) => ({ name, token });

    // create an array, populates it with two Player objects
    const createPlayers = () => {
        let player0Name = document.querySelector('#left-name').value;
        if (!player0Name) {
            player0Name = 'player0';
        }
        let player1Name = document.querySelector('#right-name').value;
        if (!player1Name) {
            player1Name = 'player1';
        }
        const playerList = [];
        playerList[0] = Player(player0Name, 'X');
        playerList[1] = Player(player1Name, 'O');
        return playerList;
    };

    // creates an array, populates it with 9 Button objects
    const assignButtons = () => {
        const gridButtons = [];
        for (let i = 0; i < 9; i++) {
            gridButtons[i] = document.querySelector(`#p${i}`);
        }
        return gridButtons;
    };

    // creates an array for the placed tokens
    // need to put in a default value or else checkResult will be full of NaNs and undefineds
    const tokenArray = () => {
        const gridTokens = [];
        for (let i = 0; i < 9; i++) {
            gridTokens[i] = '';
        }
        return gridTokens;
    };

    // the array of winning combinations
    const victoryCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return { createPlayers, assignButtons, tokenArray, victoryCombo };
})();

const gameStart = (() => {
    // These arrays will be populated when the gameStart function is run, allowing them to be reset
    let playerList = [];
    let gridButtons = [];
    let gridTokens = [];
    let currentTurn = true;
    let turnCounter = 0;
    const messageBoard = document.querySelector('#messageboard');
    const startButton = document.querySelector('#start-button');

    const checkResult = () => {
        // Run through each array in theGrid.victoryCombo
        // For each one, insert the appropriate token at the corresponding position into a new array using map

        // (Using map instead of just one forEach is probably superfluous, but wanted to use map)
        // (Could even insert the token into all appropriate positions in victoryCombo when the token is first placed?)
        const evaluateResult = theGrid.victoryCombo.map((array) => {
            const newArray =
                gridTokens[array[0]] +
                gridTokens[array[1]] +
                gridTokens[array[2]];
            return newArray;
        });

        // Run through the new array, looking for XXX or OOO
        evaluateResult.forEach((newArray) => {
            if (newArray[0] + newArray[1] + newArray[2] === 'XXX') {
                messageBoard.innerHTML = `${playerList[0].name} Wins!!.`;
                startButton.style.backgroundColor = 'limegreen';
                return;
            }
            if (newArray[0] + newArray[1] + newArray[2] === 'OOO') {
                messageBoard.innerHTML = `${playerList[1].name} Wins!!.`;
                startButton.style.backgroundColor = 'limegreen';
                return;
            }
            if (turnCounter === 9) {
                messageBoard.innerHTML = `The game is a tie.`;
                startButton.style.backgroundColor = 'limegreen';
                // without return, this code will be run 9 times
                // eslint-disable-next-line
                return;
            }
        });
    };

    // Places a token on the button pressed, calls a check victory function, then changes turn
    const clickResponse = (button, index) => {
        const currentButton = button;

        // Ignore duplicates
        if (gridTokens[index]) {
            return;
        }
        // Placing a token
        if (currentTurn) {
            currentButton.innerHTML = playerList[0].token;
            gridTokens[index] = playerList[0].token;
            currentTurn = false;
            messageBoard.innerHTML = `${playerList[1].name}'s turn.`;
        } else {
            currentButton.innerHTML = playerList[1].token;
            gridTokens[index] = playerList[1].token;
            currentTurn = true;
            messageBoard.innerHTML = `${playerList[0].name}'s turn.`;
        }
        turnCounter++;
        checkResult(playerList);
    };

    // Reset/create the necessary variables, then add event listeners to every button
    const commenceGame = () => {
        playerList = theGrid.createPlayers();

        gridButtons = theGrid.assignButtons();
        gridTokens = theGrid.tokenArray();
        currentTurn = true;
        turnCounter = 0;

        messageBoard.innerHTML = `${playerList[0].name}'s turn.`;
        startButton.style.backgroundColor = 'grey';

        gridButtons.forEach((button, index) => {
            button.innerHTML = '';
            button.addEventListener('click', () => {
                clickResponse(button, index);
            });
        });
    };

    return {
        commenceGame,
    };
})();

// Effectively starts the game
const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', gameStart.commenceGame);
