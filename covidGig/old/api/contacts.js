const express = require('express');
const contactRouter = express.Router();
const gigSchema = require('../gigSchema');
const venueSchema = require('../venueSchema');
const personSchema = require('../personSchema');
const mongoose = require('mongoose');

const Gig = mongoose.model('gigs', gigSchema);
const Venue = mongoose.model('venues', venueSchema);
const User = mongoose.model('user', personSchema);


// gets numbers for all potential contacts of a case.
contactRouter.get('/', async (req, res, next)=>{
    let contactArray = [];
    await Gig.find({"transmission_reported": true}, (err, gigs)=>{
        if(err){
            next(err);
            res.status(500).send(err);
        } else {
            const idArray = [];
            gigs.forEach(gig =>{
                idArray.push(gig._id);
            })
            console.log(idArray);
            idArray.forEach(async gig =>{
                await User.find({"gigs_attended": gig}, (err, userArray)=>{
                    if(err){
                        next(err);
                        console.log(err);
                    } else {
                        userArray.forEach(user =>{
                            contactArray.push(user.number);
                        })
                        res.status(200).send(contactArray);
                    }
                })
            })
        }
    })
})

module.exports = contactRouter;