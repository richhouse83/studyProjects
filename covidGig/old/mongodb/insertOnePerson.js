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
        const personCollection = database.collection('person');

        const options = { ordered: true };
        const query = { artist: 'Elbow', date: '2020-09-24'};

        const gig = await gigs.findOne(query);
        let response;
        if (!gig){
            console.log('Gig not found');
            response._id = null;
        } else {
            console.log(`${gig.name} found, assigning to gig list`)
            response = gig
        };

        const person = {contact: '07793020106', transmission: false, gigs_attended: [response._id]}

        const result = await personCollection.insertOne(person, options);

        console.log(`${result.insertedId} was inserted`);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);



