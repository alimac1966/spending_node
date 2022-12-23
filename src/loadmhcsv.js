const MongoClient = require('mongodb').MongoClient;
const e = require('express');
const moneyRepo = require('./moneyRepo');
const url = 'mongodb://localhost:27017';
const dbName = 'money';

const MH_collection = 'MoneyHub';

async function loadmh() {
    const client = new MongoClient(url);

    var fs = require('fs');
    var path = require('path');
    var filePath = path.join(__dirname, '../data/src/Transaction Export 20-12-2022.csv' );
    var f = fs.readFileSync(filePath, {encoding: 'utf-8'},
        function(err){console.log(err);});

    f = f.split("\n");

    headers = f.shift().split(",");
    var trans = [];
    f.forEach(function(d){
        var tmp = {};

        var srcData = d.replace("DEBIT RECEIVED, THANK","DEBIT RECEIVED THANK");
        var srcData = srcData.replace(" Glasgow, Cumb"," Glasgow Cumb");
        var srcData = srcData.replace(" ROSSLYN ST.,"," ROSSLYN ST.");
        var srcData = srcData.replace(" PERTH, PERTH"," PERTH PERTH");
        var srcData = srcData.replace(" RICHMOND, N Y"," RICHMOND N Y");
        var srcData = srcData.replace(" Perth, GBR"," Perth GBR");
        var srcData = srcData.replace(" TAKEPERTH,"," TAKEPERTH");

        var count = (srcData.match(/,/g) || []).length;
        if (count > 8) {console.log(srcData)};

        row = srcData.split(",");

        for (var i = 0; i < headers.length ; i++){
            tmp[headers[i]] = row[i];
            }
            trans.push(tmp);           
    });
    
    trans.forEach(async trans => {

//      try {
//
//          var Category = trans.CATEGORY;
//          var getCategory = await moneyRepo.getCategory('MH',Category);
//           console.log(getCategory.Expense_Group + " " + getCategory.Expense_Category);
//console.log(getCategory);
//        } catch (error) {
//            console.log(error);
//        }  finally {
//        
//        }  
        
        var theDate = trans.DATE;
        let [y,m,d] = theDate.replace(/"/g,'').split('-');

        trans.TransYear = parseInt(y);
        trans.TransMonth = parseInt(m);
        trans.TransDay = parseInt(d);

        if (trans.NOTES === '""') {trans.NOTES = null }


    });

    await client.connect();
    try {


        const MH_results = await moneyRepo.loadData(trans, MH_collection);
        console.log("Inserted " + MH_results.insertedCount + " MoneyHub Transactions" );
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}
module.exports = loadmh();