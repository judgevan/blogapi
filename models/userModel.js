const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username required'],
        unique: true
    },
    password: {
        type: String,
        required:  [true, 'password required'],
    },
    email: {
        type: String,
        required:  [true, 'email required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address'],
        trim: true,
        lowercase: true
    }
})

module.exports = mongoose.model("User", userSchema)