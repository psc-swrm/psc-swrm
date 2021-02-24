const { MongoClient } = require("mongodb");
                                                                                                                                     
// Connection URI
const url = "mongodb://pscuser:pscpassword@cluster0-shard-00-00.oftpv.mongodb.net:27017,cluster0-shard-00-01.oftpv.mongodb.net:27017,cluster0-shard-00-02.oftpv.mongodb.net:27017/starkwetterlagenmanagement?ssl=true&replicaSet=atlas-a2in66-shard-0&authSource=admin&retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });
 
 // The database to use
 const dbName = "test";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");

         const db = client.db(dbName);
         // Use the collection "sensordata"
         const col = db.collection("sensordata");

         // current timestamp in milliseconds
        let ts = Date.now();
        let date_ob = new Date(ts);
        let dateDisplay = `${this.IntTwoChars(date_ob.getHours())}:${this.IntTwoChars(date_ob.getMinutes())}:${this.IntTwoChars(date_ob.getSeconds())} ${this.IntTwoChars(date_ob.getMonth() + 1)}/${this.IntTwoChars(date_ob.getDate())}/${date_ob.getFullYear()}`;
        // Construct a document
        let personDocument = {
             "sensor_value": fuellstand,
             "timestamp": dateDisplay                                                                                                                                
         }
         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}
run().catch(console.dir);

//Arduino
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/cu.usbmodem143201', {
  autoOpen: false,
  baudRate: 9600,
});
const parser = port.pipe(new Readline());

parser.on('sensordata', console.log)