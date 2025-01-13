const express = require('express');

const connection = require('./config/dbConnection')
const model = require('./model/model');

const app = express();

app.get('/', (req, res) => {
res.send('Welcome')
});

app.listen(3000)