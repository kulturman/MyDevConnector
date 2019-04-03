const router = require('express').Router();
const authMiddleware = require('../../middlewares/auth');
const Profile = require('../../models/profile');
const lodash = require('lodash');
const profileValidator = require('../../validation/profile');
const experienceValidator = require('../../validation/experience');
const educationValidator = require('../../validation/education');
const { getErrors , isEmpty } = require('../../validation/util');

router.get('/' , authMiddleware , async (req , res) => {
    const profile = await Profile.findOne({user: req.payload._id}).populate('user');
    if(!profile) {
        return res.status(404).send('There is no profile for user yet')
    }
    return res.send(profile);
})

router.post('/' , [ authMiddleware , profileValidator ] , async (req , res) => {
    const errors = getErrors(req);
    if(!isEmpty(errors)) {
        return res.status(400).send(errors);
    }
    const profileFields =  lodash.pick(req.body , [
        'handle' , 'company', 'website' , 'location' , 'bio' , 'status',
        'githubusername' , 'social'
    ]);

    if(req.body.skills) {
        profileFields.skills = req.body.skills.split(',');
    }
    profileFields.user = req.payload._id;
    let profile = await Profile.findOne({user: profileFields.user});
    if(profile) {
        profile = await Profile.findOneAndUpdate({user: profileFields.user} , {$set : profileFields} , {new: true})
    }

    else {
        profile = new Profile(profileFields);
        await profile.save();
    }
    return res.send(profile);
})

router.get('/all' , async (req , res) => {
    const profiles = await Profile.find().populate('user');
    return res.send(profiles);
})

router.get('/handle/:handle' , async (req , res) => {
    const profile = await Profile.findOne({handle: req.params.handle}).populate('user');
    if(!profile) {
        return res.status(404).send('Profile not found');
    }
    return res.send(profile);
})

router.post('/experience' , [ authMiddleware , experienceValidator ] , async (req , res) => {
    const errors = getErrors(req);
    if(!isEmpty(errors)) {
        return res.status(400).send(errors);
    }
    const profile = await Profile.findOne({user: req.payload._id});
    if(profile) {
        profile.experience.push(lodash.pick(req.body , [
            'title' , 'from' , 'company' , 'location' , 'to' ,
            'current' , 'description'
        ]));
        return res.send(await profile.save());
    }

    return res.status(404).send('Profile not found');
})

router.delete('/experience/:id' , [ authMiddleware ] , async (req , res) => {
    const profile = await Profile.findOne({user: req.payload._id});
    if(profile) {
        const indexToRemove = profile.experience.findIndex(exp => exp._id.toString() === req.params.id);
        if(indexToRemove >= 0) {
            profile.experience.splice(indexToRemove , 1);
            return res.send(await profile.save());
        }
        return res.status(404).send('Experience not found');
    }

    return res.status(404).send('Profile not found');
})

router.delete('/education/:id' , [ authMiddleware ] , async (req , res) => {
    const profile = await Profile.findOne({user: req.payload._id});
    if(profile) {
        const indexToRemove = profile.education.findIndex(exp => exp._id.toString() === req.params.id);
        if(indexToRemove >= 0) {
            profile.education.splice(indexToRemove , 1);
            return res.send(await profile.save());
        }
        return res.status(404).send('Education not found');
    }

    return res.status(404).send('Profile not found');
})

router.post('/education' , [ authMiddleware , educationValidator ] , async (req , res) => {
    const errors = getErrors(req);
    if(!isEmpty(errors)) {
        return res.status(400).send(errors);
    }
    const profile = await Profile.findOne({user: req.payload._id});
    if(profile) {
        profile.education.push(lodash.pick(req.body , [
            'school' , 'from' , 'degree' , 'fieldofstudy' , 'to' ,
            'current' , 'description'
        ]));
        return res.send(await profile.save());
    }

    return res.status(404).send('Profile not found');
})

module.exports = router;