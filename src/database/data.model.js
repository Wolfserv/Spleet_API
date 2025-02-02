const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    },
    mail: {
        type: String
    },
    password: {
        type: String
    },
    auth_token: {
        type: String
    }
}, { collection: 'user'});

module.exports = mongoose.model('User', User);