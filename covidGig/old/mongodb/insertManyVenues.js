const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://richhouse83:beehive1@cluster0.vfvmg.mongodb.net/covid_gig?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const venues = [
    {name: 'Night and Day Cafe', capacity: '700', address: '26 Oldham Street Manchester', contactNo: '0161 236 1822'},
    {name:'The Deaf Institute', capacity:'500', address: '135 Grosvenor Street Manchester', contactNo: '0161 276 9350'},
    {name: 'Gorilla', capacity:'300', address: '54-56 Whitworth St, Manchester', contactNo: '0161 826 2998'}
]

async function run() {
    try {
      await client.connect();
  
      const database = client.db('covid_gig');
      const collection = database.collection('venues');

      const options = { ordered: true };

      const result = await collection.insertMany(venues, options);

  
      // Query for a movie that has the title 'Back to the Future'
      //const query = { title: 'Back to the Future' };
      //const movie = await collection.findOne(query);
  
      console.log(`${result.insertedCount} were inserted`);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);



