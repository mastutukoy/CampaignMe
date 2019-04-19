const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');


passport.use(new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			console.log('Received auth');
			User.findOne({googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					console.log('User already exists');
					done(null, existingUser);
					// do nothing
				} else {
					new User({ googleId : profile.id })
						.save()
						.then(user => done(null, User));
					console.log('Added new user');
				}
			});
		}
	)
);
