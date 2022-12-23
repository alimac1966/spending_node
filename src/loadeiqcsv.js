const MongoClient = require('mongodb').MongoClient;
const moneyRepo = require('./moneyRepo');
const url = 'mongodb://localhost:27017';

const EIQ_collection = 'ExpenseIQ';

const dbName = 'money';

async function loadeiq() {
    const client = new MongoClient(url);

    var fs = require('fs');
    var path = require('path');
    var filePath = path.join(__dirname, '../data/src/expenseiq.csv' );
    var f = fs.readFileSync(filePath, {encoding: 'utf-8'},
        function(err){console.log(err);});

    f = f.split("\n");

     headers = f.shift().split(",");
    var trans = [];
    f.forEach(function(d){
        var tmp = {};
        row = d.split(",");

        for (var i = 0; i < headers.length ; i++){
            tmp[headers[i]] = row[i];
            }
            trans.push(tmp);           
    });
    

 //   trans.forEach(trans => {


 //       var theDate = trans.DATE;
 //       let [y,m,d] = theDate.replace(/"/g,'').split('-');

 //       trans.TransYear = parseInt(y);
 //       trans.TransMonth = parseInt(m);
 //   });

    await client.connect();
    try {
        const EIQ_results = await moneyRepo.loadData(trans, EIQ_collection);
        console.log("Inserted " + EIQ_results.insertedCount + " Expense IQ Transactions " );
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}
module.exports = loadeiq();



