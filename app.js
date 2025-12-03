const express = require('express');
const jwt = require('jsonwebtoken');
JWT_SECRET = "letscopyitfromherebutthatsasecret";
const app = express();

let users = [];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/sign-in', (req, res) => {
    res.sendFile(__dirname + '/public/sign-in.html');
})

app.get('/sign-up', (req, res) => {
    res.sendFile(__dirname + '/public/sign-up.html');
})

app.get('/sign-upp', (req, res) => {
    res.json({
        users: users
    })
})


//POST Requests

app.post('/sign-up', (req, res) => {
    const email = req.body;
    const fullName = req.body;
    const password = req.body;
    
    const user = users.find(u => u.email === email);

    if(!user) {
    users.push({
        email: email, 
        fullName: fullName,
        password: password
    })

    res.send({
        message: "You have signed up successfully!"
    })
    }
    else {
        res.status(403).json({
            message: "you are already signed up. Please Sign in"        })
    }

})

app.post('/sign-in', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

        const user = users.find(u => u.email === email && u.password === password);
    
        if(!user) {
            res.json({
                error: `Invalid email or password`
            })
        }
        else {
                const token = jwt.sign({
                    email: email
                }, JWT_SECRET);

                res.header("token", token);

                res.json({
                    token
                });
            
        }
})

const auth =  (req, res, next) => {
    const token = req.headers.token;

    decoded_token = jwt.verify(token, JWT_SECRET);
    
    if(decoded_token.email) {
        req.email = decoded_token.email;
        next();
    }
    else {
        res.json({
            error: "You are not signed in"
        })
    }
}

app.get('/me', auth, (req, res) => {
    

        const user = users.find(u => u.email === req.email);

        res.send({
            fullName: user.fullName
        })

    })


app.listen(3000);