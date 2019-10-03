const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors());

const game = {
    field: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ],
    currentPlayer: 1
};

app.get('/info', function(req, res) {
    res.send(game);
});

app.post('/move', function(req, res) {
    console.log({body: req.body});
    res.send('Ok');
});

app.listen(4000);