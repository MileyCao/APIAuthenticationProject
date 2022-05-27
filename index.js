const express = require('express');
const app = express();
const mongoose = require('mongoose');

//connect to DB
mongoose.connect(
  'mongodb+srv://ricecake:Cy324568@cluster0.fe6qu.mongodb.net/?retryWrites=true&w=majority',
  () => console.log('connect to db!')
);

const authRoute = require('./routes/auth');

//Route Middleware
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server up and running'));
