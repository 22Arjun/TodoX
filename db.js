const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Users = new Schema({
    email: {type: String, unique: true},
    password: String,
    fullName: String,
})


const Todos = new Schema({
    userId: ObjectId,
    title: String,
    done: Boolean
})

const userModel = mongoose.model("users", Users);
const todoModel = mongoose.model("todos", Todos);

module.exports = ({
    userModel,
    todoModel
})