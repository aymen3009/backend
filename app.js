const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const api = process.env.API_URL;
const todosRouter = require('./routers/todos');
// if you want to use env file put your port there too
// and if the port is not assign we will take 3000 as default
const PORT = process.env.PORT || 3000;
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

app.listen(PORT, ( ) => {

    console.log(`server run on port ${port}`)
})
// HANDLE 404 ERRORS 
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}
)
