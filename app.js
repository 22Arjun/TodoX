const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

let users = [];

app.use(express.static('public'));

app.get('/sign-in', (req, res) => {
    res.sendFile(__dirname + '/public/sign-in.html');
})

app.get('/sign-up', (req, res) => {
    res.sendFile(__dirname + '/public/sign-up.html');
})


app.listen(3000);