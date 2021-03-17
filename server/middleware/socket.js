var io;
const eventData = require('../models/eventData')
const songDb = require('../helpers/userSql')

var Ajv = require('ajv');

const eventSchema = require('../resources/socketSchemas.json')

const SONG_START_EVENT = 'songStartEvent'
const SONG_PAUSE_EVENT = 'songPauseEvent'
const SONG_RESUME_EVENT = 'songResumeEvent'
const SONG_END_EVENT = 'songEndEvent'
const SONG_CHANGE_EVENT = 'songChangeEvent'
const SONG_WIND_EVENT = 'songWindEvent'
const SONG_QUEUE_ADD_EVENT = 'songQueueAddEvent'
const SONG_QUEUE_REMOVE_EVENT = 'songQueueRemoveEvent'

/**
 * Checks if there are connection to the server, send a 200 responds if there is a connection. 
 * @param server {object} takes a server as a parameter 
 */
function init(server) {

    console.log('Starting SocketIO')
    io = require('socket.io')(server, {
        handlePreflightRequest: (req, res) => {
            const headers = {
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
                "Access-Control-Allow-Credentials": true
            };
            res.writeHead(200, headers);
            res.end();
        }
    });

    io.origins("*:*")
    io.on('connection', (socket) => {
        console.log('Connected a socket')

        socket.on('disconnect', () => {
            console.log("connection to user closed");
        });

        socket.on(SONG_START_EVENT, function (message, callback) {
            try {
                message = JSON.parse(message)    
                if (!new Ajv().validate(eventSchema.songStartEvent, message)) {
                    return callback({ status: 401, message: 'Bad request'})
                }
            } catch (error) {
                return callback({ status: 401, message: 'Bad request'})
            }
           
            songDb.addSongPlayed(message.userId, message.songId, Date.now())
            callback({status: 200, message: 'OK'})
        })

        socket.on(SONG_PAUSE_EVENT, function (message, callback) {
            if (!new Ajv().validate(eventSchema.songPauseEvent, message)) {
                return callback({ status: 401, message: 'Bad request'})
            }
            callback({status: 200, message: 'OK'})
        })

        socket.on(SONG_RESUME_EVENT, function (message, callback) {
            if (!new Ajv().validate(eventSchema.songResumeEvent, message)) {
                return callback({ status: 401, message: 'Bad request'})
            }
            callback({status: 200, message: 'OK'})
        })

        socket.on(SONG_END_EVENT, function (message, callback) {
            if (!new Ajv().validate(eventSchema.songEndEvent, message)) {
                return callback({ status: 401, message: 'Bad request'})
            }
            callback({status: 200, message: 'OK'})
        })

        socket.on(SONG_CHANGE_EVENT, function (message, callback) {
            if (!new Ajv().validate(eventSchema.songChangeEvent, message)) {
                return callback({ status: 401, message: 'Bad request'})
            }
            callback({status: 200, message: 'OK'})
        })

        socket.on(SONG_WIND_EVENT, function (message, callback) {
            if (!new Ajv().validate(eventSchema.songWindEvent, message)) {
                return callback({ status: 401, message: 'Bad request'})
            }
            callback({status: 200, message: 'OK'})
        })

        socket.on(SONG_QUEUE_ADD_EVENT, function (message, callback) {
            if (!new Ajv().validate(eventSchema.songQueueAddEvent, message)) {
                return callback({ status: 401, message: 'Bad request'})
            }
            callback({status: 200, message: 'OK'})
        })

        socket.on(SONG_QUEUE_REMOVE_EVENT, function (message, callback) {
            if (!new Ajv().validate(eventSchema.songQueueRemoveEvent, message)) {
                return callback({ status: 401, message: 'Bad request'})
            }
            callback({status: 200, message: 'OK'})
        })

    });
    return io
}

module.exports = init;