const CSVToJSON = require('csvtojson');
const fs = require('fs');

CSVToJSON().fromFile('data/src/Transaction Export 23-09-2022.csv')
    .then(moneyhub => {
        fs.writeFile('data/moneyhub.json', JSON.stringify(moneyhub, null, 4), (err) => {
            if (err) {
                throw err;
            }
        });
    }).catch(err => {
        console.log(err);
    });