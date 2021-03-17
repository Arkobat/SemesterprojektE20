const con = require('../middleware/mySql.js')
const epochWeek = 604800000
const epochYear = 220752000000
const now = new Date().getMilliseconds

/**
 * Insert an element into song tabel
 * 
 * @param {*} songId 
 */
function addSong(songId) {
    con.query('INSERT INTO song VALUES (?)', [songId])
}

/**
 * Gets most played songs in a specific time period determined by startTime and endTime. 
 * 
 * @param {Number} startTime Starting time in miliseconds after epoch
 * @param {Number} endTime Ending time in miliseconds after epoch
 * @param {JSON} limit Contains offset and number of elements
 * 
 * @returns {Promise} Returns a Promise
 */
function getMostPlayed(startTime, endTime, limit) {
    console.log(startTime)
    console.log(endTime)
    var query
    if(true || now - endTime <= now - epochWeek) {
        query = 'SELECT song_id, COUNT(*) as amount FROM history WHERE (timestamp > ? AND timestamp < ? )GROUP BY song_id ORDER BY amount DESC LIMIT ? OFFSET ?'
    } else if (now - endTime <= now - epochYear) {
        query = 'SELECT song_id, COUNT(*) as amount FROM history_weekly WHERE (timestamp > ? AND timestamp < ? )GROUP BY song_id ORDER BY amount DESC LIMIT ? OFFSET ?'
    } else {
        query = 'SELECT song_id, COUNT(*) as amount FROM history_yearly WHERE (timestamp > ? AND timestamp < ? )GROUP BY song_id ORDER BY amount DESC LIMIT ? OFFSET ?'
    }

    console.log(query)

    return new Promise(function(resolve, reject) {
        // Do async job
        con.query(query, [startTime, endTime, limit.limit, limit.start], function (err, res) { 
            if (err) {
                console.log(err)
                reject(err);
            } else {
                console.log(res)
                resolve(res);
            }
        })
    })

}

/**
 * Gets total users, subscribers, and procentage of users that are subscribed.
 * 
 * @param {Number} startTime Starting time in miliseconds after epoch
 * @param {Number} endTime Ending time in miliseconds after epoch
 * @param {JSON} limit Contains offset and number of elements
 * 
 * @returns {Promise} Returns a Promise
 */
function getTotalUsers(startTime, endTime, limit) {
    var query = 'SELECT timestamp, total_users, total_subscribers, (CAST(total_subscribers AS DECIMAL) / total_users) AS procentage FROM daily_activity WHERE (timestamp > ? AND timestamp < ? ) GROUP BY timestamp ASC LIMIT ? OFFSET ?'

    return new Promise(function(resolve, reject) {
        // Do async job
        con.query(query, [startTime, endTime, limit.limit, limit.start], function (err, res) { 
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

/**
 * Gets unique logins in a specific timeperiod determined by startTime and endTime.
 * 
 * @param {Number} startTime Starting time in miliseconds after epoch
 * @param {Number} endTime Ending time in miliseconds after epoch
 * @param {JSON} limit Contains offset and number of elements
 * 
 * @returns {Promise} Returns a Promise
 */
function getUniqueLogins(startTime, endTime, limit) {
    var query 
    if(now - endTime <= now - epochWeek) {
        query = 'SELECT timestamp, COUNT(*), COUNT(DISTINCT(user_id)) FROM history WHERE (timestamp > ? AND timestamp < ? ) ORDER BY timestamp DESC LIMIT ? OFFSET ?'
    } else if (now - endTime <= now - epochYear) {
        query = 'SELECT timestamp, COUNT(*), COUNT(DISTINCT(user_id)) FROM history_weekly WHERE (timestamp > ? AND timestamp < ? ) ORDER BY timestamp DESC LIMIT ? OFFSET ?'
    } else {
        query = 'SELECT timestamp, COUNT(*), COUNT(DISTINCT(user_id)) FROM history_yearly WHERE (timestamp > ? AND timestamp < ? ) ORDER BY timestamp DESC LIMIT ? OFFSET ?'
    }

    return new Promise(function(resolve, reject) {
        con.query(query, [startTime, endTime, limit.limit, limit.start], function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

module.exports = {
    addSong,
    getMostPlayed,
    getTotalUsers,
    getUniqueLogins
}

/*
CREATE TABLE IF NOT EXISTS daily_activity (
    timestamp DATETIME PRIMARY KEY,
    total_users INTEGER NOT NULL,
    total_subscribers INTEGER NOT NULL,
    logins INTEGER NOT NULL,
    minutes_played INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS connections (
    connections_id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL REFERENCES user.user_id,
    events ENUM('login', 'logout') NOT NULL,
    timestamp DATETIME NOT NULL
)
*/