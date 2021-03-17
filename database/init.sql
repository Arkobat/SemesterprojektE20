/*CREATE DATABASE team05;*/

USE team05;

CREATE TABLE IF NOT EXISTS user (
    user_id VARCHAR(50) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS song (
    song_id VARCHAR(50) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS history (
    user_id VARCHAR(50) NOT NULL REFERENCES user.user_id,
    song_id VARCHAR(50) NOT NULL REFERENCES song.song_id,
    timestamp BIGINT NOT NULL,
    PRIMARY KEY(user_id, song_id)
);

CREATE TABLE IF NOT EXISTS history_weekly (
    user_id VARCHAR(50) NOT NULL REFERENCES user.user_id,
    song_id VARCHAR(50) NOT NULL REFERENCES song.song_id,
    playcount INTEGER NOT NULL,
    timestamp DATE NOT NULL,
    PRIMARY KEY(user_id, song_id)
);

CREATE TABLE IF NOT EXISTS history_yearly (
    user_id VARCHAR(50) NOT NULL REFERENCES user.user_id,
    song_id VARCHAR(50) NOT NULL REFERENCES song.song_id,
    playcount INTEGER NOT NULL,
    timestamp DATE NOT NULL,
    PRIMARY KEY(user_id, song_id)
);

CREATE TABLE IF NOT EXISTS daily_activity (
    timestamp DATETIME PRIMARY KEY,
    total_users INTEGER NOT NULL,
    total_subscribers INTEGER NOT NULL,
    logins INTEGER NOT NULL,
    minutes_played INTEGER NOT NULL
);

