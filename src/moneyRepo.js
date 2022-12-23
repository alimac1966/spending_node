const e = require('express');
const { MongoClient, ObjectID } = require('mongodb');

function moneyRepo() {
  const url = 'mongodb://localhost:27017';
  const dbName = 'money';

  function loadData(data, collection) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);

        results = await db.collection(collection).insertMany(data);
        resolve(results);

      } catch (error) {
        reject(error)
      }
      client.close();
    })

  }

  function getCategory(dataType, srcCategory) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);
//        console.log(srcCategory);
        const results = db.collection('CategoryMappings').find({"MH CATEGORY": srcCategory});
        resolve(await results);
      } catch (error) {
        reject(error)
      }
      client.close();
    })

  }

  return { loadData, getCategory }
}

module.exports = moneyRepo();