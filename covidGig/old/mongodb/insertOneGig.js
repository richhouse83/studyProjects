//Inserting one gig relationship with venue tested

const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://richhouse83:beehive1@cluster0.vfvmg.mongodb.net/covid_gig?retryWrites=true&w=majority";

const client = new MongoClient(uri);



async function run() {
    try {
        await client.connect();
    
        const database = client.db('covid_gig');
        const gigs = database.collection('gigs');
        const venues = database.collection('venues');

        const options = { ordered: true };
        const query = { name: 'Night and Day Cafe' };

        const venue = await venues.findOne(query);
        let response;
        if (!venue){
            console.log('Venue not found');
            response._id = null;
        } else {
            console.log(`${venue.name} found, assigning to gig`)
            response = venue}
            ;

        const gig = {artist: 'Elbow', date: '2020-09-24', venue_id: response._id, transmission_detected: false}

        const result = await gigs.insertOne(gig, options);

        console.log(`${result.insertedId} was inserted`);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);



