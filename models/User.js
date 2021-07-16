const mongoose = require('mongoose');
const passportLM = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    cart: Array,
    listings: Array,
    publicContact: {
        email: String,
        phoneNumber: String
    }
})

userSchema.plugin(passportLM);

module.exports = mongoose.model("User", userSchema);