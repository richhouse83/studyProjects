const express = require('express');
const transmissionRouter = express.Router();
const gigSchema = require('../gigSchema');
const venueSchema = require('../venueSchema');
const personSchema = require('../personSchema');
const mongoose = require('mongoose');

const Gig = mongoose.model('gigs', gigSchema);
const Venue = mongoose.model('venues', venueSchema);
const User = mongoose.model('user', personSchema);


// to update person's transmission status, then add to all gig information, allowing contact tracing to begin
transmissionRouter.put('/', async (req, res)=>{
    if(!req.body.number || !req.body.passCode){
        res.status(400).send('Invalid Request');
    }
    
    
    await User.findOne(req.body, async (err, userToUpdate)=>{
        if(err){
            next(err);
            res.status(500).send(err);
        }
        if(!userToUpdate){
            res.status(404).send("Could not find User to update");
        } else {
            //Currently toggles status, update after tests.
            await User.findByIdAndUpdate(userToUpdate._id, {"transmission": !userToUpdate.transmission}, (err, updated)=>{
                if(err){
                    next(err)
                    res.status(500).send(err);
                }
                if(!updated){
                    res.status(400).send('Error updating');
                } else {
                    const gigArray = updated.gigs_attended
                    gigArray.forEach(async gig => {
                        // Currently toggles status, update after tests
                        await Gig.updateOne({"_id": gig}, ({transmission_reported: !userToUpdate.transmission}), async (err, gigUpdated)=>{
                            if(err){
                                next(err);
                                res.status(500).send(err);
                            } else {
                                res.status(200).send('Information updated');
                                //res.status(200).send('Gig transmission status updated');
                            }
                        })
                    })
                }
            });

        }
    });
        
        
        
    
})


module.exports = transmissionRouter;