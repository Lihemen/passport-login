const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load user model
const user = require('../models/Users');

module.exports = function(passport) {
	passport.use(
		new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
			//MAtch user in database
			user
				.findOne({ email: email })
				.then(user => {
					if (!user) {
						return done(null, false, {
							message: 'That email is not registered'
						});
					}

					// MAtch password
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) throw err;

						if (isMatch) {
							return done(null, user);
						} else {
							return done(null, false, { message: 'Password is incorrect' });
						}
					});
				})
				.catch(err => console.log(err));
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		user.findById(id, (err, user) => {
			done(err, user);
		});
	});
};
