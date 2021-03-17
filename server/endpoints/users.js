const express = require("express");
const router = express.Router();
const userDb = require('../helpers/userSql.js')
const limiter = require("../helpers/limiter.js")

/**
 *  Gets latest played songs for a specific user, start- and end-date type must be epoch
 */
router.get('/:user_id/history', async (req, res) => {
    userDb.getUserHistory(req.params.user_id, limiter.parse(req))
        .then(function (result) {
            res.json(result)
        }, function (err) {
            console.log(err)
        })
})

/**
 * Gets the most played songs for the specified user.
 */
router.get('/:user_id/top', (req, res) => { //+startdate + enddate
    userDb.getUserMostPlayed(req.params.user_id, 0, Date.now(), limiter.parse(req))
        .then(function (result) {
            res.json(result)
        }, function (err) {
            console.log(err)
        })
})

/**
 * Gets the most played songs for the specified user, in a user defined time-period.
 */
router.get('/:user_id/top/:_time', (req, res) => {
    let start = limiter.parseStartDate(req.params._time)
    if (!start) {
        return res.json({
            status: 400,
            message: 'Invalid time period'
        })
    }
    let end = Date.now()
    userDb.getUserMostPlayed(req.params.user_id, start, end, limiter.parse(req))
        .then(function (result) {
            res.json(result)
        }, function (err) {
            console.log(err)
        })
})
/*
//get a list of recommendations, To be implemented when xlearn works
router.get('/:user_id/recommendation', (req, res) => {
    //get list from xlearn
    //res.json(recommendedSongList);
})

//get a log of user activity for this user
router.get('/:user_id/log', (req, res) => {
    //res.json(userActivityDb)
})
*/

module.exports = router;