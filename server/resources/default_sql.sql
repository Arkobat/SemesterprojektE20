CREATE TABLE IF NOT EXISTS history (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    song_id VARCHAR(50) NOT NULL,
    timestamp BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS history_weekly (
    user_id VARCHAR(50) NOT NULL,
    song_id VARCHAR(50) NOT NULL,
    playcount INTEGER NOT NULL,
    timestamp DATE NOT NULL,
    PRIMARY KEY(user_id, song_id)
);

CREATE TABLE IF NOT EXISTS history_yearly (
    user_id VARCHAR(50) NOT NULL,
    song_id VARCHAR(50) NOT NULL,
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

CREATE TABLE IF NOT EXISTS connections (
    connections_id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL REFERENCES history.user_id,
    events ENUM('login', 'logout') NOT NULL,
    timestamp DATETIME NOT NULL REFERENCES
)