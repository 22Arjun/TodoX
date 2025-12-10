const { Router } = require('express');
const todoRouter = Router();
const { todoModel } = require('../db');
const { auth } = require('../auth');




todoRouter.post('/add-todo', auth, async (req, res) => {

    const userId = req.userId;
    const title = req.body.title;


    try {
        const response = await todoModel.create({
            userId,
            title

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

todoRouter.delete('/delete-todo', auth, async (req, res) => {
    const userId = req.userId;
   try {
    const response = await todoModel.deleteOne({
        userId: userId
    })

    if(response.userId) {
        res.send({
            message: `having userId: ${userId} has been deleted successfully from the database`
        })
    }
    else {
        res.status(403).send({
            error: "you haven't send any UserID"
        });
    }
   } 
   catch {
        res.status(500).json({
            error: "Something went wrong"
        })
   }
})


module.exports = {
    todoRouter: todoRouter
}