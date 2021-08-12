const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const api = process.env.API_URL;
const todosRouter = require('./routers/todos');

app.use(cors());
app.options('*', cors());

//Mddleware
app.use(express.json());
app.use(morgan('tiny'));

//Routes
app.use(`${api}/todo`, todosRouter)

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'TODOAPP'

}).then(() => {
    console.log('Database is running')
}).catch((err) => {
    console.log(err)
})

app.listen(3000, () => {

    console.log('server is running')
})