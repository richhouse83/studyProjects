const express = require('express');
const userRouter = express.Router();
const personSchema = require('../personSchema');
const mongoose = require('mongoose');



const User = mongoose.model('users', personSchema);


userRouter.get('/', async (req, res) =>{
    const user = await User.find({});

try {
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
})

userRouter.post('/', async (req, res)=>{
    const newUser = new User(req.body);

    newUser.save((err, user)=>{
        if (err){
            console.error(err);
        }
        if (!user){
            console.error('Number could not be added');
        } else {
            res.status(201).send(`${user.number} successfully added`);
        }
    })
})

userRouter.delete('/', async (req, res)=>{
    const userToDelete = await User.findOne(req.body);
    if(!userToDelete){
        res.status(404).send('User not found');
    }

    try{
        deleted = await User.findByIdAndDelete(userToDelete._id);
        if(!deleted){
            res.status(404).send("Could not complete action");
        } else res.status(204).send();
    } catch(err) {
        res.status(500).send(err);
    }
})

userRouter.patch('/', async (req, res)=>{
    /*
    const userToUpdate = await User.findOne(req.body);
    if(!userToUpdate){
        res.status(404).send('User not found');
    }
    try{
        
    }*/
})

module.exports = userRouter;