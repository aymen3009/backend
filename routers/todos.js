const express = require('express');
const router = express.Router();
const { Todos } = require('../models/todo')


//get all todos
router.get(`/`, async (req, res) => {
    const todosList = await Todos.find();
    res.send(todosList)
})

//post new todo
router.post(`/`, async (req, res) => {
    let todos = new Todos({
        title: req.body.name,
        description: req.body.description,
        specialNotes: req.body.specialNotes,
        dateCreated: req.body.dateCreated,
        dueDate: req.body.dueDate,
        status: req.body.status
    })
    todos = await todos.save();

    if (!todos)
        returnres.status(404).send('cannot be created')

    res.send(todos);
})

//delete todo
router.delete('/:id', (req, res) => {
    Todos.findByIdAndDelete(req.params.id).then(todos => {
        if (todos) {
            return res.status(200).json({ success: true, message: 'Task is deleted' })
        } else {
            return res.status(404).json({ success: false, message: 'no task found' })
        }
    }).catch(err => {
        return res.status(400).json({ succes: false, error: err });
    })
})

module.exports = router;