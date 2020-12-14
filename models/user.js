const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});
const User = mongoose.model('Users', userSchema);


module.exports = User;
