const { MongoClient } = require("mongodb");
 
// Connection URI
const uri =
  "mongodb://localhost:27017/?poolSize=20&writeConcern=majority";
 
// Create a new MongoClient
const client = new MongoClient(uri,{ useUnifiedTopology: true });
 
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
 
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
 
    //insertion
    const database = client.db("fruitdb");
    const collection = database.collection("fruits");
    // create a document to be inserted
    // create an array of documents to insert
    const docs = [
        { name: "Banana", score: 7,review: "YellowishSweetness" },
        { name: "Grape", score: 5,review: "SourGreen" },
        { name: "Apple", score: 9,review: "AntiDoctor" },
      ];
      // this option prevents additional documents from being inserted if one fails
      const options = { ordered: true };
      const result = await collection.insertMany(docs, options);
      console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);