const router = require('express').Router();
const User = require('../../models/user');
const lodash = require('lodash');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const authMiddleware = require('../../middlewares/auth');
const { validationResult } = require('express-validator/check');
const registerValidator = require('../../validation/register');
const { getErrors , isEmpty } = require('../../validation/util');

router.post('/register' , registerValidator() , async (req , res) => {

    let user = await User.findOne({email: req.body.email});
    let errorResponse = getErrors(req);
    
    if(user) {
        errorResponse.email = ['This email already exists, maybe your doppelganger'];
    }

    if (!isEmpty(errorResponse)) 
    {
        return res.status(400).send(errorResponse);
    }
    user = new User(lodash.pick(req.body , ['email' , 'password' , 'name', 'coon']))
    user.avatar = gravatar.url(req.body.email , {
        s: '200',
        r: 'pg',
        d: 'mm'
    });
    user.password = await bcrypt.hash(req.body.password , await bcrypt.genSalt(10));
    await user.save();
    return res.send(user);
})

router.post('/login' , async (req , res) => {
    const user = await User.findOne({email: req.body.email});;
    if(!user) {
        return res.status(404).send({
            auth: 'Wrong username or password'
        });
    }

    if(await bcrypt.compare(req.body.password , user.password)) {
        return res.header('X-auth-token' , user.generateToken()).send({
            user,
            token: user.generateToken()
        });
    }
    return res.status(404).send({
        auth: 'Wrong username or password'
    });
})

router.get('/current' , authMiddleware , async (req , res) => {
    const user = await User.findById(req.payload._id);
    return res.send(lodash.pick(user , ['_id' , 'name' , 'avatar' , 'email']));
})
module.exports = router;