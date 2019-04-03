const users = require('../routes/api/users');
const posts = require('../routes/api/posts');
const profiles = require('../routes/api/profiles');

module.exports = (app) => {
    app.use('/api/users' , users);
    app.use('/api/posts' , posts);
    app.use('/api/profile' , profiles);
}