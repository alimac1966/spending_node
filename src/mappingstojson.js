
const CSVToJSON = require('csvtojson');
const fs = require('fs');

CSVToJSON().fromFile('data/src/CategoryMappings.csv')
    .then(expenseiq => {
        fs.writeFile('data/CategoryMappings.json', JSON.stringify(expenseiq, null, 4), (err) => {
            if (err) {
                throw err;
            }
        });
    }).catch(err => {

        console.log(err);
    });