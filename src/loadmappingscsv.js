const MongoClient = require('mongodb').MongoClient;

const moneyRepo = require('./moneyRepo');

const Cat_data = require('../data/CategoryMappings.json');
const Cat_collection = 'CategoryMappings';
const url = 'mongodb://localhost:27017';
const dbName = 'money';



 async function loadmappings() {
    const client = new MongoClient(url);
    await client.connect();
    try {
        const Cat_results = await moneyRepo.loadData(Cat_data, Cat_collection);
        console.log("Inserted " + Cat_results.insertedCount + " Category Mappings" );
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}
module.exports = loadmappings();
