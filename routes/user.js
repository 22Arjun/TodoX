const { Router } = require('express');
const userRouter = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../auth');
const { userModel } = require('../db');
const path = require('path');



//GET Routes
userRouter.get('/sign-in', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'sign-in.html'));
})

userRouter.get('/sign-up', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'sign-up.html'));
})

userRouter.get('/todox', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'todo.html'));    
})

userRouter.get('/', async (req, res) => {

    const response = await userModel.find({});
    res.json({
        users: response
    })
})

userRouter.get('/forgot-password', (req, res) => {
    
})


//POST Routes

userRouter.post('/sign-up', async (req, res) => {
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

userRouter.post('/sign-in', async (req, res) => {
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
            passwordMatch = await bcrypt.compare(password, response.password);
    
            if(passwordMatch) {
                const authentication = jwt.sign({
                id: response._id.toString()
                }, secret);
                
                res.header("authentication", authentication);

                res.status(200).send({
                    authentication
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


module.exports = {
    userRouter: userRouter
}