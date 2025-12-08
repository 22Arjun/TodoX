const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { userModel, todoModel } = require('./db');
const { auth, JWT_SECRET } = require('./auth');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI);


//Middlewares
app.use(express.json());
app.use(express.static('public'));

//GET Routes
app.get('/sign-in', (req, res) => {
    res.sendFile(__dirname + '/public/sign-in.html');
})

app.get('/sign-up', (req, res) => {
    res.sendFile(__dirname + '/public/sign-up.html');
})

app.get('/todox', (req, res) => {
    res.sendFile(__dirname + "/public/todo.html");    
})

app.get('/', async (req, res) => {

    const response = await userModel.find({});
    res.json({
        users: response
    })
})

app.get('/forgot-password', (req, res) => {
    
})


//POST Routes

app.post('/sign-up', async (req, res) => {
    const email = req.body.email;
    const fullName = req.body.fullName;
    const password = req.body.password;
    
    try {
        const response = await userModel.findOne({
        email: email
    })

    
    if(!response) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
        email: email, 
        fullName: fullName,
        password: hashedPassword,
    
    })

    res.send({
        message: "You have signed up successfully!"
    })
    }
    else {
        res.status(403).json({
            message: "you are already signed up. Please Sign in"        })
    }
    }
    catch {
        res.status(500).send({
            error: "Something went wrong"
        })
    }

})

app.post('/sign-in', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const response = await userModel.findOne({
            email: email
        })

        if(!response) {
            res.status(403).json({
                error: "Invalid Email"
            })
        }
        else {
            ;
            if(await bcrypt.compare(password, response.password)) {
                const authorization = jwt.sign({
                id: response._id.toString()
                }, JWT_SECRET);

                res.status(200).send({
                    authorization
                })
            }
            else {
                res.status(403).json({
                    error: "Invalid Users Password"
                })
            }
            
        }
    }
    catch {
        res.status(500).send({
            error: "Something went wrong"
        })
    }
        
})



app.post('/todo', auth, async (req, res) => {

    userId = req.userId;
    const userEmail = req.email;
    const title = "namaste buddy";


    try {
        const response = await todoModel.create({
            title,
            userId

        })  

    
        res.send({
            response
        })

    }
    catch {
        res.status(500).json({
            error: "Something went wrong"
        })
    }
});

app.listen(3000);