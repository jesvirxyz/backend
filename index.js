const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: ['http://localhost:4200 ', 'http://localhost:4200'],
        credentials: true,
    })
);

const userRoute = require('./routes/index');
app.use('/', userRoute);

mongoose.connect('mongodb://localhost:27017/Test', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to the Databse');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running');
});
