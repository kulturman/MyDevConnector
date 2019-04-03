const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
    mongoose.connect(config.get('mongoUrl') , {useNewUrlParser: true})
        .then(() => console.log('connected to mongoDb'))
};