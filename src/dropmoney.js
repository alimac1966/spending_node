const MongoClient = require('mongodb').MongoClient;

const moneyRepo = require('./moneyRepo');

const data = require('../data/moneyhub.json');

const url = 'mongodb://localhost:27017';
const dbName = 'money';

async function dropdata() {
    const client = new MongoClient(url);
    await client.connect();
    try {
        await client.db(dbName).dropDatabase();
        const admin = client.db(dbName).admin();
        console.log("Money Database has been dropped");
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}
dropdata();
