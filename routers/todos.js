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
    // remove date and status cz they have default values 
    let todos = new Todos({
        title: req.body.name,
        description: req.body.description,
        specialNotes: req.body.specialNotes,
        dueDate: req.body.dueDate
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
// mark a todo as done
router.put('/:id', async (req, res) => {
        let todos = await Todos.findByIdAndUpdate(req.params.id, {
        $set: {
            status: true
        }
        }, {
        // new = true to return the updated document 
        new: true
    })
    if (!todos)
        return res.status(404).send('no task found')
    
    res.send(todos);
}
)

module.exports = router;