const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// declare models first before it is being used 
require('./models/User');
require('./services/passport');
const authRoutes = require('./routes/authroutes');


mongoose.connect(keys.mongoURI);

console.log('mongo connected');

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

// Heroku port or Local port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
