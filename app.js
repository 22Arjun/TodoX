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


//POST Requests

app.post('/sign-up', (req, res) => {
    const username = req.username;
    const fullName = req.fullName;
    const password = req.password;

    users.push({
        username: username, 
        fullName: fullName,
        password: password
    })

    res.json({
        message: "You have signed up successfully!"
    })

})

app.post('/sign-in', (req, res) => {
    
})


app.listen(3000);