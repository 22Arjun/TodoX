require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const { userRouter } = require('./routes/user');
const {todoRouter } = require('./routes/todo');



mongoose.connect(process.env.MONGO_URI);



//Middlewares
app.use(express.json());
app.use(express.static('public'));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/todo', todoRouter);







app.listen(3000);