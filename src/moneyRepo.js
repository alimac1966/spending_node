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
        srcCategory = srcCategory.replace(/"/g,'');
        const results = db.collection('CategoryMappings').findOne({'MH CATEGORY': srcCategory});
        resolve(await results);

//        console.log(srcCategory);
      
      } catch (error) {
        reject(error)
      }
      client.close();
    })

  }

  return { loadData, getCategory }
}

module.exports = moneyRepo();