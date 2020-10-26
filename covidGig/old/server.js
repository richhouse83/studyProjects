const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./api/api');
const errorHandler = require('errorhandler');
const morgan = require('morgan');

const connectionString = "mongodb+srv://richhouse83:beehive1@cluster0.vfvmg.mongodb.net/covid_gig?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use(errorHandler());
app.use(morgan('dev'));

const PORT = 4000;

app.use('/api', apiRouter);

mongoose.connect(connectionString, {useNewUrlParser: true});

app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}...`);
});

module.exports = app;