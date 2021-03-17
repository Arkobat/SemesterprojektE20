const express = require("express");
const router = express.Router();
const sql = require('../helpers/globalSql.js')
const limiter = require("../helpers/limiter.js")

/**
 * Getting top most played songs that takes the parameters startTime, endTime and limit. 
 * where startTime is from Epoch start (1st january 1970), endTime is equal with currentTime
 *  and limit is defined in the limiter.js in helpers directory. 
 */
router.get('/top', (req, res) => {
    sql.getMostPlayed(0, Date.now(), limiter.parse(req))
        .then(function (result) {
            console.log(result)
            res.json(result)
        }, function (err) {
            console.log(err)
        })
})

/** 
 * Getting top most played songs that takes the parameters startTime, endTIme and limit. 
 * Where startTime and limit is defined in the limiter.js in helpers directory, endTime is equal with current time.
 * if the startTime is out of scope of Epoch it will send back a 400 status, with at error message. 
 */
router.get('/top/:_time', (req, res) => { //+startdate + enddate
    let start = limiter.parseStartDate(req.params._time)
    if (!start) {
        return res.json({
            status: 400,
            message: 'Invalid time period'
        })
    }
    let end = Date.now()
    
    sql.getMostPlayed(start, end, limiter.parse(req))
        .then(function (result) {
            console.log(result)
            res.json(result)
        }, function (err) {
            console.log(err)
        })
})

module.exports = router