// server/models/User.js
const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    provider: String,
    provider_id: String,
    token: String
})

module.exports = mongoose.model('User', UserSchema)
