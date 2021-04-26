const express = require('express')
const dotenv = require('dotenv')

dotenv.config();

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const databaseEnv = process.env.DATABASE_ENV

if (databaseEnv == "development") {
    console.log('connecting to local mongodb-community@4.4 database...')

    // to start local database use
    // brew services start mongodb-community@4.4

    // to stop local database use 
    // brew services stop mongodb-community@4.4

    const port = process.env.PORT

    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');

    // Connection URL
    const url = 'mongodb://localhost:27017';

    // Database Name
    const dbName = 'EMA';
    const client = new MongoClient(url, { useUnifiedTopology: true });

    // Use connect method to connect to the server
    client.connect(function(err) {
        assert.strictEqual(null, err);
        console.log('Connected successfully to server');

        const db = client.db(dbName);

        console.log(db.listCollections())
        
        client.close();
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })    
}

if (databaseEnv == "production") {
    console.log('connecting to Atlas Production Database')

    const username = process.env.ATLAS_USERNAME
    const databaseName = process.env.ATLAS_DATABASE_NAME
    const atlasPassword = process.env.ATLAS_PASSWORD

    const MongoClient = require('mongodb').MongoClient;
    const uri = `mongodb+srv://${username}:<${atlasPassword}@cluster0.pl1wx.gcp.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      const collection = client.db("tutorial").collection("students");
      // perform actions on the collection object
      console.log(collection)
      client.close();
    });
    }