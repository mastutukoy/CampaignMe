const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// declare models first before it is being used 
require('./models/User');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI,{useNewUrlParser: true});

const app = express();

authRoutes(app);

// Heroku port or Local port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
