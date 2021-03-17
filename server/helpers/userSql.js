const con = require('../middleware/mySql.js')

/**
 * Gets history for specific user.
 * 
 * @param {Number} userId ID of the wanted user
 * @param {JSON} limit Contains offset and number of elements
 * 
 * @returns {Promise} Returns a Promise
 */
function getUserHistory(userId, limit) {
    return new Promise(function(resolve, reject) {
        con.query('SELECT song_id, timestamp FROM history WHERE user_id = ? ORDER BY timestamp DESC LIMIT ? OFFSET ?;', [userId, limit.limit, limit.start], function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

/**
 * Gets specific user's most played songs in a specific time period determined by startTime and endTime.
 * 
 * @param {Number} userId ID of the wanted user
 * @param {Number} startTime Starting time in miliseconds after epoch
 * @param {Number} endTime Ending time in miliseconds after epoch
 * @param {JSON} limit Contains offset and number of elements
 * 
 * @returns {Promise} Returns a Promise
 */
function getUserMostPlayed(userId, startTime, endTime, limit) {
    const epochWeek = 604800000
    const epochYear = 31536000000
    const now = Date.now()
    var query

    console.log('time')
    if (true || startTime >= now - epochWeek) {
        query = 'SELECT song_id, COUNT(*) as amount FROM history WHERE (user_id = ? AND timestamp > ? AND timestamp < ? ) GROUP BY song_id ORDER BY amount DESC LIMIT ? OFFSET ?'
    } else if (startTime >= now - epochYear) {
        query = 'SELECT song_id, COUNT(*) as amount FROM history_weekly WHERE (user_id = ? AND timestamp > ? AND timestamp < ? )GROUP BY song_id ORDER BY amount DESC LIMIT ? OFFSET ?'
    } else {
        query = 'SELECT song_id, COUNT(*) as amount FROM history_yearly WHERE (user_id = ? AND timestamp > ? AND timestamp < ? )GROUP BY song_id ORDER BY amount DESC LIMIT ? OFFSET ?'
    }
    
    console.log(query)
    console.log('userId ' + userId)
    console.log('startTime ' + startTime)
    console.log('endTime ' + endTime)
    console.log('limit ' + limit.limit)
    console.log('start ' + limit.start)
    return new Promise(function(resolve, reject) {
        // Do async job
        con.query(query, [userId, startTime, endTime, limit.limit, limit.start], function (err, res) { 
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

/** */
function getUserRecommendation() {
    //TODO
}

/** */
function getUserLog() {
    //TODO:
}

/** */
function addSongPlayed(userId, songId, timestamp) {
    con.query('INSERT INTO history (user_id, song_id, timestamp) VALUES (?, ?, ?)', [userId, songId, timestamp])
}

module.exports = {
    getUserHistory, 
    getUserMostPlayed, 
    getUserRecommendation, 
    getUserLog,
    addSongPlayed
}