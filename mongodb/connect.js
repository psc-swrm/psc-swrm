const { MongoClient } = require("mongodb");

// Connection URI
const url = "mongodb://pscuser:pscpassword@cluster0-shard-00-00.oftpv.mongodb.net:27017,cluster0-shard-00-01.oftpv.mongodb.net:27017,cluster0-shard-00-02.oftpv.mongodb.net:27017/starkwetterlagenmanagement?ssl=true&replicaSet=atlas-a2in66-shard-0&authSource=admin&retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

async function run() {
    try {
        // Connect the client to the server
        await client.connect();

        // Establish and verify connection
        await client.db("admin").command({ ping: 1});
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

