/* eslint-disable no-undef */
global.chai = require('chai');
global.chai.use(require("chai-http"))
const app = require("../index")
global.agent = chai.request.agent(app);
global.assert = chai.assert;
global.expect = chai.expect;
chai.should();
chai.config.includeStack = true;

const sql = require("../middleware/mySql.js")

before(() => {

    return new Promise(function (resolve, reject) {
        sql.query(`
        INSERT INTO history (user_id, song_id, timestamp) VALUES 
        ('TEST_USER','AA',NOW() - 000), 
        ('TEST_USER','AB',NOW() - 010), 
        ('TEST_USER','AC',NOW() - 020), 
        ('TEST_USER','AD',NOW() - 030), 
        ('TEST_USER','AE',NOW() - 040), 
        ('TEST_USER','AF',NOW() - 050), 
        ('TEST_USER','AG',NOW() - 060), 
        ('TEST_USER','AH',NOW() - 070), 
        ('TEST_USER','AI',NOW() - 080), 
        ('TEST_USER','AJ',NOW() - 090), 
        ('TEST_USER','AK',NOW() - 100), 
        ('TEST_USER','AL',NOW() - 110), 
        ('TEST_USER','AM',NOW() - 120), 
        ('TEST_USER','AN',NOW() - 130), 
        ('TEST_USER','AO',NOW() - 140), 
        ('TEST_USER','AP',NOW() - 150), 
        ('TEST_USER','AQ',NOW() - 160), 
        ('TEST_USER','AR',NOW() - 170), 
        ('TEST_USER','AS',NOW() - 180), 
        ('TEST_USER','AT',NOW() - 190), 
        ('TEST_USER','AU',NOW() - 200), 
        ('TEST_USER','AV',NOW() - 210), 
        ('TEST_USER','AW',NOW() - 220), 
        ('TEST_USER','AX',NOW() - 230), 
        ('TEST_USER','AY',NOW() - 240), 
        ('TEST_USER','AZ',NOW() - 250) 
        `, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })

})

after(() => {

    return new Promise(function (resolve, reject) {
        sql.query(`DELETE FROM history WHERE user_id = "TEST_USER"`, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
})