const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String
});

console.log('model started');

mongoose.model('users', userSchema);

