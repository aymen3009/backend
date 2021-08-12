const mongoose = require('mongoose');

const todosSchems = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description:
    {
        type: String,
        require: true
    },
    specialNotes: {
        type: String,
        require: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },

    dueDate: {
        type: Date,
    },
    status: Boolean
})

exports.Todos = mongoose.model('Todos', todosSchems);