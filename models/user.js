const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },


});

userSchema.methods.generateToken = function() {
    return jwt.sign({_id :this._id ,
         user: _.pick(this , ['name' , 'avatar' , 'email']) 
    } , process.env.JWT_SECRET_KEY , { expiresIn: '1h' });
}
const User = mongoose.model('User' , userSchema);

module.exports = User;