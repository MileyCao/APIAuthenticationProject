const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
//connect to DB
mongoose.connect(process.env.DB_CONNECT, () => console.log('connect to db!'));

const authRoute = require('./routes/auth');

//Route Middleware
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server up and running'));
