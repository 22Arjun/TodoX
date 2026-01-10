const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Users = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    fullName: { type: String },
})


const Todos = new Schema({
    userId: { type: ObjectId},
    title: { type: String },
    done: { type: Boolean }
})

const userModel = mongoose.model("users", Users);
const todoModel = mongoose.model("todos", Todos);

module.exports = ({
    userModel,
    todoModel
})