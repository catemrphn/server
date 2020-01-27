const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors());

const w = 7;
const h = 6;

const game = {
    field: createEmptyGameField(),
    currentPlayer: 1,
    Winner: false
};

app.get('/info', function(req, res) {
    res.send(game);
});

app.post('/move', function(req, res) {
    console.log({body: req.body});
    move(req.body.column);
    res.send(game);
});

app.post('/start', function (req, res) {
    game.Winner = false;
    game.field = createEmptyGameField();
    game.currentPlayer = 1;
    res.send(game);
});

function move(column) {

    if (game.field[column][0] !== 0) return;

    let r = h - 1;
    for (let i = 0; i < h - 1; i++) {
        if (game.field[column][i + 1] !== 0) {
            r = i;
            break;
        }
    }
    game.field[column][r] = game.currentPlayer;

    if (checkRow() || checkCol() || checkDiagonalDown() || checkDiagonalUp()) {
        game.Winner = true;
    }

    let whoseMove = game.currentPlayer === 1 ? 2 : 1;
    game.currentPlayer=whoseMove;
}

function createEmptyGameField() {
    let table = [];
    for (let i = 0; i < w; i++) {
        let col = [];
        for (let j = 0; j < h; j++) {
            col.push(0);
        }
        table.push(col);
    }
    return table;
}

function checkRow() {
    for (let i = 0; i < h; i++) { // row
        for (let j = 0; j < w - 3; j++) { //col
            let find = true;
            for (let k = j ; k < j + 4; k++) { // 4 in row
                if (game.field[k][i] !== game.currentPlayer) {
                    find = false;
                    break;
                }
            }
            if (find) {
                return true;
            }
        }
    }
    return false;
}

function checkDiagonalDown() {
    for (let i = 0; i < h - 3; i++) { // row
        for (let j = 0; j < w - 3; j++) { //col
            let find = true;
            for (let k = 0 ; k < 4; k++) { // 4 in row
                if (game.field[j + k][i + k] !== game.currentPlayer) {
                    find = false;
                    break;
                }
            }
            if (find) {
                return true;
            }
        }
    }
    return false;
}

function checkDiagonalUp() {
    for (let i = 3; i < h ; i++) { // row
        for (let j = 0; j < w - 3; j++) { //col
            let find = true;
            for (let k = 0 ; k < 4; k++) { // 4 in row
                if (game.field[j + k][i - k] !== game.currentPlayer) {
                    find = false;
                    break;
                }
            }
            if (find) {
                return true;
            }
        }
    }
    return false;
}

function checkCol() {
    for (let i = 0; i < w; i++) { // col
        for (let j = 0; j < h - 3; j++) { //row
            let find = true;
            for (let k = j ; k < j + 4; k++) { // 4 in col
                if (game.field[i][k] !== game.currentPlayer) {
                    find = false;
                    break;
                }
            }
            if (find) {
                return true;
            }
        }
    }
    return false;
}

app.listen(4000, () => {
    console.log('Started on 4000')
});
