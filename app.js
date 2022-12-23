const MongoClient = require('mongodb').MongoClient;
const moneyRepo = require('./src/moneyRepo');

const url = 'mongodb://localhost:27017';
const dbName = 'money';

async function main() {
    const client = new MongoClient(url);
    const dropMoney = require('./src/dropmoney');
    const loadMappings = require('./src/loadmappingscsv');
    const loadEIQ = require('./src/loadeiqcsv');
    const loadMH = require('./src/loadmhcsv');
    await client.connect();
    try {
        dropMoney.dropdata;
        loadMappings.loadmappings;
        loadEIQ.loadeiq;
        loadMH.loadmh;
    } catch (error) {
        console.log(error);
    } finally {
        client.close();

    }
}
main();
